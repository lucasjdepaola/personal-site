"use client"
import FancyLink from "@/components/fancylink";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import Projects from "@/components/projects";
import Image from "next/image";
import Link from "next/link";

const darkTheme = {
  bg: "#080808",
  subalt: "#171717",
  text: "white",
  sub: "#94a3b8"
}

const Codeskills: string = "Next.js React Typescript Javascript Node.js Express.js SQL Firebase Firestore Java Gradle Maven Python Golang Powershell Bash Zsh CSS Tailwind"
const higherLevelSkills: string = "Fl studio inkscape affinity photo davinci resolve Vim Neovim"

const ColorfulLargeText = (props: any) => {
  const text = props.text
  return (
    <div
    className="text-center p-10 pt-20 text-7xl font-semibold"
    style={{
      // backgroundImage: "linear-gradient(90deg, rgba(255,190,0,1) 0%, rgba(182,61,43,1) 54%, rgba(127,91,182,1) 100%)",
      // can change the gradient to anything
      // color: "transparent",
      // backgroundClip: "text",
    }}
    >
      {text}
    </div>
  )
}


const AppleScreenshot = (props: any) => { // for screenshotting in a macos fashion
  return (
    <div className="w-3/4 h-1/4 bg-slate-900">
      <Image src={props.image} height={300} width={300} alt={props.alt} />
    </div>
  )
}

const Description = () => {
  return (
    <div
    className="text-center m-auto"
    style={{
      color: "rgba(0,0,0,0.5)",
      maxWidth: "60%"
    }}
    >
      I enjoy making projects that interest me. Text input and web based applications have been something I'm interested in.
      <br /><br />
      <Projects />

      All icons were made from scratch. You can find the icons I've created in <FancyLink link="/icons" text="Icons" />
      {" "}Permission to download icons for any use is granted
      <Footer />
    </div>
  )
}

export default function Home() {
  let isDark = false;
  return (
    <>
      <div className="w-100 h-100 min-h-screen"
      style={{
        background: isDark ? darkTheme.subalt : "#f5f5f7",
        color: isDark ? darkTheme.text : "black"
      }}
      >
        <NavBar />
        <ColorfulLargeText text="Lucas DePaola" />
        <Description />
      </div>
    </>
  );
}
