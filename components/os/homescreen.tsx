"use client"

import { useRef, useState } from "react"
import OSAppsOpened, { OSApp } from "./appsopened"
import OSBackground from "./osbackground"
import OSBar from "./osbar"
import useIsMobile from "@/utils/isMobile"
import Link from "next/link"
import { AllAppRefs, Directory, DirWrapper, OpenedProps } from "./ostypes"
import { ROOTDIR } from "@/types/os/root"


const OnPCHomescreen = () => {
    const [openedApps, setOpenedApps] = useState<OSApp[]>([]);
    const [workingDirectory, setWorkingDirectory] = useState<DirWrapper>({
        absoluteDirPath: "/", // use /home as ~
        relativeDirReference: ROOTDIR,
        absoluteDirReference: ROOTDIR // do not change from root
    });
    const allAppRefs = useRef<AllAppRefs>({});
    const apiTraits: OpenedProps = {
        openedApps: openedApps,
        setOpenedApps: setOpenedApps,
        workingDirectory: workingDirectory,
        setWorkingDirectory: setWorkingDirectory,
        allAppRefs: allAppRefs
    }
    // name ref mapping, only one app instance can be opened (don't really plan on changing this)

    return (
        <div className="h-full"
        >
        <OSBar {...apiTraits} />
        <OSBackground {...apiTraits} />
        <OSAppsOpened {...apiTraits} />
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