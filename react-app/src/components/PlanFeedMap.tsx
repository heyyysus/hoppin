import { FC, useEffect, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import secret  from "../secret.json";
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Get primary color from theme to use for map marker
import { useTheme } from '@mui/material/styles';

// The following is required to stop "npm build" from transpiling mapbox code.
import mapboxgl from 'mapbox-gl';
    // notice the exclamation point in the import.
    // @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
    mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export interface PlanFeedMapProps {
    center: { 
        lat: number,
        lng: number,
    }, 
    zoom: number
};

export const PlanFeedMap: FC<PlanFeedMapProps> =  ({center, zoom}) => {
  const theme = useTheme(); // Get theme to use for map marker
    return <Map
    mapboxAccessToken = {secret.MAPBOX_API_KEY}
    initialViewState = {{
      longitude: center.lng,
      latitude: center.lat,
      zoom: zoom
    }}
    mapStyle="mapbox://styles/mapbox/streets-v12"
    style={{
      width: '100%',
      height: '300px',
    }}
    
  >
    <Marker longitude={center.lng} latitude={center.lat} anchor="center" color={theme.palette.primary.main}>
        {/* <LocationOnIcon color='primary' /> */}
    </Marker>
  </Map>;
};