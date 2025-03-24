import { ReactElement, ReactNode } from "react";
import IconWrapper from "./iconwrapper";

// heavily inspired by https://rauno.me/craft/vercel
// the vercel design pattern which builds background grids
interface GridProps {
    rows: number;
    cols: number;
    children?: ReactElement<GridCellProps[]>;
    icon?: any;
}

interface GridCellProps {
    row: number;
    col: number;
    children?: ReactNode;
}

export default function Grid(props: GridProps) {
    let ico = props.icon && (
        <div className="absolute top-0 left-0">
            <IconWrapper icon={props.icon} width={10} height={10} />
        </div>
    )
    ico = "";
    return (
        <div className="grid absolute w-full h-full"
        style={{
            gridTemplateColumns: `repeat(${props.cols} 1fr)`,
            gridTemplateRows: `repeat(${props.rows} 1fr)`,
            zIndex: "0",
            border: "2px solid #666",
            borderTop: "none",
        }}
        >
            <div className="contents">
                {[...Array(props.rows * props.cols)].map((_, i) => {
                    const x = (i % props.cols) + 1;
                    const y = Math.floor(i / props.cols) + 1;
                    return (
                        <div className="w-full h-full"
                        key={`gr${i}`}
                        style={{
                            gridColumnStart: x,
                            gridRowStart: y,
                            gridColumnEnd: "span 1",
                            gridRowEnd: "span 1",
                            border: "2px solid #666",
                            borderRight: "none",
                            borderTop: "none"
                        }}
                        >
                            {ico}
                        </div>
                    )
                })}
            </div>
            {[...Array(props.rows)].map((_, rowIndex) => {
                return (
                    // map out cols too
                    <div key={`mgr${rowIndex}`}></div>
                )
            })}
            <div className="relative w-full h-full">
                {props.children}
            </div>
        </div>
    )
}