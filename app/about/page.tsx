"use client"
import Footer from "@/components/footer";
import { darkTheme } from "@/components/mainpage";
import NavBar from "@/components/navbar";
import { useState } from "react";

const About = (props: any) => {
  const darkMode = props.darkMode;
  return (
    <div className="text-center pt-12">
      About
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
        <About darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
