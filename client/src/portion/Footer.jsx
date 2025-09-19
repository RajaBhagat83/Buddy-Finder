import React from "react";

function Footer({heading,h1,h2,h3,h4}) {
  return (
    <div>
      <div className="p-3 md:p-28 md:ml-28 ml-3">
        <div className="font-semibold mb-4 cursor-pointer">
          <h1>{heading}</h1>
        </div>
        <div className="text-sm">
          <h1 className="mb-3 cursor-pointer ">{h1}</h1>
          <h1 className="mb-3 cursor-pointer " >{h2}</h1>
          <h1 className="mb-3 cursor-pointer ">{h3}</h1>
          <h1 className="mb-3 cursor-pointer ">{h4}</h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
