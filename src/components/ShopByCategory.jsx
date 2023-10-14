import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ShopByCategory() {
  return (
    <section className="bg-gray-100 h-screen flex justify-center items-center content-center flex-col ">
      <h1 className="text-center font-bold text-3xl text-black mt-24">
        Shop By Category
      </h1>
      <div className="flex justify-center gap-4 p-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link to={"/essentials"}>
            <div className="bg-center bg-[url('https://m.media-amazon.com/images/I/919+9HAau-L._AC_UF1000,1000_QL80_.jpg')] bg-cover overflow-hidden h-96 w-72 rounded-xl flex flex-col justify-end">
              <div className="bg-primary p-5">
                <p className="text-xl font-bold text-white">Essentials</p>
              </div>
            </div>
          </Link>{" "}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link to={"/stationary"}>
            <div className="bg-center bg-[url('https://thumbs.dreamstime.com/b/flat-lay-composition-school-stationery-yellow-background-different-space-text-151757133.jpg')] bg-cover overflow-hidden h-96 w-72 rounded-xl flex flex-col justify-end">
              <div className="bg-primary p-5">
                <p className="text-xl font-bold text-white">Stationary</p>
              </div>
            </div>
          </Link>{" "}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link to={"/book-cell"}>
            <div className="bg-center bg-[url('https://i.pinimg.com/736x/5e/88/af/5e88af6974e1436997a2b2e9a358fee3.jpg')] bg-cover overflow-hidden h-96 w-72 rounded-xl flex flex-col justify-end">
              <div className="bg-primary p-5">
                <p className="text-xl font-bold text-white">Books</p>
              </div>
            </div>
          </Link>{" "}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link to={"/tea-stall"}>
            <div className="bg-center bg-[url('https://images.unsplash.com/photo-1536815949980-5575fdcd2279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZmZlZSUyMHRlYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80')] bg-cover overflow-hidden h-96 w-72 rounded-xl flex flex-col justify-end">
              <div className="bg-primary p-5">
                <p className="text-xl font-bold text-white">Tea Stall</p>
              </div>
            </div>
          </Link>{" "}
        </motion.div>
      </div>
    </section>
  );
}

export default ShopByCategory;
