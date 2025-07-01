import "react";
import "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { BookMarked, CirclePlus } from 'lucide-react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Divider,
} from "@heroui/react";

export default function StudentNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleMobileNavigation = (item) => {
    if (item === "Your Classes") navigate("/student/classes");
    else if (item === "Explore") navigate("/student/explore");
    else handleLogout();
    setIsMenuOpen(false); // Close the mobile menu after navigation
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Your Classes", "Explore", "Log Out"];

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen} // Control the menu state
        onMenuOpenChange={setIsMenuOpen} // Update the menu state
        className={`transition-all duration-300 ${isSticky ? "shadow-[0_4px_6px_-1px_rgba(59,130,246,0.5)]" : ""}`}
        style={{ 
          position: "fixed", 
          top: "0", 
          width: "100%", 
          maxWidth: "1440px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          zIndex: 1000, 
          padding: "0 24px", 
          background: "rgba(4, 9, 28, 0.5)", 
          backdropFilter: "blur(6px)", 
          height: "80px", 
          display: "flex",
          alignItems: "center", 
        }} 
      >
        {/* Left Section */}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-secondary"
            onPress={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state
          />
          <NavbarBrand>
            <img
              draggable="false"
              src={Logo}
              width="140"
              className="sm:w-[160px]"
              alt="Logo"
              style={{ filter: "none" }}
            />
          </NavbarBrand>
        </NavbarContent>

        {/* Centered Section */}
        <NavbarContent className="hidden sm:flex gap-8 flex-grow" justify="center">
          <NavbarItem>
            <Button
              onPress={() => navigate("/student/classes")}
              variant="light"
              className="text-secondary text-md hover:scale-105 sm:hover:scale-105 transition-transform duration-300 group"
              color="secondary"
              endContent={<BookMarked className="group-hover:animate-bounce group-hover:text-primary transition-all duration-300" />}
              style={{ backdropFilter: "none" }}
            >
              Your Classes
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              onPress={() => navigate("/student/explore")}
              variant="light"
              className="text-secondary text-md hover:scale-105 sm:hover:scale-105 transition-transform duration-300 group"
              color="secondary"
              endContent={<CirclePlus className="group-hover:animate-bounce group-hover:text-primary transition-all duration-300" />}
              style={{ backdropFilter: "none" }}
            >
              Explore
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Right Section */}
        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem>
            <Button 
              onPress={handleLogout} 
              color="danger" 
              variant="ghost"
              style={{ backdropFilter: "none" }}
            >
              Log Out
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        {isMenuOpen && ( // Only render the menu if isMenuOpen is true
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Button
                  className="w-full justify-start text-md group"
                  color={index === 2 ? "danger" : "secondary"}
                  variant="light"
                  onPress={() => handleMobileNavigation(item)}
                  style={{ backdropFilter: "none", marginTop: index === 0 ? "50px" : "0" }}
                >
                  {item}
                  {item === "Your Classes" && <BookMarked className="group-hover:animate-bounce group-hover:text-primary transition-all duration-300" />}
                  {item === "Explore" && <CirclePlus className="group-hover:animate-bounce group-hover:text-primary transition-all duration-300" />}
                </Button>
                {index < menuItems.length - 1 && <Divider className="my-2" />}
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        )}
      </Navbar>

      {/* Sticky Border */}
      {!isSticky && !isMenuOpen && (
        <div
          className="navbar-border"
          style={{
            position: "fixed",
            top: "80px",
            left: "60px",
            right: "60px",
            height: "1px",
            background: "white",
            zIndex: 999,
          }}
        ></div>
      )}

      {/* Spacer for Mobile */}
      <div className="sm:hidden" style={{ height: "20px" }}></div>
    </>
  );
}