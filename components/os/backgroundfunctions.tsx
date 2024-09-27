import { cnStyle } from "@/utils/styling";
import { Position } from "./appsopened";
import { OpenedProps } from "./ostypes";

interface BackgroundFunctionsProps {
    position: Position;
    openedProps: OpenedProps;
}

const grey = "#f4f5f5"
const actionStyle: string = "hover:bg-blue-600 hover:text-white pr-1 pl-1 mt-1 mb-1 rounded-md";
const dot: string = `w-3 h-3 ml-1 mr-1 p-1 rounded-full`;
export default function BackgroundFunctions(props: BackgroundFunctionsProps) {
    return (
        <div className="fixed z-10 w-auto h-auto text-black rounded-lg shadow-xl p-1 text-sm cursor-default"
        style={{
            backgroundColor: grey,
            top: `${props.position.top}px`,
            left: `${props.position.left}px`,
        }}>
            <div className={actionStyle}>New Folder</div>
            <div className="p-1"><hr/></div>
            <div className={actionStyle}>Get Info</div>
            <div className={actionStyle}>Change Wallpaper</div>
            <div className={actionStyle}>Edit Widgets</div>
            <div className="p-1"><hr/></div>
            <div className="flex flex-row w-full h-auto justify-start mt-1 mb-1">
                <div className={cnStyle("#ff766b")}></div>
                <div className={cnStyle(dot, "bg-[#ffbb55]")}></div>
                <div className={cnStyle(dot, "bg-[#ffba55]")}></div>
                <div className={cnStyle(dot, "bg-[#69db74]")}></div>
                <div className={cnStyle(dot, "bg-[#53a5ff]")}></div>
                <div className={cnStyle(dot, "bg-[#d884ff]")}></div>
                <div className={cnStyle(dot, "bg-[#dadada]")}></div>
            </div>
            <div className={actionStyle}
            onClick={(e) => {
                console.log("clicked.");
                e.stopPropagation();
                props.openedProps.setTileWindows(t => !t)}}
            >{props.openedProps.tileWindows ? "Turn off" : "Use"} Window Manager</div>
        </div>
    )
}