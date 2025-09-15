"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GroupTabs from "@/components/GroupTabs";
import GroupTable from "@/components/GroupTable";
import { FaSmile, FaPeace, FaHeart, FaStar, FaLeaf } from "react-icons/fa";

interface Person {
  first_name: string;
  last_name: string;
  team?: string;
}

const GROUPS = [
  { name: "Team Joy", icon: <FaSmile className="text-yellow-500" /> },
  { name: "Team Peace", icon: <FaPeace className="text-blue-500" /> },
  { name: "Team Love", icon: <FaHeart className="text-red-500" /> },
  { name: "Team Grace", icon: <FaStar className="text-purple-500" /> },
  { name: "Team Hope", icon: <FaLeaf className="text-green-500" /> },
];

export default function GroupsPage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [activeGroup, setActiveGroup] = useState(GROUPS[0].name);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/attendees");
        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          setPeople(result.data);
        } else {
          console.error("Unexpected API response:", result);
          setError("Failed to load teams. Please try again later.");
        }
      } catch (error) {
        console.error("Failed to fetch attendees:", error);
        setError("Failed to load teams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupMembers = people.filter((p) => p.team === activeGroup);

  return (
    <>
      <Navbar />
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/groups-bg.gif')" }}
      >
        {/* Overlay for opacity */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto my-30 py-8">
          <h1 className="text-2xl text-center font-bold text-gray-100 mb-6">
            View your team members here!
          </h1>

          <GroupTabs
            groups={GROUPS}
            onSelect={(groupName) => setActiveGroup(groupName)}
          />

          {error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <GroupTable members={groupMembers} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
