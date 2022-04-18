PRE-REQUIREMENTS
The task asks to make an application that search the current weather of a specific city. The city which we want to search will be read from a config file which is .env in my case. The application will read data from an API first time when application will be loaded and then will read data periodically in minutes that will also be defined in config file. To get data, I have to use open weather Api and I am using 
openweathermap.org for fetching data. For using their Api, we need to make an account on it and then get API KEYS that will be fitted into URL which they will give and enable you to get data. They have lot of different URLS for fetching data in different aspects like on the basis of city id, longitude, lattitude and more. We will be using Api based on city.

EXECUTION 
I am using React JS (version 18.0.0) for the developing this application. In React, I used React hooks (Functional Components). I made a new component called CurrentWeather, made required states with the help of useState hook and fetch data in a function using axios library. And then called that function in useEffect hook which is responsible for mounting data on load and also under some conditions. We also want to read data from Api again after some minutes and for that I used javascript setInterval in useEffect hook that takes a function and time to execute that function after given time. 

BONUS
By default, city will be coming from config file (.env). But you can also search for another city's weather.

RUNNING
Just download it from github repo, run "npm install" and then after installation of node modules run "npm start" to start the application.

