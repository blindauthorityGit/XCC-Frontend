import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import Button_Link from "./button_link.js";
import { createRipple } from "./controller/rippler.js";

import imageUrlBuilder from "@sanity/image-url";

export default function Person(props) {
    const [postData, setPostData] = useState(null);

    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'call']
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
                    // eslint-disable-next-line react/jsx-pascal-case
                    <Button_Link
                        href={`tel:${postData[i].phone}`}
                        index={i}
                        e={e}
                        icon="bi bi-telephone"
                        cat="email"
                        data={postData}
                        key={`call${i}`}
                        modal={rippler}
                        orderClass={postData[i].orderClass}
                        orderName={`order-${postData[i].orderClass}`}
                        bg={urlFor(postData[i].button_settings.bg)}
                    ></Button_Link>
                ))}
        </>
    );
}
