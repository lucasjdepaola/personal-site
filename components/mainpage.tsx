import useIsMobile from "@/utils/isMobile"
import FancyLink from "./fancylink"
import Projects from "./projects"
import IconWrapper from "./iconwrapper"
import LogoIcon from "/public/icons/logo.svg"

export const darkTheme = {
  bg: "#080808",
  subalt: "#171717",
  text: "white",
  sub: "#94a3b8",
  lighterBlack: "#2b2b2b"
}

export const Codeskills: string = "Next.js React Typescript Javascript Node.js Express.js SQL Firebase Firestore Java Gradle Maven Python Golang Powershell Bash Zsh CSS Tailwind"
export const higherLevelSkills: string = "Fl studio inkscape affinity photo davinci resolve Vim Neovim"

export const ColorfulLargeText = (props: any) => {
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

export const Description = (props: any) => {
  const darkMode = props.darkMode
  const mob = useIsMobile();
  return (
    <div
    className="text-center m-auto"
    style={{
      color: darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
      maxWidth: mob ? "85%" : "60%"
    }}
    >
      I enjoy making projects that interest me. Text input and web based applications have been something I'm interested in.
      <br /><br />
      <Projects />
      <br /><br />

      All icons were made from scratch. You can find the icons I've created in <FancyLink link="/icons" text="Icons" />
      {" "}Permission to download icons for any use is granted
    </div>
  )
}
