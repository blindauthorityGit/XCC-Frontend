import React, { useState, useEffect } from "react";

import ModalPerson from "./modalContent/modalPerson.js";
import ModalGallery from "./modalContent/modalGallery";
import ModalYoutube from "./modalContent/modalYoutube";

export default function ModalBox(props) {
    const [animationnu, setAnimationnu] = useState(props.animation);
    const myId = props.id;
    const categourie = props.cat;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    function close() {
        setAnimationnu("slide-out-top");
        setTimeout(() => {
            props.changeState(false);
        }, 300);
        document.querySelector("#overlay").classList.add("fade-out");
    }

    return (
        <div className={`${animationnu} container-fluid position-absolute h-80 modalBox`}>
            <div>
                <div className="closer" id="closer" onClick={() => close()}>
                    <i class="bi bi-caret-left"></i>
                </div>
                {categourie === "person" && <ModalPerson id={myId}></ModalPerson>}
                {categourie === "gallery" && <ModalGallery id={myId}></ModalGallery>}
                {categourie === "youtube" && <ModalYoutube id={myId}></ModalYoutube>}
            </div>
        </div>
    );
}
