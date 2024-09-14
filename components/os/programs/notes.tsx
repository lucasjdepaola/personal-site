import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

const Photos = () => {
    return (
        <div className="w-full h-full bg-black text-white">
            <div id="notesinput" className="w-full h-full">
                <textarea className="w-full h-full bg-slate-700" />
            </div>
        </div>
    );
}
export const notes: OSApp = {
    name: "Notes",
    dimensions: {width: 600, height: 600},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 300},
    image: "notes.png",
    component: Photos 
};