import React from "react";
import ElectricBorder from "./ElectricBorder";
import { TvIcon, ArrowDownTrayIcon, DevicePhoneMobileIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Cards = () => {
  const d = [
    {
      title: "Enjoy on your TV",
      desc: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
      icon: <TvIcon className="h-8 w-8 text-red-500" />,
    },
    {
      title: "Download your shows to watch offline.",
      desc: "Save your favorites easily and always have something to watch.",
      icon: <ArrowDownTrayIcon className="h-8 w-8 text-red-500" />,
    },
    {
      title: "Watch everywhere.",
      desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.",
      icon: <DevicePhoneMobileIcon className="h-8 w-8 text-red-500" />,
    },
    {
      title: "Create profiles for kids.",
      desc: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
      icon: <UserCircleIcon className="h-8 w-8 text-red-500" />,
    },
  ];

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10 text-left">
        <div className="w-11/12 text-left">
            <h1 style={fontStyle} className="text-5xl text-left text-red-600">More Reasons to Join</h1>

        </div>

      <div className="flex gap-10 align-items-center justify-between mt-10 flex-wrap">
        {d.map((item, index) => (
          <ElectricBorder
            key={index}
            color="#f50e0eff"
            speed={1}
            chaos={0.5}
            thickness={2}
            style={{ borderRadius: 16 }}
            className="h-64 w-80 p-4 mt-10 relative bg-black"
          >
             <div className="flex flex-col h-full justify-start relative">
              {/* Title aligned left */}
              <h1 className="text-2xl text-left text-gray-300">{item.title}</h1>

              {/* Description with bottom spacing so it does not overlap icon */}
              <p className="text-white opacity-80 mt-2 mb-10">{item.desc}</p>

              {/* Icon fixed to bottom-right */}
              <div className="absolute top-40 bottom-4 right-4">{item.icon}</div>
            </div>
          </ElectricBorder>
        ))}
      </div>
    </div>
  );
};

export default Cards;
