import React, { useContext } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
  } from "@heroui/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authContext';
import img from '../../assets/logo.png';
export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { islogged, setIslogged } = useContext(authContext);
    const navigate = useNavigate();
    function logOut(){
      setIslogged(false);
      localStorage.removeItem("token");
      navigate("/login");
    
    }
    const menuItems = [
      "Home",
      "Products",
     "Categories", 
     "Brands",
      "Cart",
      "WishList"
    ];
  return (
    <>
     <Navbar onMenuOpenChange={setIsMenuOpen}  isMenuOpen={isMenuOpen} isBordered shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <NavLink to={"/"} className="flex items-center">
          <img className='w-10' src={img} alt="logo shopping" />
          <p className="font-bold text-inherit">FreshCart</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
      {islogged && (
      <NavbarContent className="hidden md:flex gap-4" justify="center">
      {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <NavLink color={"foreground"} to={item=='Home'?'/':"/" + item.toLowerCase()}>
              {item}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      )}
      <NavbarContent justify="end">
     {
      islogged?
     (
      <NavbarItem>
      <Button onPress={logOut} color="primary" variant="flat">
        Sign Out
      </Button>
    </NavbarItem>
     )
  :
  <>
  <NavbarItem className="lg:flex">
    <NavLink to={"/login"}>Login</NavLink>
  </NavbarItem>
  <NavbarItem>
  <Button color="primary" variant="flat" onPress={() => navigate("/register")}>
  Sign Up
      </Button>
  </NavbarItem>
  </>
     }
      </NavbarContent>
      {islogged && (
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={`${item}-${index}`}>
             <NavLink
                className="w-full"
                color={"foreground"}
                to={item == "Home" ? "/" : "/" + item.toLowerCase()}
                size="lg"
              >
              {item}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      )}
    </Navbar>
    </>
  )
}
