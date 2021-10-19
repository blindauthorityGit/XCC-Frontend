/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import Button_Link from "./button_link.js";
import { createRipple } from "./controller/rippler.js";

export default function Email(props) {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'emailContact']
                  `
            )
            .then((data) => {
                setPostData(data);
            })
            .catch(console.error);
    }, []);

    function rippler(i) {
        createRipple(i);
    }

    return (
        <>
            {postData &&
                postData.map((e, i) => (
                    <Button_Link
                        href={`mailto:${postData[i].email}`}
                        index={i}
                        e={e}
                        icon="bi bi-envelope"
                        cat="email"
                        data={postData}
                        key={`email${i}`}
                        modal={rippler}
                        orderClass={postData[i].orderClass}
                        orderName={`order-${postData[i].orderClass}`}
                    ></Button_Link>
                ))}
        </>
    );
}
