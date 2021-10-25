import axios from "axios";

export const getData = async (types , sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${types}/list-in-boundary`, {
      method: "GET",
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeither = async(lat,lng) => {
  if(lat && lng){
  try {
  const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',{
    
      params: {
        
        lat: lat,
        lon: lng,
        
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY
      }
    })
  
  return data;
  }catch (error) {
    console.log(error)
  }
}} 