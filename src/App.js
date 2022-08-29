import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import "./css/main.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// import Person from "./components/person.js";
// import Gallery from "./components/gallery.js";
// import Youtube from "./components/youtube.js";
// import Settings from "./components/settings.js";
// import Call from "./components/callme.js";
// import Links from "./components/link.js";
// import Email from "./components/email.js";

import sanityClient from "./client";
import Sponsored from "./components/sponsored.js";
import Inprint from "./components/sites/inprint";
import Datenschutz from "./components/sites/datenschutz";

const queryClient = new QueryClient();

const Settings = lazy(() => import("./components/settings.js"));

const Person = lazy(() => import("./components/person.js"));
const Gallery = lazy(() => import("./components/gallery.js"));
const Youtube = lazy(() => import("./components/youtube.js"));
const Call = lazy(() => import("./components/callme.js"));
const Links = lazy(() => import("./components/link.js"));
const Email = lazy(() => import("./components/email.js"));

function App() {
    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'siteSettings']{
                titleApp
              }
              `
            )
            .then((data) => {
                if (data.length > 0) {
                    document.title = `${data[0].titleApp} - XCC Connect`;
                } else {
                    document.title = `XCC Connect`;
                }
            })
            .catch(console.error);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="container-fluid position-relative">
                <>
                    <Suspense fallback={<div></div>}>
                        <Settings></Settings>
                    </Suspense>
                </>
                <div className="wrapperMain">
                    <div className="row">
                        <Suspense fallback={<div>LOADING</div>}>
                            <Person></Person>
                            <Gallery></Gallery>
                            <Youtube></Youtube>
                            <Links></Links>
                            <Email></Email>
                            <Call></Call>
                        </Suspense>
                    </div>
                </div>
                <Sponsored></Sponsored>
                <div className="flex rechtliches justify-center text-gray-200 mb-10">
                    <Inprint></Inprint>
                    <Datenschutz></Datenschutz>
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen></ReactQueryDevtools>
        </QueryClientProvider>
    );
}

export default App;
