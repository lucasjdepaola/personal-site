import { DesktopIconLayout } from "../widgets/desktopicon";
import { browser } from "./browser";
import { calculator } from "./calculator";
import { emulator } from "./emulator";
import { finder } from "./finder";
import { notes } from "./notes";
import { settings } from "./settings";
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
    {
        name: "Finder",
        appToOpen: finder,
        layout: {
            widthBlocks: 1,
            heightBlocks: 1,
            topBlocks: 7,
            leftBlocks: 6
        }
    },
    {
        name: "Settings",
        appToOpen: settings,
        layout: {
            widthBlocks: 1,
            heightBlocks: 1,
            topBlocks: 6,
            leftBlocks: 6
        }
    },
];