const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card");

const apiKey = "708f3471387d559e3c541705fe502c58";

weatherForm.addEventListener("submit",async event=>{
   event.preventDefault();
   
   const city = cityInput.value;

   if(city){
         try{
           const weatherData = await getWeatherData(city);
           displayWeatherInfo(weatherData);
           cityInput.value="";
         }
         catch(err){
           displayError(err);
         }
   }
   else{
    displayError("Please Enter the city")
   }

  
})


async function getWeatherData(city){
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

   const response = await fetch(apiUrl);
   
   if(!response.ok) 
   {
    throw new Error("could not fetch weather data");
   
   }
   else{
      return response.json();
   }
}

function displayWeatherInfo(data){
  
   const {name: city,
    main: {temp,humidity},
    weather :[{description , id, icon}],} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city;
    cityDisplay.className = "cityDisplay";
    card.appendChild(cityDisplay);

    const tempDisplay = document.createElement("h2");
    
    tempDisplay.textContent = parseInt(temp- 273.15)+"°C"
    tempDisplay.className = "tempDisplay";
    card.appendChild(tempDisplay);

    //displaying humididty 

    const humidityDisplay = document.createElement("p");
    humidityDisplay.innerHTML = "humidity: "+humidity+"%";
    humidityDisplay.className = "humidityDisplay"
    card.appendChild(humidityDisplay);

    const weatherDisplay = document.createElement("img");
    weatherDisplay.className = "weatherDisplay";
    
    weatherDisplay.src = getWeatherEmoji(id);
    card.appendChild(weatherDisplay);


    const descDisplay = document.createElement("p");
    descDisplay.className = "descDisplay";

    descDisplay.innerHTML = description;
    card.appendChild(descDisplay);
console.log(id)
  
    
    
    
}

function getWeatherEmoji(weatherId){
 
  if(weatherId >=200 && weatherId <300)
  {
   return "images/thunder.svg";
     
  }

 else if(weatherId >=300 && weatherId <400)
 {
   return "images/drizzle.svg";
 }

 else if(weatherId >=500 && weatherId <600)
    {
      return "images/rain.svg"
    }
else if(weatherId >=600 && weatherId <700)
{
   return "images/snow.svg"
}

else if(weatherId >=700 && weatherId <800)
{
   return "images/atmosphere.svg";
}
else if(weatherId == 800 )
{
   return "images/clearsky.svg";
}

else if(weatherId >800)
{
   return "images/clouds.svg"
}
else{
   return "images/default.svg"
}


}

function displayError(message)
{

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);


}