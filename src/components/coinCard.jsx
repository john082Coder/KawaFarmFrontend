import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Badge, Card, Image, Form, Spinner, InputGroup } from "react-bootstrap";
import { ConnectionRejectedError } from "use-wallet";
import Logo from "../assets/dogAvtar.png";

const CoinCard = (props) => {

    // const name = { props };
    const cardData = props?.cardData;
    console.log("PROPS:",cardData);
    const [showBox, setshowBox] = useState("approveContract");
    const [prevType, setprevType] = useState("approveContract");
    const [loader, setLoader] = useState(false);
    const [headerMessage, setheaderMessage] = useState();
    // const [showBox, setshowBox] = useState(props.type);
    const [isContractApproved, setIsContractApproved] = useState(false);
    useEffect(() => {

    });

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
            if (showBox === "deposit") {
                setheaderMessage('DEPOSIT SUCCESSFULL');
                setTimeout(() => {
                    setheaderMessage();
                }, 1000)
                // setTimeout(() => {
                //     setheaderMessage('Deposit SuccessFull');
                //   }, 1000);
            }
            if (showBox === "harvest") {
                setheaderMessage('HARVEST SUCCESSFULL');
                setTimeout(() => {
                    setheaderMessage();
                }, 1000)
                // setTimeout(() => {
                //     setheaderMessage('Deposit SuccessFull');
                //   }, 1000);
            }
            if (showBox === "addMore") {
                setheaderMessage('ADDED SuccessFULL');
                setTimeout(() => {
                    setheaderMessage();
                }, 1000);
            }
            if (showBox === "withdraw") {
                setheaderMessage('WITHDRAW SUCCESSFULL');
                setTimeout(() => {
                    setheaderMessage();
                }, 1000);
            }

            console.log("prevType:", prevType);
            console.log("value:", value);
            setprevType(showBox);
            if (prevType === 'withdraw' && value === 'stake') {
                console.log('condition', showBox === 'withdraw', value === 'stake');
                setshowBox("harvest");
            }
            else {
                setshowBox(value);
            }
            setLoader(false);
        }, 1000);
        console.log("prev:", showBox);

    }
    return (
        <Card style={{ width: '22rem' }} className="stake_card p-0 m-0">
            {headerMessage && <Card.Header style={{ height: '24px', padding: 0, margin: 0, textAlign: "center" }}><small style={{ marginInline: 'auto', color: "#136F1C" }}>{headerMessage}</small></Card.Header>}
            <Card.Header style={{ backgroundColor: "#FFF", borderTopRightRadius: '25px', borderTopLeftRadius: '25px' }}>
                <div className="d-flex justify-content-around p-4">
                    <div><Image src={cardData.image} roundedCircle style={{ maxWidth: '50px', maxHeight: '50px' }} /></div>
                    <div>
                        <h5 className="m-0">{cardData.coinTitle}</h5>
                        <small>{cardData.stake}-xKAWA</small>
                    </div>
                </div>
                <div className="d-flex justify-content-around p-4">
                    <div>
                        <h6 className='mb-0' style={{ color: '#977D83' }}>Weight</h6>
                        <strong>100$</strong>
                    </div>
                    <div>
                        <h6 className='mb-0' style={{ color: '#977D83' }}>Stake</h6>
                        <strong>{cardData.stake}</strong>
                    </div>
                    <div>
                        <h6 className='mb-0' style={{ color: '#977D83' }}>Earn</h6>
                        <strong><Badge pill variant="light" className="tagKawa">XKawa</Badge></strong>
                    </div>
                </div>

            </Card.Header>
            {showBox === 'none' && <Card.Body className="cardBodyColor ">
                <div className="cardBox m-1 p-2">
                    <Row>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between p-0">
                                <div>
                                    <small className="card_stake_text"><strong style={{ paddingLeft: 16 }}>STAKED</strong></small>
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value="25,533,900" />
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
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value="25,533" />
                                </div>
                                <div className="py-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                                <Button className="cardButton" onClick={() => { setprevType(showBox); handleClickButton('harvest') }}>Harvest</Button>
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
                        <Button className="withDrawButton" disabled={loader} onClick={() => { setprevType(showBox); handleClickButton('withdraw') }}>Withdraw</Button>
                    </Col>
                    <Col lg={6} style={{ display: "grid" }}>
                        <Button className="addMore" disabled={loader} onClick={() => { setprevType(showBox); handleClickButton('addMore') }}>Add More</Button>
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
                        <Col lg={6} className="text-center">
                            <small className="card_stake_text">
                                5571000.00 {cardData.stake}
                            </small>
                        </Col>
                        <Col lg={6} className="text-center">
                            <small className="card_stake_text">
                                0 {cardData.stake}
                            </small>
                        </Col>
                    </Row>
                </div>
            </Card.Body>}
            {showBox === 'noContract' && <Card.Body className="cardBodyColor">
                <div className="cardBox m-1 p-2 lightcard" style={{ opacity: '0.5' }}>

                    <Row>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between p-0">
                                <div>
                                    <small className="card_stake_text"><strong style={{ paddingLeft: 16 }}>STAKED</strong></small>
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value="78,7878" />
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
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value="0" />
                                </div>
                                <div className="py-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                                <Button className="cardButton" disabled style={{ border: "none", background: "rgba(239, 239, 239, 0.6)", color: "#ABABAB" }}>Harvest</Button>
                                            </strong></small>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row className="p-2">
                    <Col lg={12} style={{ display: "grid" }}>
                        <Button className="addMore" disabled={loader} onClick={() => { setprevType(showBox); handleClickButton('deposit'); }} block>Stake</Button>
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
                        <Col lg={6} className="text-center">
                            <small className="card_stake_text">
                                5571000.00 {cardData.stake}
                            </small>
                        </Col>
                        <Col lg={6} className="text-center">
                            <small className="card_stake_text">
                                0 {cardData.stake}
                            </small>
                        </Col>
                    </Row>
                </div>
            </Card.Body>}
            {showBox === 'approveContract' && <Card.Body className="cardBodyColor">
                <div className="cardBox m-1 p-2" style={{ opacity: '0.5' }}>
                    <Row>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between p-0">
                                <div>
                                    <small className="card_stake_text"><strong style={{ paddingLeft: 16 }}>STAKED</strong></small>
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value="78,7878" />
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
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value="0" />
                                </div>
                                <div className="py-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                                <Button className="cardButton" disabled style={{ border: "none", background: "rgba(239, 239, 239, 0.6)", color: "#ABABAB" }}>Harvest</Button>
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
                        {!loader ?
                            <Button variant="light" style={{ border: '1px solid #E6E5E5' }} onClick={() => { setprevType(showBox); handleClickButton('noContract') }} block><strong>Approve Contract</strong></Button>
                            :
                            <>
                                <Button variant="light" className="loaderButton" disabled block><strong>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Approving...</strong>
                                </Button></>}
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
                        <Col lg={6} className="text-center">
                            <small className="card_stake_text">
                                5571000.00 {cardData.stake}
                            </small>
                        </Col>
                        <Col lg={6} className="text-center">
                            <small className="card_stake_text">
                                0 {cardData.stake}
                            </small>
                        </Col>
                    </Row>
                </div>
            </Card.Body>}
            {showBox === 'harvest' && <Card.Body className="cardBodyColor">
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
                                            <Form.Control size="lg" style={{ border: "none" }} type="text" value=" 46,0000" />
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
                                {/* <Col lg={3}>
                                    <h6 className="card_stake_text pt-2">
                                        XKawa
                                    </h6>
                                    <Badge variant="danger">Danger</Badge>
                                </Col> */}
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className='p-2'>
                    {!loader ?
                        <Button className="addMore" size="lg" block disabled={loader} onClick={() => { setprevType(showBox); handleClickButton('none', false) }}>
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

                    <Button className="withDrawButton" size="lg" block disabled={loader} onClick={() => { setprevType(showBox); handleClickButton(prevType) }}>
                        Cancel
                    </Button>
                </Row>
            </Card.Body>}
            {showBox === 'addMore' && <Card.Body className="cardBodyColor">
                <Row>
                    <Col lg={12} className="px-4">
                        <h5>Deposit</h5>
                    </Col>
                    <Col lg={12} className="">
                        <div className="cardBox m-1 p-2">
                            <div className="d-flex justify-content-between p-0" style={{ background: '#FFF' }}>
                                <div>
                                    <Form.Control size="lg" style={{ border: "none" }} type="text" value="78,7878" />
                                </div>
                                <div className="py-2">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                            <small><strong className="card_stake_text pt-2">
                                            {cardData.stake}
                                            </strong></small>
                                            <Badge style={{ background: '#FFFBEC', color: "#D5A600", marginBottom: 4 }}>MAX</Badge>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <span className="card_stake_text pt-2">Available: 446,610,000 {cardData.stake}</span>
                <Row className='p-2'>
                    {!loader ?
                        (<Button className="addMore" size="lg" block disabled={loader} onClick={() => { setprevType(showBox); handleClickButton('none', false) }}>
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

                    <Button className="withDrawButton" size="lg" block disabled={loader} onClick={() => { setprevType(showBox); handleClickButton(prevType) }}>
                        Cancel
                    </Button>
                </Row>
            </Card.Body>}
            {showBox === 'deposit' && <Card.Body className="cardBodyColor">
                <Row>
                    <Col lg={12} className="px-4">
                        <h5>Deposit</h5>
                    </Col>
                    <Col lg={12}>
                        <div className="cardBox m-1 p-2">
                            <Row>
                                <Col lg={12} className="">
                                    <div className="d-flex justify-content-between p-0">
                                        <div>
                                            <Form.Control size="lg" style={{ border: "none" }} type="text" value="78,7878" />
                                        </div>
                                        <div className="py-2">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text style={{ background: "#fff", border: 'none' }}>
                                                    <small><strong className="card_stake_text pt-2">
                                                    {cardData.stake}
                                                    </strong></small>
                                                    <Badge style={{ background: '#FFFBEC', color: "#D5A600", marginBottom: 4 }}>MAX</Badge>
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
                    {!loader ?
                        <Button className="addMore" size="lg" disabled={loader} block onClick={() => { setprevType(showBox); handleClickButton('none') }}>
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
                    <Button className="withDrawButton" size="lg" block disabled={loader} onClick={() => { setprevType(showBox); handleClickButton(prevType) }}>
                        Cancel
                    </Button>
                </Row>
            </Card.Body>}
            {showBox === 'withdraw' && <Card.Body className="cardBodyColor">
                <Row>
                    <Col lg={12} className="px-4">
                        <h5>Withdraw</h5>
                    </Col>
                    <Col lg={12} className="">
                        <div className="d-flex justify-content-between p-0">
                            <div>
                                <Form.Control size="lg" style={{ border: "none" }} type="text" value="78,7878" />
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
                </Row>
                <h6 className="text-center">
                    Withdraw your Stake?
                </h6>
                <Row className='p-2'>
                    {!loader ?
                        <Button className="addMore" size="lg" block disabled={loader} onClick={() => { setprevType('withdraw'); handleClickButton('noContract') }}>
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

                    <Button className="withDrawButton" size="lg" block disabled={loader} onClick={() => { setprevType('withdraw'); handleClickButton(prevType) }}>
                        Cancel
                    </Button>
                </Row>
            </Card.Body>
            }
        </Card>
    );
}
export default CoinCard;