import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import ModalPerson from "./modalContent/modalPerson.js";
import ModalGallery from "./modalContent/modalGallery";
import ModalYoutube from "./modalContent/modalYoutube";
import ModalInprint from "./modalContent/modalInprint";
import ModalDatenschutz from "./modalContent/modalDatenschutz";
import ModalCustom from "./modalContent/modalCustom";

export default function ModalBox(props) {
    const [postData, setPostData] = useState(props.data);
    const [url, setUrl] = useState(props.url);
    const [animationnu, setAnimationnu] = useState(props.animation);
    const myId = props.id;
    const categourie = props.cat;

    const [street, setStreet] = useState(props.street);
    const [city, setCity] = useState(props.city);

    const [locationKeys, setLocationKeys] = useState([]);

    const history = useHistory();
    let location = useLocation();

    const ref = useRef();

    useEffect(() => {
        return history.listen((location) => {
            if (history.action === "PUSH") {
                setLocationKeys([location.key]);
            }

            if (history.action === "POP") {
                if (locationKeys[1] === location.key) {
                    setLocationKeys(([_, ...keys]) => keys);

                    // Handle forward event
                } else {
                    setLocationKeys((keys) => [location.key, ...keys]);

                    close();
                }
            }
        });
    }, [locationKeys]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    function close() {
        ref.current.children[0].children[0].children[0].classList.add("fade-out-quick");
        setAnimationnu("slide-out-top");
        setTimeout(() => {
            props.changeState(false);
        }, 300);
        document.querySelector("#overlay").classList.add("fade-out");
        history.push("/");
    }

    return (
        <>
            <div className={`closer ${animationnu}`} id="closer" onClick={() => close()}>
                <i class="bi bi-caret-left"></i>
            </div>
            <div className={`${animationnu} container-fluid position-absolute h-80 modalBox`} ref={ref}>
                <div>
                    {categourie === "person" && (
                        <ModalPerson id={myId} data={postData} street={street} city={city}></ModalPerson>
                    )}
                    {categourie === "gallery" && <ModalGallery id={myId} data={postData}></ModalGallery>}
                    {categourie === "youtube" && <ModalYoutube id={myId} data={postData} url={url}></ModalYoutube>}
                    {categourie === "inprint" && <ModalInprint id={myId}></ModalInprint>}
                    {categourie === "datenschutz" && <ModalDatenschutz id={myId}></ModalDatenschutz>}
                    {categourie === "custom" && <ModalCustom id={myId}></ModalCustom>}
                </div>
            </div>
        </>
    );
}
