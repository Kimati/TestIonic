import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}

  processTest(test:any){
    alert("Processing the submitted test");
   //switch test
   switch(test){
       case "filesystem":
        this.router.navigateByUrl("home/filesystem");
        break;

        case "browserplugin":
          this.router.navigateByUrl("home/browserplugin");
          break;

          case "cameraplugin":
            this.router.navigateByUrl("home/cameraplugin");
            break;

            case "canvasdrawing":
              this.router.navigateByUrl("home/canvasdrawing");
              break;
  
        default:
           alert("Invalid operation");
           break;
   }
   
  }



}
