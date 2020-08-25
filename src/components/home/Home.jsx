import React, { useState } from 'react'

import './Home.scss'

const Api = {
	key: "523cc874aa96b2b2db0efe4737c9e5a7",
	base: "http://api.openweathermap.org/data/2.5/"
}

const Home = () => {
	const [query, setQuery] = useState('')
	const [weather, setWeather] = useState({})

	const search = event => {
		if (event.key === "Enter") {
			fetch(`${Api.base}weather?q=${query}&units=metric&APPID=${Api.key}`)
				.then(res => res.json())
				.then(result => {
						setWeather(result);
						setQuery('');
						console.log(result)
					})
		}
	}

    const getTheDate = (d) => {
			const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			const Days = [ "Sunday", 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

			const day = Days[d.getDay()];
			const date = d.getDate(); 
			const month = Months[d.getMonth()];
			const year = d.getFullYear()

			return `${day} ${date} ${month} ${year}`
		}
    
    return (
        <div className={
					(typeof weather.main != "undefined") ? 
					((weather.weather[0].main = "clean") ? 'wrapperClean'
					: 'wrapperRainy'): ' wrapperCloudy'
				}>
            <div className="container">
							<div className="root">
								<input type="text" 
									placeholder="Search..." 
									className="input"
									onChange = {e => setQuery(e.target.value)}
									value={query}
									onKeyPress={search}
								></input>
							</div>
               {(typeof weather.main != "undefined") ? (
								  <div>
										<div className="location">
											{weather.name} {weather.sys.country}
										</div>
										<div className="data">
											{getTheDate(new Date)}
										</div>
										<div className="degree">
											{weather.main.temp}<sup>o</sup>c
										</div>
										<div className="condition">
											{weather.weather[0].main}
										</div>
									</div>
							 ) : ('')}
            </div>
        </div>
    )

}
export default Home;