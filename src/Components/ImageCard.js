

export default function ImageCard(props) {
    const {handleClick, image} = props;
    return (
        <>
            <div className="image-card" >
                <div className="image-card-img">
                    <img src={image.url} alt="Image"></img>
                </div>
                <div className="image-card-title">
                    {image.title}
                </div>
            </div>
        </>
    )
}