import React from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import Twitter from "../assets/twitter.svg";
import Medium from "../assets/medium.svg";
import Discord from "../assets/discord.svg";
import Telegram from "../assets/telegram.svg";
import Youtube from "../assets/youtube.svg";
import Logo from "../assets/footer_logo.png";

const FarmList = (props) => {
  return (
    <>
      <Row className="p-3 p-md-5 justify-content-center app_secondery">
        <Col xl="3" className="mb-5 mr-xl-5 feature_card">   
            Welcome KAWA Farm      
        </Col>
      </Row>
    </>
  );
};

export default FarmList;
