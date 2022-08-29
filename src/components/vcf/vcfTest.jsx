import VCard from "vcard-creator";

// Define a new vCard

export default function VCFGeneratorTest(props) {
    const myVCard = new VCard();

    function download(filename, text) {
        let element = document.createElement("a");
        element.style.display = "none";
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));

        element.setAttribute("download", filename);
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
    }

    function umlauter(text) {
        return text.replace(/[ß]/g, "ss").replace(/[ä]/g, "ae").replace(/[ö]/g, "oe").replace(/[ü]/g, "ue");
    }

    const FN = umlauter(props.firstName);
    const N = umlauter(props.firstName + " " + props.lastName);
    const ROLE = umlauter(props.role);
    const TEL = props.phone;
    const URL = props.url;
    const ADR = umlauter(`${props.street};${props.city};${props.country}`);
    // Template.ADR = props.street;
    const EMAIL = props.email;

    const isAppleMobile = ["iPad", "iPhone", "iPod"].includes(navigator.platform);

    console.log(navigator.platform);

    myVCard.setFormat(isAppleMobile ? "vcalendar" : "vcard");

    myVCard.addName(N).addRole(ROLE).addPhoneNumber(TEL).addAddress(ADR).addEmail(EMAIL).addURL(URL);

    let filename = `${props.filename}.vcf`;

    return (
        <div>
            <div
                className="vcf button"
                onClick={() => {
                    download(filename, myVCard.toString());
                }}
            >
                DOWNLOAD VCF
            </div>
        </div>
    );
}
