import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import ExcMark from "../assets/exclamation.svg";
import dogAvtar from "../assets/dogAvtar.png";
import ExcMarkWhite from "../assets/exclamation-white.svg";
import Metamask from "../assets/metamask.svg";
import MetamaskDark from "../assets/metamask-dark.svg";
import WConnect from "../assets/wallet-connect.svg";
import WConnectDark from "../assets/wallet-Connect-dark.svg";
import { useWallet } from 'use-wallet';
import Footer from '../components/footer'
const SignIn = props => {

    const history=useHistory();
    const { account, connect, reset, status } = useWallet();
    const [modalShow, setModalShow] = useState(false);
    const [userAccount, setUserAccount] = useState(null);
    useEffect(() => {
        const localAccount = localStorage.getItem("account");
        const walletProvider = localStorage.getItem("walletProvider");
        if (!account && localAccount) {
          setUserAccount(localAccount);
          if (localAccount && (walletProvider === "metamask" || walletProvider === "injected")) {
            connect("injected");
            localStorage.setItem("walletProvider", "metamask");
          }
          if (localAccount && walletProvider === "walletconnect") {
            connect('walletconnect');
            localStorage.setItem("walletProvider", "walletconnect");
          }
        }
      }, []);
    
      const onChangeWallet = (data) => {
        if (data === 'metamask') {
          connect("injected");
          localStorage.setItem("walletProvider", "metamask");
          setModalShow(false);
        } else if (data === 'walletconnect') {
          connect("walletconnect");
          localStorage.setItem("walletProvider", "walletconnect");
          setModalShow(false);
        }
      }
    
      useEffect(() => {
        if (account) {
          setUserAccount(account);
          localStorage.setItem("account", account);
          history.push('/dashboard')
        }
        else {
            history.push('/')
        }
      }, [account]);
    
      

    return (
        <Container fluid className="main_layout loginGradiant">
            <Row style={{ zIndex: '10000', opacity:1 }} >
                <Col lg={{ span: 4, offset: 4 }}  className="p-4 d-flex flex-column justify-content-center">
                    <Row style={{marginRight:0}}>
                        <Col lg={{offset:5}} sm={{span:0}} >
                            <Image src={dogAvtar} roundedCircle style={{ maxWidth: '112px', maxHeight: '112px', marginLeft:'auto', marginRight:'auto', display:'block' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <h1 className="text-center farm-title">KawaFarm</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} className="text-center">
                            <span className="text-center">Farm <span style={{ color: "#FF2E59" }}>$xKAWA</span> by staking the most popular community tokens such as SHIB, KISHU, AKITA and more!</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 12 }} style={{ padding: 4 }}>

                            <div className="p-4 m-4 loginBox" style={{ background: 'white', borderRadius: '12px' }}>
                                <Row className="p-4 text-center">
                                    <Col lg={12}><h3>Connect your wallet to start farming</h3></Col>
                                    <Col lg={12} className="p-4"><p style={{ color: "#DE4949" }}>You are about to input highly sensitive information, please DO NOT expose to strangers.</p></Col>
                                </Row>
                                <Button
                                    variant="light"
                                    className="mx-md-3 wallet-connect-button d-flex align-items-center w-fill-available my-3 bg_harvest "
                                    //onClick={()=>history.push('/dashboard')}
                                     onClick={() => {
                                        onChangeWallet('metamask');
                                        setModalShow(false);
                                     }}
                                >
                                    <span className="text_app mb-0 ml-3 text-left w-fill-available">Connect to Metamask</span>
                                    <img src={ Metamask } alt=""/>

                                </Button>
                                <Button
                                    variant="light"
                                    className="mx-3 mb-5 wallet-connect-button d-flex align-items-center w-fill-available  bg_harvest"
                                    onClick={()=>history.push('/dashboard')}
                                    // onClick={() => {
                                    //     props.onChangeWallet('walletconnect');
                                    //     props.onHide();
                                    // }}
                                >
                                    <span className="text_app mb-0 ml-3 text-left w-fill-available">Use Wallet Connect</span>
                                    <img src={ WConnect } alt=""/>
                                </Button>
                               
                            </div>
                            <div className="wallet-set-up-link-box mx-4">
                                    <p className="walletsetup text-center">Don't have a wallet set up?</p>
                                </div>

                        </Col>
                    </Row>
                </Col>
            </Row>
 
                   
              <Footer/>
        </Container>

    );
};

export default SignIn;
