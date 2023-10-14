import React, { useState, useEffect } from "react";
import Axios from "../../Axios";
import { Link } from "react-router-dom";

const DataTable = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using axios
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    // Filter the data whenever searchText changes
    filterData();
  }, [searchText, data]);

  const fetchData = async () => {
    try {
      const response = await Axios.get(apiUrl);
      setData(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const filterData = () => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      try {
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
    <div className="p-16">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Items List </h2>
        <div className="flex gap-2">
          <input
            type="text"
            className="border-2 px-4 py-2 border-primary rounded-xl w-64"
            placeholder="Search Here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Link
            to={"/admin/add"}
            className="px-4 py-2 border-2 border-primary text-sm font-medium text-center text-white bg-primary inline-flex items-center gap-1 fill-white rounded-xl hover:bg-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            New
            </Link>
        </div>
      </div>
      <table className="w-full bg-gray-50 rounded-xl overflow-hidden mt-2">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-primary text-white">Name</th>
            <th className="py-2 px-4 bg-primary text-white">Category</th>
            <th className="py-2 px-4 bg-primary text-white">Price(₹)</th>
            <th className="py-2 px-4 bg-primary text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr
              key={item._id}
              className={
                index % 2 === 0
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "hover:bg-gray-200"
              }
            >           
              <td className="py-3 px-4 border">{item.name}</td>
              <td className="py-3 px-4 border">{item.category.name}</td>
              <td className="py-3 px-4 border">
                {item.discountPrice < item.price ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-primary text-sm  font-bold">
                      ₹{item.discountPrice}.00
                    </span>
                    <span className="text-sm line-through text-slate-600">
                      (₹{item.price}.00)
                    </span>
                  </div>
                ) : (
                  <span className="text-primary text-sm  font-bold">
                    ₹{item.price}.00
                  </span>
                )}
              </td>

              <td className="py-3 px-2 border">
                <div className="flex gap-5 justify-center">
                  <a
                    href={`/admin/data/edit/${item._id}`}
                    className="fill-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                  </a>

                  <button
                    onClick={() => handleDelete(item._id)}
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
    </div>
  );
};

export default DataTable;
