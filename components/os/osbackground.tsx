import { OpenedProps } from "./ostypes";
import Widgets from "./widget";

export default function OSBackground(props: OpenedProps) {
    // the widget level components go here
    return (
        <div className="fixed" style={{
            width: "100vw",
            height: "100vh",
        }}>
            <div id="background" className="fixed" style={{
                backgroundImage: "url('https://i.pinimg.com/originals/08/c5/ec/08c5ec8fddd5fd3c965e773cad127e2b.jpg')",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                overflowX: "hidden",
                objectFit: "cover",
                backgroundSize: "cover",
                zIndex: "-1" // lowest on the stack
            }}></div>
            <Widgets {...props} />
        </div>
    )
}
// widget dimensions are 8x5 blocks