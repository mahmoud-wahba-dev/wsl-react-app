import React from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png";

const items = [
  { name: "عن المنصة", to: "/about" },
  { name: "الشروط والأحكام", to: "/terms" },
  { name: "اتصل بنا", to: "/contact" },
];

const Year = new Date().getFullYear().toLocaleString("ar-SA");
const Footer = () => {
  return (
    <footer className="bg-[#EEF4FF] border border-[#BDC9C5] text-base-content">
      <div className="container">
        <div className="footer justify-between sm:footer-horizontal items-center  py-10">
          <aside>
                <img className="max-w-full max-h-full h-24" height={"65"} src={logo} alt="" />
          </aside>
          <nav className="flex  gap-8 xl:gap-16">
            {items.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="link link-hover font-normal text-xs text-[#3E4946]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <nav>
            <p className="font-normal text-xs text-[#3E4946]">
              © {Year} وصل. جميع الحقوق محفوظة.
            </p>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
