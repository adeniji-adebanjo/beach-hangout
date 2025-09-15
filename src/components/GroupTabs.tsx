"use client";

import { useState } from "react";

interface GroupTabsProps {
  groups: string[];
  onSelect: (group: string) => void;
}

export default function GroupTabs({ groups, onSelect }: GroupTabsProps) {
  const [active, setActive] = useState(groups[0]);

  const handleClick = (group: string) => {
    setActive(group);
    onSelect(group);
  };

  return (
    <div className="flex gap-4 border-b border-gray-200 mb-4">
      {groups.map((group) => (
        <button
          key={group}
          onClick={() => handleClick(group)}
          className={`px-4 py-2 font-medium transition ${
            active === group
              ? "text-yellow-600 border-b-2 border-yellow-600"
              : "text-gray-500 hover:text-yellow-600"
          }`}
        >
          {group}
        </button>
      ))}
    </div>
  );
}
