"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import Projects from "@/components/projects";
import { useState } from "react";

const darkTheme = {
  bg: "#080808",
  subalt: "#171717",
  text: "white",
  sub: "#94a3b8"
}

const ProjectLayout = (props: any) => {
  const darkMode = props.darkMode
  return (
    <div
    className="text-center m-auto pt-16"
    style={{
      color: darkMode ? "rgba(255,255,255,0.8" : "rgba(0,0,0,0.5)",
      maxWidth: "60%"
    }}
    >
      <Projects />
    </div>
  )
}

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <>
      <div className="w-100 h-100 min-h-screen"
      style={{
        background: darkMode ? darkTheme.subalt : "#f5f5f7",
        color: darkMode ? darkTheme.text : "black"
      }}
      >
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <ProjectLayout darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
