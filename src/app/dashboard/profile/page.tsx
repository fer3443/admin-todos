"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1>Hello Page</h1>
      <hr />
			<div className="flex flex-col">
				<span>{session?.user?.name ?? "No name"}</span>
				<span>{session?.user?.email ?? "No email"}</span>
				<span>{session?.user?.image ?? "No image"}</span>
				<span>{session?.user?.roles ?? ["No Roles"]}</span>
				<span>{session?.user?.id ?? "No id"}</span>
			</div>
    </div>
  );
}
