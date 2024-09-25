"use client";

import { Directory, DirWrapper, OpenedProps } from "@/components/os/ostypes";
import { TerminalIO } from "@/components/terminal/terminal";
import { ROOTDIR } from "@/types/os/root";
import { findDirFromPath } from "@/utils/os/fsutils";
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
    arguments: string[];
    output: TerminalIO[];
    setOutput?: any;
}

export default function useKeydown(props: OpenedProps, userInput: string, ref: any) {
    const [commandOutputs, setCommandOutputs] = useState<TerminalIO[]>([]);
    const [workingDirectory, setWorkingDirectory] = useState<Directory>(ROOTDIR); // reference to root
    const dynamicVariables: any = {
        commands: (io: IOParameters) => {
            const staticCmds = Object.keys(staticVariables)
            .reduce((e: string, curr: string) => {return curr + "\n" + e})
            const dynamicCmds = Object.keys(dynamicVariables)
            .reduce((p: string, curr: string) => curr + "\n" + p);
            return staticCmds + "\n" + dynamicCmds;
        },
        cd: (io: IOParameters) => {
            const d = findDirFromPath(io.arguments[0]);
            setWorkingDirectory(p => d ? d : p);
            if(!d) {
                return "Directory not found."
            }
            return "";
        },
        ls: (io: IOParameters) => {
            return workingDirectory.children.map(e => e.name).join(" ");
        },
        cat: (io: IOParameters) => {
            // should be a parseable dir parameter instead of a simple name match
            // do it right.
            const file = io.arguments[0];
            if(workingDirectory.children.some(c => c.name === file)) {

            }
        },
        grep: () => {},
        clear: (io: IOParameters) => {
            io.setOutput((o: string) => []);
            return "";
        },
        alias: null,
    }
    const okd = (key: KeyboardEvent<HTMLDivElement>) => {
        if(key.key === "Enter") {
            if(ref.current) {
                ref.current.innerText = "";
            }
            setCommandOutputs((o: any) => {
                const command = userInput.split(" ")[0];
                if(command in staticVariables) {
                    const io: TerminalIO = {
                        command: userInput,
                        output: staticVariables[userInput]
                    }
                    return [...o, io]; // find a static output variable
                }
                else if(command in dynamicVariables) {
                    const io: IOParameters = {
                        input: userInput,
                        output: commandOutputs,
                        arguments: userInput.split(" ").slice(1),
                        setOutput: setCommandOutputs
                    }
                    const output: any = dynamicVariables[command](io);
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
        }
    }
    return {userInput, commandOutputs, okd, workingDirectory};
}