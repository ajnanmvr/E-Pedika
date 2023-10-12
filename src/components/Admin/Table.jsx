import React, { useState, useEffect } from "react";
import Axios from "../../Axios";

const DataTable = ({ apiUrl ,title}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using axios
    fetchData();
  }, [apiUrl]);
  const fetchData = async () => {
    try {
      const response = await Axios.get(apiUrl);
      setData(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };
  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      try {
        // Send a DELETE request to the backend API to delete the item with the given 'id'
        const response = await Axios.delete(`/data/${id}`);
        console.log(response.data);

        // If the deletion is successful, update the local state or perform any other actions
        fetchData(); // Refresh the data after deletion
      } catch (error) {
        console.error(error.response);
      }
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title } List </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 border">Name</th>
            <th className="py-2 px-4 bg-gray-100 border">Description</th>
            <th className="py-2 px-4 bg-gray-100 border">URL</th>
            <th className="py-2 px-4 bg-gray-100 border">Category</th>
            <th className="py-2 px-4 bg-gray-100 border">Published</th>
            <th className="py-2 px-4 bg-gray-100 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border">{item.name}</td>
              <td className="py-2 px-4 border w-1/4">{item.description}</td>
              <td className="py-2 px-4 border">{item.url}</td>
              <td className="py-2 px-4 border">{item.category.name}</td>
              <td className="py-2 px-4 border">
                {item.published ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border">
                {/* Assuming handleEdit and handleDelete are redirect functions */}
                {/* Replace 'your_base_url' with the actual base URL of your application */}

                <a
                  href={`/admin/data/edit/${item._id}`}
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </a>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
