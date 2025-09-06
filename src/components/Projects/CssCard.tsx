import Image from "next/image";
import React from "react";

function CssCard() {
  return (
    <div className="card mx-auto w-[25vw] rounded-2xl p-2 border mt-4">
      {/* image */}
      <div className="image">
        <Image
          className="rounded-2xl"
          src="/boat.jpg"
          width={500}
          height={500}
          alt="Picture"
        />
      </div>

      {/* capsules */}
      <div className="capsules mt-6 ml-4">
        <span className="border py-1 text-xl px-4 rounded-4xl text-gray-400">
          Nature
        </span>
        <span className="border py-1 text-xl px-4 ml-3 rounded-4xl text-gray-400">
          Lake
        </span>
      </div>

      {/* content */}
      <div className="content mt-6 ml-4">
        <h1 className="text-2xl font-bold">Lago di Braies</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          explicabo voluptate iure vel, ducimus vitae et aperiam perferendis
          fuga laborum iusto cum, at sunt reiciendis!
        </p>
      </div>

      {/* button */}
      <div className="button text-center">
        <button className="bg-sky-300 text-center text-blue-600 text-xl mt-6 px-6 py-4 hover:bg-sky-400 cursor-pointer rounded-4xl justify-center">
          Read More
        </button>
      </div>
    </div>
  );
}

export default CssCard;
