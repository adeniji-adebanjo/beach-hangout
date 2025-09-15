"use client";

import React, { useState, ReactElement } from "react";

interface Group {
  name: string;
  icon: ReactElement;
}

interface GroupTabsProps {
  groups: Group[];
  onSelect: (group: string) => void;
}

export default function GroupTabs({ groups, onSelect }: GroupTabsProps) {
  const [active, setActive] = useState(groups[0].name);

  const handleClick = (groupName: string) => {
    setActive(groupName);
    onSelect(groupName);
  };

  return (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      {groups.map((group) => (
        <button
          key={group.name}
          onClick={() => handleClick(group.name)}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
            active === group.name
              ? "bg-[#d23915] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <div className="text-2xl">{group.icon}</div>
          <span className="text-sm sm:text-base">{group.name}</span>
        </button>
      ))}
    </div>
  );
}
