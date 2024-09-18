import { DesktopIconLayout } from "../widgets/desktopicon";
import { browser } from "./browser";
import { calculator } from "./calculator";
import { emulator } from "./emulator";
import { notes } from "./notes";
import { terminal } from "./terminal";

export const IMAGEPATH = "/images/os/";

export const desktopicons: DesktopIconLayout[] = [ // this should be done in another file
    {
        name: "Terminal",
        appToOpen: terminal,
        layout: {
            widthBlocks: 1,
            heightBlocks: 1,
            topBlocks: 6,
            leftBlocks: 7
        },
    },
    {
        name: "Notes",
        appToOpen: notes,
        layout: {
            widthBlocks: 1,
            heightBlocks: 1,
            topBlocks: 7,
            leftBlocks: 7
        },
    },
    {
        name: "Browser",
        appToOpen: browser,
        layout: {
            widthBlocks: 1,
            heightBlocks: 1,
            topBlocks: 7,
            leftBlocks: 8,
        }
    },
    {
        name: "Calculator",
        appToOpen: calculator,
        layout: {
            widthBlocks: 1,
            heightBlocks: 1,
            topBlocks: 6,
            leftBlocks: 8
        }
    },
    // {
    //     name: "Emulator",
    //     appToOpen: emulator,
    //     layout: {
    //         widthBlocks: 1,
    //         heightBlocks: 1,
    //         topBlocks: 8,
    //         leftBlocks: 10
    //     }
    // }
];