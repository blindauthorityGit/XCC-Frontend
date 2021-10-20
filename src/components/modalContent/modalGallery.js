import React, { useState, useEffect } from "react";
import sanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import removeAnimation from "../controller/animationControl.js";
import { useHistory } from "react-router-dom";

export default function ModalGallery(props) {
    const [postData, setPostData] = useState(null);
    const [myId, setMyId] = useState(props.id);

    const BlockContent = require("@sanity/block-content-to-react");

    const builder = imageUrlBuilder(sanityClient);
    const history = useHistory();

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        history.push("/gallery");

        sanityClient
            .fetch(
                `*[_type == 'gallery'] {
                    images,
                    beschreibung
                  }
                  `
            )
            .then((data) => {
                setPostData(data);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            {postData && (
                <Carousel className="">
                    {postData[myId].images.map((e, i) => (
                        <div className="slide-in-right" key={i}>
                            <img src={urlFor(e)} alt="" />
                            <p className={`${e.beschreibung ? "legend" : "d-none"}`} onAnimationEnd={removeAnimation}>
                                {e.beschreibung}
                            </p>
                        </div>
                    ))}
                </Carousel>
            )}
            {postData && <BlockContent blocks={postData[myId].beschreibung}></BlockContent>}
        </>
    );
}
