

export default function ImageCard(props) {
    const {imageClick, image, i, editImage, deleteImage} = props;
    return (
        <>
            <div className="image-card">
                <div className="image-card-btn">
                    <img className="img" src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png" alt="edit-image" 
                    onClick={() => editImage(image ,i)}/>
                    <img className="img" src="https://cdn-icons-png.flaticon.com/128/6711/6711573.png" alt="delete-image" 
                    onClick={() => deleteImage(i)}/>
                </div>
                <div className="image-card-img" onClick={() => imageClick(i, image.url)}>
                    <img src={image.url} alt="Image"></img>
                </div>
                <div className="image-card-title">
                    {image.title}
                </div>
            </div>
        </>
    )
}