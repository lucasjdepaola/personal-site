import { useState } from "react";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME, Directory, OpenedProps } from "../ostypes";
import { ROOTDIR } from "@/types/os/root";
const grey = "#f4f5f5"
const Finder = (props: OpenedProps) => {
    const [dirPointer, setDirPointer] = useState<Directory>(ROOTDIR); // this can be it for now, but maybe ref home dir
    const [fileIndex, setFileIndex] = useState<number>(0);
    const onSingleClick = () => {

    }
    const onDoubleClick = () => {

    }
    // dir tags? would this be path based or pointer based
    return (
        <div id="container" className="flex flex-row w-full h-full bg-white text-black">
            <div id="leftfinderbar" className="flex flex-col w-28 pl-3" style={{backgroundColor: grey}}>
                <div id="favorites" className="flex flex-col mb-3 mt-3">
                    <div className="text-sm font-bold flex-1">Favorites</div>
                    {/* component which has an icon, and a directory to link to for all the following */}
                </div>
                <div id="locations" className="flex flex-col mb-3">
                    <div className="text-sm font-bold flex-1">Locations</div>
                </div>
                <div id="tags" className="flex flex-col">
                    <div className="text-sm font-bold flex-1">Tags</div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col overflow-scroll text-xs">
                <table id="filecontents"
                className="table-auto w-full text-left" style={{emptyCells: "show"}}>
                    <thead>
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Size</th>
                            <th className="p-4">Kind</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dirPointer.children.map((e, i) => {
                            if("children" in e) { // dir
                                // > on button hit, unwrap dir
                                return (
                                    <tr className={`even:bg-gray-300 rounded-lg border-0 w-full`}
                                    onDoubleClick={() => {

                                    }}
                                    onClick={() => {setFileIndex(i)}}
                                    style={{backgroundColor: i === fileIndex ? "#0158d0" : "",
                                        color: i === fileIndex ? "white" : "black"
                                    }}
                                    >
                                        <td className="p-1">{e.name}</td>
                                        <td className="p-1">{e.children.length} entries</td>
                                        <td className="p-1">Directory</td>
                                    </tr>
                                )
                            }
                            // file
                            return (
                                <tr className={`even:bg-gray-300 w-full rounded-lg`}
                                onDoubleClick={() => {

                                }}
                                onClick={() => setFileIndex(i)}
                                style={{backgroundColor: i === fileIndex ? "#0158d0" : "",
                                    color: i === fileIndex ? "white" : "black"
                                }}
                                >
                                    <td className="p-1">{e.name}</td>
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
    image: "notes.png",
    component: Finder 
};