import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeolocationApiService } from 'src/app/services/geolocation-api.service';

@Component({
  selector: 'app-test-google-maps',
  templateUrl: './test-google-maps.component.html',
  styleUrls: ['./test-google-maps.component.scss'],
})
export class TestGoogleMapsComponent implements OnInit,OnDestroy {

  timerId:any;

  constructor(private geolocation:GeolocationApiService) { }

  ngOnInit() {}

  ngOnDestroy(): void {
    //Stop watching for device position
    clearInterval(this.timerId);
  }

  processOp(operation:string){
     switch(operation){
      case 'currentlocation':
         this.deviceCurrentLocation();
        break;
      
        case 'watchlocation':
          this.watchDeviceLocation();
         break;

      default:
        console.log("Invalid operation");
     }
  }

  //get device current location
  deviceCurrentLocation(){
    try{
    this.geolocation.currentLocation().then((position) => {
      console.log("Current device location is: " + JSON.stringify(position));
    });
  }
  catch(error){
     console.error(error);
  }
  }

  //track device location
  watchDeviceLocation(){
    //report location after every 5 seconds
    this.timerId = setInterval(this.reportCurrentPosition,5000);
  }

  reportCurrentPosition(){
    try{
      this.geolocation.watchLocation().then((position)=>{
        console.log("Current gps loc: " + JSON.stringify(position));
      });
     }
     catch(error){
       console.error(error);
     }
  }

}
