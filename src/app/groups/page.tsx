"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GroupTabs from "@/components/GroupTabs";
import GroupTable from "@/components/GroupTable";
import {
  FaSpinner,
  FaSeedling,
  FaLightbulb,
  FaDumbbell,
  FaHandsHelping,
  FaTrophy,
} from "react-icons/fa";

interface Person {
  first_name: string;
  last_name: string;
  team?: string;
}

const GROUPS = [
  { name: "Team Life", icon: <FaSeedling className="text-yellow-500" /> },
  { name: "Team Light", icon: <FaLightbulb className="text-blue-500" /> },
  { name: "Team Strength", icon: <FaDumbbell className="text-red-500" /> },
  { name: "Team Mercy", icon: <FaHandsHelping className="text-purple-500" /> },
  { name: "Team Victory", icon: <FaTrophy className="text-green-500" /> },
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
        const res = await fetch("/api/groups");
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

          {loading ? (
            <div className="flex flex-col items-center justify-center text-gray-100 py-4">
              <FaSpinner className="animate-spin text-4xl mb-2" />{" "}
              {/* Spinner Icon */}
              Loading...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <>
              <GroupTabs
                groups={GROUPS}
                onSelect={(groupName) => setActiveGroup(groupName)}
              />
              <GroupTable members={groupMembers} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
