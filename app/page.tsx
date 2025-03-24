"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import TerminalInstance from "@/components/terminal/terminal";
import { useState } from "react";
import { ColorfulLargeText, darkTheme, Description } from "@/components/mainpage";
import RecursiveIcon from "@/components/recursivesvg";
import Grid from "@/components/grid";

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>();
  return (
    <>
      <div className="min-h-screen"
      style={{
        background: darkMode ? darkTheme.subalt : "#f5f5f7",
        color: darkMode ? darkTheme.text : "black"
      }}
      >
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="h-5"></div>
        <ColorfulLargeText text="Lucas DePaola" />
        <Description darkMode={darkMode} />
        <br />
        {/* <RecursiveIcon /> */}
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
