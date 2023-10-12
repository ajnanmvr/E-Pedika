import React, { useState, useEffect } from "react";
import Axios from "../../Axios";
import { useParams } from "react-router-dom";

const EditFormComponent = ({ dataToEdit }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  // Fetch data from backend using the provided 'id'
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

    const fetchData = async () => {
      try {
        const response = await Axios.get(`/data/${id}`);
        const dataToEdit = response.data; // Assuming the API returns an object with the website details
        // Set the state variables with the data received from the backend
        setName(dataToEdit?.name || "");
        setImage(dataToEdit?.image || "");
        setDescription(dataToEdit?.description || "");
        setUrl(dataToEdit?.url || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding state variable based on the input field's name
    switch (name) {
      case "name":
        setName(value);
        break;
      case "image":
        setImage(value);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      image,
      description,
      url,
      category,
    };

    try {
      // Send a PATCH request to update the data on your Express.js backend using Axios
      const response = await Axios.patch(`/data/${id}`, data);
      console.log(response.data);

      // Display success message
      setSuccessMessage("Update completed successfully.");
      setErrorMessage(""); // Clear any previous error message
      window.location.href = "/admin/data/";
    } catch (error) {
      console.error(error.response);
      // Display error message
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="editItem">
      <h1 className="form-header-editproduct">Edit Website</h1>
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
        <br />
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Category:</label>
          <select
            className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            name="category"
            onChange={handleInputChange}
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
        <button type="submit">Update</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default EditFormComponent;
