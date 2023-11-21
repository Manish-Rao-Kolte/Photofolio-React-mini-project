import React, { useState } from "react";
import ImageForm from "./ImageForm";
import ImageCard from "./ImageCard";
import { db } from "../config/firebaseInit";
import { doc, updateDoc } from "firebase/firestore";

export default function ImageList(props) {
    const { album, returnClick, imageSubmit, image, setImage, imageForm,
        setImageForm, SetImageUpdate, setIndex, curAlbum } = props;
    const title = album.title;
    const images = album.images;
    const [carouselIndex, setCaraouselIndex] = useState({index: ''});
    const [hover, setHover] = useState({ url: '', show: false });

    async function imageClick(i, url) {
        setCaraouselIndex({index: i});
        setHover({ url: url, show: !hover.show });
    }


    function clrImage() {
        setHover({ url: '', show: !hover.show });
    }

    function nextImg(){
        if(carouselIndex.index < images.length-1){
            setCaraouselIndex({index: carouselIndex.index+1});
            setHover({ url: images[carouselIndex.index+1].url, show: hover.show});
        }else{
            setCaraouselIndex({index: 0});
            setHover({ url: images[0].url, show: hover.show});
        }
    }

    function prevImg(){
        
        if(carouselIndex.index > 0){
            setCaraouselIndex({index: carouselIndex.index-1})        
            setHover({ url: images[carouselIndex.index-1].url, show: hover.show});
        }else{
            setCaraouselIndex({index: images.length-1});
            setHover({ url: images[images.length-1].url, show: hover.show});
        }
        
    }

    // function to edit image title and url in DB
    function editImage(image, i) {
        SetImageUpdate(true);
        setImage(image);
        setImageForm(true);
        setIndex(i);
    }

    async function deleteImage(i) {
        await images.splice(i, 1);
        const docRef = doc(db, "albums", curAlbum.id);
        await updateDoc(docRef, {
            images: images
        });
    }


    return (
        <>
            {hover.show && hover.url !== '' ?
                <div className="carousel">
                    <img className="csl-img" src="https://cdn-icons-png.flaticon.com/128/458/458594.png" alt="close-btn"
                        onClick={clrImage} />
                    <div className="csl-viewer">
                        <img className="csl-btn" src="https://cdn-icons-png.flaticon.com/128/5610/5610918.png" alt="previous-btn" onClick={prevImg}/>
                        <img className="csl-vwr-img" src={hover.url} alt="Image"></img>
                        <img className="csl-btn" src="https://cdn-icons-png.flaticon.com/128/5611/5611871.png" alt="nex-btn" onClick={nextImg}/>
                    </div>
                </div>
                :
                <div>{imageForm ? <ImageForm imageSubmit={imageSubmit} id={album.id}
                    setImage={setImage} image={image} album={album} /> : null}
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
                                > {imageForm ? "cancel" : "Add image"} </button>
                            </div>
                        </div>
                        <div className="image-list-body">
                            {images.map((image, i) => (
                                <ImageCard i={i} image={image} imageClick={imageClick} editImage={editImage} deleteImage={deleteImage} />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}