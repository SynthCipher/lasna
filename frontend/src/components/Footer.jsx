import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="container border-t border-gray-300 mt-5  px-4 mb-2 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 ">
      <img
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
        className="h-6 cursor-pointer"
        src={assets.lasnalogo}
        alt=""
      />
      <p className="flex-1 border-l border-gray-400 pl-4  text-sm text-gray-500 ">
        <a className="text-gray-800" href="https://jigmatdorjey.vercel.app/">
          <span className="text-lg">@</span>SynthCipher
        </a>{" "}
      </p>
      <div className="flex gap-2.5">
        <img width={28} src={assets.facebook_icon} alt="" />
        <img width={28} src={assets.instagram_icon} alt="" />
        <img width={28} src={assets.twitter_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
