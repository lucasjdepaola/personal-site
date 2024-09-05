"use client"

import Link from "next/link";
import IconWrapper from "./iconwrapper";
import SearchIcon from "/public/icons/search.svg"
import LightIcon from "/public/icons/lightmode.svg"
import DarkIcon from "/public/icons/darkmode.svg"
import GithubIcon from "/public/icons/github.svg"

console.log("hello world");


const routes = "About, projects, icons etc...";

function LightOrDarkMode() {
  return (
    <button></button>
  );
}

export default function NavBar(props: any) {
  // const route = "pl-10 pr-10 pt-2 pb-2";
  const route = "p-1.5"
  return (
    <nav
    className="flex font-light text-sm w-full fixed items-center justify-center"
    style={{
      backgroundColor: "rgba(255,255,255,0.8)",
      color: "rgba(0,0,0,0.7)",
      // opacity: "0.9",
      backdropFilter: "saturate(180%) blur(20px)"
    }}
    >
      <div className={"p-1.5"}>
        <Link className="pr-2 pl-2 ml-1 mr-1" href="/">
          <span>root</span>
        </Link>
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
          <IconWrapper icon={LightIcon} />
        </button>
        <button onClick={() => {}} id="darkmode">
          <IconWrapper icon={DarkIcon} />
        </button>
        <button>
          <IconWrapper icon={SearchIcon} />
        </button>
      </div>
      <span
      id="rightsocials" // items go to the right
      className="flex items-end justify-end"
      >
        <Link className="pr-2 pl-2 ml-1 mr-1" href="https://github.com/lucasjdepaola" target="_blank">
          <IconWrapper icon={GithubIcon} />
        </Link>
      </span>
    </nav>
  )
}
