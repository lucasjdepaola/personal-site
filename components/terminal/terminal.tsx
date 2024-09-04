import useKeydown from "@/hooks/terminal/useKeydown";

const Prompt = (props: any) => {
  const dir = props.workingDirectory;
  return (
    <>
      <span className={`c-[${palatte.lucas}]`}>lucas</span>
      <span className={`c-[${palatte.at}]`}>@</span>
      <span className={`c-[${palatte.m2}]`}>m2</span>
      <span className={`c-[${palatte.workingdir}]`}>{" "}{dir}</span>
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
    <div id="mainterminal">
      <div id="tabs"></div>
      <div className={`bg-[${palatte.background}]`} id="terminaltext">
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
        id="inputsection"
        onKeyDown={(key) => {
          okd(key);
        }}>
          {userInput}
        </div>
      </div>
    </div>
  )
}
