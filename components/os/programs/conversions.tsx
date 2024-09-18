import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

const Conv = () => {
    // todo
}
export const conv: OSApp = {
    name: "Conversions",
    dimensions: {width: 600, height: 600},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 300},
    image: "notes.png",
    component: Conv 
};
