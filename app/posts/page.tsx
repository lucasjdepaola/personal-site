"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { useState } from "react";
import { ColorfulLargeText, darkTheme, Description } from "@/components/mainpage";
import { Octokit } from "octokit";
// .filter((path) => /\.mdx?$/.test(path));
export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <>
      <div className="min-h-screen"
      style={{
        background: darkMode ? darkTheme.subalt : "#f5f5f7",
        color: darkMode ? darkTheme.text : "black"
      }}
      >
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div>render posts here</div>
        <br />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
