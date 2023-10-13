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
    <div className="">
      <h1 className="form-header-addproduct mb-90">Add New Website</h1>
      <form className="form-container" onSubmit={handleSubmit}>
      <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </label>
        <br />

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </label>

        <label>
          Slug:
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={handleInputChange}
            placeholder="Enter slug"
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
            placeholder="Enter price"
          />
        </label>
        <br />
        <label>
          Discount Price:
          <input
            type="number"
            name="discountPrice"
            value={discountPrice}
            onChange={handleInputChange}
            placeholder="Enter discount price"
          />
        </label>
        <br />
        {/* Add input fields for specs */}
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Specs:</label>
          {specs.map((spec, index) => (
            <input
              key={index}
              type="text"
              value={spec}
              onChange={(e) => handleSpecsChange(e, index)}
              placeholder={`Spec ${index + 1}`}
            />
          ))}
          <button type="button" onClick={addSpec}>
            Add Spec
          </button>
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Category:</label>
          <select
            className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option hidden>select category</option>
            {categories.map((item, key) => (
              <option key={key} value={item._id}>
                {item.name}
              </option>
            ))}
            {/* Add more options as needed */}
          </select>
        </div>
        <br />

        <label>
          Thumbnail:
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileInputChange}
          />
        </label>
        <br />
        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="thumbnail-preview"
          />
        )}
        {loading ? (
          <div className="" >processing...</div>
        ) : (
          <button type="submit">Submit</button>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default FormComponent;
