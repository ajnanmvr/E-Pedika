import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWebsite, faList, faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1 className="text-center font-bold text-3xl my-5 uppercase text-blue-900">
        Admin Dashboard
      </h1>
      <div className="lg:grid lg:grid-cols-3  bg-gray-100">
        {/* Card 1 */}
        <div className="card bg-white shadow-md rounded-md p-6 m-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-900 text-white">
            <FontAwesomeIcon icon={faAdd} size="lg" />
          </div>
          <h2 className="text-xl font-semibold mt-4">Add Website</h2>
          <p className="text-gray-600 mt-2">Click here to add a new website</p>
          <Link
            to={`/admin/add`}
            className="mt-4 text-center bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded"
          >
            add website
          </Link>
        </div>

        {/* Card 2 */}
        <div className="card bg-white shadow-md rounded-md p-6 m-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-900 text-white">
            <FontAwesomeIcon icon={faList} size="lg" />
          </div>
          <h2 className="text-xl font-semibold mt-4">All Websites</h2>
          <p className="text-gray-600 mt-2">Click here to show website list.</p>
          <Link
            to={`/admin/data`}
            className="mt-4 bg-blue-900 text-center hover:bg-blue-800 text-white font-medium py-2 px-4 rounded"
          >
            show websites
          </Link>
        </div>
        <div className="card bg-white shadow-md rounded-md p-6 m-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-900 text-white">
            <FontAwesomeIcon icon={faList} size="lg" />
          </div>
          <h2 className="text-xl font-semibold mt-4">Add Category</h2>
          <p className="text-gray-600 mt-2">Click here to add a new category</p>
          <Link
            to={`/admin/add-category`}
            className="mt-4 bg-blue-900 text-center hover:bg-blue-800 text-white font-medium py-2 px-4 rounded"
          >
            add category
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
