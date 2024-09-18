import LightIcon from "/public/icons/lightmode.svg"
import DarkIcon from "/public/icons/darkmode.svg"
import CloudIcon from "/public/icons/cloud.svg"
import IconWrapper from "@/components/iconwrapper"
import { useEffect, useRef } from "react"

const LightLine = () => {
    return (
        <div className="w-11/12 m-auto opacity-50">
            <hr />
        </div>
    )
}

// https://open-meteo.com
// https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit

interface WeatherData {
    latitude: number;
    longitude: number;
    current: {
        time: string;
        interval: number;
        temperature_2m: number; // the current temp
    }
    hourly: {
        time: string[]
        temperature_2m: number;
    }
}

const getWeather = async(): Promise<WeatherData> => {
    //https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,cloud_cover
    const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit");
    const asWeatherData: WeatherData = await data.json() as WeatherData;
    return asWeatherData;
}

export const Weather = () => {
    const days = "Mon Tue Wed Thu Fri".split(" ");
    const weatherData = useRef<WeatherData | undefined>(undefined);
    useEffect(() => {
        getWeather().then(data => {weatherData.current = data});
    }, []);
    return (
        <div className="w-full h-full flex flex-col bg-[#95a1b2] text-lg text-white">
            <div id="topweatherinfo" className="flex flex-row justify-between">
                <div id="leftsideweatherinfo" className="p-3">
                    <div id="city">City</div>
                    <div id="temp" className="text-3xl font-light">81°</div>
                </div>
                <div id="rightsideweatherinfo" className="p-3 text-sm">
                    <div className="">
                        <IconWrapper icon={CloudIcon} width={25} height={25} />
                    </div>
                    Cloudy
                    <div>H:100° L:10°</div>
                </div>
            </div>
            <LightLine />
            <div id="middlehourlyforecast" className="flex-1">
                1pm, 2pm, 3pm
            </div>
            <LightLine />
            <div id="bottomweeklyforecast" className="flex flex-col pt-2 pb-2">
                {days.map((day: string, i: number) => {
                    return (
                        <div key={`${day}${i}`}>{day}</div>
                    )
                })}
            </div>
        </div>
    )
}
