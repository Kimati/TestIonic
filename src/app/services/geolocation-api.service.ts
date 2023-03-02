import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Position } from '@capacitor/geolocation/dist/esm/definitions';

@Injectable({
  providedIn: 'root'
})

//For testing the @capacitor/geolocation api
export class GeolocationApiService {
positionOptions:PositionOptions = {enableHighAccuracy:true,timeout:60000};

  constructor() { }

 //get current device location
 async currentLocation():Promise<Position>{
   return await Geolocation.getCurrentPosition(this.positionOptions);
 }

 //Watch device location
 async watchLocation():Promise<string>{
    return await Geolocation.watchPosition(this.positionOptions,(position)=>{
      return position;
    })
 }

}
