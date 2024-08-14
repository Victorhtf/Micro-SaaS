import { useTranslationContext } from "../../../../contexts/TranslationProvider";
import { Link } from "react-router-dom";

export default function Header() {
  const { t } = useTranslationContext();

  return (
    <header className="bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4 items-center py-4">
          {/* Logo */}
          <div className="col-span-3 flex items-center">
            <div className="text-lg font-bold text-gray-800">
              {t("website.Logo", { ns: "translation" })}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="col-span-4 flex items-center">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Link
                    to="/home"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t("sections.Home", { ns: "translation" })}
                  </Link>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Link
                    to="/dashboards"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t("sections.Dashboards", { ns: "translation" })}
                  </Link>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Link
                    to="/posts"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t("sections.Posts", { ns: "translation" })}
                  </Link>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Link
                    to="/analytics"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t("sections.Analytics", { ns: "translation" })}
                  </Link>
                </a>
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
            <img
              src="../../../profile.png"
              alt="Your Image"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-bold text-gray-600 ml-3">Your name</p>
              <p className="font-medium text-sm text-gray-600 ml-3">
                Marketing Manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
