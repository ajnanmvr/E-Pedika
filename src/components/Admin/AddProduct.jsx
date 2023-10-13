import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import slugify from "slugify";

const FormComponent = ({ apiUrl }) => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null); // For image preview
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [specs, setSpecs] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("slug", slug);
    formData.append("price", price);
    formData.append("discountPrice", discountPrice);
    specs.forEach((spec, index) => {
      formData.append(`specs[${index}]`, spec);
    });

    try {
      const response = await Axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      setName("");
      setThumbnail(null);
      setDescription("");
      setCategory("");
      setSlug("");
      setPrice("");
      setDiscountPrice("");
      setSpecs([]);
      setSuccessMessage("Post completed successfully.");
      setErrorMessage("");
    } catch (error) {
      setLoading(false);
      console.error(error.response);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        // Automatically generate the slug from the name
        const generatedSlug = slugify(value, { lower: true, strict: true });
        setSlug(generatedSlug);
        break;
      case "description":
        setDescription(value);
        break;

      case "category":
        setCategory(value);
        break;
      case "slug":
        setSlug(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "discountPrice":
        setDiscountPrice(value);
        break;
      default:
        break;
    }
  };

  // Handle file input change for the thumbnail
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    // For image preview
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle specs input changes
  const handleSpecsChange = (e, index) => {
    const newSpecs = [...specs];
    newSpecs[index] = e.target.value;
    setSpecs(newSpecs);
  };

  // Add a new spec input field
  const addSpec = () => {
    const newSpecs = [...specs, ""];
    setSpecs(newSpecs);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get("/category");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form
      className="flex justify-center gap-20 pt-10 pb-16"
      onSubmit={handleSubmit}
    >
      <div className="p-3 h-[500px] w-[500px] font-semibold flex flex-col gap-2 overflow-y-auto no-scrollbar">
        <h1 className="text-5xl font-extrabold text-primary -mt-5">Add Product</h1>
       <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-black px-3 py-[6px] w-full"
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-black px-3 py-[6px] w-full"
          />
        </label>
        <label className="hidden">
          Slug
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-black px-3 py-[6px] w-full"
          />
        </label>
        <div className="mb-4">
          <label className="block">Category</label>
          <select
            className="rounded-lg border-2 border-black px-3 py-[6px] w-full"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option hidden>Select Category</option>
            {categories.map((item, key) => (
              <option key={key} value={item._id}>
                {item.name}
              </option>
            ))}
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="flex gap-10">
          <label className="flex-1">
            Discount Price
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 320 512"
              >
                <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
              </svg>
              <input
                type="number"
                name="discountPrice"
                value={discountPrice}
                onChange={handleInputChange}
                className="rounded-lg border-2 border-black px-3 py-[6px] w-full"
              />
            </div>
          </label>
          <label className="flex-1">
            Maximum Retail Price
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 320 512"
              >
                <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
              </svg>
              <input
                type="number"
                name="price"
                value={price}
                onChange={handleInputChange}
                className="rounded-lg border-2 border-black px-3 py-[6px] w-full"
              />
            </div>
          </label>
        </div>
        <div className="">
          <label className="block">Tags</label>
          {specs.map((spec, index) => (
            <input
              key={index}
              type="text"
              value={spec}
              onChange={(e) => handleSpecsChange(e, index)}
              className="rounded-lg border-2 border-black w-[49%] px-3 py-[6px] mr-1 mb-1"
            />
          ))}
          <button
            type="button"
            className="flex gap-1 items-center rounded-lg border-2 border-black px-3 py-[6px] mr-1 mb-1"
            onClick={addSpec}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            Add Tag
          </button>
        </div>
        <div className="flex">

            <input
              type="file"
              name="thumbnail"
            className="flex gap-1 items-center rounded-lg border-2 border-black px-3 py-[6px] mr-1 mb-1 flex-1 file:bg-white file:rounded-lg file:text-primary file:border-nprimary  file:px-2 file:py-1 file:mr-2"
            
              
              onChange={handleFileInputChange}
            />
          {loading ? (
            <div 
            className="rounded-lg border-2 border-primary bg-primary text-white px-6 py-[6px] mr-1 mb-1"

            
            >Processing...</div>
          ) : (
            <button type="submit"
            className="rounded-lg border-2 border-primary bg-primary text-white px-6 py-[6px] mr-1 mb-1"
            
            >Submit</button>
          )}
        </div>
        {successMessage && <p className="">{successMessage}</p>}
        {errorMessage && <p className="">{errorMessage}</p>}
      </div>
      <div className="h-[500px] w-[500px]">
        {thumbnailPreview ? (
          <label htmlFor="thumbnail">
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="h-full w-full object-cover rounded-lg"
          /></label>
        ) : (
          <label htmlFor="thumbnail">

          <img
            src="https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png"
            alt="Thumbnail Preview"
            className="h-full w-full object-cover rounded-lg"
          /></label>
        )}

      </div>

    </form>
  );
};

export default FormComponent;
