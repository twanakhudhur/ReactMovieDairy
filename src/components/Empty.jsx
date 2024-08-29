import React from "react";
import { BsDatabase } from "react-icons/bs";

export default function Empty({ message }) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full text-primary">
      <BsDatabase className="text-4xl " />
      <p className="mt-4 text-xl font-semibold">{message || "No Data Found"}</p>
    </div>
  );
}
