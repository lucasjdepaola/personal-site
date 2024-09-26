import { Dispatch, SetStateAction } from "react"

interface Wallpapers {
    [key: string]: string;
}
export const wallpapers: Wallpapers = {
    macosDefault: "https://i.pinimg.com/originals/08/c5/ec/08c5ec8fddd5fd3c965e773cad127e2b.jpg",
}

export const guardSetWallpaper = (url: string, swp: Dispatch<SetStateAction<string>>) => {
    swp(wp => {
        if(url in wallpapers) {
            return wallpapers[url];
        }
        return wp;
    })
}