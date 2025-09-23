"use client"; // MUST for Clerk hooks/components

import { UserButton } from "@clerk/nextjs";

export default function TopUserProfile() {
  return (
    <div className="absolute top-4 right-4">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "w-10 h-10 rounded-full", 
          },
        }}
      />
    </div>
  );
}
