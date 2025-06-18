import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="container border-t border-gray-300 mt-5 px-4 mb-2 2xl:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-5 text-sm text-gray-500">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          className="h-6 cursor-pointer"
          src={assets.lasnalogo}
          alt="Lasna Logo"
        />
        <span className="sm:inline-block border-l h-4 border-gray-400"></span>
        <a
          className="text-gray-800 hover:underline"
          // href="https://jigmatdorjey.vercel.app"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-base">@</span> Onela - SynthCipher
        </a>
      </div>

      {/* Links Section */}
      <div className="flex flex-wrap items-center gap-4">
        <a href="/terms" className="hover:underline">
          Terms & Conditions
        </a>
        <span className="hidden sm:inline-block">|</span>
        <a href="/privacy" className="hover:underline">
          Privacy Policy
        </a>
      </div>

      {/* Social Section
      <div className="flex gap-2.5">
        <img width={28} src={assets.facebook_icon} alt="Facebook" />
        <img width={28} src={assets.instagram_icon} alt="Instagram" />
   
      </div> */}
    </div>
  );
};

export default Footer;
