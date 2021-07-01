import React, { useContext, useState } from 'react';
import { Row, Col, Button, Modal, Accordion, Form, Card, Image, Badge, InputGroup, Spinner } from 'react-bootstrap';
import BigNumber from 'bignumber.js'

import useFarms from '../hooks/useFarms';
import useAllStakedValue from '../hooks/useAllStakedValue';
import usePayr from '../hooks/usePayr';

import ETH from "../assets/eth.svg";
import DAL from "../assets/dal-cl.svg";
import BNC from "../assets/bnc-cl.svg";
import BTC from "../assets/btc-cl.svg";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from "react-bootstrap/AccordionContext";
import UpArrow from "../assets/up-arrow.svg";
import DownArrow from "../assets/down-arrow.svg";
import ConectWallet from "../components/conectWallet";

import { BASIC_TOKEN } from '../constants/config';
import { useWallet } from 'use-wallet';
import { useEffect } from 'react';
import { getEarned, getFarmContract, getPoolWeight, getStaked, harvest, stake, unstake, getDecimals } from '../contracts/utils';
import { bnToDec } from '../utils';
import useAllowance from '../hooks/useAllowance';
import useApprove from '../hooks/useApprove';
import { useCallback } from 'react';
import dogeCoin from "../assets/dogeCoin.svg";
import kawaCoin from "../assets/kawaCoin.svg";
import shibaCoin from "../assets/shibaCoin.svg";
import kishuCoin from "../assets/kishuCoin.svg";
import akitaCoin from "../assets/akitaCoin.svg";

function ContextAwareToggle({ children, eventKey,theme, callback }) {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
  
    return (
    <button
        type="button"
        onClick={decoratedOnClick}
        className="w-100 border-0 bg_transprent mt-3"
    >
        {isCurrentEventKey ? 
			<h6 className={`font-weight-bold ${!theme && 'text-white'}`}><img alt="upArrow" src={UpArrow} className="ml-1" /></h6> : 
			<h6 className={`font-weight-bold ${!theme && 'text-white'}`}><img alt="downArrow" src={DownArrow} className="ml-1" /></h6>
		}
    </button>
    );
  }

const FarmCard = (props) => {

	const [farms] = useFarms();
	const stakedValue = useAllStakedValue();

    const [showDeposit, setShowDeposit] = useState(false);
    const [showHarvest, setShowHarvest] = useState(false);
    const [showWidhdraw, setShowWidhdraw ] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [lPBalance, setLPBalance] = useState(null);
    const [stakedBalance, setStakedBalance] = useState(null);
    const [selectedPool, setSelectedPool] = useState(null);
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [pendingDeposit, setPendingDeposit] = useState(false);
    const [pendingWithdraw, setPendingWithdraw] = useState(false);
    const [pendingHarvest, setPendingHarvest] = useState(false);
    const [earnedBalance, setEarnedBalance] = useState(null);

    const payr = usePayr();
    const { account } = useWallet();

	const farmIndex = farms.findIndex(
		({ tokenSymbol }) => tokenSymbol === BASIC_TOKEN,
	);
	const farmPrice = farmIndex >= 0 && stakedValue[farmIndex]
      ? stakedValue[farmIndex].tokenPriceInWeth
      : new BigNumber(0);

	const BLOCKS_PER_YEAR = new BigNumber(2336000);
	// TODO: After block height xxxx, FARM_PER_BLOCK = 100;
	const FARM_PER_BLOCK = new BigNumber(1000);

	const rows = farms.reduce(
		(farmRows, farm, i) => {
            const farmWithStakedValue = {
                ...farm,
                ...stakedValue[i],
                apy: stakedValue[i]
                ? farmPrice
                    .times(FARM_PER_BLOCK)
                    .times(BLOCKS_PER_YEAR)
                    .times(stakedValue[i].poolWeight)
                    .div(stakedValue[i].totalWethValue)
                : null,
            };
            const newFarmRows = [...farmRows];
            if (newFarmRows[newFarmRows.length - 1].length === 3) {
                newFarmRows.push([farmWithStakedValue]);
            } else {
                newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue);
            }
            return newFarmRows;
		},
		[[]],
	);

    const clickHarvest = async (pool) => {
        setShowHarvest(true);
        setSelectedPool(pool);
        const balance = await getEarned(
            getFarmContract(payr),
            pool.pid,
            account
        );
        setEarnedBalance(bnToDec(new BigNumber(balance)));
    };

    const clickDeposit = async (pool) => {
        setShowDeposit(true);
        setSelectedPool(pool);
        setDepositAmount(0);
        const balance = await pool.lpContract.methods
            .balanceOf(props.account)
            .call();
        setLPBalance(bnToDec(new BigNumber(balance)));
    };

    const clickWithdraw = async (pool) => {
        setShowWidhdraw(true);
        setSelectedPool(pool);
        setWithdrawAmount(0);
        const balance = await getStaked(
            getFarmContract(payr),
            pool.pid,
            account
        );
        setStakedBalance(bnToDec(new BigNumber(balance.toNumber())));
    };
    
    return (
        <>
            {(rows[0].length > 0) ? (
                rows.map((poolRow, i) => (
                    <div key={i} md="10" lg="6" xl="4" className="stake-card-container">
                        {poolRow.map((pool, j) => (
                           
                            
                            <CoinCard pool={pool}/>
                        ))}
                    </div>
                ))
            ) : (
                <div></div>
            )}

            <ConectWallet 
				show={modalShow} 
				onHide={() => setModalShow(false)} 
				onChangeWallet={props.onChangeWallet} 
				themeClass={props.themeClass} 
			/>
            
        </>
    );
}


const CoinCard = (props) => {
    const cardData = props?.pool;
    const [headerMessage, setheaderMessage] = useState();
    const [showBox, setShowBox] = useState("approve");
    const [prevType, setprevType] = useState("approveContract");
    const [poolWeight, setPoolWeight] = useState(0);
    const [staked, setStaked] = useState(0);
    const [totalLpValue, setTotalLpValue] = useState(0);
    const [earned, setEarned] = useState(0);
    const [loader, setLoader] = useState(false);
    const { pid } = props.pool;
    const { account } = useWallet();
    const payr = usePayr();
    const allowance = useAllowance(cardData.lpContract, cardData.farmContract);
    const { onApprove } = useApprove(cardData.lpContract, cardData.farmContract);
    const [isContractApproved, setIsContractApproved] = useState(false);
    const [requestedApproval, setRequestedApproval] = useState(false);

    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [pendingDeposit, setPendingDeposit] = useState(false);
    const [pendingWithdraw, setPendingWithdraw] = useState(false);
    const [pendingHarvest, setPendingHarvest] = useState(false);
    const [lPBalance, setLPBalance] = useState(null);
    const [stakedBalance, setStakedBalance] = useState(null);
    const [earnedBalance, setEarnedBalance] = useState(null);

    useEffect(() => {
        async function fetchEarned() {
            if (!payr) return;
            //const farmContract = getFarmContract(payr);
            const farmContract = cardData.farmContract;
            const earned = await getEarned(
                farmContract,
                pid,
                account
            );
            const decimals = await props.pool.tokenContract.methods.decimals().call();
            console.log("earned = ", bnToDec(new BigNumber(earned)).toFixed(4));
            setEarned(bnToDec(new BigNumber(earned), decimals).toFixed(4));
           const poolWeight = await getPoolWeight(
                farmContract,
                pid
            );
            setPoolWeight( 100);
            const staked = await getStaked(
                farmContract,
                pid,
                account
            );
            console.log("staked = ", staked);
            setStaked(bnToDec(new BigNumber(staked.toNumber())).toFixed(2));
            const totalLpValue = await props.pool.lpContract.methods
                .balanceOf(farmContract.options.address)
                .call();
            setTotalLpValue(bnToDec(new BigNumber(totalLpValue)).toFixed(2));
        }
        if (payr && account) {
            fetchEarned();
        }
        let refreshInterval = setInterval(fetchEarned, 10000)
        return () => clearInterval(refreshInterval)
    }, [payr, account, pid]);
    useEffect(() => {
        if(allowance.toNumber() && staked >0 )
        {
            if(showBox === "approve")
            setShowBox("withdrawaddmore");
        }
    
    }, [staked, earned]);
    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true);
            const txHash = await onApprove();
            if (!txHash) {
                setRequestedApproval(false);
            }
        } catch (e) {
            console.log(e);
        }
    }, [onApprove, setRequestedApproval]);
    const handleStake = async () => {
        setShowBox("depositcancel");

        setDepositAmount(0);
        const balance = await cardData.lpContract.methods
            .balanceOf(account)
            .call();
            console.log("asdfasdf",bnToDec(new BigNumber(balance)))
        setLPBalance(bnToDec(new BigNumber(balance)));
    };


    const handleClickButton = (value, cancel = true) => {
        if (prevType === 'approveCOntract' && value === "noContract") {
            setIsContractApproved(true);
        }
        setheaderMessage();
        setLoader(true);
        if (prevType === value) {
            setLoader(false);
        }
        if (!cancel) {
            setLoader(true);
        }
        setTimeout(() => {
            setLoader(false);
        }, 1000);
        console.log("prev:", showBox);

    }
    const handleCancel = (from) => {
        if(from === "deposit")
            setShowBox("approve");
        if(from === "add")
            setShowBox("withdrawaddmore")
        if(from==="withdraw")
            setShowBox("withdrawaddmore")
        if(from === "harvest")
            setShowBox("withdrawaddmore")
    }
    const handleAddMore = async () => {
        setShowBox("addcancel");
        setDepositAmount(0);
        const balance = await cardData.lpContract.methods
            .balanceOf(account)
            .call();
            console.log("asdfasdf",bnToDec(new BigNumber(balance)))
        setLPBalance(bnToDec(new BigNumber(balance)));
    }
    const handleWithdraw = async () => {
        setShowBox("withdrawcancel");
        setWithdrawAmount(0);
        const balance = await getStaked(
            cardData.farmContract,
            cardData.pid,
            account
        );
        setStakedBalance(bnToDec(new BigNumber(balance.toNumber())));
    }
    const handleHarvest = async () => {
        setShowBox("harvestcancel");
        const balance = await getEarned(
            cardData.farmContract,
            cardData.pid,
            account
        );
        setEarnedBalance(bnToDec(new BigNumber(balance)));
    }

    return (
    <Card style={{ width: '22rem' }} className="stake_card p-0 m-0 mr-2 mt-2">
            {headerMessage && <Card.Header style={{ height: '24px', padding: 0, margin: 0, textAlign: "center" }}><small style={{ marginInline: 'auto', color: "#136F1C" }}>{headerMessage}</small></Card.Header>}
            <Card.Header style={{ backgroundColor: "#FFF", borderTopRightRadius: '25px', borderTopLeftRadius: '25px' }}>
                <div className="d-flex justify-content-start p-3">
                    <div><Image src={cardData.icon} roundedCircle style={{ maxWidth: '50px', maxHeight: '50px' }} /></div>
                    <div style={{marginLeft:'12px'}}>
                        <h5 className="m-0">{cardData.poolTitle}</h5>
                        <small>{cardData.name}-xKAWA</small>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-3 token-info">
                    <div>
                        <h6 className='mb-0' style={{ color: '#977D83' }}>Weight</h6>
                        <strong>100$</strong>
                    </div>
                    <div>
                        <h6 className='mb-0' style={{ color: '#977D83' }}>Stake</h6>
                        <strong>{cardData.lpToken}</strong>
                    </div>
                    <div>
                        <h6 className='mb-0' style={{ color: '#977D83' }}>Earn</h6>
                        <strong><Badge pill variant="light" className="tagKawa">XKawa</Badge></strong>
                    </div>
                </div>

            </Card.Header>
            {showBox === 'approve' && <Card.Body className="cardBodyColor">
                <div className="cardBox m-1 p-2" style={{ opacity: '0.5' }}>
                    <Row>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between p-0">
                                <div>
                                    <small className="card_stake_text"><strong style={{ paddingLeft: 16 }}>STAKED</strong></small>
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value={staked} disabled />
                                </div>
                                <div className="py-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                            {cardData.stake}
                                            </strong></small>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between p-0 align-items-end">
                                <div>
                                    <small className="card_stake_text"><strong style={{ paddingLeft: 12 }}>xKAWA EARNED</strong></small>
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value={earned} disabled />
                                </div>
                                <div className="pt-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                                <Button className="cardButton" disabled style={{ border: "none", background: "rgba(239, 239, 239, 1)",opacity:"1", color: "#ABABAB" }}>Harvest</Button>
                                            </strong></small>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
                <Row className="p-2">
                    <Col lg={12}>

                        {!allowance.toNumber() ? (
                            <>
                            {requestedApproval ? (
                                <Button variant="light" className="loaderButton" disabled block><strong>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Approving...</strong>
                                </Button>
                            ): (
                                <Button variant="light" style={{ border: '1px solid #E6E5E5', fontSize:'12px', color:'#000000', textTransform:'uppercase', backgroundColor:'transparent' }} onClick={handleApprove} block><strong>Approve Contract</strong></Button>
                            )}
                            </>
                        ) : (    
                                    <Row className="p-2">
                                        <Col lg={12} style={{ display: "grid" }}>
                                            <Button className="addMore" disabled={loader} onClick={ handleStake } block>Stake</Button>
                                        </Col>
                                    </Row>           
                            )}       
                    </Col>
                </Row>
                <div className="px-4 pt-4">
                    <Row>
                        <Col lg={6} className="text-left">
                            <small className="card_stake_text color-gray">
                                TOTAL VALUE
                            </small>
                        </Col>
                        <Col lg={6} className="text-left">
                            <small className="card_stake_text color-gray">
                                MY STAKE
                            </small>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="text-left">
                            <small className="card_stake_text  ibm-plex color-gray">
                                {totalLpValue} {cardData.name}
                            </small>
                        </Col>
                        <Col lg={6} className="text-left">
                            <small className="card_stake_text ibm-plex color-gray">
                                {staked} {cardData.name}
                            </small>
                        </Col>
                    </Row>
                </div>
            </Card.Body> }
            {showBox === 'depositcancel' && <Card.Body className="cardBodyColor">
                <Row>
                    <Col lg={12} className="px-4">
                        <h5>Deposit</h5>
                    </Col>
                    <Col lg={12}>
                        <div className="cardBox m-1 p-2">
                            <Row>
                                <Col lg={12} className="">
                                    <div className="d-flex justify-content-between p-0">
                                        <div className="mr-1">
                                            <Form.Control size="lg" style={{ border: "none" }} as="input" type="number" value={depositAmount} onChange={(val) => setDepositAmount(val.target.value)} />
                                        </div>
                                        <div className="py-2">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                                    <small><strong className="card_stake_text pt-2">
                                                    {cardData.name}
                                                    </strong></small>
                                                    <Badge className="mt-1" style={{ background: '#FFFBEC', color: "#D5A600", marginBottom: 4, cursor:'pointer' }} onClick={()=>{setDepositAmount(lPBalance)}}>MAX</Badge>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className='p-2'>
                    {!pendingDeposit ?
                        <Button className="addMore" size="lg" disabled={loader} block onClick={async () => {
                            setPendingDeposit(true);
                            try {
                                const txHash = await stake(
                                    cardData.farmContract,
                                    cardData.pid,
                                    depositAmount,
                                    account,
                                );
                                setPendingDeposit(false);
                                setShowBox("withdrawaddmore");
                
                            } catch (e) {
                                console.log(e);
                                setPendingDeposit(false);
                                setShowBox("approve")
                            }
                        }}
                        >
                            DEPOSIT
                        </Button>
                        :
                        <Button className="loaderButton" disabled={loader} size="lg" block >
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{` `}PENDING DEPOSIT...
                        </Button>
                    }
                    <Button className="withDrawButton" size="lg" block disabled={loader} onClick={()=>{handleCancel("deposit");}}>
                        Cancel
                    </Button>
                </Row>
            </Card.Body>}
            {showBox === 'withdrawaddmore' && <Card.Body className="cardBodyColor ">
                <div className="cardBox m-1 p-2">
                    <Row>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between p-0">
                                <div>
                                    <small className="card_stake_text"><strong style={{ paddingLeft: 16 }}>STAKED</strong></small>
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value={staked} disabled />
                                </div>
                                <div className="py-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                            {cardData.stake}
                                            </strong></small>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between p-0">
                                <div>
                                    <small className="card_stake_text"><strong style={{ paddingLeft: 16 }}>xKAWA EARNED</strong></small>
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value={earned} disabled />
                                </div>
                                <div className="py-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                                <Button className="cardButton" onClick={() => { handleHarvest();}}>Harvest</Button>
                                            </strong></small>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
                <Row className="-2">
                    <Col lg={6} style={{ display: "grid" }}>
                        <Button className="withDrawButton" disabled={loader} onClick={() => { handleWithdraw();}}>Withdraw</Button>
                    </Col>
                    <Col lg={6} style={{ display: "grid" }}>
                        <Button className="addMore" disabled={loader} onClick={() => { handleAddMore(); }}>Add More</Button>
                    </Col>
                </Row>
                <div className="p-4">
                    <Row>
                        <Col lg={6} className="text-center">
                            <small className="card_stake_text">
                                TOTAL VALUE
                            </small>
                        </Col>
                        <Col lg={6} className="text-center">
                            <small className="card_stake_text">
                                MY STAKE
                            </small>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="text-left">
                            <small className="card_stake_text ibm-plex">
                                {totalLpValue} {cardData.name}
                            </small>
                        </Col>
                        <Col lg={6} className="text-left">
                            <small className="card_stake_text ibm-plex">
                                {staked} {cardData.name}
                            </small>
                        </Col>
                    </Row>
                </div>
            </Card.Body>}
            {showBox === 'addcancel' && <Card.Body className="cardBodyColor">
                <Row>
                    <Col lg={12} className="px-4">
                        <h5>Deposit</h5>
                    </Col>
                    <Col lg={12} className="">
                        <div className="cardBox m-1 p-2">
                            <div className="d-flex justify-content-between p-0" style={{ background: '#FFF' }}>
                                <div className="mr-1">
                                    <Form.Control size="lg" style={{ border: "none" }} as="input" type="number" value={depositAmount} onChange={(val) => setDepositAmount(val.target.value)} />
                                </div>
                                <div className="py-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                            {cardData.name}
                                            </strong></small>
                                            <Badge className="mt-1" style={{ background: '#FFFBEC', color: "#D5A600", marginBottom: 4, cursor:'pointer' }} onClick={()=>{setDepositAmount(lPBalance)}} >MAX</Badge>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <span className="card_stake_text pt-2">Available: {lPBalance} {cardData.name}</span>
                <Row className='p-2'>
                    {!pendingDeposit ?
                        (<Button className="addMore" size="lg" block disabled={loader} onClick={async () => {
                            setPendingDeposit(true);
                            try {
                                const txHash = await stake(
                                    cardData.farmContract,
                                    cardData.pid,
                                    depositAmount,
                                    account,
                                );
                                setPendingDeposit(false);
                                setShowBox("withdrawaddmore");
                
                            } catch (e) {
                                console.log(e);
                                setPendingDeposit(false);
                                setShowBox("withdrawaddmore")
                            }
                        }}
                        >
                            Add
                        </Button>)
                        :
                        <Button className="loaderButton" size="lg" block >
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{` `}PENDING STAKE...
                        </Button>
                    }

                    <Button className="withDrawButton" size="lg" block disabled={loader} onClick={() => { handleCancel('add') }}>
                        Cancel
                    </Button>
                </Row>
            </Card.Body>}
            {showBox === 'withdrawcancel' && <Card.Body className="cardBodyColor">
                <Row>
                    <Col lg={12} className="px-4">
                        <h5>Withdraw</h5>
                    </Col>
                    <Col lg={12} className="">
                        <div className="d-flex justify-content-between p-0">
                            <div className="mr-1">
                                <Form.Control size="lg" style={{ border: "none" }} type="text" value={stakedBalance} disabled  onChange={(val) => setWithdrawAmount(val.target.value)}/>
                                <div className="text-right h_title">Available: {stakedBalance ? stakedBalance : "0.00"}</div>
                            </div>
                            <div className="py-2">
                                <InputGroup.Prepend >
                                    <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                        <small><strong className="card_stake_text pt-2">
                                        {cardData.name}
                                        </strong></small>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                            </div>
                        </div>
                    </Col>
                </Row>
                <h6 className="text-center mt-2">
                    Withdraw your Stake?
                </h6>
                <Row className='p-2'>
                    {!pendingWithdraw ?
                        <Button className="addMore" size="lg" block disabled={loader}  onClick={async () => {
                            setPendingWithdraw(true);
                            try {
                                const txHash = await unstake(
                                    cardData.farmContract,
                                    cardData.pid,
                                    account,
                                );
                                setPendingWithdraw(false);
                                setShowBox("withdrawaddmore");
                                
                            } catch (e) {
                                console.log(e);
                                setPendingWithdraw(false);
                                setShowBox("withdrawaddmore");
                            }
                        }}
                        >
                            Yes, I want to Withdraw
                        </Button>
                        :
                        <Button className="loaderButton" size="lg" block >
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{` `}PENDING WITHDRAWAL...
                        </Button>
                    }

                    <Button className="withDrawButton" size="lg" block disabled={loader} onClick={() => {handleCancel("withdraw") }}>
                        Cancel
                    </Button>
                </Row>
            </Card.Body>}
            {showBox === 'harvestcancel' && <Card.Body className="cardBodyColor">
                <Row>
                    <Col lg={12} className="px-4">
                        <h5>Earned Amount</h5>
                    </Col>
                    <Col lg={12}>
                        <div className="cardBox m-1 p-2">
                            <Row>
                                <Col lg={12} className="">
                                    <div className="d-flex justify-content-between p-0">
                                        <div>
                                            <Form.Control size="lg" style={{ border: "none" }} type="text" value={earnedBalance} disabled/>
                                        </div>
                                        <div className="py-2">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                                    <small><strong className="card_stake_text pt-2">
                                                        xKAWA
                                                    </strong></small>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </div>
                                    </div>
                                </Col>
                               
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className='p-2'>
                    {!pendingHarvest ?
                        <Button className="addMore" size="lg" block disabled={loader} onClick={async () => {
                            setPendingHarvest(true);
                            try {
                                const txHash = await harvest(
                                    cardData.farmContract,
                                    cardData.pid,
                                    account,
                                );
                                setPendingHarvest(false);
                                setShowBox("withdrawaddmore");
                            } catch (e) {
                                console.log(e);
                                setPendingHarvest(false);
                                setShowBox("withdrawaddmore");
                            }
                        }}>
                            Harvest
                        </Button>
                        :
                        <Button className="loaderButton" size="lg" block >
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{` `}PENDING HARVEST...
                        </Button>
                    }

                    <Button className="withDrawButton" size="lg" block disabled={loader} onClick={() => { handleCancel("harvest") }}>
                        Cancel
                    </Button>
                </Row>
            </Card.Body>}
        </Card>
    )
}

export default FarmCard;
