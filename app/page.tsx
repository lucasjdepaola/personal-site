"use client"
import NavBar from "@/components/navbar";
import Link from "next/link";

const darkTheme = {
  bg: "#080808",
  subalt: "#171717",
  text: "white",
  sub: "#94a3b8"
}

const ColorfulLargeText = (props: any) => {
  const text = props.text
  return (
    <div
    className="text-center p-10 text-7xl font-semibold"
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

const FancyLink = (props: any) => {
  return (
    <span
    className="p-1 pr-2 pl-2 rounded-xl cursor-pointer shadow-md"
    style={{
      opacity: "1.0",
      color: "white",
      backgroundColor: "#0271e3",
    }}>
      <Link href={props.text}>{props.text}</Link>
    </span>
  )
}

const Description = () => {
  return (
    <div
    className="text-center"
    style={{
      color: "rgba(0,0,0,0.5)"
    }}
    >
      All icons were made from scratch. You can find the icons I've created in <FancyLink link="/icons" text="Icons" />
      {" "}Permission to download icons for any use is granted
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
