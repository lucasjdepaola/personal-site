// 09-12-2024
//2003-07-24
export const formatmm = (d: string): string => {
    let arr: string[] = [];
    if(d.includes("-")) {
        arr = d.split("-");
    }
    else if(d.includes("/")) {
        arr = d.split("/");
    }
    if(arr[1].length < 2) {
        arr[1] = `0${arr[1]}`;
    }
    if(arr[2].length < 2) {
        arr[2] = `0${arr[2]}`;
    }
    return `${arr[2]}/${arr[0]}/${arr[1]}`; // iso boilerplate
}