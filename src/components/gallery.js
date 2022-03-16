import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import Button from "./button.js";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";

import { createRipple } from "./controller/rippler.js";

import imageUrlBuilder from "@sanity/image-url";

export default function Gallery(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");

    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'gallery']
                  `
            )
            .then((data) => {
                setPostData(data);
            })
            .catch(console.error);
    }, []);

    function showModalSwitch(i) {
        createRipple(i);
        setTimeout(() => {
            setAnimation("slide-in-top");
            setId(Number(i.target.dataset.id));
            setShowModal(true);
        }, 200);
    }

    return (
        <>
            {showModal && (
                <>
                    <ModalBox
                        show={showModal}
                        id={id}
                        cat="gallery"
                        animation={animation}
                        changeState={(state) => setShowModal(state)}
                    ></ModalBox>
                    <Overlay></Overlay>
                </>
            )}
            {postData &&
                postData.map((e, i) => (
                    <Button
                        index={i}
                        e={e}
                        key={`gallery${i}`}
                        icon="bi bi-images"
                        cat="gallery"
                        data={postData}
                        modal={showModalSwitch}
                        className={props.class}
                        orderClass={postData[i].orderClass}
                        orderName={`order-${postData[i].orderClass}`}
                        bg={urlFor(postData[i].button_settings.bg)}
                    ></Button>
                ))}
        </>
    );
}
