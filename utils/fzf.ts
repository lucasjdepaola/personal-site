export default function fuzzyFind(arr: string[], query: string): string[] {
    if(query.length === 0) return [];
    return arr.filter((element: string) => {
        const regex: RegExp = new RegExp(query.toLowerCase().split("").map(c => c + ".*").join(""));
        return regex.test(element.toLowerCase());
    });
};