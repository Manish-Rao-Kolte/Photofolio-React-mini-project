import React, { useState, useEffect } from "react";
import { useReducer } from "react";
import { db } from "../config/firebaseInit";
import AlbumForm from "./AlbumForm";
import AlbumCard from "./AlbumCard";
import ImageList from "./ImageList";
import { addDoc, collection, getDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";


//using reducer
function albumReducer(albums, action) {
    switch (action.type) {
        case "ADD":
            return [...action.albums];
        case "REMOVE":
            return albums.filter((album, index) => index !== action.index);
        default:
            return [];
    }
}

export default function AlbumList({query}) {
    //album title to set in the db and to refresh it in input field when form is submitted
    const [album, setAlbum] = useState({ title: '' });
    const [image, setImage] = useState({ title: '', url: ''});
    const [albumSelect, setAlbumSelect] = useState(false);
    const [bool, setBool] = useState(false);
    const [curAlbum, setCurAlbum] = useState(null);
    const [albumForm, setAlbumForm] = useState(false);
    const [imageForm, setImageForm] = useState(false);
    const [albums, dispatch] = useReducer(albumReducer, []);


    // function to handle album form submission
    async function albumSubmit(e) {
        e.preventDefault();
        //adding doc in db 
        await addDoc(collection(db, 'albums'), {
            title: album.title,
            images: [],
            timestamp: new Date().getTime()
        })
        setAlbum({ title: '' });
    }

    //this function is to add image in selected album.
    async function imageSubmit(e) {
        e.preventDefault();
        const docRef = doc(db, "albums", curAlbum.id);
        const alb = await getDoc(docRef);
        await updateDoc(docRef, {
            images: [image, ...alb.data().images]
        });
        const albm = await getDoc(docRef);
        setCurAlbum({id: albm.id, data: albm.data()});
        setImage({ title: '', url: '' });
        setBool(!bool);
    }

    //below function is to change the albumSelected so we can render the images of an album when it is clicked.
    async function albumClick(id) {
        const ref = doc(db, "albums", id);
        const alb = await getDoc(ref);
        if (Object.keys(alb.data()).length === 0) {
            return;
        }
        if (alb.exists()) {
            setCurAlbum({ id: alb.id, data: alb.data() });
            if (!albumSelect) {
                setAlbumSelect(!albumSelect);
            }
        }
    }

    //this function is to render AlbumLists.
    function returnClick() {
        setAlbumSelect(!albumSelect);
        setImageForm(false);
        setCurAlbum(null);
    }

    // useEffect to get realtime update from DB and to store it in albums, to show updates on screen in realtime
    useEffect(() => {
        onSnapshot(collection(db, "albums"), (snapShot) => {
            let array = snapShot.docs.sort((x, y) => x._document.createTime.timestamp - y._document.createTime.timestamp);
            console.log(array);
            const albumsArray = array.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            dispatch({ type: "ADD", albums: albumsArray });           
        })
    }, []);

    useEffect(() => {
        setAlbumSelect(false);
        setAlbumForm(false);
    }, [query]);


    return (
        <>
            {
                albumSelect
                    ?
                    <ImageList album={curAlbum.data} returnClick={returnClick} imageSubmit={imageSubmit}
                        image={image} setImage={setImage} imageForm={imageForm} setImageForm={setImageForm} />
                    :
                    <div>
                        {albumForm ? <AlbumForm albumSubmit={albumSubmit} album={album} setAlbum={setAlbum} /> : null}
                        <div className="album-list-container">
                            <div className="album-list-header">
                                <h3> Your albums </h3>
                                <button className="album-list-header-btn"
                                    onClick={() => setAlbumForm(!albumForm)}> {albumForm ? "cancel" : "Add album"} </button>
                            </div>
                            <div className="album-list-body">
                                {albums.map((album) => (
                                    <AlbumCard title={album.title} albumClick={albumClick} id={album.id} />
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}