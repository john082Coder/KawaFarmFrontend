import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Badge, Card, Image, Form, Modal, Nav, Navbar, NavDropdown, InputGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { useHistory } from 'react-router';
import { useWallet } from 'use-wallet';
import { bnToDec } from '../utils';
import Logo from "../assets/dogAvtar.png";
import LoginIcon from "../assets/loginIcon.svg";
import Bell from "../assets/bell.svg";
import tickmarkIcon from "../assets/tickmarkIcon.svg";
import openIcon from "../assets/openIcon.svg";
import roundBallIcon from "../assets/roundBallIcon.svg";
import bellIcon from "../assets/bellIcon.svg";
import backgroundTexture from "../assets/backgroundTexture.svg";
import dogeCoin from "../assets/dogeCoin.svg";
import kawaCoin from "../assets/kawaCoin.svg";
import shibaCoin from "../assets/shibaCoin.svg";
import kishuCoin from "../assets/kishuCoin.svg";
import akitaCoin from "../assets/akitaCoin.svg";
import { formatAddress } from "../utils";
import CoinCard from "../components/coinCard";
import FarmCard from "../components/farmCard";
import Footer from '../components/footer'
import BigNumber from 'bignumber.js'
const DashBoard = () => {
    const { account, connect, reset, status, balance, connector, ethereum, chainId } = useWallet();
    const dummyData = [
        {
            coinTitle: 'Kawakami Inu Pool',
            stake: "KAWA",
            type: 'approveContract',
            image:kawaCoin,
        },
        {
            coinTitle: 'Shiba Inu Pool',
            stake: "SHIB",
            type: 'approveContract',
            image:shibaCoin,
        },
        {
            coinTitle: 'Dogeion Pool',
            stake: "ELON",
            type: 'approveContract',
            image:dogeCoin,
        },
        {
            coinTitle: 'Kishu Inu Pool',
            stake: "KISHU",
            type: 'approveContract',
            image:kishuCoin,
        },
        {
            coinTitle: 'Akita Inu Pool',
            stake: "AKITA",
            type: 'approveContract',
            image:akitaCoin,
        }
    ]
    const history = useHistory();
    const [showBox, setshowBox] = useState("none");

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccessClose = () => { setShowSuccess(false) };
    const handleSuccessShow = () => setShowSuccess(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClickButton = (value) => {
        setshowBox(value);
    }
    const onDisconnectWallet = () => {
        reset();
      //  setUserAccount(null);
        localStorage.removeItem("account");
        localStorage.removeItem("walletProvider");
    
      }
    const onChangeWallet = (data) => {
        if (data === 'metamask') {
          connect("injected");
          localStorage.setItem("walletProvider", "metamask");
         
        } else if (data === 'walletconnect') {
          connect("walletconnect");
          localStorage.setItem("walletProvider", "walletconnect");
        }
      }
    useEffect(() => {
        if (account) {
          history.push('/dashboard');
        }
        else {
            history.push('/');
        }
        console.log("111=",chainId)
      }, [account]);

    const onFormSubmit = () => {
        setShow(false);
        setShowSuccess(true)
    }
    return (
        
        <Container fluid className="main_layout" style={{ backgroundColor: '#FFF6F5', marginInline: '0px' }}>
          
            <Container>
  
                <Navbar
                    fixed="top"
                    className="navbar"
                    style={{
                        background: '#FFFAFA',
                        borderBottom: "2px solid #F7FBFD",
                    }}
                >
                    <Navbar.Brand style={{ color: "#16507B" }}>
                        <Image
                            src={Logo}
                            roundedCircle
                            style={{ maxWidth: "36px", maxHeight: "36px", marginRight: 8 }}
                        />
                        KawaFarm
                    </Navbar.Brand>
                    
                    <Navbar.Collapse id="basic-navbar-nav" style={{ marginRigt: "24px" }}>
                        <Nav className="ml-auto" style={{ fontSize: "14px" }}>
                            <Form.Group className="headerdropdown">
                                <InputGroup className="headerdropdown" style={{ background: '#FFF', border: '1px solid #FCDFE9' }}>
                                    <InputGroup.Prepend className="prePended">
                                        <InputGroup.Text id="inputGroupPrepend" style={{ color: '#82172D', borderTopLeftRadius: 8 }}>{bnToDec(new BigNumber(balance))} ETH</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <NavDropdown
                                        className="header-pedding"
                                        title={<span style={{ background: '#FFF', borderRadius: 16, color: '#82172D', minWidth: '221px', fontSize: "16px", padding: 8 }}>{account?formatAddress(account):""} <img src={roundBallIcon} alt=""/></span>}

                                        id="basic-nav-dropdown"
                                    >
                                        <div style={{
                                            borderRadius: '8px', background: '#FFF !important', minWidth: '221px'
                                        }}>
                                            <p style={{ padding: 8 }}>Connected with MetaMask</p>
                                            <div style={{
                                                margin: 8,
                                                borderRadius: '8px', border: '1px Solid #E5E5E5'
                                            }}>
                                                <NavDropdown.Item href="#">{account?formatAddress(account):""}<img src={roundBallIcon} alt="" /></NavDropdown.Item>
                                                <small ><NavDropdown.Item href={"https://"+(chainId==4?"rinkeby":"mainnet")+".etherscan.io/address/" + account} target="_blank" style={{ color: '#109BDE' }}>VIEW IN EXPLORER <img src={openIcon} style={{ marginBottom: 4, marginLeft: 4 }} alt=""/></NavDropdown.Item></small>
                                            </div>
                                        </div>
                                        <div style={{ margin: 8 }}>
                                            <Button style={{ background: 'rgba(251, 0, 0, 0.1)', border: 'none', color: '#903434' }} onClick={onDisconnectWallet} variant="outline-success" size="lg" block >
                                                DISCONNECT
                                            </Button>
                                        </div>
                                    </NavDropdown>

                                </InputGroup>
                            </Form.Group>
                         
                            <Nav.Link className="header-pedding" href="#">
                               
                                <OverlayTrigger
                                    trigger="click"
                                    key={'left-end'}
                                    transition={false}
                                    animation={null}
                                    placement="bottom-end"
            
                                    overlay={
                                        <Popover id={`popover-positioned-left-start`} style={{
                                        }} className='popoverClass'>
                                            
                                            <Popover.Content>
                                                <div>
                                                    <img src={bellIcon} alt="" />
                                                </div>
                                                <div>
                                                    <h3>Notifications</h3>
                                                    <p>Stay up to date with all the KawaFarm updates here.</p>
                                                </div>
                                            </Popover.Content>
                                        </Popover>
                                    }
                                >
                                    <img src={Bell} alt="" />
                                </OverlayTrigger>
                                </Nav.Link> 
                        </Nav>
                    </Navbar.Collapse> 
                </Navbar>
            </Container> 
            <Container className="main-dash-container" style={{ paddingTop: '100px', maxWidth:'1280px' }}>
                <Row>
                    <Col xl="12" className="p-2 pt-4">
                        <div className="font-weight-bold farm-top-title" style={{ fontFamily: 'Visby' }}>Stake one or more tokens to earn xKAWA</div>
                        <hr />
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col>
                    Showing <span style={{ 'font-size': '18px' }}>5 staking pools</span>
                    </Col>
                </Row>
                <Row className="">
                    {/*dummyData.map(i => <Col lg={4} sm={12} md={6} style={{ 'marginTop': 16 }}>
                        
                                </Col>)}*/
                    <FarmCard
                    themeClass={true}
                    onChangeWallet={onChangeWallet}
                    account={account}
              />}
              
                    <div md="10" lg="6" xl="4" className= "mt-2 ml-0">
                        <Card style={{ width: '22rem' }} className="stake_card">
                            <Card.Body style={{
                                display: 'flex',
                                textalign: 'center',
                                alignItems: 'center'
                            }}>
                                <div className="mx-auto p-4" style={{ textAlign: "center" }}>
                                    <Row><Col><img src={LoginIcon} alt=""/></Col></Row>
                                    <Row><Col><h2>Want to see your dog token listed?</h2></Col></Row>
                                    <Row>
                                        <Col>
                                            <div >
                                                <Button className="getInTouchButton" variant="outline-success" size="md" onClick={handleShow}>
                                                    GET IN TOUCH
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Row>
                <Modal show={show} onHide={handleClose} animation={false} style={{ borderRadius: '24px' }}>
                    <Modal.Body className="p-0">
                        <div className="p-4 gradient" style={{ background: '#FEFBFB' }}>

                            <Row className="p-4 pb-0">
                                <Col lg={12}>
                                    <h1 className="text-center">List your dog token</h1>
                                </Col>
                                <Col lg={12}>
                                    <div className="mx-auto" style={{ maxWidth: '400px' }}>
                                        <p className="text-center">Complete the form below if you’d like to discuss partnership opportunities.</p>
                                    </div>

                                </Col>
                            </Row>
                        </div>
                        <div className="mx-auto py-4" style={{ maxWidth: '360px' }}>
                            <Row>
                                <Col lg={12}><p style={{ color: '#F51C66', fontWeight: 'bold' }}>KawaFarm application form</p></Col>
                                <Col lg={12}>
                                    <Form onSubmit={onFormSubmit}>
                                        <Form.Group controlId="projectname">
                                            <Form.Label className="formlabel">PROJECT NAME</Form.Label>
                                            <Form.Control type="text" placeholder="e.g. Dogelon" />

                                        </Form.Group>
                                        <Form.Group controlId="ticker">
                                            <Form.Label className="formlabel">TICKER</Form.Label>
                                            <Form.Control type="text" placeholder="e.g. ELON" />
                                        </Form.Group>
                                        <Form.Group controlId="websiteurl">
                                            <Form.Label className="formlabel">WEBSITE URL</Form.Label>
                                            <Form.Control type="text" placeholder="www.dogelon.com" />
                                        </Form.Group>
                                        <Form.Group controlId="yourmessage">
                                            <Form.Label className="formlabel">YOUR MESSAGE</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="Start typing..." />
                                            <Form.Text className="text-muted">
                                                Max 200 characters.
                                            </Form.Text>
                                        </Form.Group>
                                        <Button type="submit" className="addMore" block style={{ borderRadius: "12px", border: 'none' }}>Submit form</Button>
                                    </Form>

                                </Col>
                            </Row>
                        </div>


                    </Modal.Body>

                </Modal>
                <Modal show={showSuccess} onHide={handleSuccessClose} animation={false} style={{ borderRadius: '24px' }}>
                    <Modal.Body className="p-4 modalSucces" className="successModal">
                        <div>
                            <div className="mx-auto p-4" style={{ textAlign: "center" }}>
                                <Row><Col><img src={tickmarkIcon} alt="" /></Col></Row>
                                <Row><Col><h2>Application Sent</h2></Col></Row>
                                <Row><Col><p style={{ color: '#543939' }}>Thank you for expressing interest in partnering with Kawakami Inu! One of our team members will get back to you shortly.</p></Col></Row>
                                <Row>
                                    <Col>
                                        <div>
                                            <Button className="successModalButton" variant="outline-success" size="md" onClick={handleSuccessClose}>
                                                BACK TO KAWAFARM
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        
            
                   <Footer/>

            
        </Container>
    );
};

export default DashBoard;
