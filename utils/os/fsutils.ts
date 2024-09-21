import { Directory } from "@/components/os/ostypes";
import { ROOTDIR } from "@/types/os/root"

export const findDirFromPath = (path: string, workingDirectory?: string): Directory | null => {
    const splitDir = path.split("/"); // list of directories to follow
    let pointer = null;
    if(pathIsRelative(path)) {
        for(const dirName of splitDir) {
            for(const child of ROOTDIR.children) {
                if(child.name === dirName && "children" in child) {
                    pointer = child;
                    break;
                }
            }
        }
    }
    else if(workingDirectory) {
        const appended = workingDirectory + "/" + path.replace("./", "");
        pointer = findDirFromPath(appended);
    }
    return pointer;
}

const pathIsRelative = (path: string): boolean => {
    return !path.startsWith("/");
}