/* ============================================================================================
                                    Case 1: Using Flexbox
============================================================================================*/

// import React from "react";
// import { IoChatbubblesSharp } from "react-icons/io5";
// function Layout() {
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

// export default Layout;

/* ============================================================================================
                                    Case 1: Using Grid
============================================================================================*/

import React from "react";

function Layout() {
  return (
    <div className="layout grid
    grid-cols-1
    ">
      <div></div>
    </div>
  );
}

export default Layout;
