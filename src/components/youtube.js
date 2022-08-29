import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";
import Button from "./button.js";
import imageUrlBuilder from "@sanity/image-url";

import { useQuery } from "react-query";

import { createRipple } from "./controller/rippler.js";

// YouTube
import YouTube from "react-youtube";

// FETCHER
import youtubeFetcher from "./fetch/fetcher";

export default function Youtube(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");
    const builder = imageUrlBuilder(sanityClient);

    var getYouTubeID = require("get-youtube-id");
    const [url, setUrl] = useState([]);

    const [wasHere, setWasHere] = useState(false);

    const buttonRef = useRef();

    function urlFor(source) {
        return builder.image(source);
    }

    // const { isLoading, isFetching, error, data, status } = useQuery("dataYT", youtubeFetcher);
    const { isLoading, isFetching, error, data, status } = useQuery("dataYT", () => {
        sanityClient
            .fetch(
                `*[_type == 'youtube']
              `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
                data.map((e, i) => {
                    setUrl((url) => [...url, getYouTubeID(data[i].url)]);
                });

                // setAnimation("slide-in-top");
                // setId(0);
                // setShowModal(true);
            })
            // .then(() => {
            //     setTimeout(() => {
            //         if (!wasHere) {
            //             document.querySelector("#ytBT").click();
            //             setWasHere(true);
            //         }
            //     }, 1000);
            // })

            .catch(console.error);
    });

    useEffect(() => {
        console.log(url);
    }, [url]);

    // useEffect(() => {
    //     sanityClient
    //         .fetch(
    //             `*[_type == 'youtube']
    //               `
    //         )
    //         .then((data) => {
    //             setPostData(data);
    //             // setShowModal(true);
    //         })
    //         .catch(console.error);
    // }, []);

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
                        cat="youtube"
                        animation={animation}
                        changeState={(state) => setShowModal(state)}
                        data={postData}
                        url={url[id]}
                    ></ModalBox>
                    <Overlay></Overlay>
                </>
            )}
            {isFetching && "Fetching"}
            {isLoading && "Loading"}
            {error && error.message}
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
                        ref={buttonRef}
                        id="ytBT"
                    ></Button>
                ))}

            {/* {postData &&
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
                ))}  */}
        </>
    );
}
