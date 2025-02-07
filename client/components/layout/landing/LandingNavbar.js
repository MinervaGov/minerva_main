"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";

import Logo from "../../ui/Logo";
import WalletCard from "../../ui/WalletCard";
import CreateAgentButton from "../../ui/CreateAgentButton";

const LandingNavbar = () => {
  return (
    <Navbar
      className="max-w-lg mx-auto border border-white/10 rounded-full shadow-sm shadow-white/20 bg-black/5 backdrop-blur"
      position="fixed"
    >
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent justify="end">
        <CreateAgentButton />
        <WalletCard />
      </NavbarContent>
    </Navbar>
  );
};

export default LandingNavbar;
