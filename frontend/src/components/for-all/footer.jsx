import React from "react";

function Footer() {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <div className="footer text-center">
      <p>Made with ❤️ by Riya Jain</p>
      <p>Copyright @ {year}</p>
    </div>
  );
}

export default Footer;
