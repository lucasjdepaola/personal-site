import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

const Photos = () => {
}
export const binarygame: OSApp = {
    name: "Bin game",
    dimensions: {width: 600, height: 600},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 300},
    image: "notes.png",
    component: Photos 
};
