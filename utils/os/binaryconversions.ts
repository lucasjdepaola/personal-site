export const binToStr = (n : number): string => {
    let str = "";
    while(n !== 0) {
        str += n % 2 === 1 ? "1" : "0";
        n = Math.floor(n/2);
    }
    return rev(str);
}

export const rev = (str: string): string => {
    let s = "";
    let x = str.length-1;
    for(let i = 0; i < str.length; i++) {
        s += str[x--];
    }
    return s;
}

export const floatingpoint = (n: number) => {
    // do integer side first
    if(Math.floor(n) === n) return binToStr(n); // if it's an integer value
    const integerValue = Math.floor(n)
    const integerAsBinaryString = binToStr(integerValue);

    // float side
    let floatValue = n - integerValue;
    let floatStr = "";
    // 1/currentIteration should not be over the float value
    // number /2 > 1 would warrant a one value
    let x = 1.0;
    while(floatValue >= 0.0000001) {
        floatStr += x - floatValue > floatValue ? "1" : "0";
        x /= 2;
    }
    return `${integerAsBinaryString}.${floatStr}`;
}
interface CharSet {
    [key: number]: string;
}

const utfset: CharSet = {
    0: "/", // .. etc

}

for(let i = 0; i <= 32; i++) {
    console.log(binToStr(i));
}
console.log(floatingpoint(3.125));