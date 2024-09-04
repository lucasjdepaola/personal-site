"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import Image from "next/image";
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

const FancyLink = (props: any) => {
  return (
    <span
    className="p-1 pr-2 pl-2 rounded-xl cursor-pointer shadow-lg"
    style={{
      opacity: "1.0",
      color: "white",
      backgroundColor: "#0271e3",
    }}>
      <Link href={props.link}>{props.text}</Link>
    </span>
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
      <Image className="m-auto p-3" src="/images/crazytype.png" height={300} width={500} alt="" />
      <FancyLink text="Crazytype" link="https://crazytype.com/typetest" />, 
      a capable typing website where you can improve at typing fast. Train mode, a newfound algorithm that finds your hardest
      words to type and puts them upfront for priority training. The keymap also
      displays a gradient ranging from red to green based on how fast you type a specific character on your keyboard.
      
      <br /><br />

      <Image className="m-auto p-3" src="/images/rapid.png" height={300} width={500} alt="" />
      <FancyLink text="Rapid" link="https://lucasdepaola.com/Rapid" />
      , a performant, modal, portable text editor with many features including vim motions and browser local code execution
      This is not a beginner friendly editor, you will need a full understanding of vim in order to use this editor the way it was intended.
      <br /><br />

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
