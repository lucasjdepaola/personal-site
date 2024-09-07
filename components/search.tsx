import IconWrapper from "./iconwrapper";
import SearchIcon from "/public/icons/search.svg"

export default function Search() {
    return (
        <div className="flex w-full text-center items-center justify-center m-auto">
            <div className="w-2/3 h-10 bg-slate-600 rounded-3xl shadow-sm" style={{
                backgroundColor: "#f9f9f9"
            }}>
                <IconWrapper icon={SearchIcon} /> search here
            </div>
        </div>
    )
}