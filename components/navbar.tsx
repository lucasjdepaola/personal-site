"use client"

import Link from "next/link";

console.log("hello world");


const routes = "About, projects, icons etc...";

function LightOrDarkMode() {
  return (
    <button></button>
  );
}

export default function NavBar(props: any) {
  // const route = "pl-10 pr-10 pt-2 pb-2";
  const route = "p-3"
  return (
    <nav
    className="flex items-center justify-center font-light text-sm"
    style={{
      backgroundColor: "white",
      color: "rgba(0,0,0,0.7)"
    }}
    >
      <div className={route}>
        <Link className="pr-2 pl-2 ml-1 mr-1" href="/about">
          <span>About</span>
        </Link>
        <Link className="pr-2 pl-2 ml-1 mr-1" href="/projects">
          <span>Projects</span>
        </Link>
        <Link className="pr-2 pl-2 ml-1 mr-1" href="/icons">
          <span>Icons</span>
        </Link>
        <Link className="pr-2 pl-2 ml-1 mr-1" href="/os">
          <span>OS</span>
        </Link>
        <button onClick={() => {}} id="darkmode">
          darkmode
        </button>
      </div>
    </nav>
  )
}
