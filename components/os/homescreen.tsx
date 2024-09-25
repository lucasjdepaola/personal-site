"use client"

import { useRef, useState } from "react"
import OSAppsOpened, { OSApp } from "./appsopened"
import OSBackground from "./osbackground"
import OSBar from "./osbar"
import useIsMobile from "@/utils/isMobile"
import Link from "next/link"
import { AllAppRefs, BoxCoords, Directory, DirWrapper, OpenedProps } from "./ostypes"
import { ROOTDIR } from "@/types/os/root"
import useGlobalKeydown from "@/hooks/useGlobalKeydown"
import useWindowManager from "@/hooks/useWindowMananager"
import SpotlightSearch from "./spotlightsearch"


const OnPCHomescreen = () => {
    const [openedApps, setOpenedApps] = useState<OSApp[]>([]);
    const [workingDirectory, setWorkingDirectory] = useState<DirWrapper>({
        absoluteDirPath: "/", // use /home as ~
        relativeDirReference: ROOTDIR,
        absoluteDirReference: ROOTDIR // do not change from root
    });
    const allAppRefs = useRef<AllAppRefs>({});
    const [barShowing, setBarShowing] = useState<boolean>(false);
    const [tileWindows, setTileWindows] = useState<boolean>(false);
    const [boxCoords, setBoxCoords] = useState<BoxCoords | undefined>(undefined)
    const [focusedAppName, setFocusedAppName] = useState<string>("none");
    const desktopIndex = useRef<number>(1);
    const apiTraits: OpenedProps = {
        openedApps: openedApps,
        setOpenedApps: setOpenedApps,
        workingDirectory: workingDirectory, // we dont need a global working dir
        setWorkingDirectory: setWorkingDirectory,
        allAppRefs: allAppRefs,
        tileWindows: tileWindows,
        setTileWindows: setTileWindows,
        desktopIndex: desktopIndex,
        boxCoords: boxCoords,
        setBoxCoords: setBoxCoords,
        barShowing: barShowing,
        setBarShowing: setBarShowing,
        focusedAppName: focusedAppName, // none is arbitrary, it only matters when a window is focused
        setFocusedAppName: setFocusedAppName
    }
    const wm = useWindowManager(apiTraits);
    // name ref mapping, only one app instance can be opened (don't really plan on changing this)
    useGlobalKeydown(apiTraits, wm, setBarShowing); // change to a keybind state interface

    return (
        <div className="h-full w-full overflow-hidden select-none max-h-[100vh]"
        style={{WebkitUserSelect: "none"}}
        >
            <OSBar {...apiTraits} />
            <div className="fixed h-full w-full">
                <SpotlightSearch {...apiTraits}  />
                <OSBackground {...apiTraits} />
                <OSAppsOpened {...apiTraits} barShowing={false} focusedAppName="" /> {/* cancel the bar showing to not trigger re render */}
            </div>
        </div>
    )
}

const OnMobileReRoute = () => {
    return (
        <div className="p-5">
            Cannot use the OS mode on mobile right now.
            <Link className="bg-blue-600 text-white p-1 rounded-lg" href="/">
                go back
            </Link>
        </div>
    )
}

export default function Homescreen() {
    const mob = useIsMobile();
    return (
        mob ? <OnMobileReRoute /> : <OnPCHomescreen />
    )
}