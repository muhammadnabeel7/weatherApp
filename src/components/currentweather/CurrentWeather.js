import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './weatherStyles.css'
import Moment from 'react-moment';

const CurrentWeather = () => {
    let textInput = React.createRef();
    const [weatherArray, setWeatherArray] = useState([]) //Will contain array inside weather data object
    const [weatherData, setWeatherData] = useState({}) //Will contain data from Api
    const key = process.env.REACT_APP_WEATHER_API_KEY  //Api Key of open weather from .env 
    const defaultcity = process.env.REACT_APP_WEATHER_LOCATION //default city from .env
    const [city, setCity] = useState(defaultcity) //hook to change city in Api
    const [isData, setIsData] = useState(true) // will check if data has something or not
    const [loader, setLoader] = useState(false) //loader 
    const reFetchTime = parseInt(process.env.REACT_APP_MINUTES) * 60 //Static time in minutes from .env
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    const [date, setDate] = useState(new Date().toLocaleDateString())
    const [weekday, setWeekDay] = useState(new Date().toLocaleString("default", { weekday: 'long' }))

    //fetching data from api
    const getWeather = () => {
        setLoader(true)
        setTime(new Date().toLocaleTimeString())
        setWeekDay(new Date().toLocaleString("default", { weekday: 'long' }))
        setDate(new Date().toLocaleDateString())
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
            .then((res) => {
                setWeatherData(res.data)
                setWeatherArray(res.data.weather)
                setLoader(false)
            }).catch((err) => {
                setLoader(false)
                if (err.response.status === 404) {
                    setIsData(false)
                }
                console.log(err)
            })
    }

    //loading on component mount and after some interval
    useEffect(() => {
        getWeather()
        const timer = setInterval(getWeather, reFetchTime * 1000);
        return () => clearInterval(timer);
    }, [city])

    //take value from input ref
    const changeCity = (e) => {
        setCity(textInput.current.value.toLowerCase())
    }

    return (
        <section>
            {loader ?
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-12 text-center">
                            <div className="spinner-border text-primary" role="status">
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="container">
                    <div className="row d-flex justify-content-center px-3">
                        <div className='col-lg-4'>
                            <div className="card">
                                <div className='input-btn-container d-flex align-items-center justify-content-between'>
                                    <input className='my-4' ref={textInput} placeholder='Enter City Name' />
                                    <button onClick={changeCity}>Search</button>
                                </div>
                                {isData ?
                                    <div>
                                        <h2 className='my-3 text-dark'>{weatherData?.name}, <span className='country'>{weatherData?.sys?.country}</span></h2>
                                        <div className='d-flex justify-content-between'><span>{time}</span> <span className="dot">{`${weekday}, ${date}`}</span></div>
                                        <div className='d-flex align-items-center justify-content-lg-between my-4'>
                                            <div>
                                                <h1>{Math.round(weatherData.main?.temp)}℃</h1>
                                                <p><span>{weatherArray[0]?.main}</span></p>
                                            </div>


                                            <div className="sky">
                                                <div className="sun"></div>
                                                <div className="cloud">
                                                    <div className="circle-small"></div>
                                                    <div className="circle-tall"></div>
                                                    <div className="circle-medium"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> :
                                    (<div className='no-city text-center mt-5'><h2 className='text-dark'>No Such City!</h2></div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default CurrentWeather
