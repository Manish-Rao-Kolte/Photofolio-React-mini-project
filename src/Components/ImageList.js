import React, { useState } from "react";
import ImageForm from "./ImageForm";
import ImageCard from "./ImageCard";

export default function ImageList(props) {
    const {album, returnClick, imageSubmit, image, setImage, imageForm, setImageForm} = props;
    const title = album.title;
    const images = album.images;
    const [hover, setHover] = useState({url: '', show: false});

    function imageClick(key, url){
        setHover({url: url, show : !hover.show});
    }

    function clrImage() {
        setHover({url: '', show: !hover.show});
    }

    return (
        <>
            { hover.show && hover.url !== ''?
                <div className="image-viewer">
                    <button onClick={clrImage}>
                        <img src="https://cdn-icons-png.flaticon.com/128/458/458594.png" alt="close-btn" />
                    </button>
                    <img src={hover.url} alt="Image"></img>
                </div>
                :
                null
            }
            {imageForm ? <ImageForm imageSubmit={imageSubmit} id={album.id} 
            setImage={setImage} image={image} album ={album} /> : null }           
            <div className="image-list-container">
                <div className="image-list-header">
                    <div className="return-name">
                        <div className="return-to-albums" onClick={() => returnClick()}>
                            <img src="https://cdn-icons-png.flaticon.com/128/889/889590.png" alt="return btn"></img>
                        </div>
                        <h3>
                            Images in {title}
                        </h3>
                    </div>
                    <div className="search-addImage">
                        <div className="search">
                            <img src="https://cdn-icons-png.flaticon.com/128/10337/10337563.png" alt="search img"></img>
                        </div>
                        <button className="image-list-header-btn" onClick={() => setImageForm(!imageForm)}
                        > {imageForm ? "cancel" : "Add image" } </button>
                    </div>
                </div>
                <div className="image-list-body">
                    {images.map((image, i) => (
                        <ImageCard key={i} image={image} imageClick={imageClick} />
                    ))}
                </div>
            </div>
        </>
    )
}