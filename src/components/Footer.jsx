import React from "react";

function Footer() {
  return (
<footer className="bg-primary text-white text-sm p-12">
      <div className="flex flex-wrap gap-7">
        <div className="w-3/4">
          <img
            src="/logos/logo3.png" // Path to the image in the public folder
            alt="Realia Logo"
            className="h-10 md:h-12"
          />
        </div>
        <div className="font-light ">
          <p className="font-semibold">Address</p>
          <p>
            Darul Huda Islamic University <br />
            Hidaya Nagar, Chammad, Tirurangadi PO <br />
            Malappuram Dist. Pin: 676306, Kerala, India
            <br />
            <br />
            Email: asas@dhiu.in | Phone :+91494-2463155 <br />
            Fax: 0494 2460575
          </p>
        </div>
      </div>

      <p className="mt-5">&copy; 2023 Realia, All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
