import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileService } from './../_service/file.service';

@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  message: string;
  progress: number;
  @Input() fileUrl: string;

  constructor(private fileService: FileService) {}
 // console.log(this.fileUrl);
  
    ngOnInit(): void {}

    download = () => {
      console.log(this.fileUrl)
      this.fileService.download(this.fileUrl).subscribe((event) => {
        if (event.type === HttpEventType.DownloadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Download success.';
          this.downloadFile(event);
        }
      });
    }
  
    private downloadFile = (data: HttpResponse<Blob>) => {
      const downloadedFile = new Blob([data.body], { type: data.body.type });
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.download = this.fileUrl;
      a.href = URL.createObjectURL(downloadedFile) ;
      a.setAttribute("download",this.fileUrl.split('\\').pop())
      a.target = '_blank';
      a.click();
      document.body.removeChild(a);
    }
}
