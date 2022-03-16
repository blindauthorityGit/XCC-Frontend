import React, { useState, useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import mapStyle from "./mapstyle";
import sanityClient from "../../../src/client";

export default function MyMap(props) {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState(null);
    const [showMap, setShowMap] = useState(null);
    const [fetchfin, setFetchfin] = useState(null);
    const KEY = process.env.REACT_APP_MAPS_API;
    const URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person']
              `
            )
            .then((data) => {
                setStreet(data[props.id].adresse.strasse);
                setCity(data[props.id].adresse.ort);
                setFetchfin(true);
            })
            .catch(console.error);
    }, [props.id]);

    useEffect(() => {
        const CALL = URL + street + " " + city + "&key=" + KEY;
        function fetchMe() {
            fetch(CALL)
                .then((response) => response.json())
                .then((data) => {
                    setLat(data.results[0].geometry.location.lat);
                    setLong(data.results[0].geometry.location.lng);
                    setShowMap(true);
                })
                .catch(console.error);
        }
        street && fetchMe();

        if (long === -95.7048514) {
            setShowMap(false);
            fetchMe();
        }
    }, [fetchfin]);

    const Map = () => {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{
                    lat: lat,
                    lng: long,
                }}
                defaultOptions={{ styles: mapStyle }}
            >
                <Marker
                    position={{
                        lat: lat,
                        lng: long,
                    }}
                    // onClick={() => {
                    //     setSelectedPos(this);
                    // }}
                ></Marker>
                {/* {selectedPos && (
                    <InfoWindow position={{ lat: 50.12363, lng: 8.64814 }}>
                        <div>Hier bin ich</div>
                    </InfoWindow>
                )} */}
            </GoogleMap>
        );
    };

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <>
            {showMap && (
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCmiEXV0BrJdbGVXXeCNdFB5vs-YA-vfmU&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `200px` }} />}
                    containerElement={<div style={{ height: `200px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                ></WrappedMap>
            )}
        </>
    );
}
