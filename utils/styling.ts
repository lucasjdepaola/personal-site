// combine tailwind styles and variables
export const cnStyle = (...args: string[]): string => {
    return args.reduce((e, c) => {
        if(e.endsWith(" ")) {
            return e + c;
        }
        return e + " " + c;
    });
}