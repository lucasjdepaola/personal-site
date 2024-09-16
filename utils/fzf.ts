export default function fuzzyFind(arr: string[], query: string): string[] {
    return arr.filter((element: string) => {
        const regex: RegExp = new RegExp(query.split("").map(c => c + ".*").join(""));
        return regex.test(element);
    });
} // could potentially turn this into component based, where you would filter props, and return them