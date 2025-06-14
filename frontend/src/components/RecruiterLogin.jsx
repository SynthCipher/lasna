import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }
    if (state === "Login") {
      const { data } = await axios.post(backendUrl + "/api/company/login", {
        email,
        password,
      });

      if (data.success) {
        // toast.success(data.message)
        setCompanyToken(data.token);
        setCompanyData(data.company);
        localStorage.setItem("companyToken", data.token);
        setShowRecruiterLogin(false);
        navigate("/dashboard");

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/company/register",
        formData
      );

      if (data.success) {
        setCompanyToken(data.token);
        setCompanyData(data.company);
        localStorage.setItem("companyToken", data.token);
        setShowRecruiterLogin(false);
        navigate("/dashboard");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };
  // Handle click outside the form
  const handleBackdropClick = (e) => {
    console.log(e.target)
    console.log(e.currentTarget)
    // Only close if clicking directly on the backdrop, not on the form
    if (e.target === e.currentTarget) {
      setShowRecruiterLogin(false);
    }
  };

  // useEffect(() => {
  //   console.log(name, email, password);
  // }, [name, email, password]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      onClick={handleBackdropClick}
      className="absolute z-10 max-h-screen  top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/30 flex justify-center items-center"
    >
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm text-center text-gray-600 mt-2">
          {state === "Login"
            ? "Welcome back! Please sign in to continue."
            : isTextDataSubmitted
            ? "Upload your logo to finish."
            : "Create your recruiter account."}
        </p>

        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
            <div className="flex flex-col items-center gap-4 my-10">
              <label
                htmlFor="image"
                className="cursor-pointer flex flex-col items-center"
              >
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 shadow-sm"
                  alt="Upload"
                />
                <span className="mt-3 text-sm text-gray-600">
                  Upload Company Logo
                </span>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            </div>
            <img
              onClick={() => {
                setIsTextDataSubmitted(false);
              }}
              src={assets.back_arrow_icon}
              className="absolute top-5 left-5 cursor-pointer "
              alt=""
            />
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border flex px-4 py-2  border-gray-300 items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}
            <div className="border flex px-4 py-2 border-gray-300 items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="company@email.com"
                required
              />
            </div>
            <div className="border flex px-4 border-gray-300 py-2 items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}
        {state === "Login" && (
          <p className="text-xs text-end text-blue-600  mt-1 ml-1 cursor-pointer">
            Forget Password?{" "}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-600 w-full cursor-pointer mt-4 text-white py-2 rounded-full"
        >
          {state === "Login"
            ? "login"
            : isTextDataSubmitted
            ? "create Account"
            : "Next"}
        </button>

        {state === "Login" ? (
          <p className="text-sm mt-5 text-center">
            Don't have an account?{"  "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          !isTextDataSubmitted && (
            <p className="text-sm mt-5 text-center">
              Already have an account{"  "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </p>
          )
        )}
        <img
          onClick={() => {
            setShowRecruiterLogin(false);
          }}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer "
          alt=""
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
