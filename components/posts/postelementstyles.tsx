import { MDXComponents } from "mdx/types";
import FancyLink from "../fancylink";

export const componentsMDX: Readonly<MDXComponents> = {
    h1: (props) => {
      return <h1 className="text-4xl pt-3 font-semibold">
            {props.children}
            <hr className="pb-1" />
        </h1>
    },
    h2: (props) => {
        return <h2 className="text-2xl font-semibold pt-3">
                {props.children}
                <hr className="pb-1" />
            </h2>
    },
    h3: (props) => {
        return <h3 className="text-2xl font-semibold pt-3">{props.children}</h3>
    },
    code: (props) => {
        return <code>{props.children}</code>
    },
    link: (props) => {
        return <FancyLink text={"ok"} link={props.href} />
    },
    a: (props) => {
        return <FancyLink text={props.children} link={props.href} />
    },
    ul: (props) => {
        return <ul className="list-disc">{props.children}</ul>
    }
}