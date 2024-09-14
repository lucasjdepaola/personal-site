"use client";

import { DirWrapper, OpenedProps } from "@/components/os/ostypes";
import { TerminalIO } from "@/components/terminal/terminal";
import { KeyboardEvent, useState } from "react";

const timeSince = (date: string): string => {
    const subtracted = Date.now() - new Date(date).getTime();
    const yearMs = 1000 * 60 * 60 * 24 * 365.25; // leap year
    const count = Math.floor(subtracted / yearMs);
    console.log(count);
    if(count < 1) {
        return Math.floor(subtracted / yearMs * 365) + " days";
    }
    return count + " years";
}

interface OfStrings {
    [key: string]: string;
}

const staticVariables: OfStrings = {
    name: "Lucas DePaola",
    age: timeSince("2003-07-24"), // age calculator
    siteage: timeSince("2024-09-04"),
    whoami: "A user on lucasdepaola.com/os",
    email: "etc.",
}

interface IOParameters {
    input: string;
    output: TerminalIO[];
    setOutput?: any;
    setInput?: any;
}

export default function useKeydown(props: OpenedProps) {
    const dynamicVariables: any = {
        commands: (io: IOParameters) => Object.keys(staticVariables).reduce((e: string, curr: string) => {return curr + "\n" + e}),
        cd: (io: IOParameters) => {
            props.setWorkingDirectory((d: DirWrapper) => {
                // first find out if we're looking relatively, or absolutely
                // then determine if it's changeable, then change
                if(io.input)
                    return d;
                return d;
            })
        },
        ls: () => {},
        cat: () => {},
        grep: () => {},
        clear: (io: IOParameters) => {
            io.setOutput((o: string) => []);
            return "";
        },
        alias: null,
    }
    const [userInput, setUserInput] = useState<string>("");
    const [commandOutputs, setCommandOutputs] = useState<TerminalIO[]>([]);
    const [cursorIndex, setCursorIndex] = useState<number>(0);
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
    return {userInput, commandOutputs, okd};
}