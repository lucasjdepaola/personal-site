import { HTMLAttributes } from "react";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

const Calculator = () => {
    // AC, plusminus, percent, divide
    // 7 8 9 multiply
    // 4 5 6 subtract
    // 1 2 3 add
    // 0   . equals
    const dgr = "#383838";
    const ac = "#4c4c4c";
    const og = "#ff9f0b";
    const lgr = "#696969";
    const row = "w-full h-full flex flex-row items-center";
    const col = "w-full h-full flex-1 border-[0.5px] border-black";
    const ogbg = {backgroundColor: og, border: ".5px solid black"};
    return (
        <div className="w-full h-full flex flex-col text-lg rounded-b-lg justify-start text-white text-center"
        style={{backgroundColor: lgr}}
        >
            <div className="w-full h-full flex justify-end pr-5 text-4xl" style={{backgroundColor: dgr, border: "0.5px solid black"}}>
                0
            </div>
            <div className={row} style={{backgroundColor: ac}}>
                <div className={col}>AC</div>
                <div className={col}>+-</div>
                <div className={col}>%</div>
                <div className={col} style={ogbg}>/</div>
            </div>
            <div className={row}>
                <div className={col}>7</div>
                <div className={col}>8</div>
                <div className={col}>9</div>
                <div className={col} style={ogbg}>X</div>
            </div>
            <div className={row}>
                <div className={col}>4</div>
                <div className={col}>5</div>
                <div className={col}>6</div>
                <div className={col} style={ogbg}>-</div>
            </div>
            <div className={row}>
                <div className={col}>1</div>
                <div className={col}>2</div>
                <div className={col}>3</div>
                <div className={col} style={ogbg}>+</div>
            </div>
            <div className={row}>
                <div className={col}>0</div>
                <div className={col}></div>
                <div className={col}>.</div>
                <div className={col} style={ogbg}>=</div>
            </div>
        </div>
    )
}

export const calculator: OSApp = {
    name: "Calculator", // can rename later
    dimensions: {width: 250, height: 300},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 200},
    image: "calculator.avif",
    component: Calculator
};