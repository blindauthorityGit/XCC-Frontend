import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";

import Logo from "../img/xcc_logo_white.svg";

export default function Sponsored() {
    const btnRef = useRef();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'siteSettings']

                  `
            )
            .then((data) => {
                if (data[0].colorlist.value === "white") {
                    btnRef.current.children[0].style.color = "black";
                    btnRef.current.children[1].style.filter = "invert(1)";
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="sponsored row">
            <div className="col d-flex align-items-center justify-content-center flex-column mt-4 mb-5" ref={btnRef}>
                <div className="logoText mb-2">Featured by </div> <img className="sponsoredImg" src={Logo} alt="" />
            </div>
        </div>
    );
}
