import React, { useState } from "react";
import Axios from "../../Axios";

const EditCategoryForm = ({ apiUrl, category, onClose }) => {
  const [name, setName] = useState(category.name);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send a PATCH request to update the category using Axios
      const response = await Axios.put(`/category/${category._id}`, { name });

      // Display success message
      setSuccessMessage("Category updated successfully.");
      setErrorMessage(""); // Clear any previous error message

      // Update the category name in the main AddCategory component's state
      category.name = name;

      // Close the edit form
      onClose();
    } catch (error) {
      console.error(error.response);
      // Display error message
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-center font-bold text-2xl text-blue-900 uppercase mb-4">
          Edit Category
        </h2>
        <form onSubmit={handleSubmit}>
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
            {loading ? "Updating..." : "Update Category"}
          </button>

          {successMessage && (
            <p className="text-green-600 mt-2">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
        </form>

        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-gray-300 mt-4"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCategoryForm;
