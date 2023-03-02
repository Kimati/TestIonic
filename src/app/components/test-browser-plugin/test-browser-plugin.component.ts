import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-test-browser-plugin',
  templateUrl: './test-browser-plugin.component.html',
  styleUrls: ['./test-browser-plugin.component.scss'],
})
export class TestBrowserPluginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  async processOp(operation:string){
    switch(operation){
       case "open browser":
        console.log("Opening browser....");
         const afterOpening = await Browser.open({url: 'http://capacitorjs.com/' }).then(res => {
          console.log("After Opening browser.... " + JSON.stringify(res));
         });
        break;

        case "closer browser":
        
          break;

        default:
          alert("Invalid operation!!");
          break;
    }

  }

}
