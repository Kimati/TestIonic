import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestBrowserPluginComponent } from '../components/test-browser-plugin/test-browser-plugin.component';
import { TestCameraPluginComponent } from '../components/test-camera-plugin/test-camera-plugin.component';
import { TestCanvasComponent } from '../components/test-canvas/test-canvas.component';
import { TestFileSystemComponent } from '../components/test-file-system/test-file-system.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'filesystem',
    component: TestFileSystemComponent,
  },
  {
    path:'browserplugin',
    component:TestBrowserPluginComponent,
  },
  {
    path:'cameraplugin',
    component:TestCameraPluginComponent,
  },
  {
    path:'canvasdrawing',
    component:TestCanvasComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
