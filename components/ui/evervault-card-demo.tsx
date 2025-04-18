"use client";
import React from "react";
import { EvervaultCard, Icon } from "./evervault-card";

export default function EvervaultCardDemo({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-6 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={title} />

      <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        {description}
      </h2>

      <div className="flex-grow" />
      
      <button className="text-sm border dark:border-white/[0.2] border-black/[0.2] rounded-full px-3 py-1 text-black dark:text-white mb-8 self-start">
        View Project
      </button>
    </div>
  );
}