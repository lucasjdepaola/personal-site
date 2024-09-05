"use client";

import { TerminalIO } from "@/components/terminal/terminal";
import { KeyboardEvent, useState } from "react";

const age = () => {
    const birthday = Date.now() - new Date("2003-07-24").getTime();
    const yearMs = 1000 * 60 * 60 * 24 * 365.25; // leap year
    const myAge = Math.floor(birthday / yearMs);
    console.log(myAge);
    return myAge;
}

interface OfStrings {
    [key: string]: string;
}

const staticVariables: OfStrings = {
    name: "Lucas DePaola",
    age: age()+ "", // my age calculator
    email: "pseudoemail@foo.bar",
}

interface IOParameters {
    input: string;
    output: TerminalIO[];
    setOutput?: any;
    setInput?: any;
}

const dynamicVariables: any = {
    commands: (io: IOParameters) => Object.keys(staticVariables).reduce((e: string, curr: string) => {return curr + "\n" + e}),
    cd: () => {},
    ls: () => {},
    cat: () => {},
    grep: () => {},
    clear: (io: IOParameters) => {
        io.setOutput((o: string) => []);
        return "";
    },
    alias: null,
}

export default function useKeydown() {
    const [userInput, setUserInput] = useState<string>("");
    const [commandOutputs, setCommandOutputs] = useState<TerminalIO[]>([]);
    const [cursorIndex, setCursorIndex] = useState<number>(0);
    const [workingDirectory, setWorkingDirectory] = useState<string>("~");
    const okd = (key: KeyboardEvent<HTMLDivElement>) => {
        if(key.key === " ") key.preventDefault();
        if(key.key === "Enter") {
            setCommandOutputs((o: any) => {
                if(userInput in staticVariables) {
                    const io: TerminalIO = {
                        command: userInput,
                        output: staticVariables[userInput]
                    }
                    return [...o, io]; // find a static output variable
                }
                else if(userInput in dynamicVariables) {
                    const io: IOParameters = {
                        input: userInput,
                        output: commandOutputs,
                        setInput: setUserInput,
                        setOutput: setCommandOutputs
                    }
                    const output: any = dynamicVariables[userInput](io);
                    if(typeof output === "string") {
                        const inout :TerminalIO = {
                            command: userInput,
                            output: output
                        }
                        return [...o, inout]
                    }
                    return [...o];
                }
                const notfoundio: TerminalIO = {
                    command: userInput,
                    output: "Command not found."
                }
                return [...o, notfoundio];
            });
            setUserInput("");
        }
        else if(key.key === "Backspace") {
            setUserInput((i: string) => i.slice(0, i.length-1)) // delete one char
        }
        else if(key.key.length <= 1) {
            setUserInput((i: any) => i + key.key);
            console.log("i am here now");
        } else {
            setUserInput((i: any) => i);
        }
    }

    return {userInput, commandOutputs, workingDirectory, okd};
}