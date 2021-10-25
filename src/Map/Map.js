import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

// import mapStyles from "../../mapStyles";
import useStyles from "./styles.js";

const Map = ({places ,weither, cords,setCords,setBounds,setChildClicked}) => {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles({cords , setCords});console.log({places})
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={cords}
        center={cords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
         options={""}
         onChange={(e) => {
            setCords({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
          onChildClick={(child) => setChildClicked(child)}

      >

{places?.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}

        {weither?.list?.map((item,i) => (
          <div
          key={i}
          lat={item.coord.lat}
          lng={item.coord.lng}
          
          >
            <img height="100px "src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
