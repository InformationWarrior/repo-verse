/* ============================================================================================
                                    Case 1: Using Flexbox
============================================================================================*/

// import React from "react";
// import { IoChatbubblesSharp } from "react-icons/io5";
// function PageLayout() {
//   return (
//     <div className="layout relative ">
//       <header className="sticky top-0 z-50 bg-amber-500">
//         <nav className="mx-auto p-10 bg-amber-500 text-4xl text-center">
//           Navbar
//         </nav>
//       </header>
//       <main className="relative">
//         <div className="bubble fixed bg-orange-300 p-4 rounded-full bottom-10 right-10 cursor-pointer hover:bg-green-300">
//           <IoChatbubblesSharp size={30} />
//         </div>
//         <section className="content bg-green-600 w-full h-full mx-auto">
//           <h1 className="text-4xl text-center py-4">Main Body</h1>
//           <div className="items-center justify-center flex gap-10 p-4">
//             <div className="box1 bg-pink-400 p-70">
//               <p className="text-4xl text-center">Box 1</p>
//             </div>
//             <div className="box2 bg-yellow-300 p-70 text-6xl text-center">
//               <p className="text-4xl text-center">Box 2</p>
//             </div>
//           </div>
//         </section>
//         <section className="banner px-16 py-4 bg-black flex items-center justify-center">
//           <div className="rounded-4xl p-4 border-white border-2">
//             <p className="text-6xl text-white text-center">
//               This is the layout made by Information Warrior.
//             </p>
//           </div>
//         </section>
//       </main>
//       <footer className="py-12 text-center text-4xl">This is Footer</footer>
//     </div>
//   );
// }

// export default PageLayout;

/* ============================================================================================
                                    Case 2: Using Grid
============================================================================================*/

"use client";
import React from "react";

export default function PageLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto_auto]">
      <header className="row-start-1 sticky top-0 z-50 bg-amber-500">
        <nav className="mx-auto p-5 text-center text-4xl">Navbar</nav>
      </header>

      <main className="row-start-2 bg-green-600">
        <h1 className="py-4 text-center text-4xl">Main Body</h1>

        <section className="grid gap-10 p-4 grid-cols-2 place-items-center">
          <div className="bg-pink-400 p-70">
            <p className="text-center text-4xl">Box 1</p>
          </div>
          <div className="bg-yellow-300 p-70">
            <p className="text-center text-4xl">Box 2</p>
          </div>
        </section>
      </main>

      <section className="row-start-3 flex items-center justify-center bg-black px-16 py-4">
        <div className="rounded-[2rem] border-2 border-white p-4">
          <p className="text-center text-6xl text-white">
            This is the layout made by Information Warrior.
          </p>
        </div>
      </section>

      <footer className="row-start-4 grid place-items-center py-12 text-4xl">
        This is Footer
      </footer>
    </div>
  );
}
