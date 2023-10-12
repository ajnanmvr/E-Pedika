import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import EditCategoryForm from "./EditCategory";

const AddCategory = ({ apiUrl }) => {
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [showEditForm, setShowEditForm] = useState(false);
  const [editCategory, setEditCategory] = useState({ id: null, name: "" });

  // Function to show the edit form in a pop-up
  const handleShowEditForm = (category) => {
    setEditCategory(category);
    setShowEditForm(true);
  };

  // Function to hide the edit form
  const handleCloseEditForm = () => {
    setEditCategory({ id: null, name: "" });
    setShowEditForm(false);
  };
  const fetchCategories = async () => {
    try {
      // Send a GET request to your Express.js backend using Axios
      const response = await Axios.get("/category"); // Replace the placeholder with the actual endpoint URL
      setCategories(response.data); // Assuming the API returns an array of category objects
    } catch (error) {
      console.error(error.response);
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send a POST request to your Express.js backend using Axios
      const response = await Axios.post("/category", { name });
      console.log(response.data);

      // Reset form fields
      setName("");

      // Display success message
      setSuccessMessage("Category added successfully.");
      setErrorMessage(""); // Clear any previous error message
      fetchCategories()
    } catch (error) {
      // Display error message
      if (error.response.data.errors.name) {
        setErrorMessage(error.response.data.errors.name);
        setSuccessMessage(""); // Clear any previous success message
      } else {
        setErrorMessage("An error occurred. Please try again.");
        setSuccessMessage(""); // Clear any previous success message
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="flex justify-around items-center pb-32">
        <form className="form-container w-1/2 mt-4" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-3xl text-blue-900 uppercase mt-8">
            Add New Category
          </h1>
          <label className="text-blue-900">
            Name:
            <input
              className="border border-blue-900 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </label>
          <br />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>

          {successMessage && (
            <p className="text-green-600 mt-2">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
        </form>

        <div className="mt-8  w-1/2">
          <h2 className="text-center font-bold text-2xl text-blue-900 uppercase">
            Category List
          </h2>
          <table className="w-full mt-4 border-collapse border border-blue-900">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Index</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Actions</th>{" "}
                {/* Add a new column for actions */}
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category.id}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{category.name}</td>
                  <td className="py-2 px-4">
                    <p
                      className="text-blue-900 font-semibold cursor-pointer py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                      onClick={() => handleShowEditForm(category)}
                    >
                      Edit
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Render the EditCategoryForm component in a pop-up */}
        {showEditForm && (
          <EditCategoryForm
            apiUrl={apiUrl}
            category={editCategory}
            onClose={handleCloseEditForm}
          />
        )}
      </div>

    </>
  );
};

export default AddCategory;
