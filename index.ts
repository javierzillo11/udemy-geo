// Import stylesheets
import './style.css';
import axios from "axios"


const form = document.querySelector("form")!;
const adressInput = document.getElementById("adress")! as HTMLInputElement;

declare var google: any;

type GoogleGeocodingResponse = {results: {geometry:{location:{lat: number, lng:number}}}[];
status: "OK" | "ZERO_RESULTS";
};

const GOOGLE_API_KEY = "AIzaSyDc_UuFwdqVwgjl_prrPv_HAHngKTz4xZ8";
function searchAdressHandler(event: Event){
  event.preventDefault();
  const enteredAdress = adressInput.value;
  axios.get<GoogleGeocodingResponse>
  (`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAdress)},+Mountain+View,+CA&key=${GOOGLE_API_KEY}`
  ).then(response =>{
    if(response.data.status !== "OK"){
      throw new Error("Could not fetch location!")
    }
    const coordinates = response.data.results[0].geometry.location;

   const map = new google.maps.Map(document.getElementById('map'), {
          center: coordinates,
          zoom: 12
        });
}
 let map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }