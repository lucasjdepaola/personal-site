import { Dispatch, SetStateAction } from "react";
import { OSApp } from "./appsopened";

enum ProgramPriority {
    BACKGROUND, GUI, TOOL
}

interface ProgramInfo {
    width: number;
    height: number; // 1920x1080
    name: string;
    icon: string; // path to icon
    priority: ProgramPriority;
}

interface WidgetProperties {
    blockWidth: number;
    blockHeight: number; // how many blocks wide or high do you want the widget to be
    name: string;
}


export interface OpenedProps {
    openedApps: OSApp[];
    setOpenedApps: Dispatch<SetStateAction<OSApp[]>>;
}