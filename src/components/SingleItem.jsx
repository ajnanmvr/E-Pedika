import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../Axios";

export default function ProductDetail() {
  let { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    Axios.get(`/data/s/${slug}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [slug]);

  if (!product) {
    return (
      <div className="flex justify-center gap-20 pt-10 pb-16">
        <div className="h-[500px] w-[500px] bg-gray-300 animate-pulse rounded-lg cursor-zoom-in"></div>

        <div className="p-3 h-[500px] w-[500px]">
          <div className="bg-gray-300 h-8 w-3/4 mb-4 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 h-6 w-1/2 mb-4 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 h-4 w-2/3 mb-4 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 h-4 w-3/4 mb-4 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 h-4 w-2/5 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-20 pt-10 pb-16">
      <div className="h-[500px] w-[500px] overflow-hidden rounded-lg cursor-zoom-in">
        <div className="h-[500px] w-[500px] transform hover:scale-125 transition-transform duration-300">
          <img
            src={product.thumbnail}
            alt="Thumbnail"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="p-3 h-[500px] w-[500px]">
        <h2 className="font-bold text-3xl">{product.name}</h2>
        <p className="inline-block mt-3 bg-primary rounded-xl px-3 py-1 text-sm font-semibold text-white">
          {product.category.name}
        </p>

        <p className="text-slate-600 text-sm leading-4 mt-2">
          {product.description}
        </p>
        {product.specs.map((spec, i) => (
          <span
            key={i}
            className="inline-block mt-3  rounded-full border border-primary px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{spec}
          </span>
        ))}
        <p className="mt-2 flex items-center gap-2">
          {product.discountPrice < product.price ? (
            <>
              <span className="text-primary text-lg bg-white border-2 font-bold rounded-lg border-dotted py-2 px-3 border-primary">
                ₹{product.discountPrice}.00
              </span>
              <span className="text-lg line-through text-slate-600">
                ₹{product.price}.00
              </span>
            </>
          ) : (
            <span className="text-primary text-lg bg-white border-2 font-bold rounded-lg border-dotted py-2 px-3 border-primary">
              ₹{product.price}.00
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
