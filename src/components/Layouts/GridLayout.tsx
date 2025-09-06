/* ============================================================================================
                                    Case 1: Using internal CSS
============================================================================================*/

"use client";
import React from "react";

function GridLayout() {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          border: 2px solid black;
          display: grid;
          /* 3 columns, then 3 rows (header/content/footer) */
          grid-template-columns: 200px 1fr 1fr;
          grid-template-rows: 60px 1fr 80px;
          grid-template-areas:
            "nav nav nav"
            "side article article"
            "footer footer footer";
          gap: 8px;
          min-height: 100vh;
          padding: 8px;
        }

        .item {
          border: 2px solid red;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          background: #e0f7ff;
        }

        .nav {
          grid-area: nav;
          background-color: aqua;
        }
        .side {
          grid-area: side;
          background-color: red;
        }
        .article {
          grid-area: article;
        }
        .footer {
          grid-area: footer;
        }
      `}</style>

      <div className="item nav">Nav</div>
      <div className="item side">Sidebar</div>
      <div className="item article">Article</div>
      <div className="item footer">Footer</div>
    </div>
  );
}

export default GridLayout;

/* ============================================================================================
                                    Case 2: Using Tailwind
============================================================================================*/

// Case 2: Using Tailwind

// "use client";
// import React from "react";

// function GridLayout() {
//   return (
//     <div
//       className="
//         grid min-h-screen gap-2 p-2 border-2 border-black
//         [grid-template-columns:200px_1fr_1fr]
//         [grid-template-rows:60px_1fr_80px]
//       "
//     >
//       {/* Nav: spans all 3 columns, row 1 */}
//       <div className="col-span-3 row-start-1 grid place-items-center border-2 border-red-500 bg-sky-100">
//         Nav
//       </div>

//       {/* Sidebar: column 1, row 2 */}
//       <div className="col-start-1 row-start-2 grid place-items-center border-2 border-red-500 bg-red-500/80 text-white">
//         Sidebar
//       </div>

//       {/* Article: columns 2-3, row 2 */}
//       <div className="col-start-2 col-span-2 row-start-2 grid place-items-center border-2 border-red-500 bg-sky-100">
//         Article
//       </div>

//       {/* Footer: spans all 3 columns, row 3 */}
//       <div className="col-span-3 row-start-3 grid place-items-center border-2 border-red-500 bg-sky-100">
//         Footer
//       </div>
//     </div>
//   );
// }

// export default GridLayout;
