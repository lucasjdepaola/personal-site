"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { useState } from "react";
import { ColorfulLargeText, darkTheme, Description } from "@/components/mainpage";
// .filter((path) => /\.mdx?$/.test(path));

interface PostFile {
  name: string;
  metadata: any
}

const getFileNames = (): void => { // this is where the script comes in
}

const sortFilesByDate = (files: PostFile[]): PostFile[] => {
  return [];
}

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
