import { useRouter } from "next/router";
import React from "react";
import { useWunderGraph } from "../components/generated/nextjs";

export function Layout({ children }) {
  const { user, login, logout } = useWunderGraph();
  const router = useRouter();
  const signoff = () =>{
    logout();
    router.push("/");
  }
  if (user) {
    return (
      <>
        <div className="header">
          <div> SetWG - The massive multiplayer online Set Game </div>
          <div>
            <button
              onClick={() => signoff()}
              className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
            >
              Logout
            </button>
          </div>
        </div>
        <div>{children}</div>
      </>
    );
  } else {
    return (
      <>
        <div className="header">
          <div> SetWG - The ultimate Massive Multiplayer Online Set Game </div>
        </div>
        <div>{children}</div>
      </>
    );
  }
}
