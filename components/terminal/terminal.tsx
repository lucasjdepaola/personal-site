import useKeydown from "@/hooks/terminal/useKeydown";
import { OpenedProps } from "../os/ostypes";

const Prompt = (props: any) => {
  const dir = "~";
  const darkMode = props.darkMode;
  return (
    <>
      <span style={{
        color: darkMode ? "black" : palatte.lucas
      }}>lucas</span>
      <span style={{
        color: darkMode ? "black" : palatte.at
      }}>@</span>
      <span style={{
        color: darkMode? "black" : palatte.m2
      }}>m2</span>
      <span style={{
        color: darkMode ? "black" : palatte.workingdir
      }}>{" "}{dir}</span>
    </>
  )
}

const palatte = {
  background: "#141920",
  lucas: "#ffff00",
  at: "#00db7f",
  m2: "#00dbff",
  workingdir: "#e17de1",
}

export interface TerminalIO {
  command: string;
  output: string;
}

export default function TerminalInstance(props: OpenedProps) {
  const {userInput, commandOutputs, okd} = useKeydown(props);
  // const darkMode = props.darkMode;
  
  return (
    <div id="mainterminal" className="w-full h-full m-auto rounded-xl outline-none pl-5 pr-5 pb-5 text-lg"
    tabIndex={0}
    style={{
      color: "white",
      backgroundColor: palatte.background,
      fontFamily: "monospace"
    }}
    onClick={(e) => {e.currentTarget.focus();console.log("click")}}
    onKeyDown={(key) => {okd(key)}}
    >
      <div id="terminalbar"></div>
      <div id="tabs"></div>
      <div id="terminaltext" style={{
        width: "100%",
        height: "100%",
      }}>
        {commandOutputs.map((output: TerminalIO) => {
          return (
            <div id="outputsection">
              <Prompt darkMode={false} />
              {" "}{output.command}
              <br></br>
              {output.output}
            </div>
          )
        })}
        <div
        id="inputsection">
          <Prompt darkMode={false} /> {userInput}
        </div>
      </div>
    </div>
  )
}
