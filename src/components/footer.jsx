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
     <Row fluid className="d-flex justify-content-between p-2 mt-4" style={{ color: "#AB6D77", margin: '0px' }}>
                        
                        <Col  className="formlabel footerClass text-center">
                            <span className="px-1">Contact Us</span>
                            <span className="px-2">FAQ</span>
                            <span className="px-2">Bussiness Enquiries</span>
                        </Col>
                        <Col  className="formlabel footerClass text-center">2021 Kawakami Inu™</Col>
                        <Col  className="formlabel footerClass text-center">
                            <span className="px-1">$KAWA</span>
                            <span className="px-1">Join Community</span>
                        </Col>
                   
                </Row>
    </>
  );
};

export default Footer;
