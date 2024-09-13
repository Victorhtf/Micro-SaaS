import { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTranslationContext } from "../../../contexts/TranslationProvider";
import { useAuth } from "../../../contexts/AuthProvider";

export default function Header() {
  const { t } = useTranslationContext();
  const { i18n } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { logout, isAuthenticated } = useAuth();

  function handleLogout() {
    logout();
  }

  const toggleProfileDropdown = () => {
    setActiveDropdown(activeDropdown === "profile" ? null : "profile");
  };

  const toggleLanguageDropdown = () => {
    setActiveDropdown(activeDropdown === "language" ? null : "language");
  };

  const toggleNotificationsDropdown = () => {
    setActiveDropdown(
      activeDropdown === "notifications" ? null : "notifications"
    );
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setActiveDropdown(null);
  };

  // DOM EvetListener to identifies and close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-background-color border-b border-border-color shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="text-text-color hover:text-hover-color">
              <div className="text-lg font-bold text-text-color">
                {t("website.logo", { ns: "translation" })}
              </div>
            </Link>

            {/* Navigation Links */}
            {isAuthenticated && (
              <nav className="flex space-x-4">
                <Link
                  to="/home"
                  className="text-text-color hover:text-hover-color"
                >
                  {t("sections.home", { ns: "translation" })}
                </Link>
                <Link
                  to="/dashboards"
                  className="text-text-color hover:text-hover-color"
                >
                  {t("sections.dashboards", { ns: "translation" })}
                </Link>
                <Link
                  to="/posts"
                  className="text-text-color hover:text-hover-color"
                >
                  {t("sections.posts", { ns: "translation" })}
                </Link>
                <Link
                  to="/analytics"
                  className="text-text-color hover:text-hover-color"
                >
                  {t("sections.analytics", { ns: "translation" })}
                </Link>
              </nav>
            )}
          </div>

          {/* Right side - Authentication, Profile, Notifications, and Language Selector */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="col-span-3 flex items-center">
              <input
                type="text"
                placeholder={t("Search", { ns: "translation" })}
                className="  flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg w-full bg-background-color hover:bg-hover-color text-text-color transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
              />
            </div>
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative dropdown">
                  <button
                    onClick={toggleNotificationsDropdown}
                    className="relative flex items-center justify-center h-10 w-10 rounded-full bg-background-color hover:bg-hover-color text-text-color transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
                  >
                    <IoMdNotifications
                      size={24}
                      className="h-6 w-6 text-text-color"
                    />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-error-color"></span>
                  </button>

                  {activeDropdown === "notifications" && (
                    <ul className="absolute right-0 mt-2 w-64 bg-background-color border border-border-color shadow-lg rounded-md z-20">
                      <li className="px-4 py-2 text-text-color hover:bg-hover-color cursor-pointer">
                        {t("notifications.new_message", { ns: "translation" })}
                      </li>
                      <li className="px-4 py-2 text-text-color hover:bg-hover-color cursor-pointer">
                        {t("notifications.update_available", {
                          ns: "translation",
                        })}
                      </li>
                      <li className="px-4 py-2 text-text-color hover:bg-hover-color cursor-pointer">
                        {t("notifications.action_required", {
                          ns: "translation",
                        })}
                      </li>
                    </ul>
                  )}
                </div>

                {/* Profile */}
                <div className="relative dropdown">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center cursor-pointer space-x-3 hover:bg-hover-color rounded-lg p-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
                  >
                    <img
                      src="../../../profile.png"
                      alt={t("profile.image_alt", { ns: "translation" })}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-text-color">Your name</p>
                      <p className="font-medium text-sm text-text-color">
                        Marketing manager
                      </p>
                    </div>
                  </button>

                  {activeDropdown === "profile" && (
                    <ul className="absolute mt-2 w-48 bg-background-color border border-border-color shadow-lg rounded-md z-10">
                      <li className="px-4 py-2 text-text-color hover:bg-hover-color cursor-pointer">
                        {t("profile.my_profile", { ns: "translation" })}
                      </li>
                      <li className="px-4 py-2 text-text-color hover:bg-hover-color cursor-pointer">
                        {t("profile.settings", { ns: "translation" })}
                      </li>
                      <li
                        onClick={() => handleLogout()}
                        className="px-4 py-2 text-text-color hover:bg-hover-color cursor-pointer"
                      >
                        {t("profile.logout", { ns: "translation" })}
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="text-text-color hover:text-hover-color">
                  {t("login.sign_in", { ns: "translation" })}
                </Link>
                <Link
                  to="/register"
                  className="text-text-color hover:text-hover-color"
                >
                  {t("login.register", { ns: "translation" })}
                </Link>
              </>
            )}

            {/* Language dropdown */}
            <div className="relative dropdown">
              <button
                onClick={toggleLanguageDropdown}
                className="inline-flex items-center px-2 py-2 border border-border-color text-sm font-medium rounded-md text-text-color bg-background-color hover:bg-hover-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color transition duration-150 ease-in-out"
              >
                <span>{i18n.language === "en" ? "EN 🇺🇸" : "PT 🇧🇷"}</span>
              </button>
              {activeDropdown === "language" && (
                <ul className="absolute left-0 mt-2 w-48 bg-background-color border border-border-color shadow-lg rounded-md z-10">
                  <li
                    className="text-text-color px-4 py-2 hover:bg-hover-color cursor-pointer"
                    onClick={() => changeLanguage("pt-BR")}
                  >
                    🇧🇷 {t("language.portuguese", { ns: "translation" })}
                  </li>
                  <li
                    className="text-text-color px-4 py-2 hover:bg-hover-color cursor-pointer"
                    onClick={() => changeLanguage("en")}
                  >
                    🇺🇸 {t("language.english", { ns: "translation" })}
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
