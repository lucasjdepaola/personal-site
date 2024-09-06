"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { useState } from "react";
import { ColorfulLargeText, darkTheme, Description } from "@/components/mainpage";
import IconCards from "@/components/icons/iconcard";

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
        <ColorfulLargeText text="Icons" />
        <div className="text-center">all icons were made from scratch and can be used for any purpose.</div>
        <br />
        <IconCards darkmode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
