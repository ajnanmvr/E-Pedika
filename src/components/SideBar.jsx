import React from "react";

function SideBar() {
  return (
    <div className="content-panel">
      <div className="vertical-tabs">
        <a href="#" className="active">
          View all
        </a>
        <a href="#">Developer tools</a>
        <a href="#">Communication</a>
        <a href="#">Productivity</a>
        <a href="#">Browser tools</a>
        <a href="#">Marketplace</a>
      </div>
    </div>
  );
}

export default SideBar;
