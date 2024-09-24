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
    let x = 0;
    while(x++ < 32) {
        if(floatValue === 1) {
            // return early if the values are equal
            return `${integerAsBinaryString}.${floatStr}1`;
        }
        if(floatValue * 2 > 1) {
            floatStr += "1";
            floatValue /= 2;
        } else {
            floatStr += "0";
            floatValue *= 2;
        }
    }
    return `${integerAsBinaryString}.${floatStr}`;
}

interface ExponentReturn {
    formattedNumber: string;
    exponentValue: number;
    bias: number;
    mantissa: string;
}

const calculateExponent = (regularConvert: string): ExponentReturn => {
    // 127 is single precision bias
    let count = 0;
    for(let i = regularConvert.indexOf(".")-1; i >= 1; i--) {
        count++;
    }
    let rm = regularConvert.replace(".", "");
    const fmt = rm[0] + "." + rm.slice(1);
    return {
        formattedNumber: fmt,
        exponentValue: count,
        bias: 127,
        mantissa: fmt.slice(2)
    }
    // e = 127 + pseudoE |> bin
    // mantissa is the remaining from the first number, eg 1.0101011 => 0101011
}
const calculateMantissa = () => {

}

// for(let i = 0; i <= 32; i++) {
//     console.log(binToStr(i));
// }
console.log(floatingpoint(3.125));
console.log(floatingpoint(85.125)); // for simple numbers, need to change the exponent from 8
const fp = floatingpoint(85.125);
console.log(calculateExponent(fp));
// 01000000010010000000000000000000