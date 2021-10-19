import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

interface FooterProps {
  footerHeight: Number;
}

const Footer: React.FC<FooterProps> = ({footerHeight}) => {

    let fontSize = footerHeight;

    return (
        <div className="footer" style={{height: `${footerHeight}px`, fontSize: `${fontSize}px`}} >
            <hr className="seperator" />
            <div className="copyright">
                Copyright 2021 by James Yoon. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer;