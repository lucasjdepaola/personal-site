"use client"
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
// https://api.open-meteo.com/v1/forecast?latitude=${lattitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit
// https://ipapi.co/json for location approximation

interface IpApi {
    ip: string,
    network: string,
    version: string,
    city: string, // los angeles
    region: string, // state
    region_code: string, //CA
    country: string, // US
    country_name: string, // United States
    country_code: string, // US
    country_code_iso3: string, // USA
    country_capital: string, // Washington
    country_tld: string, // .us
    continent_code: string, // na
    in_eu: boolean, // false
    postal: string, // 98712
    latitude: number, //42.23
    longitude: number, // -39.2
    timezone: string, //america/california
    utc_offset: string, // -0400
    country_calling_code: string, // +1
    currency: string, // USD
    currency_name: string, // dollar
    languages: string, // en-us
    country_area: number, // not sure
    country_population: number, // population
    asn: string, // etc
    org: string; // provider?
}

interface WeatherData {
    latitude: number;
    longitude: number;
    current: {
        time: string;
        interval: number;
        temperature_2m: number; // the current temp
    }
    hourly: {
        // time to temp mapping, the time is a utc string
        time: string[]
        temperature_2m: number[];
    }
}


const getLocation = async() => {
    const url = "https://ipapi.co/json";
    const data = await fetch(url);
    const asIpApi = await data.json() as IpApi;
    return asIpApi;
}

const getWeather = async(longitude: number, lattitude: number): Promise<WeatherData> => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lattitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit`;
    const data = await fetch(url);
    const asWeatherData: WeatherData = await data.json() as WeatherData;
    console.log(JSON.stringify(asWeatherData));
    return asWeatherData;
}

const getHours = () => {
    // 6 hours
    let hr: number = new Date().getHours();
    const am = (h: number): boolean => h === 24 || h < 12;
    const arr = [];
    for(let i = 0; i < 6; i++) {
        let amorpm = am(hr) ? "AM" : "PM";
        let hour = hr % 12 === 0 ? 12 : hr % 12;
        arr.push(`${hour}${amorpm}`);
        hr = hr >= 23 ? 0 : hr + 1;
    }
    return arr;
}

const groupByDay = (data: WeatherData, date: string) => {
    const d = new Date(date);
    const day = d.getDay();
    return data.hourly.time.filter((e: string, i: number) => {
        const cd = new Date(e);
        return cd.getDay() === day;
    })
}

const startIndexFromDate = (data: WeatherData | undefined): number => {
    if(!data) return 0;
    const date = new Date();
    for(let i = 0; i < data.hourly.time.length; i++) {
        const ds = data.hourly.time[i];
        const dt = new Date(ds);
        if(dt.getHours() === date.getHours()) {
            return i;
        }
    }
    return 0;
}

const todayHighAndLow = (futuredays: number, data: WeatherData | undefined): number[]  => {
    if(!data) return [0, 0];
    const today = new Date();
    const dayArr = [];
    for(let i = 0; i < data.hourly.time.length; i++) {
        const d = new Date(data.hourly.time[i]);
        const comp = (today.getDay() + futuredays) % 7;
        if(d.getDay() === comp) {
            dayArr.push(i);
        }
    }
    if(dayArr.length === 0) return [0, 0];
    const l = dayArr.reduce((accum, index) => {
        if(accum === 0) return data.hourly.temperature_2m[index];
        return Math.min(data.hourly.temperature_2m[index], accum)
    })
    const h = dayArr.reduce((accum, index) => {
        return Math.max(data.hourly.temperature_2m[index], accum)
    })
    return [l, h];
}

const getDays = () => {
    const days = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
    let d = new Date().getDay() + 1;
    const arr = [];
    for(let i = 0; i < 5; i++) {
        arr.push(days[d]);
        // if it goes over the days in a week, overlap the number
        d = d >= days.length-1? 0 : d + 1;
    }
    return arr;
}

export const Weather = () => {
    const weatherData = useRef<WeatherData | undefined>(undefined);
    const geoData = useRef<IpApi | undefined>(undefined);
    useEffect(() => {
        // use a decent and free weather api to retrieve informative data related to the weather (per city)
        getLocation().then(data => {
            geoData.current = data;
            const lat = data.latitude;
            const lon = data.longitude;
            getWeather(lon, lat).then(data => {weatherData.current = data});
            console.log(weatherData.current);
        })
    }, []);
    const [l, h] = todayHighAndLow(0, weatherData.current);
    return (
        <div className="w-full h-full flex flex-col bg-gradient-to-b from-[#084d90] via-60% via-[#417eba] to-white text-lg text-white cursor-default">
            <div id="topweatherinfo" className="flex flex-row justify-between">
                <div id="leftsideweatherinfo" className="p-3 flex flex-col items-start">
                    <div id="city">{geoData.current?.city||"City"}</div>
                    <div id="temp" className="text-3xl font-light">{Math.round(weatherData.current?.current.temperature_2m||1)}°</div>
                </div>
                <div id="rightsideweatherinfo" className="p-3 text-sm">
                    <div className="">
                        <IconWrapper icon={CloudIcon} width={25} height={25} />
                    </div>
                    Cloudy
                    <div>H:{h}° L:{l}°</div>
                </div>
            </div>
            <LightLine />
            <div id="middlehourlyforecast" className="flex flex-row items-center">
                {getHours().map((e, i) => {
                    const start = startIndexFromDate(weatherData.current);
                    return (// indexing not correct for weather api
                        <div key={`hr${i}`} className="w-full flex-col">
                            <div className="text-sm">{e}</div>
                            <IconWrapper icon={CloudIcon} width={24} height={24} />
                            <div className="text-sm">{weatherData.current ? weatherData.current.hourly.temperature_2m[start + i]:"50"}°</div>
                        </div>
                    )
                })}
            </div>
            <LightLine />
            <div id="bottomweeklyforecast" className="flex flex-col items-start p-5">
                {getDays().map((day: string, i: number) => {
                    const [low, high] = todayHighAndLow(i, weatherData.current);
                    return (
                        <div className="flex flex-row w-full justify-around" key={`${day}${i}`}>
                            <div>{day}</div>
                            <IconWrapper icon={CloudIcon} width={24} height={24} />
                            <div>{low}°</div>
                            <div>{"<"}-----{">"}</div>
                            <div>{high}°</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
