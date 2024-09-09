import { OSApp } from "../appsopened";

export interface DesktopIconLayout {
    name: string;
    icon: any;
    appToOpen: OSApp;
}

export const DesktopIcon = (props: DesktopIconLayout) => {
    return (
        <div className="flex text-center">
            <div id="topicon">

            </div>
            <div id="icontext">
                {props.name}
            </div>
        </div>
    )
}