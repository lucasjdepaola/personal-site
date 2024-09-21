import { Directory } from "@/components/os/ostypes";

export const ROOTDIR: Directory = {
    name: "",
    children: [ // this is where you initialize root
        {
            name: "test.txt",
            content: "hello world"
        },
        {
            name: "home",
            children: [

            ],
        },
        {
            name: "for.js",
            content: "for(let i = 0; i < 100; i++) console.log('hello world');"
        }
    ]
}