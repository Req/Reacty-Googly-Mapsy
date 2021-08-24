import { useEffect, useState } from 'react'
import './App.css';

export default function App() {
  const timelinePoints = [
      { place: "Prague", lat: 50.0, lng: 14.4, description: "...", extra: "..." },
      { place: "Berlin",  lat: 52.5, lng: 13.4, description: "...", extra: "..." },
  ]
  const [activePoint, setActivePoint] = useState(timelinePoints[0]);
  return(
      <div>
        <button onClick={() => setActivePoint(timelinePoints[0])}>Prague</button>
        <button onClick={() => setActivePoint(timelinePoints[1])}>Berlin</button>
        <h1>{activePoint.place}</h1>
        <Map activePoint={activePoint} />
      </div>

  )
}

let map;

function Map(props) {

  // this runs after props.activePoint changes
  useEffect(() => {
      // map.setCenter is instant: map.panTo animates
      map && map.panTo({ lat: props.activePoint.lat, lng: props.activePoint.lng })
  }, [props.activePoint]);

  // this runs after first render
  useEffect(() => {
    map = new window.google.maps.Map(document.getElementById("maphere"), {
      center: { lat: props.activePoint.lat, lng: props.activePoint.lng },
      zoom: 8,
    });
  }, [])

  return(<div id="maphere" style={{width:"800px", height: "800px"}} />);
}