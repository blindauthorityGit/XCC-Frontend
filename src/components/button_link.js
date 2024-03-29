export default function Button_Link(props) {
    return (
        <a
            className={`${props.data[props.index].button_settings.box ? "col-6" : "col-12"} ${
                props.orderName && props.orderName
            } pb-2 gx-2 mainBox d-block ${props.index % 2 === 0 ? "slide-in-left" : "slide-in-right"} `}
            href={props.href}
            download={props.download}
            data-order={props.orderClass}
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
                } ${props.e.button_settings.bgPlacement === "right" ? "justify-content-end" : ""} ${
                    props.e.button_settings.bgPlacement === "fullScreen" ? "fullScreenBG" : ""
                } box d-flex  align-items-center justify-content-center`}
                data-id={props.index}
                data-cat={props.cat}
                key={props.index}
                style={
                    props.bg && props.e.button_settings.bgPlacement === "fullScreen"
                        ? { backgroundImage: "url(" + props.bg + ")" }
                        : { background: props.e.button_settings.colorlist.value }
                }
                onClick={props.modal}
            >
                {props.e.button_settings.icon && <i data-id={props.index} className={props.icon}></i>}
                {props.e.button_settings.bgPlacement !== "fullScreen" && props.e.button_settings.bg ? (
                    <img src={props.bg} alt="bg" data-id={props.index} data-cat={props.cat} />
                ) : (
                    ""
                )}
                {!props.e.button_settings.bg && (
                    <h2 data-id={props.index} onClick={props.modal}>
                        {props.data[props.index].button_settings.titel}
                    </h2>
                )}
            </div>
        </a>
    );
}
