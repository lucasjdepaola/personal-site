import useIsMobile from "@/utils/isMobile"
import FancyLink from "./fancylink"
import Projects from "./projects"
import IconWrapper from "./iconwrapper"
import LogoIcon from "/public/icons/logo.svg"
import Grid from "./grid"

export const darkTheme = {
  bg: "#080808",
  subalt: "#171717",
  text: "white",
  sub: "#94a3b8",
  lighterBlack: "#2b2b2b"
}

export const Codeskills: string = ""
export const higherLevelSkills: string = ""
const tld = "@gmail.com";

export const ColorfulLargeText = (props: any) => {
  const text = props.text
  return (
    <div
    className="flex justify-center items-center text-center p-5 text-7xl font-semibold"
    style={{
    }}
    >
      <div className="flex items-center justify-center w-1/2 relative">
      <div style={{zIndex: 1}}>{text}</div>
      </div>
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
      <br />

      Contact: {`lucasjdepaola ${tld}`} for any inquiries
    </div>
  )
}
