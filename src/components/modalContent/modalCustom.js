import React from "react";

export default function ModalCustom(props) {
    return (
        <>
            <div className="wrapper flex custom">
                <a href="../../pdf/210427_IHK_Klimaschutz_Positionierung_clean.pdf" download>
                    Energie- und Klimapolitik - mit der Wirtschaft in eine nachhaltige Zukunft
                </a>
                <a href="../../pdf/210719_Weltweite_Klimaneutralität_layout" download>
                    Weltweite Klimaneutralität - bis wann?
                </a>
                <a
                    href="../../pdf/Allianz_fuer_Entwicklung_und_Klima_Mitmacherklaerung_Datenschutzerklaerung.pdf"
                    download
                >
                    Allianz für Entwicklung und Klima - Mitmacherklärung
                </a>
                <a href="../../pdf/allianz-broschuere-doppelseitig.pdf" download>
                    Allianz für Entwicklung und Klima - Broschüre
                </a>
                <a href="../../pdf/Wachstum_Nachhaltigkeit_Globalisierung-Was_kommt_nach_Corona_print.pdf" download>
                    Wachstum, Nachhaltigkeit, Globalisierung - Was kommt nach Corona?
                </a>
            </div>
        </>
    );
}
