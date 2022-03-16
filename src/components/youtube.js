import React, { useState, useEffect } from "react";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";
import Button from "./button.js";
import imageUrlBuilder from "@sanity/image-url";

import { createRipple } from "./controller/rippler.js";

export default function Youtube(props) {
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
                `*[_type == 'youtube']
                  `
            )
            .then((data) => {
                setPostData(data);
                // setShowModal(true);
            })
            .catch(console.error);
    }, []);

    const showModalSwitch = (i) => {
        createRipple(i);
        setTimeout(() => {
            setAnimation("slide-in-top");
            setId(Number(i.target.dataset.id));
            setShowModal(true);
        }, 200);
    };

    return (
        <>
            {showModal && (
                <>
                    <ModalBox
                        show={showModal}
                        id={id}
                        cat="youtube"
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
                        key={`youtube${i}`}
                        e={e}
                        icon="bi bi-film"
                        cat="youtube"
                        data={postData}
                        modal={showModalSwitch}
                        bg={urlFor(postData[i].button_settings.bg)}
                        orderClass={postData[i].orderClass}
                        orderName={`order-${postData[i].orderClass}`}
                    ></Button>
                ))}
        </>
    );
}
