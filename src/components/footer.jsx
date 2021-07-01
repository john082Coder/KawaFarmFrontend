import React from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import Twitter from "../assets/twitter.svg";
import Medium from "../assets/medium.svg";
import Discord from "../assets/discord.svg";
import Telegram from "../assets/telegram.svg";
import Youtube from "../assets/youtube.svg";
import Logo from "../assets/footer_logo.png";

const Footer = (props) => {
  return (
    <>
     <Row fluid className="d-flex justify-content-around pt-3 pb-3 mt-4" style={{ color: "#AB6D77", margin: '0px',     borderTop: '1px solid rgba(189, 28, 59, 0.1)' }}>
                        
                        <Col  className="formlabel footerClass">
                            <span className="px-1" style={{fontSize: "14px"}}>Contact Us</span>
                            <span className="px-2" style={{fontSize: "14px"}}>FAQ</span>
                            <span className="px-2" style={{fontSize: "14px"}}>Business Enquiries</span>
                        </Col>
                        <Col  className="formlabel footerClass text-center" style={{fontSize: "14px"}}>2021 Kawakami Inu™</Col>
                        <Col  className="formlabel footerClass text-right">
                            <span className="px-1" style={{fontSize: "14px"}}>$KAWA</span>
                            <span className="px-1" style={{fontSize: "14px"}}>Join Community</span>
                        </Col>
                   
                </Row>
    </>
  );
};

export default Footer;
