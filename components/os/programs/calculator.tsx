import { useState } from "react";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

enum Operations {
    ADD, SUBTRACT, MULTIPLY, DIVIDE, NONE
}
const dgr = "#383838";
const ac = "#4c4c4c";
const og = "#ff9f0b";
const lgr = "#696969";
const row = "w-full h-full flex flex-row items-center";
const col = "w-full h-full flex-1 border-[0.5px] border-black";
const ogbg = {backgroundColor: og, border: ".5px solid black"};

const Calculator = () => {
    const [lastNumber, setLastNumber] = useState<number>(0);
    const [currentNumber, setCurrentNumber] = useState<number>(0);
    const [isInputting, setIsInputting] = useState<boolean>(false);
    const [currentOperation, setCurrentOperation] = useState<Operations>(Operations.NONE);
    const [isPoint, setIsPoint] = useState<boolean>(false);
    const numberClick = (num: number) => {
        setIsInputting(true);
        setCurrentNumber(n => {
            if((n + "").length >= 9) {
                return n;
            }
            let str = isPoint? "." : "";
            return parseFloat(n + str + num);
        });
        setIsPoint(false);
    };
    const clear = () => {
        setLastNumber(0);
        setIsInputting(false);
        setCurrentNumber(0);
        setIsPoint(false);
    }
    const operate = (op: Operations) => {
        setCurrentOperation(op);
        setIsInputting(false);
        setCurrentNumber(0);
        setIsPoint(false);
        if(lastNumber === 0) {
            setLastNumber(currentNumber);
        }
        else if(currentNumber === 0) {
            setLastNumber(l => l);
        }
        else if(op === Operations.ADD) {
            setLastNumber(lastNumber + currentNumber);
        }
        else if(op === Operations.SUBTRACT) {
            setLastNumber(lastNumber - currentNumber);
        }
        else if(op === Operations.MULTIPLY) {
            setLastNumber(lastNumber * currentNumber);
        }
        else if(op === Operations.DIVIDE) {
            setLastNumber(lastNumber / currentNumber);
        }
    }
    const eq = () => {
        setLastNumber(l => {
            if(l === 0) return currentNumber;
            if(currentNumber === 0) return lastNumber;
            else if(currentOperation === Operations.ADD) {
                return l + currentNumber;
            }
            else if(currentOperation === Operations.DIVIDE) {
                return l / currentNumber;
            }
            else if(currentOperation === Operations.MULTIPLY) {
                return l * currentNumber;
            }
            else if(currentOperation === Operations.SUBTRACT) {
                return l - currentNumber;
            }
            return l;
        })
        setCurrentNumber(0);
        setIsInputting(false);
    }
    return (
        <div
        tabIndex={-1}
        onClick={e => e.currentTarget.focus()}
        onKeyDown={k => {
            if(k.key === "Escape") clear();
            else if(k.key === "+") {
                operate(Operations.ADD);
            }
            else if(k.key === "-") {
                operate(Operations.SUBTRACT);
            }
            else if(k.key === "*" || k.key === "x") {
                operate(Operations.MULTIPLY);
            }
            else if(k.key === "/") {
                operate(Operations.DIVIDE);
            }
            else if(k.key === "=") {
                eq();
            }
            if(/[0-9]/.test(k.key) && (currentNumber + "").length <= 9) {
                numberClick(parseInt(k.key));
            }
            setIsPoint(k.key === ".");
        }}
        className="w-full h-full outline-none flex flex-col text-lg rounded-b-lg justify-start text-white text-center"
        style={{backgroundColor: lgr}}
        >
            <div className="w-full h-full flex justify-end pr-5 text-4xl" style={{backgroundColor: dgr, border: "0.5px solid black"}}>
                {isInputting? currentNumber : lastNumber}
            </div>
            <div className={row} style={{backgroundColor: ac}}>
                <div className={col} onClick={() => {clear()}}>AC</div>
                <div className={col} onClick={() => {
                    if(isInputting) {
                        setCurrentNumber(c => c*-1)
                        setLastNumber(c => c);
                    } else {
                        setCurrentNumber(c => c);
                        setLastNumber(c => c*-1);
                    }
                }}>+-</div>
                <div className={col} onClick={() => {
                    if(isInputting) {
                        setCurrentNumber(r => r/100)
                        setLastNumber(l => l);
                    } else {
                        setLastNumber(l => l/100);
                        setCurrentNumber(c => c);
                    }
                }}>%</div>
                <div className={col} style={ogbg} onClick={() => operate(Operations.DIVIDE)}>/</div>
            </div>
            <div className={row}>
                <div className={col} onClick={() => numberClick(7)}>7</div>
                <div className={col} onClick={() => numberClick(8)}>8</div>
                <div className={col} onClick={() => numberClick(9)}>9</div>
                <div className={col} style={ogbg} onClick={() => operate(Operations.MULTIPLY)}>X</div>
            </div>
            <div className={row}>
                <div className={col} onClick={() => numberClick(4)}>4</div>
                <div className={col} onClick={() => numberClick(5)}>5</div>
                <div className={col} onClick={() => numberClick(6)}>6</div>
                <div className={col} style={ogbg} onClick={() => operate(Operations.SUBTRACT)}>-</div>
            </div>
            <div className={row}>
                <div className={col} onClick={() => numberClick(1)}>1</div>
                <div className={col} onClick={() => numberClick(2)}>2</div>
                <div className={col} onClick={() => numberClick(3)}>3</div>
                <div className={col} style={ogbg} onClick={() => {operate(Operations.ADD)}}>+</div>
            </div>
            <div className={row}>
                <div className={col} style={{flexGrow: "2"}} onClick={() => numberClick(0)}>0</div>
                <div className={col} onClick={() => setIsPoint(true)}>.</div>
                <div className={col} style={ogbg} onClick={() => {eq()}}>=</div>
            </div>
        </div>
    )
}

export const calculator: OSApp = {
    name: "Calculator",
    dimensions: {width: 250, height: 300},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 200},
    image: "calculator.avif",
    component: Calculator
};