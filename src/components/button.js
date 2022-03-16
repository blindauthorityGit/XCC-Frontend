export default function Button(props) {
    return (
        <div
            className={`${props.data[props.index].button_settings.box ? "col-6" : "col-12"} ${
                props.orderName && props.orderName
            }  pb-2 gx-2 mainBox  ${props.index % 2 === 0 ? "slide-in-left" : "slide-in-right"} `}
            onAnimationEnd={(e) => {
                e.target.classList.remove("slide-in-left");
                e.target.classList.remove("slide-in-right");
            }}
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
                } ${
                    props.e.button_settings.bgPlacement === "right" ? "justify-content-end" : ""
                } box d-flex  align-items-center justify-content-center`}
                data-id={props.index}
                data-cat={props.cat}
                key={props.index}
                style={{
                    background: props.e.button_settings.colorlist.value,
                }}
                onClick={props.modal}
            >
                {props.e.button_settings.icon && <i data-id={props.index} class={props.icon}></i>}
                {props.e.button_settings.bg && <img src={props.bg} alt="bg" />}
                {!props.e.button_settings.bg && (
                    <h2 data-id={props.index} onClick={props.modal}>
                        {props.data[props.index].button_settings.titel}
                    </h2>
                )}
            </div>
        </div>
    );
}
