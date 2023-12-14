import { useState } from "react"
import { IWeather } from "./interfaces/weather.interface";

export const WeatherApp = () => {
    
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '30eee3ee12913047afda706f20a3df9f';
    const difKelvin: number = 273.15

    const [city, setCity] = useState('');
    const [data, setData] = useState<IWeather>();
    
    const HandleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setCity(e.target.value);
    }
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(city.trim().length > 0) getFetchWeather() 
        setCity('')
    }

    const getFetchWeather = async() => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
            const info = await response.json();
            setData(info)
            console.log(info);
        } catch (error: any) {
            console.log('Ocurrio un problema: ' + error);
        }
    }

    return (
        <div className="container">
            <h1>Aplicación del clima</h1>

            <form onSubmit={onSubmit}>
                <input type="text" 
                        value={city}
                        onChange={HandleChangeCity}/>
                <button type="submit">Buscar</button>
            </form>
            {
                data && (
                    <div>
                        <h2>{ data.name }</h2>
                        <p>Temperatura: {Number((data.main.temp - difKelvin).toFixed(2))}°C</p>
                        <p>Condición meterologica: {data.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                    </div>
                )
            }
        </div>
    )
}
