import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Badge, Card, Image, Form, Modal, Dropdown } from "react-bootstrap";

import { useWallet } from 'use-wallet';

import Logo from "../assets/logo.png";
import LoginIcon from "../assets/loginIcon.svg";
import Bell from "../assets/bell.svg";
import Footer from "../components/footer";
import Wallet from "../assets/walletSmall.svg";
import Light from "../assets/light.svg";
import Dark from "../assets/dark.svg";
import { formatAddress } from "../utils";
import CoinCard from "../components/coinCard";

const DashBoard = () => {
    const [showBox, setshowBox] = useState("none");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClickButton = (value) => {
        setshowBox(value);
    }


    return (
        <Container fluid className="main_layout" style={{ backgroundColor: '#E5E5E5' }}>

            <Row style={{ backgroundColor: "#F2F2F2" }}>
                <Col sm={2} md={4} lg={4} className="p-4">
                    <Image src={'https://cdn.pixabay.com/photo/2018/05/21/04/21/animal-3417350_960_720.jpg'} roundedCircle style={{ maxWidth: '36px', maxHeight: '36px' }} />KawaFarm</Col>
                <Col sm={{ span: 10, offset: 0 }} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} className="p-4 d-flex flex-end">
                    {/* <div className="d-flex float-right">
                        <div style={{ maxWidth: '200px', maxHeight: '36px', background: '#FCDFE9' }} >
                            <span>0.8526 ETH</span>
                            <Dropdown size="sm">
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <img alt="" src={Bell} />
                    </div> */}
                </Col>
            </Row>
            <Container>
                <Row>
                    <Col xl="12" className="p-2 pt-4">
                        <div className="font-weight-bold ">Stake several tokens to earn xKAWA</div>
                        <hr />
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col>
                        Showing <span style={{ 'font-weight': 'bold' }}>5 staking pools</span>
                    </Col>
                </Row>
                <Row className="">
                    <Col lg={4} sm={12} md={6} style={{ 'marginTop': 16 }}>
                        <CoinCard type='harvest' name="shiba" />
                        <CoinCard type='harvest' />
                    </Col>
                    {[1, 2, 3, 4, 5].map(i =>
                        <Col lg={4} sm={12} md={6} style={{ 'marginTop': 16 }}>
                            <Card style={{ width: '20rem' }} className="stake_card">
                                <Card.Header style={{ backgroundColor: "#FFF", borderTopRightRadius: '25px', borderTopLeftRadius: '25px' }}>
                                    <Row>
                                        <Col sm={2} md={4} lg={3} className="p-4">
                                            <Image src={'https://cdn.pixabay.com/photo/2018/05/21/04/21/animal-3417350_960_720.jpg'} roundedCircle style={{ maxWidth: '50px', maxHeight: '50px' }} /></Col>
                                        <Col sm={10} md={8} lg={9} className="py-4">
                                            <h3 className="m-0">KawaFarm</h3>
                                            <small>Kawa </small>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={4}>
                                            <h6 className='mb-0' style={{ color: '#977D83' }}>Weight</h6>
                                            <span>100$</span>
                                        </Col>
                                        <Col lg={4}>
                                            <h6 className='mb-0' style={{ color: '#977D83' }}>Stake</h6>
                                            <span>100$</span>
                                        </Col>
                                        <Col lg={4} sm={12}>
                                            <h6 className='mb-0' style={{ color: '#977D83' }}>Earn</h6>
                                            <span><Badge pill variant="light" className="tagKawa">XKawa</Badge></span>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                {showBox === 'none' && <Card.Body>
                                    <div className="cardBox m-1 p-2">
                                        <Row>
                                            <Col lg={7}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <small className="card_stake_text">
                                                            STAKED
                                                        </small>
                                                        <h5>2,553,3900</h5>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col lg={5}>
                                                <small className="card_stake_text p-4">
                                                    KAWA
                                                </small>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={7}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <small className="card_stake_text">
                                                            xKAWA Earned
                                                        </small>
                                                        <h5>20,000</h5>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={5}>
                                                <Button className="cardButton" onClick={() => handleClickButton('harvest')}>Harvest</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row className="-2">
                                        <Col lg={6} style={{ display: "grid" }}>
                                            <Button className="withDrawButton" onClick={() => handleClickButton('withdraw')}>Withdraw</Button>
                                        </Col>
                                        <Col lg={6} style={{ display: "grid" }}>
                                            <Button className="addMore" onClick={() => handleClickButton('addMore')}>Add More</Button>
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
                                                    5571000.00 KAWA
                                                </small>
                                            </Col>
                                            <Col lg={6} className="text-center">
                                                <small className="card_stake_text">
                                                    0 KAWA
                                                </small>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Body>}
                                {showBox === 'noContract' && <Card.Body>
                                    <div className="cardBox m-1 p-2" style={{ opacity: '0.5' }}>
                                        <Row>
                                            <Col lg={7}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <small className="card_stake_text">
                                                            STAKED
                                                        </small>
                                                        <h5>0</h5>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col lg={5}>
                                                <small className="card_stake_text p-4">
                                                    KAWA
                                                </small>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={7}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <small className="card_stake_text">
                                                            xKAWA
                                                        </small>
                                                        <h5>20,000</h5>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={5}>
                                                <Button className="cardButton" disabled onClick={() => handleClickButton('harvest')}>Harvest</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row className="p-2">
                                        <Col lg={12} style={{ display: "grid" }}>
                                            <Button className="addMore" onClick={() => handleClickButton('addMore')} block>Stake</Button>
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
                                                    5571000.00 KAWA
                                                </small>
                                            </Col>
                                            <Col lg={6} className="text-center">
                                                <small className="card_stake_text">
                                                    0 KAWA
                                                </small>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Body>}
                                {showBox === 'approveContract' && <Card.Body>
                                    <div className="cardBox m-1 p-2" style={{ opacity: '0.5' }}>
                                        <Row>
                                            <Col lg={7}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <small className="card_stake_text">
                                                            STAKED
                                                        </small>
                                                        <h5>0</h5>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col lg={5}>
                                                <small className="card_stake_text p-4">
                                                    KAWA
                                                </small>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={7}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <small className="card_stake_text">
                                                            xKAWA
                                                        </small>
                                                        <h5>20,000</h5>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={5}>
                                                <Button className="withDrawButton" disabled onClick={() => handleClickButton('harvest')}>Harvest</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row className="p-2">
                                        <Col lg={12} style={{ display: "grid" }}>
                                            {/* <Button variant="light" onClick={() => handleClickButton('noContract')} block><strong>Approve Contract</strong></Button> */}
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
                                                    5571000.00 KAWA
                                                </small>
                                            </Col>
                                            <Col lg={6} className="text-center">
                                                <small className="card_stake_text">
                                                    0 KAWA
                                                </small>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Body>}
                                {showBox === 'harvest' && <Card.Body>
                                    <Row>
                                        <Col lg={12} className="px-4">
                                            <h5>Earned Amount</h5>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="cardBox m-1 p-2">
                                                <Row>
                                                    <Col lg={9}>
                                                        <h5 className="card_stake_text">
                                                            46,00000
                                                        </h5>
                                                    </Col>
                                                    <Col lg={3}>
                                                        <h6 className="card_stake_text">
                                                            XKawa
                                                        </h6>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='p-2'>
                                        <Button className="addMore" size="lg" block onClick={() => handleClickButton('none')}>
                                            Harvest
                                        </Button>
                                        <Button className="withDrawButton" size="lg" block onClick={() => handleClickButton('none')}>
                                            Cancel
                                        </Button>
                                    </Row>
                                </Card.Body>}
                                {showBox === 'addMore' && <Card.Body>
                                    <Row>
                                        <Col lg={12} className="px-4">
                                            <h5>Deposit</h5>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="cardBox m-1 p-2">
                                                <Row>
                                                    <Col lg={9}>
                                                        <Form.Control size="lg" type="text" value="78,7878" />
                                                    </Col>
                                                    <Col lg={3}>
                                                        <h6 className="card_stake_text pt-2">
                                                            XKawa
                                                        </h6>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='p-2'>
                                        <Button className="addMore" size="lg" block onClick={() => handleClickButton('none')}>
                                            Add
                                        </Button>
                                        <Button className="withDrawButton" size="lg" block onClick={() => handleClickButton('none')}>
                                            Cancel
                                        </Button>
                                    </Row>
                                </Card.Body>}
                                {showBox === 'withdraw' && <Card.Body>
                                    <Row>
                                        <Col lg={12} className="px-4">
                                            <h5>Withdraw</h5>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="cardBox m-1 p-2">
                                                <Row>
                                                    <Col lg={9}>
                                                        <Form.Control size="lg" type="text" value="78,7878" />
                                                    </Col>
                                                    <Col lg={3}>
                                                        <h6 className="card_stake_text pt-2">
                                                            XKawa
                                                        </h6>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <h6 className="text-center">
                                        Withdraw your Stake?
                                    </h6>
                                    <Row className='p-2'>
                                        <Button className="addMore" size="lg" block onClick={() => handleClickButton('none')}>
                                            Yes, I want to Withdraw
                                        </Button>
                                        <Button className="withDrawButton" size="lg" block onClick={() => handleClickButton('none')}>
                                            Cancel
                                        </Button>
                                    </Row>
                                </Card.Body>
                                }
                            </Card>
                        </Col>
                    )}
                    <Col lg={4} sm={12} md={6} style={{ 'marginTop': 16 }}>
                        <Card style={{ width: '22rem' }} className="stake_card" style={{ minHeight: '454px', height: '454px' }}>
                            <Card.Body>
                                <div className="mx-auto p-4" style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                    <Row><Col><img src={LoginIcon} /></Col></Row>
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
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose} animation={false} style={{ borderRadius: '24px' }}>
                    <Modal.Body className="p-0">
                        <div className="p-4" style={{ background: '#FEFBFB' }}>

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
                                    <Form>
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
            </Container>
            <hr className="mb-0"/>
            <div>
                <footer className="footer">
                    <Container fluid className="p-1">
                        <Row className="d-flex flex-column" style={{ color: "#AB6D77", margin:'0px' }}>
                            <Col lg={{span:4,order:"first"}} sm={{order:'second'}} xs={{span:12,order:'second'}} className="formlabel footerClass">
                                <span className="px-1">Contact Us</span>
                                <span className="px-2">FAQ</span>
                                <span className="px-2">Bussiness Enquiries</span>
                            </Col>
                            <Col lg={{ span: 3, offset: 2,order:"second" }} sm={{span:12,order:'first'}} xs={{span:12,order:'first'}} className="formlabel footerClass">2021 Kawakami Inu™</Col>
                            <Col lg={{ span: 3,order:"last" }} sm={{span:12,order:'last'}} xs={{span:12,order:'last'}} className="formlabel footerClass">
                                <span className="px-1">$KAWA</span>
                                <span className="px-1">Join Community</span>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </Container>
    );
};

export default DashBoard;
