import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import YouTube from "react-youtube";
import { useHistory } from "react-router-dom";

export default function Youtube(props) {
    const [postData, setPostData] = useState(props.data);
    const [myId, setMyId] = useState(props.id);
    const [showOverlay, setshowOverlay] = useState(false);
    var getYouTubeID = require("get-youtube-id");

    const [url, setUrl] = useState(props.url);

    const BlockContent = require("@sanity/block-content-to-react");
    const [opts, setOpts] = useState(null);
    const history = useHistory();

    useEffect(() => {
        history.push("/video");

        setUrl(getYouTubeID(postData[myId].url));
        setOpts({
            height: "390",
            width: window.innerWidth,
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        });
    }, []);
    // useEffect(() => {
    //     history.push("/video");

    //     sanityClient
    //         .fetch(
    //             `*[_type == 'youtube']
    //       `
    //         )
    //         .then((data) => {
    //             setPostData(data);

    //             setUrl(getYouTubeID(data[myId].url));
    //             setOpts({
    //                 height: "390",
    //                 width: window.innerWidth,
    //                 playerVars: {
    //                     // https://developers.google.com/youtube/player_parameters
    //                     autoplay: 1,
    //                 },
    //             });
    //         })
    //         .catch(console.error);
    // }, []);

    return (
        <div>
            {showOverlay && <div className="overlayBlack slide-in-top" id="overlayBlack"></div>}
            {postData && opts && (
                <div className="">
                    <div className="videoWrapper">
                        <YouTube
                            videoId={url}
                            opts={opts}
                            onEnd={() => {
                                console.log("ENDEE");
                            }}
                        ></YouTube>
                    </div>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col" style={{ paddingTop: opts.height + "px" }}>
                                <div className="textWrapper">
                                    {postData[myId].beschreibung !== undefined && (
                                        <BlockContent blocks={postData[myId].beschreibung}></BlockContent>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
