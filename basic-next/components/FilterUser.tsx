"use client";
type User = {
  id: number;
  name: string;
  username: string;
};
import { use, useState } from "react";

export default function FilterUsers({ users }: { users: User[] }) {
  const [searchterm, setSearchTerm] = useState("");

  const filteredusers=users.filter((User)=>{
    return User.name.toLowerCase().includes(searchterm.toLocaleLowerCase())
  })

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchterm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>{filteredusers.map((user:User)=>{
        return (
            <li key={user.id}>{user.name}</li>
        )
      })}</ul>

    </div>
  );
}
