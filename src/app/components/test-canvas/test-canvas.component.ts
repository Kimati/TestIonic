import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-test-canvas',
  templateUrl: './test-canvas.component.html',
  styleUrls: ['./test-canvas.component.scss'],
})
export class TestCanvasComponent implements OnInit,AfterViewInit {
// @ViewChild('imageCanvas') imageCanvas:ElementRef;
// @ViewChild('bufferCanvas') bufferCanvas:ElementRef;

imgHeight:number = 400;

canvas:any;
context:any;

bfCanva:any;
bufferCtx:any;

sampleImgUrl:string = "https://f1.media.brightcove.com/8/234507581/234507581_5106927173001_5106903722001-vs.jpg?pubId=234507581&videoId=5106903722001";
buffercanvas:boolean = false;
orgImg:boolean = true;

constructor(private el:ElementRef,private renderer:Renderer2) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.drawRectangle();
  }

  imageLoaded(){
    alert("image loaded");
    this.drawRectangle();
  }

  drawRectangle(){
    let source = new Image(400,400);
    source.src = this.sampleImgUrl;
    //const img = new Image(100, 100);

    // this.canvas = this.imageCanvas.nativeElement;
    this.canvas = this.renderer.createElement('canvas');
    this.renderer.setAttribute(this.canvas,'id','canvas');
    this.context = this.canvas.getContext('2d');

    // this.bfCanva = this.bufferCanvas.nativeElement;
    this.bfCanva = this.renderer.createElement('canvas');
    this.renderer.setAttribute(this.bfCanva,'id','canvasbf');
    // this.bfCanva = this.renderer.createElement('canvas');
    this.bufferCtx = this.bfCanva.getContext('2d');
    
    this.bfCanva.width = source.width;
    this.bfCanva.height = source.height;

     source.onload = () => {
      this.bufferCtx.drawImage(source,0,0); //drawImage(image,pos on x-axis,pos on y-axis)
      this.bufferCtx.beginPath();
      this.bufferCtx.strokeStyle = "#FF0000";
      this.bufferCtx.strokeRect(220, 140, 100, 50);
      
      //this.bufferCtx.fillStyle = "#FF0000";
      // fillRect(pos on the x-axis of the containing canva,pos on the y-axis of the containing canva,Rectangle width, Rectangle height);
      
     }
    
    this.orgImg = false;
    this.buffercanvas = false;

    this.context.drawImage( this.bfCanva, 0, 0);
   


  }

}
