import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">

        <p className="text-sm text-zinc-600">
          © {new Date().getFullYear()} Baskar A. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="#home"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            Back to top
          </a>

          <a
            href="https://github.com/Baskar-Codevz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            GitHub
          </a>

          <a
            href="#contact"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;