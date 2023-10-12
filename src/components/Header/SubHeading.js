import React, { useState } from "react";
import FormComponent from "../Admin/AddProduct";

const SuggestionForm = ({ show, onClose }) => {
  const [suggestion, setSuggestion] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the suggestion to the backend or perform any other actions
    // For this example, we'll just log it to the console
    console.log(suggestion);
    onClose(); // Close the form after submitting the suggestion
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white ${
        show ? "block" : "hidden"
      }`}
      style={{ zIndex: show ? 50 : -1 }}
    >
      <div className="flex flex-col">
        <FormComponent apiUrl={"/data/suggest"} />
        <button onClick={onClose}>close</button>
      </div>
    </div>
  );
};
function SubHeading() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="content-header">
      <div className="content-header-intro">
        <h2>Darul Huda Web Library</h2>
        <p>Collection of Educational and Useful Websites</p>
      </div>
      <div className="content-header-actions">
        <a href="#" className="button">
          <i className="ph-faders-bold" />
          <span>Filters</span>
        </a>
        <a href="#" className="button">
          <i className="ph-plus-bold" />
          <button onClick={handleOpenForm}>Suggest Other</button>
          <SuggestionForm show={isFormOpen} onClose={handleCloseForm} />
        </a>
      </div>
    </div>
  );
}

export default SubHeading;
