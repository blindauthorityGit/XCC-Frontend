import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import { useHistory } from "react-router-dom";

const Inprint = () => {
    const [postData, setPostData] = useState(null);
    const history = useHistory();

    useEffect(() => {
        history.push("/impressum");
        sanityClient
            .fetch(
                `*[_type == 'impressum']
                  `
            )
            .then((data) => {
                if (data.length > 0) {
                    setPostData(data);
                }

                console.log(data.length);
            })
            .catch(console.error);
        return () => {};
    }, []);

    return (
        <div className="modalInprint py-3">
            <h1>Site Notice</h1>

            <h2>Information pursuant to Sect. 5 German Telemedia Act (TMG)</h2>
            <p>
                Sabocon GmbH
                <br />
                Alte Bogengasse 25
                <br />
                63303 Dreieich
            </p>

            <p>
                Commercial Register: Hrb 3488
                <br />
                Registration court: Handelsgericht Offenbach
            </p>

            <p>
                <strong>Represented by:</strong>
                <br />
                Marc Werner
            </p>

            <p>
                <strong>Responsible for content & links:</strong>
                <br></br>
                {postData && (
                    <>
                        {postData[0].name !== undefined ? postData[0].name : ""}
                        <br />
                        {postData[0].email !== undefined ? postData[0].email : ""}
                        <br />
                        {postData[0].phone !== undefined ? postData[0].phone : ""}
                    </>
                )}
            </p>

            <h2>Contact</h2>
            <p>
                Phone: 0049-6103-9849-37
                <br />
                E-mail: contact@sabocon.com
            </p>

            <h2>VAT ID</h2>
            <p>
                Sales tax identification number according to Sect. 27 a of the Sales Tax Law:
                <br />
                204691339
            </p>

            <h2>EU dispute resolution</h2>
            <p>
                The European Commission provides a platform for online dispute resolution (ODR):{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                    https://ec.europa.eu/consumers/odr/
                </a>
                .<br /> Our e-mail address can be found above in the site notice.
            </p>

            <h2>Dispute resolution proceedings in front of a consumer arbitration board</h2>
            <p>
                We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer
                arbitration board.
            </p>
        </div>
    );
};

export default Inprint;
