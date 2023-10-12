import React, { useEffect, useState } from "react";
import Axios from "../../Axios";

const FormComponent = ({ apiUrl }) => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Updated state to handle the thumbnail file
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("thumbnail", thumbnail); // Append the thumbnail file to the form data
    formData.append("description", description);
    formData.append("url", url);
    formData.append("category", category);

    try {
      // Send a POST request to your Express.js backend using Axios
      const response = await Axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Important to set the correct Content-Type
      });
      setLoading(false);
      // Reset form fields
      setName("");
      setThumbnail(null);
      setDescription("");
      setUrl("");

      // Display success message
      setSuccessMessage("Post completed successfully.");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      setLoading(false);
      console.error(error.response);
      // Display error message
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding state variable based on the input field's name
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "url":
        setUrl(value);
        break;
      case "category":
        setCategory(value);
        break;
      default:
        break;
    }
  };

  // Handle file input change for the thumbnail
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Make a GET request to the backend API endpoint to fetch categories
        const response = await Axios.get("/category");
        setCategories(response.data); // Set the fetched categories to the state
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
          Website Link:
          <input
            type="url"
            name="url"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL"
          />
        </label>
        <br />
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

        {/* Input field for the thumbnail file */}
        <label>
          Thumbnail:
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileInputChange}
          />
        </label>
        <br />

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
