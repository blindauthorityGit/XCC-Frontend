import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";
import { createRipple } from "./controller/rippler.js";
import Button from "./button";

import imageUrlBuilder from "@sanity/image-url";

export default function Person(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [vorname, setVorname] = useState(null);
    const [nachname, setNachname] = useState(null);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");
    const overlayRef = useRef();

    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person']
                  `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
            })
            .catch(console.error);
        return () => {};
    }, []);

    function showModalSwitch(i) {
        createRipple(i);
        setTimeout(() => {
            setAnimation("slide-in-top");
            setVorname(postData[Number(i.target.dataset.id)].vorname);
            setNachname(postData[Number(i.target.dataset.id)].nachname);
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
                        vorname={vorname}
                        nachname={nachname}
                        id={id}
                        cat="person"
                        animation={animation}
                        changeState={(state) => setShowModal(state)}
                        data={postData}
                    ></ModalBox>
                    <Overlay ref={overlayRef}></Overlay>
                </>
            )}
            {postData &&
                postData.map((e, i) => (
                    <>
                        <Button
                            index={i}
                            key={`person${i}`}
                            e={e}
                            icon="bi bi-person-circle"
                            cat="person"
                            data={postData}
                            modal={showModalSwitch}
                            orderClass={postData[i].orderClass}
                            orderName={`order-${postData[i].orderClass}`}
                            bg={urlFor(postData[i].button_settings.bg)}
                        ></Button>
                    </>
                ))}
        </>
    );
}
