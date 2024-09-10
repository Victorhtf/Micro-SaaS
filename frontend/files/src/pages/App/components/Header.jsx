import { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTranslationContext } from "../../../contexts/TranslationProvider";

export default function Header() {
  const { t } = useTranslationContext();
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4 items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            <div onClick={() => {}} className="col-span-3 flex items-center">
              <div className="text-lg font-bold text-gray-800">
                {t("website.Logo", { ns: "translation" })}
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="col-span-4 flex items-center">
            <ul className="flex space-x-4">
              <li>
                <Link to="/home" className="text-gray-600 hover:text-blue-600">
                  {t("sections.Home", { ns: "translation" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboards"
                  className="text-gray-600 hover:text-blue-600"
                >
                  {t("sections.Dashboards", { ns: "translation" })}
                </Link>
              </li>
              <li>
                <Link to="/posts" className="text-gray-600 hover:text-blue-600">
                  {t("sections.Posts", { ns: "translation" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="text-gray-600 hover:text-blue-600"
                >
                  {t("sections.Analytics", { ns: "translation" })}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="col-span-3 flex items-center">
            <input
              type="text"
              placeholder={t("Search", { ns: "translation" })}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            />
          </div>

          {/* User Image and Name */}
          <div className="col-span-2 flex items-center justify-center">
            <div className="flex mx-4 items-center content-center">
              <IoMdNotifications
                size={20}
                className="h-8 w-8 text-gray-600 hover:text-gray-700 transition duration-300"
              />
            </div>
            <img
              src="../../../profile.png"
              alt="Your Image"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="font-bold text-gray-600">Your name</p>
              <p className="font-medium text-sm text-gray-600">
                Marketing Manager
              </p>
            </div>

            {/* Language Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={toggleDropdown}
                className="relative inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <span>{i18n.language === "en" ? "EN" : "PT"}</span>
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => changeLanguage("pt-BR")}
                  >
                    🇧🇷 Portuguese
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => changeLanguage("en")}
                  >
                    🇺🇸 English
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
