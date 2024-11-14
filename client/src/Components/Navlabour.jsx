import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faHome, faBriefcase, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import { AuthContext } from "../AuthContext";
import customFetch from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Navlabour = () => {
  const { t, i18n } = useTranslation();
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const location = useLocation();
 const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [datafinal, setdatafinal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      if (isLoggedIn) {
      try {
        const response = await customFetch.get("/users/current-user");
         const user = response.data.user.account;
            setdatafinal(user);
       } catch (error) {
        console.error("Error fetching jobs:", error);
      }
}
      setIsLoading(false);
    };

    fetchJobs();
  }, [isLoggedIn]);

   const handleLogout = async () => {
     try {
      await customFetch.get("/auth/logout");
      toast.success("Logged out successfully!");
      navigate("/");
      setIsLoggedIn(false);
      setdatafinal([]);
    } catch (error) {
      console.error("Error during logout", error);
    }
     
   };
useEffect(() => {
  const getPages = () => {
    let pages = [
      { text: t("language"), icon: faGlobe },
      { text: t("home.1"), path: "/labourhomepage", icon: faHome },
      { text: t("findJob.1"), path: "/labourjobs", icon: faBriefcase },
    ];

    switch (datafinal) {
      case "Labourer":
        pages.push({
          text: t("Payment Track"),
          path: "/paytrack",
          icon: faUser,
        });
        pages.push({
          text: t("Profile"),
          path: "/labour-profile",
          icon: faUser,
        });
        break;
      case "Labour Agency":
        pages.push({
          text: t("Agency Dashboard"),
          path: "/agencyhome",
          icon: faUser,
        });
  
        break;
      case "Employer":
        pages.push({
          text: t("Employer Dashboard"),
          path: "/labour-employer-home",
          icon: faHome,
        });

        break;
      default:
  
        break;
    }

    pages.push(
      isLoggedIn
        ? {
            text: t("Logout"),
            path: "/labourhomepage",
            onClick: handleLogout,
            icon: faSignInAlt,
          }
        : { text: t("signIn.1"), path: "/labour-signin", icon: faSignInAlt }
    );

    return pages; 
  };

  setPages(getPages()); 
}, [isLoggedIn, datafinal]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setIsLanguageDropdownOpen(false); 
  };

  function handleClick(lang) {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang); 
    setIsLanguageDropdownOpen(false);
  }

  const logoStyle = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "24px",
    color: "white",
    display: "flex",
    alignItems: "center",
  };

  const menuIconStyle = {
    cursor: "pointer",
  };

  if (isLoading) {
    return null; // Optionally, return a loading indicator here
  }

  return (
    <nav
      className="bg-blue-500 p-4 z-40"
      style={{ backgroundColor: "#0F4C75" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div style={logoStyle}>
          <Link to="/" className="font-poppins text-white">
            <span className="font-bold">{t("Work.1")}</span>
            <span className="font-bold font-poppins text-blue-400">
              {t("Wagon.1")}
            </span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 z-50">
          {pages.map((page) => (
            <div key={page.text} className="relative">
              {page.text === t("language") && isLanguageDropdownOpen && (
                <div className="absolute top-10 right-0 bg-white text-black p-2 rounded-lg w-48">
                  <button
                    onClick={() => handleClick("en")}
                    className={`w-full text-left py-2 px-4 hover:bg-blue-200 ${
                      selectedLanguage === "en" ? "font-semibold" : ""
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleClick("hi")}
                    className={`w-full text-left py-2 px-4 hover:bg-blue-200 ${
                      selectedLanguage === "hi" ? "font-semibold" : ""
                    }`}
                  >
                    Hindi
                  </button>
                </div>
              )}
              <Link
                to={page.path}
                onClick={page.onClick}
                className={`text-white text-lg font-poppins flex items-center ${
                  location.pathname === page.path ? "font-semibold" : ""
                }`}
              >
                {page.icon && (
                  <FontAwesomeIcon icon={page.icon} className="mr-2" />
                )}
                {page.text === t("language") ? (
                  <span onClick={toggleLanguageDropdown}>
                    {t(selectedLanguage)}
                  </span>
                ) : (
                  t(page.text)
                )}
              </Link>
            </div>
          ))}
        </div>
        <div className="md:hidden" style={menuIconStyle}>
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={toggleMobileMenu}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={toggleMobileMenu}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </div>
      </div>
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden text-white mt-4`}
      >
        {pages.map((page) => (
          <Link
            key={page.text}
            to={page.path}
            className={`px-4 py-2 hover:font-semibold text-lg font-poppins flex items-center ${
              location.pathname === page.path ? "font-semibold" : ""
            }`}
          >
            {page.icon && <FontAwesomeIcon icon={page.icon} className="mr-2" />}
            {page.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlabour;
