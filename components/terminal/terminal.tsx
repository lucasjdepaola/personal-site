import useKeydown from "@/hooks/terminal/useKeydown";

const Prompt = (props: any) => {
  const dir = props.workingDirectory;
  return (
    <>
      <span style={{
        color: palatte.lucas
      }}>lucas</span>
      <span style={{
        color: palatte.at
      }}>@</span>
      <span style={{
        color: palatte.m2
      }}>m2</span>
      <span style={{
        color: palatte.workingdir
      }}>{" "}{"~"}</span>
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

export default function TerminalInstance(props: any) {
  const {userInput, commandOutputs, workingDirectory, okd} = useKeydown();
  const darkMode = props.darkMode;
  
  return (
    <div id="mainterminal" className="w-2/3 h-96 m-auto rounded-xl outline-none pl-5 pr-5 pb-5 text-lg"
    tabIndex={0}
    style={{
      color: darkMode ? "black" : "white",
      backgroundColor: darkMode ? "white" : palatte.background,
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
              <Prompt workingDirectory={workingDirectory} />
              {" "}{output.command}
              <br></br>
              {output.output}
            </div>
          )
        })}
        <div
        id="inputsection">
          <Prompt /> {userInput}
        </div>
      </div>
    </div>
  )
}
