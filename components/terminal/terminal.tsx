import useKeydown from "@/hooks/terminal/useKeydown";
import { Directory, OpenedProps } from "../os/ostypes";
import { useRef, useState } from "react";
import { ROOTDIR } from "@/types/os/root";

const Prompt = (props: any) => {
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
      }}>{" "}{props.workingDirectory}</span>
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const {commandOutputs, okd, workingDirectory} = useKeydown(props, userInput, ref);
  // const darkMode = props.darkMode;
  
  return (
    <div id="mainterminal" className="w-full h-full m-auto rounded-b-lg outline-none pl-5 pr-5 pb-5 text-lg"
    tabIndex={0}
    style={{
      color: "white",
      backgroundColor: palatte.background,
      fontFamily: "monospace"
    }}
    // onClick={(e) => {e.currentTarget.focus();console.log("click")}}
    onClick={(e) => {
      if(ref.current) {
        ref.current.focus();
      }
    }}
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
              <Prompt darkMode={false} workingDirectory={"~"} />
              {" "}{output.command}
              <br></br>
              {output.output}
            </div>
          )
        })}
        <div
        className="flex flex-row"
        id="inputsection">
          <Prompt darkMode={false} workingDirectory={`/${workingDirectory.name}`} />
          <div tabIndex={-1} contentEditable autoCorrect="false" spellCheck={false}
          onInput={(e) => setUserInput(e.currentTarget.innerText)}
          className="border-none w-full outline-none pl-2 whitespace-pre-wrap" ref={(r) => {
            ref.current = r;
            if(r) {
              r.focus();
            }
          }}></div>
        </div>
      </div>
    </div>
  )
}
