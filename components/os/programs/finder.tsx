import { useState } from "react";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME, Directory, OpenedProps } from "../ostypes";
import { ROOTDIR } from "@/types/os/root";
const grey = "#f4f5f5"

enum OpenedType {
    DIR, FILE, NONE
}
interface FileActionProps {
    type: OpenedType;
    // add context to the dir
}

const Finder = (props: OpenedProps) => {
    const [dirPointer, setDirPointer] = useState<Directory>(ROOTDIR); // this can be it for now, but maybe ref home dir
    const [fileIndex, setFileIndex] = useState<number>(-1);
    const [contextIndex, setContextIndex] = useState<number>(-1);
    const FileActions = (props: FileActionProps) => {
        const actionStyle = "hover:bg-blue-600 hover:text-white p-1 rounded-md";
        return (
            <div className="absolute w-28 h-auto text-black rounded-lg shadow-xl p-1" style={{backgroundColor: grey}}>
                <div className={actionStyle}>Open</div>
                <div className={actionStyle}>Rename</div>
                <div className={actionStyle}>Move to Trash</div>
                <div className="p-1"><hr/></div>
                <div className={actionStyle}>Copy</div>
                <div className={actionStyle}>Share</div>
                {props.type === OpenedType.DIR && (
                    <div className={actionStyle}>Zip</div>
                )}
            </div>
        )
    }
    return (
        <div id="container" className="flex flex-row w-full h-full bg-white text-black cursor-default">
            <div id="leftfinderbar" className="flex flex-col w-28 pl-3" style={{backgroundColor: grey}}>
                <div id="favorites" className="flex flex-col mb-3 mt-3">
                    <div className="text-sm text-gray-400 font-bold flex-1">Favorites</div>
                    {/* component which has an icon, and a directory to link to for all the following */}
                </div>
                <div id="locations" className="flex flex-col mb-3">
                    <div className="text-sm font-bold text-gray-400 flex-1">Locations</div>
                    <div className="text-sm pl-1" onClick={() => setDirPointer(ROOTDIR)}>root</div>
                </div>
                <div id="tags" className="flex flex-col">
                    <div className="text-sm text-gray-400 font-bold flex-1">Tags</div>
                    <div className="text-sm pl-1 p-1">
                        Red
                    </div>
                    <div className="text-sm pl-1 p-1">Orange</div>
                    <div className="text-sm pl-1 p-1">Yellow</div>
                    <div className="text-sm pl-1 p-1">Green</div>
                    <div className="text-sm pl-1 p-1">Blue</div>
                    <div className="text-sm pl-1 p-1">Purple</div>
                </div>
            </div>
            <div onClick={(e) => {
                setFileIndex(-1);
                setContextIndex(-1);
            }} className="w-full h-full flex flex-col overflow-scroll text-xs"
            onContextMenu={() => {
                // right click
                setContextIndex(-1); // figure this out
            }}
            >
                <table id="filecontents"
                className="table-auto w-full text-left" style={{emptyCells: "show"}}>
                    <thead className="border border-b-gray-200 border-1">
                        <tr>
                            <th className="p-1">Name</th>
                            <th className="p-1">Size</th>
                            <th className="p-1">Kind</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dirPointer.children.map((e, i) => {
                            if("children" in e) { // dir
                                // > on button hit, unwrap dir
                                return (
                                    <tr className={`relative even:bg-gray-300 rounded-lg border-0 w-full`}
                                    onDoubleClick={() => {
                                        setDirPointer(d => d.children[i] as Directory);
                                    }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setContextIndex(i)}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFileIndex(i);
                                        setContextIndex(-1);
                                    }}
                                    style={{backgroundColor: i === fileIndex ? "#0158d0" : "",
                                        color: i === fileIndex ? "white" : "black"
                                    }}
                                    >
                                        <td className="p-1">{e.name}
                                            {i === contextIndex && <FileActions type={OpenedType.DIR}/>}
                                        </td>
                                        <td className="p-1">{e.children.length} entries</td>
                                        <td className="p-1">Directory</td>
                                    </tr>
                                )
                            }
                            // file
                            return (
                                <tr className={`relative even:bg-gray-300 w-full rounded-lg`}
                                onDoubleClick={() => {
                                    // open text editor, make your own
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setContextIndex(i)}}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFileIndex(i);
                                    setContextIndex(-1);
                                }}
                                style={{backgroundColor: i === fileIndex ? "#0158d0" : "",
                                    color: i === fileIndex ? "white" : "black"
                                }}
                                >
                                    <td className="p-1">{e.name}
                                        {i === contextIndex && <FileActions type={OpenedType.FILE} />}
                                    </td>
                                    <td className="p-1">{e.content.length} bytes</td>
                                    <td className="p-1">File</td>
                                </tr>
                            )
                        })}
                        {Array.from(Array(20-dirPointer.children.length).keys())
                        .map(e => 
                            <tr className="even:bg-gray-300">
                                <td className="p-1">&nbsp;</td>
                                <td className="p-1 h-full"></td>
                                <td className="p-1 h-full"></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export const finder: OSApp = {
    name: "Finder",
    dimensions: {width: 900, height: 500},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 200},
    image: "finder.png",
    component: Finder 
};