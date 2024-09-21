import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Dimensions, OSApp } from "./appsopened";
import { Theme } from "@/types/theme";

enum ProgramPriority {
    BACKGROUND, GUI, TOOL
}

export const DEFAULTDARKSCHEME: Theme = {
    background: "#262626",
    sub: "white",
    subalt: "#262626",
    text: "white",
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

export interface File {
    name: string;
    content: string;
}

export interface Directory {
    name: string;
    absolutePath?: string;
    children: (Directory | File)[];
}

export interface DirWrapper {
    absoluteDirPath: string;
    absoluteDirReference: Directory;
    relativeDirReference: Directory;
}

export interface AllAppRefs {
    [key: string]: HTMLDivElement | null;
}

export interface OpenedProps {
    openedApps: OSApp[];
    setOpenedApps: Dispatch<SetStateAction<OSApp[]>>;
    workingDirectory: DirWrapper;
    setWorkingDirectory: Dispatch<SetStateAction<DirWrapper>>;
    allAppRefs: MutableRefObject<AllAppRefs>;
    barShowing: boolean;
    setBarShowing: Dispatch<SetStateAction<boolean>>;
    tileWindows: boolean;
    setTileWindows: Dispatch<SetStateAction<boolean>>;
    desktopIndex: MutableRefObject<number>;
}