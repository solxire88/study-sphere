import "react";
import "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Book, BookMarked, Divide } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import "lucide-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Divider,
} from "@heroui/react";
import { Icon } from "lucide-react";

export default function EducatorNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //logout logic
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  //mobile navigation logic
  const handleMobileNavigation = (item) => {
    if (item === "Your Classes") navigate("/educator/classes");
    else if (item === "New Class") navigate("/educator/new-class");
    else handleLogout();
  };

  const menuItems = ["Your Classes", "New Class", "Log Out"];

  return (
    <>
<Navbar onOpenMenuChange={setIsMenuOpen} className="bg-background">
      {/* Left Section */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-secondary"
        />
        <NavbarBrand>
          <img draggable="false" src={Logo} width="100"></img>
        </NavbarBrand>
      </NavbarContent>

      {/* Centered Section */}
      <NavbarContent className="hidden sm:flex gap-8 flex-grow" justify="center">
        <NavbarItem>
          <Button
            onPress={() => navigate("/educator/classes")}
            variant="light"
            className="text-secondary text-md"
            color='secondary'
            endContent={<BookMarked/>}
            >
            Your Classes
          </Button>
        </NavbarItem>
        <NavbarItem>
            <Button
                onPress={() => navigate("/educator/new-class")}
                variant="light"
                className="text-secondary text-md"
                color='secondary'
                endContent={<CirclePlus/>}
            >
                New Class
            </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Right Section */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            onPress={handleLogout}
            color="danger"
            variant='ghost'
          >
            Log Out
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Button
              className="w-full justify-start text-md"
              color={index === 2 ? "danger" : "secondary"}
              variant="light"
              onPress={() => handleMobileNavigation(item)}
            >
              {item}
              {item === "Your Classes" && <BookMarked className="" />}
              {item === "New Class" && <CirclePlus className="" />}
            </Button>
            {index < menuItems.length - 1 && <Divider className="my-2" />}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    </>
  );
}
