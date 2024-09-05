"use client";

import { stat } from "fs";
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
const dynamicVariables = {
    commands: Object.keys(staticVariables),
    cd: null,
    ls: null,
    cat: null,
    grep: null,
    clear: null,
    alias: null,
}

export default function useKeydown() {
    const [userInput, setUserInput] = useState<string>("");
    const [commandOutputs, setCommandOutputs] = useState<string[]>([]);
    const [cursorIndex, setCursorIndex] = useState<number>(0);
    const [workingDirectory, setWorkingDirectory] = useState<string>("~");
    const okd = (key: KeyboardEvent<HTMLDivElement>) => {
        console.log("this is a ke");
        if(key.key === "Enter") {
            setCommandOutputs((o: any) => {
                const oldoutput = [...o, ""];
                if(userInput in staticVariables) {
                    return [...o, staticVariables[userInput]]; // find a static output variable
                }
                return oldoutput;
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