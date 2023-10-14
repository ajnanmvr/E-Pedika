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
      fetchCategories();
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
      <div className="flex justify-center content-stretch items-streach p-16 gap-10">
        <table className="w-full  bg-gray-50 rounded-xl overflow-hidden mt-2">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-primary text-white">Index</th>
              <th className="py-2 px-4 bg-primary text-white">Name</th>
              <th className="py-2 px-4 bg-primary text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "hover:bg-gray-200"
                }
              >
                <td className="py-3 px-4 border text-center">{index + 1}</td>
                <td className="py-3 px-4 border">{category.name}</td>
                <td className="py-3 px-2 border">
                  <div className="flex gap-5 justify-center">
                    <p
                      onClick={() => handleShowEditForm(category)}
                      className="fill-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                      </svg>
                    </p>

                    <button
                      // onClick={() => handleDelete(item._id)}
                      className="fill-primary hover:fill-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
          className=" flex  flex-col items-center border mt-2 overflow-hidden bg-gray-100 border-primary rounded-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="py-2 px-4 bg-primary w-full text-white font-bold text-center">
            Add New Category
          </h1>

          <div className="flex flex-col gap-2 justify-center items-center content-center w-[300px] h-[200px] ">
            <input
              className="px-3 py-2 rounded-xl border border-primary text-center"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category Name"
            />
            {errorMessage && (
              <p>{errorMessage}</p>
            )}

{successMessage && (
  <p>{successMessage}</p>
)}
            <button
              className="px-4 py-2 border-2 border-primary text-sm font-medium text-center text-white bg-primary inline-flex items-center gap-1 fill-white rounded-xl hover:bg-indigo-600"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Confirm"}
            </button>
          </div>

        </form>

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
