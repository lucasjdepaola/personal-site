import { Position } from "./appsopened";
import { OpenedProps } from "./ostypes";

interface BackgroundFunctionsProps {
    position: Position;
    openedProps: OpenedProps;
}

const grey = "#f4f5f5"
const actionStyle = "hover:bg-blue-600 hover:text-white p-1 rounded-md";
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
            <div className={actionStyle}
            onClick={(e) => {
                console.log("clicked.");
                e.stopPropagation();
                props.openedProps.setTileWindows(t => !t)}}
            >{props.openedProps.tileWindows ? "Turn off" : "Use"} Window Manager</div>
        </div>
    )
}