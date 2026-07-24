import React from "react";
type CardProps = {
  title: string;
  des: string;
};
const Card = ({ title, des }: CardProps) => {
  return (
    <div className="bg-blue-200 w-80 rounded-xl h-40 outline space-y-3">
      <div className="flex items-center gap-1">
        <label htmlFor="title" className="font-bold">
          Title :
        </label>
        <h1 className="text-xl">{title}</h1>
      </div>
      <div className="flex items-center gap-1">
        <label htmlFor="des" className="font-bold">
          Descriptioon :
        </label>
        <p className="">{des}</p>
      </div>
    </div>
  );
};

export default Card;
