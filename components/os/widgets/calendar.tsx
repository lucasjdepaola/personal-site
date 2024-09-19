
const months = "January February March April May June July August September October November December".split(" ")
const days = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");

export default function CalendarWidget() {
    const date = new Date();
    return (
        <div className="w-full h-full bg-white">
            <div className="bg-red-500 h-1/4 flex items-center justify-center text-center text-white">
                <div className="text-2xl font-semibold">{months[date.getMonth()]}</div>
            </div>
            <div className="flex flex-col h-3/4 items-center justify-center text-center">
                <div className="text-8xl text-black">{date.getDate()}</div>
                <div className="font-semibold text-black">{days[date.getDay()]}</div>
            </div>
        </div>
    )
}