"use client";

import { useState } from "react";

interface Person {
  first_name: string;
  last_name: string;
}

interface GroupTableProps {
  members: Person[];
}

export default function GroupTable({ members }: GroupTableProps) {
  const [query, setQuery] = useState("");

  const filtered = members.filter((m) =>
    `${m.first_name} ${m.last_name}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-yellow-100 text-left">
          <tr>
            <th className="px-4 py-2 text-black">First Name</th>
            <th className="px-4 py-2 text-black">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m, i) => (
            <tr
              key={i}
              className="border-t hover:bg-yellow-50 hover:text-black cursor-pointer"
            >
              <td className="px-4 py-2">{m.first_name}</td>
              <td className="px-4 py-2">{m.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-sm mt-2">No matches found.</p>
      )}
    </div>
  );
}
