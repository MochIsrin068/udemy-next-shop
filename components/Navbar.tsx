import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchJson } from "@/lib/api";
import { useSignOut, useUser } from "@/hooks/user";
// import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const user = useUser();
  const signOut = useSignOut();

  // const [user, setUser] = useState<any>();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const user = await fetchJson(`/api/user`);
  //       setUser(user);
  //     } catch (error) {}
  //   })();
  // }, []);

  // const handleSignOut = async () => {
  //   // await fetchJson("/api/logout");
  //   signOut()
  // };

  console.log("[NAVBAR] user:", user);
  return (
    <nav className="px-2 py-1 text-base">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="separator" className="flex-1"></li>
        {user ? (
          <>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <button>{user.name}</button>
            </li>
            <li>
              {/* <button onClick={handleSignOut}>Sign Out</button> */}
              <button onClick={signOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
