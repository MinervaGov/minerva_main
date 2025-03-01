"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";

import Logo from "../../ui/Logo";
import Link from "next/link";

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
        <Link
          href="/agent-gallery"
          className="block w-fit rounded-full border border-gray-100 py-3 px-6 text-sm bg-white text-black transition-[colors,transform] text-center active:scale-95 font-bold "
        >
          Launch App
        </Link>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingNavbar;
