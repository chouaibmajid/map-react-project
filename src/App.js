import "./App.css";
import Header from "./Header/Header";
import Map from "./Map/Map";
import List from "./List/List";
import { CssBaseline, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getData, getWeither } from "./api";
function App() {
  const [types, setTypes] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [childClicked, setChildClicked] = useState("nulll");
  const [isLoading, setIsLoading] = useState(false);
  const [cords, setCords] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  const [weither, setWeither] = useState([]);
  const [bounds, setBounds] = useState({
    sw: { lat: 0, lng: 0 },
    ne: { lat: 0, lng: 0 },
  });
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const [places, setPlaces] = useState([]);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCords({ lat, lng });
  };

  useEffect(() => {
    setIsLoading(true);
    getWeither(cords?.lat,cords?.lng).then((data) => {
      
      setWeither(data);
     
    });
    getData(types, bounds.sw, bounds.ne).then((response) => {
      const responseFiltred = response?.filter((item) => item.rating > rating);
      setPlaces(responseFiltred);
      console.log({ responseFiltred });
      setIsLoading(false);
    });
  
  }, [rating, bounds, types]);
  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            childClicked={childClicked}
            isLoading={isLoading}
            places={places}
            setTypes={setTypes}
            setRating={setRating}
            types={types}
            rating={rating}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Map
            places={places}
            cords={cords}
            setCords={setCords}
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            weither={weither}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
