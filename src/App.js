import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./App.css";
import "./css/main.css";

// import Person from "./components/person.js";
// import Gallery from "./components/gallery.js";
// import Youtube from "./components/youtube.js";
// import Settings from "./components/settings.js";
// import Call from "./components/callme.js";
// import Links from "./components/link.js";
// import Email from "./components/email.js";

import sanityClient from "./client";
import Sponsored from "./components/sponsored.js";

const Settings = lazy(() => import("./components/settings.js"));

const Person = lazy(() => import("./components/person.js"));
const Gallery = lazy(() => import("./components/gallery.js"));
const Youtube = lazy(() => import("./components/youtube.js"));
const Call = lazy(() => import("./components/callme.js"));
const Links = lazy(() => import("./components/link.js"));
const Email = lazy(() => import("./components/email.js"));

function App() {
    const history = useHistory();

    const handleHistory = (e) => {
        history.push(e);
    };

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'siteSettings']{
                titleApp
              }
              `
            )
            .then((data) => {
                document.title = `${data[0].titleApp} - XCC Connect`;
            })
            .catch(console.error);
    }, []);

    return (
        <div className="container-fluid position-relative">
            <>
                <Suspense fallback={<div></div>}>
                    <Settings></Settings>
                </Suspense>
            </>
            <div className="wrapperMain">
                <div className="row">
                    <Suspense fallback={<div>LOADING</div>}>
                        <Gallery></Gallery>
                        <Links></Links>
                        <Person></Person>
                        <Email></Email>
                        <Call></Call>
                        <Youtube></Youtube>
                    </Suspense>
                </div>
            </div>
            <Sponsored></Sponsored>
        </div>
    );
}

export default App;
