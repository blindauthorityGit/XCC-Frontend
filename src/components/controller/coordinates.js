import React, { useState, useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import mapStyle from "./mapstyle";
import sanityClient from "../../../src/client";

export default function Coordinates(props) {
    const [selectedPos, setSelectedPos] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState(null);
    const [showMap, setShowMap] = useState(null);
    const [fetchfin, setFetchfin] = useState(false);
    const KEY = process.env.REACT_APP_MAPS_API;
    const URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person']
              `
            )
            .then((data) => {
                console.log(data);
                setStreet(data[props.id].adresse.strasse);
                setCity(data[props.id].adresse.ort);

                setFetchfin(true);
            })
            .then((e) => {
                console.log(e);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const CALL = URL + street + " " + city + "&key=" + KEY;
        function fetchMe() {
            console.log(street, city);
            fetch(URL + street + " " + city + "&key=" + KEY)
                .then((response) => response.json())
                .then((data) => {
                    setLat(data.results[0].geometry.location.lat);
                    setLong(data.results[0].geometry.location.lng);
                    setShowMap(true);
                    console.log(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
                })
                .catch(console.error);
        }
        street && fetchMe();

        // if (data.results[0].geometry.location.lng === -95.7048514) {
        //     console.log("FALSCH");
        //     setShowMap(false);
        // }
        if (long === -95.7048514) {
            setShowMap(false);
            fetchMe();
        }
    }, [fetchfin]);

    return (
        <>
            {lat && long && (
                <h1>
                    {lat} {long}
                </h1>
            )}
        </>
    );
}
