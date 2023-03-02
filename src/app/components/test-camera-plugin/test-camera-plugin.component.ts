import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType,CameraSource, Photo } from '@capacitor/camera';

import { Directory, FileInfo, Filesystem } from "@capacitor/filesystem";
import { Platform } from '@ionic/angular';

//constants
const IMAGE_DIR = "capturedImages";

//interfaces
interface savedImages{
  name:string,
  filePath:string
  data:string
}

@Component({
  selector: 'app-test-camera-plugin',
  templateUrl: './test-camera-plugin.component.html',
  styleUrls: ['./test-camera-plugin.component.scss'],
})
export class TestCameraPluginComponent implements OnInit {
  allImages:savedImages[]  = []

  constructor(private platform:Platform) { }

  ngOnInit() {
      this. loadImagesFolder();
  }

 async processOp(operation){
    switch(operation){
      case "get photo":
        console.log("Getting photo...")
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            source:CameraSource.Prompt,
            resultType: CameraResultType.Uri
          }).then(photo => {
            //nb. photo is of type Photo
           
            this.saveImage(photo);

            //Reload th images folder
            this. loadImagesFolder();

            console.log("Contents of the images folder: " + JSON.stringify(this.allImages));
            //this.saveimageData(photo)

          });         
        break;

      case "pick images":
        console.log("Picking images...")
        break;
      
      default:
        alert("Invalid operation");
        break;
    }

  }

  async loadImagesFolder(){
     Filesystem.readdir({
      path:IMAGE_DIR,
      directory:Directory.Documents
    }).then((result) => {
       console.log("The IMAGE_DIR exists");
       
       //Take all images
       this.takeImages(result.files);
    },
    //If folder IMAGE_DIR does not exist
    async (error) => {
          console.log("Creating the IMAGE_DIR folder....");
          await  Filesystem.mkdir({path:IMAGE_DIR, directory:Directory.Documents}).then(() => {
            console.log("Folder IMAGE_DIR has been created successfully");
          })
    })
  }

  async takeImages(imageFiles: FileInfo[]){
    console.log("IMAGE_DIR files are " + JSON.stringify(imageFiles));
    
    for (let f of imageFiles){

      let filepath = `${IMAGE_DIR}/${f}`;

     const readFile = await Filesystem.readFile({
       path:filepath,
       directory:Directory.Documents
      })

       this.allImages.push({
        name:f.name,
        filePath:filepath,
        data:readFile.data
       })
    }
    
  }


  //save the captured image
  async saveImage(image:Photo){
    //Convert the captured image to base64 string so that we can write it to the file system.
    const imageBase64String = await this.toBase64String(image);

    //Take the path to the captured image
    var imagePath = imageBase64String.substring(0,imageBase64String.lastIndexOf('/'));

    //Take out the image name of the selected image from the path
     var imageName = imageBase64String.substring(imageBase64String.lastIndexOf('/') + 1, imageBase64String.lastIndexOf('?') ||  imageBase64String.lastIndexOf(' '));

     //Take out the image extension from the image name
     var imageExtension  = imageName.substring(imageName.lastIndexOf('.') + 1,imageName.lastIndexOf(' '));

    //Generate a new name for the captured image
    const fileName = new Date().getTime() + '.' + imageExtension;

    //move the image to an image storage folder in the app and store it with the newly generated name
       const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: imageBase64String,
        directory: Directory.Documents
    });

    //Add the newly generated name to the database.
    console.log("File name to be copied: " + fileName);
    console.log("Image name is : " + imageName);
    console.log("Image extension is: " + imageExtension);
   // console.log("File name to be copied: " + fileName);

    console.log("captured image is " + imageBase64String);
    console.log("Captured image base64string is " + JSON.stringify(imageBase64String));
    
    // const fileName = new Date().getTime() + '.jpeg';
  

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    // this.loadFiles();
  }
   
  //Converting image to base64b string
  async toBase64String(image:Photo){
    //device is running on cordova or capacitor
     if(this.platform.is('hybrid')){
      const file = await Filesystem.readFile({
        path:image.path
      })
      return file.data;
     }

     //
     else{
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        return await this.convertBlobToBase64(blob) as string;
     }
  }
  
  //Converting blob to base64
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

// saveimageData(photo:Photo){
//    photo.
// }

}
