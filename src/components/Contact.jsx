import React from "react";

function Contact() {
  return (
    <div className="flex justify-center items-center content-center gap-5 pt-10 pb-16">
      <div className="h-[500px] w-[500px]">
        <img
          src="https://pbs.twimg.com/profile_images/913809136315281408/hVDPZGi5_400x400.jpg"
          alt="Thumbnail"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-3">
        <h2 className="font-bold text-primary text-3xl">
          Al Huda Students Association
        </h2>

        <p className="text-slate-600 leading-5 mt-2">
          Darul Huda Islamic University <br />
          Hidaya Nagar, Chammad, Tirurangadi PO <br />
          Malappuram Dist. Pin: 676306, Kerala, India <br />
          <br />
          Email: asas@dhiu.in | Phone :+91494-2463155 <br />
          Fax: 0494 2460575 <br />
        </p>

        <a href="mailto:asasdarulhuda@gmail.com">
          <button
            type="submit"
            className="rounded-lg border-2 border-primary font-semibold fill-white mt-5 bg-primary text-white px-6 py-[6px] flex items-center gap-2"
          ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
            Connect Via Email
          </button>
        </a>
      </div>
    </div>
  );
}

export default Contact;
