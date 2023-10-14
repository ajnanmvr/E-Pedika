import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminTable from "./components/Admin/Table";
import ViewProduct from "./components/SingleItem";
import Home from "./components/Home";
import List from "./components/List";
import AddProduct from "./components/Admin/AddProduct";
import EditProduct from "./components/Admin/EditProduct";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminRoute from "./components/Admin/AdminRoute";
import { UserContext } from "./contexts/UserContext";
import Dashboard from "./components/Admin/Dashboard";
import AddCategory from "./components/Admin/AddCategory";
import Axios from "./Axios";
import Contact from "./components/Contact";

function App() {
  const { getUserDataFromLocalStorage } = useContext(UserContext);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    getUserDataFromLocalStorage();
    Axios.get("/data")
      .then((response) => {
        setFullData(response.data.data)
        console.log(fullData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="bg-white">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home fullData={fullData} />} />
          <Route path="/items" element={<List fullData={fullData} category={"All"} />} />
          <Route
            path="/essentials"
            element={<List fullData={fullData} category={"Essentials"} />}
          />
          <Route
            path="/stationary"
            element={<List fullData={fullData} category={"Stationary"} />}
          />
          <Route path="/book-cell" element={<List fullData={fullData} category={"Books"} />} />
          <Route path="/tea-stall" element={<List fullData={fullData} category={"Tea Stall"} />} />
          <Route path="/search" element={<List fullData={fullData} category={"All"} />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/item/:slug" element={<ViewProduct />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/admin/data"
            element={<AdminTable apiUrl={"/data"}/>}
          />
          <Route
            path="/admin/suggestions"
            element={
              <AdminTable
                apiUrl={"/data/type/suggestion"}
                title={"Suggestion"}
              />
            }
          />
          <Route
            path="/admin/data/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <AddProduct apiUrl={"/data"} />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
