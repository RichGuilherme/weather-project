import { useContext } from "react"
import { DataWeather } from '../../context/DataWeatherContent';

import './InformationWeather.css'

import iconWateDrop from '../../assets/iconWate.svg'
import iconAir from '../../assets/iconAir.svg'
import iconWeather from '../../assets/iconWeather.svg'
import iconSun from '../../assets/iconSun.svg'
import { horasMinutos } from "../../utils/hrsAndMinute";
import { LoadingSun } from "../loadingSun";


export default function InformationWeather() {
     const { weatherDatas, loading } = useContext(DataWeather)
     const weatherdata = weatherDatas?.data

     const sunriseTime = weatherdata?.city.sunrise * 1000
     const sunsetTime = weatherdata?.city.sunset * 1000

     const sunrise = new Date(sunriseTime)
     const sunset = new Date(sunsetTime)

     const diaOuNoite = weatherdata?.list[0].weather[0].icon?.includes("d")


     return (
          <>
               <section id="informationWeather">
                    <h1> Detalhes do clima hoje </h1>

                    {loading !== true ? (

                         <div className='container-espefications-weather'>
                              <div className="espefications-weather">
                                   <p> <img src={iconWateDrop} alt='iconWateDrop'></img> Umidade </p>
                                   <span>{weatherdata.list[0].main.humidity}%</span>
                              </div>

                              <div className="espefications-weather">
                                   <p><img src={iconAir} alt='iconAir'></img>Vento</p>
                                   <span>{weatherdata.list[0].wind.speed}km/h</span>
                              </div>

                              <div className="espefications-weather">
                                   <p> <img src={iconWeather} alt='iconWeather'></img> Sensação térmica</p>
                                   <span>{(weatherdata.list[0].main.feels_like).toFixed()}&deg;</span>
                              </div>

                              <div className="espefications-weather">
                                   <p> <img src={iconSun} alt='iconSun'></img>  {diaOuNoite ? "Por do sol" : "Nascer do sol"}</p>
                                   <span>{diaOuNoite ? horasMinutos(sunset) : horasMinutos(sunrise)}</span>
                              </div>

                         </div>
                    ) :
                         <LoadingSun />

                    }
               </section >
          </>
     )
}