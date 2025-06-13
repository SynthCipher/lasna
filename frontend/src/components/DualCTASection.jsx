import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DualCTASection = () => {
  const { setShowRecruiterLogin, companyToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handlePostJob = () => {
    if (companyToken) {
      // If company is logged in, redirect to add job page
      navigate("/dashboard/add-job");
    } else {
      // If not logged in, show recruiter login modal
      scrollTo(0, 0);
      setShowRecruiterLogin(true);
    }
  };

  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div
        className={`grid ${
          companyToken ? "lg:grid-cols-1" : "lg:grid-cols-2"
        } gap-8`}
      >
        {/* Recruiter CTA Section - Hide if company token exists */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 sm:p-12 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-blue-200 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-200 rounded-full blur-xl"></div>
          </div>

          {/* Modern Recruiter Character */}
          <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              className="text-blue-400"
            >
              {/* Professional recruiter with clipboard and resume */}
              {/* Head */}
              <circle
                cx="70"
                cy="32"
                r="16"
                fill="currentColor"
                className="opacity-80"
              />
              {/* Hair */}
              <path
                d="M54 24 Q70 18 86 24 Q86 28 70 30 Q54 28 54 24 Z"
                fill="currentColor"
                className="opacity-90"
              />
              {/* Body */}
              <path
                d="M50 45 Q70 40 90 45 L90 78 Q70 83 50 78 Z"
                fill="currentColor"
                className="opacity-60"
              />
              {/* Business suit jacket */}
              <path
                d="M52 48 Q70 43 88 48 L88 75 Q70 78 52 75 Z"
                fill="currentColor"
                className="opacity-70"
              />
              {/* Suit lapels */}
              <path
                d="M52 48 L60 55 L60 65 L52 60 Z"
                fill="currentColor"
                className="opacity-80"
              />
              <path
                d="M88 48 L80 55 L80 65 L88 60 Z"
                fill="currentColor"
                className="opacity-80"
              />
              {/* Tie */}
              <path
                d="M68 48 L72 48 L74 65 L70 70 L66 65 Z"
                fill="currentColor"
                className="opacity-90"
              />
              {/* Arms */}
              <ellipse
                cx="45"
                cy="60"
                rx="6"
                ry="15"
                fill="currentColor"
                className="opacity-65"
              />
              <ellipse
                cx="95"
                cy="60"
                rx="6"
                ry="15"
                fill="currentColor"
                className="opacity-65"
              />
              {/* Legs */}
              <rect
                x="60"
                y="78"
                width="8"
                height="25"
                fill="currentColor"
                className="opacity-60"
              />
              <rect
                x="72"
                y="78"
                width="8"
                height="25"
                fill="currentColor"
                className="opacity-60"
              />
              {/* Shoes */}
              <ellipse
                cx="64"
                cy="107"
                rx="6"
                ry="3"
                fill="currentColor"
                className="opacity-80"
              />
              <ellipse
                cx="76"
                cy="107"
                rx="6"
                ry="3"
                fill="currentColor"
                className="opacity-80"
              />

              {/* Clipboard with resume */}
              <rect
                x="30"
                y="50"
                width="18"
                height="24"
                rx="2"
                fill="currentColor"
                className="opacity-70"
              />
              <rect
                x="32"
                y="52"
                width="14"
                height="20"
                fill="white"
                className="opacity-90"
              />
              {/* Resume lines */}
              <rect
                x="34"
                y="55"
                width="10"
                height="1"
                fill="currentColor"
                className="opacity-50"
              />
              <rect
                x="34"
                y="58"
                width="8"
                height="1"
                fill="currentColor"
                className="opacity-50"
              />
              <rect
                x="34"
                y="61"
                width="12"
                height="1"
                fill="currentColor"
                className="opacity-50"
              />
              <rect
                x="34"
                y="64"
                width="6"
                height="1"
                fill="currentColor"
                className="opacity-50"
              />
              <rect
                x="34"
                y="67"
                width="9"
                height="1"
                fill="currentColor"
                className="opacity-50"
              />

              {/* Magnifying glass (talent search) */}
              <circle
                cx="105"
                cy="45"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-60"
              />
              <line
                x1="111"
                y1="51"
                x2="118"
                y2="58"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-60"
              />

              {/* Floating resume/CV icons */}
              <rect
                x="20"
                y="85"
                width="12"
                height="16"
                rx="1"
                fill="currentColor"
                className="opacity-40 animate-pulse"
              />
              <rect
                x="22"
                y="87"
                width="8"
                height="1"
                fill="white"
                className="opacity-60"
              />
              <rect
                x="22"
                y="89"
                width="6"
                height="1"
                fill="white"
                className="opacity-60"
              />
              <rect
                x="22"
                y="91"
                width="8"
                height="1"
                fill="white"
                className="opacity-60"
              />

              <rect
                x="110"
                y="75"
                width="12"
                height="16"
                rx="1"
                fill="currentColor"
                className="opacity-40 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <rect
                x="112"
                y="77"
                width="8"
                height="1"
                fill="white"
                className="opacity-60"
              />
              <rect
                x="112"
                y="79"
                width="6"
                height="1"
                fill="white"
                className="opacity-60"
              />
              <rect
                x="112"
                y="81"
                width="8"
                height="1"
                fill="white"
                className="opacity-60"
              />
            </svg>
          </div>

          {/* Floating job icons */}
          <div
            className="absolute bottom-6 left-6 opacity-25 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              className="text-indigo-400"
            >
              <rect
                x="8"
                y="12"
                width="24"
                height="16"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="12"
                y="8"
                width="16"
                height="4"
                rx="1"
                fill="currentColor"
              />
              <circle cx="16" cy="20" r="2" fill="white" />
              <circle cx="24" cy="20" r="2" fill="white" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="mb-6">
              {/* Enhanced Hire Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* Modern people/team icon */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Hire Top Talent
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Post your job openings and connect with qualified local
                candidates in Ladakh region
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Free job posting</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Local talent pool</span>
              </div>
              {/* <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">
                  Easy application management
                </span>
              </div> */}
            </div>

            <button
              onClick={handlePostJob}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Post a Job
            </button>
          </div>
        </div>

        {/* Contact/Website CTA Section */}
        <div className="relative bg-gradient-to-br from-emerald-50 to-teal-100 p-8 sm:p-12 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-32 h-32 bg-emerald-200 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-teal-200 rounded-full blur-xl"></div>
          </div>

          {/* Modern Web Developer Character */}
          <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              className="text-emerald-400"
            >
              {/* Modern developer with multiple screens */}
              {/* Head */}
              <circle
                cx="70"
                cy="30"
                r="14"
                fill="currentColor"
                className="opacity-80"
              />
              {/* Trendy hair */}
              <path
                d="M56 20 Q70 14 84 20 Q84 24 80 26 Q70 24 60 26 Q56 24 56 20 Z"
                fill="currentColor"
                className="opacity-90"
              />
              {/* Glasses */}
              <circle
                cx="65"
                cy="28"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-70"
              />
              <circle
                cx="75"
                cy="28"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-70"
              />
              <line
                x1="69"
                y1="28"
                x2="71"
                y2="28"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-70"
              />

              {/* Body */}
              <path
                d="M54 42 Q70 37 86 42 L86 70 Q70 75 54 70 Z"
                fill="currentColor"
                className="opacity-60"
              />
              {/* Hoodie/casual wear */}
              <path
                d="M56 44 Q70 39 84 44 L84 68 Q70 72 56 68 Z"
                fill="currentColor"
                className="opacity-65"
              />
              {/* Hood */}
              <path
                d="M56 44 Q70 38 84 44 Q80 40 70 40 Q60 40 56 44 Z"
                fill="currentColor"
                className="opacity-75"
              />

              {/* Arms */}
              <ellipse
                cx="48"
                cy="55"
                rx="5"
                ry="12"
                fill="currentColor"
                className="opacity-65"
              />
              <ellipse
                cx="92"
                cy="55"
                rx="5"
                ry="12"
                fill="currentColor"
                className="opacity-65"
              />

              {/* Legs */}
              <rect
                x="62"
                y="70"
                width="7"
                height="22"
                fill="currentColor"
                className="opacity-60"
              />
              <rect
                x="71"
                y="70"
                width="7"
                height="22"
                fill="currentColor"
                className="opacity-60"
              />
              {/* Sneakers */}
              <ellipse
                cx="65"
                cy="95"
                rx="7"
                ry="3"
                fill="currentColor"
                className="opacity-80"
              />
              <ellipse
                cx="74"
                cy="95"
                rx="7"
                ry="3"
                fill="currentColor"
                className="opacity-80"
              />

              {/* Main laptop/screen */}
              <rect
                x="35"
                y="50"
                width="35"
                height="22"
                rx="2"
                fill="currentColor"
                className="opacity-70"
              />
              <rect
                x="37"
                y="52"
                width="31"
                height="16"
                fill="white"
                className="opacity-90"
              />

              {/* Code on screen */}
              <rect
                x="39"
                y="54"
                width="8"
                height="1"
                fill="currentColor"
                className="opacity-40"
              />
              <rect
                x="39"
                y="56"
                width="12"
                height="1"
                fill="currentColor"
                className="opacity-40"
              />
              <rect
                x="41"
                y="58"
                width="6"
                height="1"
                fill="currentColor"
                className="opacity-40"
              />
              <rect
                x="41"
                y="60"
                width="10"
                height="1"
                fill="currentColor"
                className="opacity-40"
              />
              <rect
                x="39"
                y="62"
                width="14"
                height="1"
                fill="currentColor"
                className="opacity-40"
              />
              <rect
                x="43"
                y="64"
                width="8"
                height="1"
                fill="currentColor"
                className="opacity-40"
              />

              {/* Second monitor */}
              <rect
                x="75"
                y="35"
                width="28"
                height="18"
                rx="2"
                fill="currentColor"
                className="opacity-60"
              />
              <rect
                x="77"
                y="37"
                width="24"
                height="12"
                fill="white"
                className="opacity-80"
              />
              {/* Website mockup on second screen */}
              <rect
                x="79"
                y="39"
                width="20"
                height="2"
                fill="currentColor"
                className="opacity-30"
              />
              <rect
                x="79"
                y="42"
                width="8"
                height="1"
                fill="currentColor"
                className="opacity-30"
              />
              <rect
                x="79"
                y="44"
                width="12"
                height="1"
                fill="currentColor"
                className="opacity-30"
              />
              <rect
                x="79"
                y="46"
                width="6"
                height="1"
                fill="currentColor"
                className="opacity-30"
              />

              {/* Coffee cup */}
              <ellipse
                cx="25"
                cy="65"
                rx="4"
                ry="6"
                fill="currentColor"
                className="opacity-60"
              />
              <path
                d="M29 62 Q32 62 32 65 Q32 68 29 68"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-60"
              />
              {/* Steam */}
              <path
                d="M23 58 Q24 56 23 54"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="opacity-40"
              />
              <path
                d="M25 58 Q26 56 25 54"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="opacity-40"
              />
              <path
                d="M27 58 Q28 56 27 54"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="opacity-40"
              />

              {/* Floating design elements */}
              <rect
                x="110"
                y="70"
                width="15"
                height="10"
                rx="2"
                fill="currentColor"
                className="opacity-40 animate-pulse"
              />
              <circle
                cx="112"
                cy="72"
                r="1"
                fill="white"
                className="opacity-60"
              />
              <circle
                cx="115"
                cy="72"
                r="1"
                fill="white"
                className="opacity-60"
              />
              <rect
                x="112"
                y="75"
                width="8"
                height="0.5"
                fill="white"
                className="opacity-50"
              />
              <rect
                x="112"
                y="77"
                width="6"
                height="0.5"
                fill="white"
                className="opacity-50"
              />

              {/* Mobile devices */}
              <rect
                x="15"
                y="80"
                width="8"
                height="12"
                rx="2"
                fill="currentColor"
                className="opacity-40 animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <rect
                x="16"
                y="82"
                width="6"
                height="8"
                fill="white"
                className="opacity-60"
              />
            </svg>
          </div>

          {/* Floating website elements */}
          <div className="absolute bottom-8 left-8 opacity-25 animate-pulse">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              className="text-teal-400"
            >
              <rect
                x="5"
                y="8"
                width="25"
                height="19"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="7"
                y="10"
                width="21"
                height="2"
                fill="white"
                className="opacity-70"
              />
              <circle
                cx="9"
                cy="13"
                r="1"
                fill="white"
                className="opacity-70"
              />
              <circle
                cx="12"
                cy="13"
                r="1"
                fill="white"
                className="opacity-70"
              />
              <rect
                x="7"
                y="16"
                width="15"
                height="1"
                fill="white"
                className="opacity-50"
              />
              <rect
                x="7"
                y="18"
                width="18"
                height="1"
                fill="white"
                className="opacity-50"
              />
              <rect
                x="7"
                y="20"
                width="12"
                height="1"
                fill="white"
                className="opacity-50"
              />
            </svg>
          </div>

          {/* Phone icon */}
          <div
            className="absolute top-16 left-8 opacity-20 animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              className="text-emerald-500"
            >
              <rect
                x="8"
                y="4"
                width="14"
                height="22"
                rx="3"
                fill="currentColor"
              />
              <rect
                x="10"
                y="7"
                width="10"
                height="14"
                fill="white"
                className="opacity-80"
              />
              <circle
                cx="15"
                cy="23"
                r="1.5"
                fill="white"
                className="opacity-80"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="mb-6">
              {/* Enhanced Website Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Need a Website?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Get a professional website for your business with{" "}
                <span className="font-semibold text-emerald-700">Onela</span>
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium">
                  Custom website design
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium">
                  Local business focus
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:onela.tech.ladakh@gmail.com"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email
              </a>

              <a
                href="https://wa.me/919682574824"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-emerald-600 font-semibold px-6 py-3 rounded-xl border-2 border-emerald-200 transition-all duration-200 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualCTASection;
