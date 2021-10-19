/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, Suspense, lazy } from "react";
import sanityClient from "../client";

import { createRipple } from "./controller/rippler.js";
// import Button_Link from "../components/button_link.js";
import imageUrlBuilder from "@sanity/image-url";

const Button_Link = lazy(() => import("../components/button_link.js"));

export default function Links(props) {
    const [postData, setPostData] = useState(null);
    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'link'] | order(order asc) {
                    display,
                    orderClass,
                    title,
                    colorlist,
                    "file": file.asset->url,
                    url,
                    box,
                    "hintergrundbild": hintergrundbild.asset->url,
                    showTitle,
                    button_settings,
                    "buttonBG": bg.asset->url, 
                  }
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
                    <>
                        {postData[i].display === "file" && (
                            <Suspense fallback={<div></div>}>
                                <Button_Link
                                    href={postData[i].file}
                                    download
                                    index={i}
                                    order={i}
                                    e={e}
                                    icon="bi bi-file-earmark-arrow-down-fill"
                                    cat="link"
                                    data={postData}
                                    key={`link${i}`}
                                    modal={rippler}
                                    bg={urlFor(postData[i].button_settings.bg)}
                                    orderName={`order-${postData[i].orderClass}`}
                                    orderClass={postData[i].orderClass}
                                ></Button_Link>
                            </Suspense>
                        )}
                        {postData[i].display === "link" && (
                            // eslint-disable-next-line react/jsx-pascal-case
                            <Suspense fallback={<div></div>}>
                                <Button_Link
                                    href={postData[i].url}
                                    index={i}
                                    order={i}
                                    e={e}
                                    icon="bi bi-link"
                                    cat="liuk"
                                    data={postData}
                                    key={`link${i}`}
                                    modal={rippler}
                                    bg={urlFor(postData[i].button_settings.bg)}
                                    orderName={`order-${postData[i].orderClass}`}
                                    orderClass={postData[i].orderClass}
                                ></Button_Link>
                            </Suspense>
                        )}
                    </>
                ))}
        </>
    );
}
