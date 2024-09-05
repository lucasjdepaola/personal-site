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

export default function TerminalInstance() {
  const {userInput, commandOutputs, workingDirectory, okd} = useKeydown();
  
  return (
    <div id="mainterminal" className="w-2/3 h-96 m-auto rounded-xl outline-none pl-5 pr-5 pb-5"
    tabIndex={0}
    style={{
      color: "white",
      backgroundColor: palatte.background,
      fontFamily: "monospace"
    }}
    onClick={(e) => {e.currentTarget.focus();console.log("click")}}
    onKeyDown={(key) => {okd(key)}}
    >
      <div id="terminalbar">bar</div>
      <div id="tabs"></div>
      <div id="terminaltext" style={{
        width: "100%",
        height: "100%",
      }}>
        {commandOutputs.map((output: string) => {
          return (
            <div id="outputsection">
              <Prompt workingDirectory={workingDirectory} />
              <br></br>
              {output}
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
