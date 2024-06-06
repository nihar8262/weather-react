import React, {useState} from 'react'
import axios from 'axios'
import cloud from "./assets/cloud.png"
import feels from "./assets/feels.png"
import humidity from "./assets/humidity.png"
import wind from "./assets/wind.png"

const weather_key= process.env.REACT_APP_API_KEY;

function App() {
  const [data,setData]=useState({});
  const [location,setLocation]=useState('');
  

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weather_key}e&units=metric`
  
  // function to access data from the api using on search value
  const searchLocation = (event) =>{
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
 

  return (
    <div className="app">
      {/* Search Bar */}
      <div className='text-center p-[1rem]'>
        <input
        className='px-[1.5rem]  py-[.7rem] text-xl rounded-3xl bg-white/5 border border-white/80'
         value={location}
         onChange={event => setLocation(event.target.value)}
         onKeyPress={searchLocation}
         placeholder='Enter Location'
         type='text'
        />
      </div>

      {/* Top */}
      <div className='max-w-[700px] h-[620px] mx-auto pb-[1rem] relative top-[10%] flex flex-col justify-between '>
        <div className='w-[100%] mt-[1rem] mb-[1rem] ml-auto mr-auto'>
          {/* Location */}
          <div >
            <p>{data.name}</p>
          </div>
          {/* Temperature */}
          <div >
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1>: null }
          </div>
          {/* Weather Condition */}
          <div className='relative -top-[185%]  -right-[40%] transform origin-top-center  rotate-[269deg]'>
          {data.weather ? <p>{data.weather[0].main}</p>: null }
          </div>
        </div>

         {/* Showing the data if and only if we have search a name of a city */}
        {data.name != undefined && 
        // bottom
          <div className='flex justify-evenly text-center w-[100%] mt-[1rem] mb-[3rem] ml-auto mr-auto p-[1rem] rounded-xl bg-white/20 '>
            {/* How weather exactly feels like */}
          <div className='flex flex-col items-center bg-black/50 py-1 px-3 rounded-3xl'>
          <img src={feels} className='w-20 h-20'/>
          {data.main ? <p className='font-bold'>{data.main.feels_like.toFixed()}°C</p>: null }
            <p>Feels Like</p>
          </div>
          {/* Humidity */}
          <div className='flex flex-col items-center bg-black/50 py-1 px-3 rounded-3xl'>
            <img src={humidity} className='w-20 h-20'/>
          {data.main ? <p className='font-bold'>{data.main.humidity}%</p>: null }
            <p>Humidity</p>
          </div>
          {/* Wind Speed */}
          <div className='flex flex-col items-center bg-black/50 py-1 px-3 rounded-3xl'>
          <img src={wind} className='w-20 h-20'/>
          {data.wind ? <p className='font-bold'>{data.wind.speed.toFixed()} m/s</p>: null }
            <p>Wind Speed</p>
          </div>
        </div>
        }

      </div>
    </div>
  );
}

export default App;
