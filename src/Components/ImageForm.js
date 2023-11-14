import React from "react";

export default function ImageForm(props) {
    const {imageSubmit, image, setImage, album} = props;
    
    return (
        <>
            <form className="image-form" onSubmit={(e) => imageSubmit(e)}>
                <h3 className="image-form-heading">Add image to {album.title}</h3>
                <div className="image-form-input">
                    <input type="text"  placeholder="Title" value={image.title}
                    onChange={(e) => setImage({title: e.target.value, url: ''})} required></input>
                    <input type="url"  placeholder="Image Url" value={image.url}
                    onChange={(e) => setImage({title: image.title, url: e.target.value})} required></input>
                    <div className="image-form-btn">
                        <button className="image-form-clear" 
                        onClick={() =>setImage({title: '', url: ''})}>Clear</button>
                        <button type="submit" className="image-form-add">Add</button>
                    </div>                    
                </div>
            </form>
        </>
    )
}