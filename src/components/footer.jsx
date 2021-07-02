import React from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom"
import { useHistory } from 'react-router-dom'
const Footer = (props) => {
  return (
    <>
     <Row fluid className="kawa-footer d-flex justify-content-around pt-3 pb-3 mt-4" style={{ color: "#AB6D77", margin: '0px',     borderTop: '1px solid rgba(189, 28, 59, 0.1)' }}>
                        
                        <Col  className="formlabel footerClass">
                            <a href="mailto:business@kawatoken.io" target="_blank"><span className="px-1" style={{fontSize: "14px"}} >Contact Us</span> </a>
                            {/* <span className="px-2" style={{fontSize: "14px"}}>FAQ</span> */}
                            <a href="mailto:business@kawatoken.io" target="_blank" rel="noreferrer"><span className="px-2" style={{fontSize: "14px"}}>Business Inquiries</span> </a>
                        </Col>
                        <Col  className="formlabel footerClass text-center" style={{fontSize: "14px"}}>2021 Kawakami Inu™</Col>
                        <Col  className="formlabel footerClass text-right">
                            <a href="https://www.dextools.io/app/uniswap/pair-explorer/0x6be8b276d12d5600c2d74dc1993f9a8600c849cd" target="_blank" rel="noreferrer"><span className="px-1" style={{fontSize: "14px"}}>$KAWA</span></a>
                            <a href="https://t.me/kawatoken" target="_blank" rel="noreferrer"><span className="px-1" style={{fontSize: "14px"}}>Join Community</span></a>
                        </Col>
                   
                </Row>
    </>
  );
};

export default Footer;