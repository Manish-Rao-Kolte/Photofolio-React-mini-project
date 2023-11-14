import React from "react";
import ImageForm from "./ImageForm";
import ImageCard from "./ImageCard";

export default function ImageList(props) {
    const {album, returnClick, imageSubmit, image, setImage, imageForm, setImageForm} = props;
    const title = album.title;
    const images = album.images;

    return (
        <>
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
                        <ImageCard key={i} image={image} />
                    ))}
                </div>
            </div>
        </>
    )
}