import TerminalInstance from "@/components/terminal/terminal";
import { OSApp } from "../appsopened";

    // name: string;
    // dimensions: Dimensions;
    // position: Position
    // component: any;
export const terminal: OSApp = {
    name: "Terminal",
    dimensions: {width: 600, height: 600},
    position: {left: 300, top: 200},
    component: TerminalInstance
};