import Image from "next/image";
import React from "react";
import ultraEdit from "@/components/Clones/ultraEdit.png";
import { IoIosArrowDown } from "react-icons/io";

function UltraEdit() {
  return (
    <div className="page">
      <header className="bg-sky-500">
        <nav className="h-[75px]">
          <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
            {/* Logo */}
            <div className="left flex items-center">
              <div className="relative h-10 w-[150px]">
                <Image
                  src={ultraEdit}
                  alt="UltraEdit Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Menu */}
            <div className="right">
              <ul className="flex items-center gap-8 text-white">
                {["Products", "Pricing", "Resources", "About Us"].map(
                  (item) => (
                    <li
                      key={item}
                      className="inline-flex cursor-pointer items-center gap-1 hover:opacity-90"
                    >
                      <span>{item}</span>
                      <IoIosArrowDown size={16} />
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main></main>
    </div>
  );
}

export default UltraEdit;
