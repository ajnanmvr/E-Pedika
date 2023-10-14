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
      <form
        className=" flex  flex-col items-center border mt-2 overflow-hidden bg-gray-100 border-primary rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="p-4 text-lg bg-primary w-full text-white font-bold text-center">
          Edit Category
        </h1>

        <div className="flex flex-col gap-2 justify-center items-center content-center w-[300px] h-[200px] ">
          {errorMessage && <p>{errorMessage}</p>}

          <input
            className="px-3 py-2 rounded-xl border border-primary text-center"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category Name"
          />

          <div className="flex gap-1">            <button
              className="px-4 py-2 border-2 border-primary text-sm font-medium text-center text-primary bg-white inline-flex items-center gap-1 fill-white rounded-xl hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 border-2 border-primary text-sm font-medium text-center text-white bg-primary inline-flex items-center gap-1 fill-white rounded-xl hover:bg-indigo-600"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>


          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;
