import TerminalInstance from "@/components/terminal/terminal";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

export const terminal: OSApp = {
    name: "Terminal",
    dimensions: {width: 600, height: 600},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 200},
    image: "terminal.png",
    component: TerminalInstance
};