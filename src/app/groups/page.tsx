"use client";

import { useEffect, useState } from "react";
import GroupTabs from "@/components/GroupTabs";
import GroupTable from "@/components/GroupTable";

interface Person {
  firstName: string;
  lastName: string;
  group?: string;
}

const GROUPS = ["Team Joy", "Team Peace", "Team Love", "Team Grace"];

export default function GroupsPage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [activeGroup, setActiveGroup] = useState(GROUPS[0]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/attendees");
      const data: Person[] = await res.json();
      setPeople(data);
    };
    fetchData();
  }, []);

  const groupMembers = people.filter((p) => p.group === activeGroup);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Attendees Group Assignment
      </h1>

      <GroupTabs groups={GROUPS} onSelect={setActiveGroup} />

      <GroupTable members={groupMembers} />
    </div>
  );
}
