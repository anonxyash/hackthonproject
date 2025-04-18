"use client";
import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

interface EvervaultCardProps {
  text?: string;
  className?: string;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const EvervaultCard: React.FC<EvervaultCardProps> = ({ text, className }) => {
  const [randomString, setRandomString] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setRandomString(generateRandomString(1500));
  }, []);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePosition({ x: clientX - left, y: clientY - top });
    setRandomString(generateRandomString(1500));
  };

  return (
    <div className={cn("p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative", className)}>
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <div className="pointer-events-none">
          <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition-opacity duration-300"
            style={{
              maskImage: `radial-gradient(250px at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100 transition-opacity duration-300"
            style={{
              maskImage: `radial-gradient(250px at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`
            }}
          >
            <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
              {randomString}
            </p>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-44 w-44 rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <div className="absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-full" />
            <span className="dark:text-white text-black z-20">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};