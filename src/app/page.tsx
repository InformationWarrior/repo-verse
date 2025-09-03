import React from "react";
import Image from "next/image";
export default function Home() {
  return (
    <div className="mx-auto w-[25vw]  rounded-2xl p-2 border mt-4">
      <Image
        className="rounded-2xl"
        src="/boat.jpg"
        width={500}
        height={500}
        alt="Picture"
      />

      <div className="mt-6 ml-4">
        <span className="border py-1 text-xl px-4 rounded-4xl text-gray-400">
          Nature
        </span>
        <span className="border py-1 text-xl px-4 ml-3 rounded-4xl text-gray-400">
          Lake
        </span>

        <div className="mt-8">
          <h1 className="text-2xl font-bold">Lago di Braies</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            explicabo voluptate iure vel, ducimus vitae et aperiam perferendis
            fuga laborum iusto cum, at sunt reiciendis!
          </p>
        </div>
        <button className="bg-sky-100 text-blue-400 text-xl mt-8 px-6 py-4 hover:bg-sky-200 cursor-pointer rounded-4xl justify-center">
          Read More
        </button>
      </div>
    </div>
  );
}
