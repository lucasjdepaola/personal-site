"use client"
import NavBar from "@/components/navbar";

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

const Description = () => {
  const staticText = ` // description text
  I am 
  `
  return (
    <div>{staticText}</div>
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
      </div>
    </>
  );
}
