import { MDXComponents } from "mdx/types";

export const componentsMDX: Readonly<MDXComponents> = {
    h1: (props) => {
      return <h1 className="text-lg">{props.children}</h1>
    }
}