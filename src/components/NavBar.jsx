import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_TARGET_API}/Api/Auth/Logout`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await res.json();
    if (data.ok) {
      console.log("Logout berhasil");
      window.location.reload();
    } else {
      throw new Error("logout gagal");
    }
    navigate("/login");
  };

  return (
    <Navbar fluid className="border-b border-b-neutral-200">
      <NavbarBrand href="/" className="flex gap-3">
        <img className="-rotate-12" src={logo} width={50} alt="Kontrol Pipa" />
        <span className="self-center whitespace-nowrap text-lg font-semibold text-blue-800">
          Valve
        </span>
      </NavbarBrand>
      {location.pathname !== "/login" && <NavbarToggle />}
      {location.pathname !== "/login" && (
        <NavbarCollapse className="gap-2">
          <NavbarLink
            active={location.pathname === "/"}
            className="h-full flex justify-center items-center"
            href="/">
            Home
          </NavbarLink>
          <NavbarLink>
            <Button
              onClick={logout}
              size="sm"
              className="w-full text-xs border-blue-300 text-blue-700"
              color={"alternative"}>
              Logout
            </Button>
          </NavbarLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
};

export default NavBar;
