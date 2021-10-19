const removeAnimation = (e) => {
    e.target.classList.remove("slide-in-left");
    e.target.classList.remove("slide-in-right");
    console.log("classes removed");
};

export default removeAnimation;
