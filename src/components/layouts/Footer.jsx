import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

export function Footer() {
const navLinks = [
    { name: "Category", href: "/categorie" },
    { name: "My favorites", href: "/favoris" },
    { name: "Contact", href: "/contact" },
    { name: "Terms and Conditions", href: "/cgu" },
  ];

  return (
    <footer className="w-full bg-[#1A1A27] text-white shadow-sm  mt-4">
      <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
        <div className="lg:flex sm:items-center sm:justify-between">
          <Link
            to="/" 
            className="flex items-center mb-7 lg:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/logo_aniverse.png"
              alt="Le logo du site aniverse"
              className="mt-1 rounded-full"
              width={40}
              height={40}
            />{" "}
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Aniverse
            </span>
          </Link>
          <ul className="flex flex-wrap gap-3 items-center my-6 text-sm font-medium sm:my-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-indigo-600 transition-colors"
              >
                <li>{link.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-600 sm:text-center ">
          © 2026{" "}
          <Link
            to="/"
            className="hover:underline"
          >
            AniVerse
          </Link>
          . All rights reserved.
        </span>
        <div className="social-icons flex mt-3 sm:justify-center items-center gap-5">
          <SocialIcon
            url=""
            style={{ height: 40, width: 40 }}
            label=""
          />
          <SocialIcon
            url=""
            style={{ height: 40, width: 40 }}
            label=""
          />
          <SocialIcon
            url=""
            style={{ height: 40, width: 40 }}
            label=""
          />
        </div>
      </div>
    </footer>
  );
}
