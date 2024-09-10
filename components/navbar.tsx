"use client"

import Link from "next/link";
import IconWrapper from "./iconwrapper";
import SearchIcon from "/public/icons/search.svg"
import LightIcon from "/public/icons/lightmode.svg"
import DarkIcon from "/public/icons/darkmode.svg"
import GithubIcon from "/public/icons/github.svg"
import { useState } from "react";
import Search from "./search";

enum Routes {
  root, about, icons, projects, os, recipes, search, None
}

const routes = "About, projects, icons etc...";

export default function NavBar(props: any) {
  const darkMode = props.darkMode;
  const setDarkMode = props.setDarkMode;
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [hoveredRoute, setHoveredRoute] = useState<Routes>(Routes.None);
  return (
    <nav
    className="flex flex-col font-light text-sm w-full fixed items-start overflow-hidden"
    onMouseLeave={() => {setHoveredRoute(Routes.None); setExpanded(false)}}
    style={{
      backgroundColor: darkMode ? "#2b2b2b" : isExpanded ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.8)",
      color: darkMode ? "white" : "rgba(0,0,0,0.7)",
      height: isExpanded ? "10rem": "2.6rem",
      zIndex: "100",
      // opacity: "0.9",
      backdropFilter: "saturate(180%) blur(20px)",
      transition: "height 500ms ease-out",
    }} // should change based on mobile
    >
      <div id="center icons" className="w-full flex justify-center">
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
          <Link className="pr-2 pl-2 ml-1 mr-1" href="/posts">
            <span>Posts</span>
          </Link>
          <button onClick={() => {setDarkMode((d: boolean) => !d)}} id="darkmode">
            <IconWrapper icon={darkMode ? LightIcon : DarkIcon} />
          </button>
          <button onClick={() => {setExpanded((h: boolean) => !h); setHoveredRoute(Routes.search)}}>
            <IconWrapper icon={SearchIcon} />
          </button>
        </div>
      </div>
      <span
      id="rightsocials" // items go to the right
      className="flex items-end justify-end"
      >
        {/* <Link className="pr-2 pl-2 ml-1 mr-1" href="https://github.com/lucasjdepaola" target="_blank">
          <IconWrapper icon={GithubIcon} />
        </Link> */}
      </span>
      <div id="expanded bar" className="w-full h-full">
        {hoveredRoute === Routes.search ? <Search />
        : ""
        }
      </div>
    </nav>
  )
}
