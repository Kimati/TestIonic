import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filesystem,Directory } from '@capacitor/filesystem';
//import { filesystem } from '@capacitor/filesystem';

const directoryType = Directory.Documents;

@Component({
  selector: 'app-test-file-system',
  templateUrl: './test-file-system.component.html',
  styleUrls: ['./test-file-system.component.scss'],
})

export class TestFileSystemComponent implements OnInit {
  
  dirName:string = "TestIonicDir";
  fileName:string = "";
  dirPath:string = "";
  folderContents = [];


  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    console.log("Param Map: " + JSON.stringify(this.route.snapshot.paramMap));
    this.dirPath = this.route.snapshot.paramMap.get("folder"); //This resolves to null
    console.log("Route folder is: " + JSON.stringify(this.dirPath));
  }

  async processOp(opr){
       
    switch(opr){              
        case "mkdir":
            //mkdir
           const afterMkdir = await Filesystem.mkdir({path:this.dirPath + '/' + this.dirName,directory:directoryType,recursive:true}).then(res => {
            console.log("Response after making one dir: " + JSON.stringify(res))
           });   
           console.log("Created dir path is: " + this.dirPath + '/' + this.dirName);
        break;

        case "writefile":
          //write to file
         break;

        case "readdirectory":
        //read the contents of the device Documents folder
        const documentContents =  await Filesystem.readdir({path:this.dirPath,directory:directoryType}).then(res => {
          console.log("Contents of Documents folder: " + JSON.stringify(res));
          this.folderContents = res.files.map(file => {
                  const fil = Filesystem.stat({path:this.dirPath + '/' + file,directory:directoryType});
                  console.log("File statistics: " + fil);
          })
        });
      
        // //contents of the Documents folder
        //   console.log("Contents of Documents folder: " + JSON.stringify(documentContents));

        // this.folderContents = documentContents.files.map(file => {
        //         const fil = Filesystem.stat({path:this.dirPath + '/' + file,directory:directoryType});
        //         console.log("File statistics: " + fil);
        // })
        break;

        case "deletefile":
          //delete file
          break;

        default:
            alert("Invalid operation");
        break;
    }

  }

  //Read dir contents
  async readDir(){
     
  }

}
