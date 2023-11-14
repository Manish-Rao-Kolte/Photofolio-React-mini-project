import React from "react";

export default function AlbumForm(props) {
    const {albumSubmit, album, setAlbum} = props;
    


    return (
        <>
            <form className="album-form" onSubmit={(e) => albumSubmit(e)}>
                <h3 className="album-form-heading">Create an album</h3>
                <div className="album-form-input">
                    <input type="text" value={album.title} placeholder="Album Name" onChange={(e) => setAlbum({title: e.target.value})} required></input>
                    <div className="album-form-btn">
                        <button className="album-form-clear" onClick={() => setAlbum({title : ''})}>Clear</button>
                        <button type="submit" className="album-form-create">Create</button>
                    </div>                    
                </div>
            </form>
        </>
    )
}