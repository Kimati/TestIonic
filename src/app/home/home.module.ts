import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TestFileSystemComponent } from '../components/test-file-system/test-file-system.component';
import { TestBrowserPluginComponent } from '../components/test-browser-plugin/test-browser-plugin.component';
import { TestCameraPluginComponent } from '../components/test-camera-plugin/test-camera-plugin.component';
import { TestCanvasComponent } from '../components/test-canvas/test-canvas.component';
import { TestGoogleMapsComponent } from '../components/test-google-maps/test-google-maps.component';
//import { Browser } from '@capacitor/browser';


@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage,
    TestFileSystemComponent,
    TestBrowserPluginComponent,
    TestCameraPluginComponent,
    TestCanvasComponent,
    TestGoogleMapsComponent
  ],
  
 
})
export class HomePageModule {}
