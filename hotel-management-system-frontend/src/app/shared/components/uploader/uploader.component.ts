import { Component } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  images: File[] = [];
  imageUrls: string[] = [];

  constructor(private storage: AngularFireStorage) { }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      // @ts-ignore
      this.images.push(files.item(i));
    }
  }

  uploadImages() {
    this.images.forEach((image) => {
      const filePath = `hotel-images/${image.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image);

      task.then((result) => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageUrls.push(url);
        });
      });
    });
  }

}
