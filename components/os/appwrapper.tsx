import { OSApp } from "./appsopened";
import { OpenedProps } from "./ostypes"

export interface AppwrapperProps {
    parent: OpenedProps;
    self: OSApp;
    children: any
}

const Appbar = (props: AppwrapperProps) => {
    // use on drag move
    return (
        <div className="flex w-full h-7 select-none rounded-t-lg" style={{
            backgroundColor: props.self.barScheme.background,
            color: props.self.barScheme.text
        }}> {/* refactor button exit */}
            <div
            className="flex flex-1 pl-1"
            >
                <button 
                onClick={() => {props.parent.setOpenedApps(a => a.filter(x => x.name !== props.self.name))}}>
                    Exit
                </button>
            </div>
            <div className="flex justify-center items-center text-center cursor-default select-none">
                <div>{props.self.name}</div>
            </div>
            <div className="flex flex-1 justify-center items-center text-center">
            </div>
        </div>
    )
}

export default function AppWrapper(props: AppwrapperProps) {
    return (
        <div className="w-full h-full">
            <Appbar {...props} />
            {props.children}
        </div>
    )
}