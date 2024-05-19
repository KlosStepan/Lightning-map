import React from "react";

type TileEshopProps = {
    likes: string;
    logo: string;
    title: string;
    caption: string;
}

const TileEshop: React.FC<TileEshopProps> = ({ likes, logo, title, caption }) => {
    return (
        <React.Fragment>
            <div>!  &nbsp;  7</div>
            <div><u>|A alza.cz|</u></div>
            <div>Alza</div>
            <div>Nejvetsi prodejce elektroniky v CR</div>
        </React.Fragment>
    )
}

export default TileEshop;