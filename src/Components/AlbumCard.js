import React from "react";


export default function AlbumCard(props) {
    const {albumClick, id, title} = props;
    return (
        <>
            <div className="album-card" onClick={() => albumClick(id)}>
                <div className="album-card-img">
                    <img src="https://cdn-icons-png.flaticon.com/128/1375/1375106.png" alt="Album-Img"></img>
                </div>
                <div className="album-card-title">
                    {title}
                </div>
            </div>
        </>
    )
}