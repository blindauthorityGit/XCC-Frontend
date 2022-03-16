import React, { useState } from "react";

import ModalBox from "../modal";
import Overlay from "../overlay";

const Inprint = (props) => {
    const [showModal, setShowModal] = useState(false);

    const showModalSwitch = (i) => {
        setTimeout(() => {
            setShowModal(true);
        }, 200);
    };

    return (
        <>
            {showModal && (
                <>
                    <ModalBox
                        show={showModal}
                        animation="slide-in-top"
                        cat="inprint"
                        changeState={(state) => setShowModal(state)}
                    ></ModalBox>
                    <Overlay></Overlay>
                </>
            )}
            <div>
                <div className="inprint" onClick={showModalSwitch}>
                    Impressum
                </div>
            </div>{" "}
        </>
    );
};

export default Inprint;
