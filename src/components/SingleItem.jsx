import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "../Axios";

export default function ProductDetail() {
  let { slug } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    Axios.get(`/data/${slug}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      {product.discountPrice && <p>Discount Price: ${product.discountPrice}</p>}
      <p>Category: {product.category}</p>
    </div>
  );
}
