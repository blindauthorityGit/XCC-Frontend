export default function Button(props) {
    return (
        <div
            className={`${props.data[props.index].button_settings.box ? "col-6" : "col-12"} ${
                props.orderName && props.orderName
            }  pb-2 gx-2 mainBox  ${props.index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
          
            `}
            onAnimationEnd={(e) => {
                e.target.classList.remove("slide-in-left");
                e.target.classList.remove("slide-in-right");
            }}
            data-order={props.orderClass}
            key={props.index}
        >
            <div
                className={`${
                    props.e.button_settings.colorlist.title === "Blau" ||
                    props.e.button_settings.colorlist.title === "Schwarz" ||
                    props.e.button_settings.colorlist.title === "Rot" ||
                    props.e.button_settings.colorlist.title === "PulsRot"
                        ? "bright-text"
                        : "dark-text"
                } ${props.e.button_settings.border ? "border-button" : ""} 
                ${props.e.button_settings.bg ? "p-2" : "p-3"} ${
                    props.e.button_settings.bgPlacement === "center" ? "justify-content-center" : ""
                } ${props.e.button_settings.bgPlacement === "right" ? "justify-content-end" : ""}  ${
                    props.e.button_settings.bgPlacement === "fullScreen" ? "fullScreenBG" : ""
                }
                box d-flex  align-items-center justify-content-center
               `}
                data-id={props.index}
                data-cat={props.cat}
                key={props.index}
                id={props.id}
                style={
                    props.bg && props.e.button_settings.bgPlacement === "fullScreen"
                        ? { backgroundImage: "url(" + props.bg + ")" }
                        : { background: props.e.button_settings.colorlist.value }
                }
                // style={{
                //     background: props.e.button_settings.colorlist.value,
                //     backgroundImage: "url(" + props.bg + ")",
                // }}
                onClick={props.modal}
            >
                {props.e.button_settings.icon && <i data-id={props.index} className={props.icon}></i>}
                {props.e.button_settings.bgPlacement !== "fullScreen" && props.e.button_settings.bg ? (
                    <img src={props.bg} alt="bg" data-id={props.index} data-cat={props.cat} />
                ) : (
                    ""
                )}
                {/* {props.e.button_settings.bg && <img src={props.bg} alt="bg" />} */}
                {!props.e.button_settings.bg && (
                    <h2 data-id={props.index} onClick={props.modal}>
                        {props.data[props.index].button_settings.titel}
                    </h2>
                )}
            </div>
        </div>
    );
}
