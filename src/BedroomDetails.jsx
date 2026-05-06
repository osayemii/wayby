import { useLocation } from "react-router-dom"

function BedRoomDetails() {

    const location = useLocation();
    const product = location.state?.product;
    // console.log(location);

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <>
            <div className="bedroom-details-container">
                <div className="bedroom-details-content">
                    <div className="imgs">
                        <img src={product.image} alt={product.name} className="bedroom-details-image" />
                        <div className="subImage">
                            {product.subImage && product.subImage.map((imgSrc, index) => (
                                <img key={index} src={imgSrc} alt={`${product.name} ${index + 1}`} className="sub-image" />
                            ))}
                        </div>
                    </div>
                    <div className="bedroom-details-info">
                        <h3>{product.name}</h3>
                        <p className="bedroom-details-description">{product.definition}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default BedRoomDetails