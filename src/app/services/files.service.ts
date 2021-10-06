import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }
  
  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        tap(content => {
          const blob = new Blob([content], { type });
          saveAs(blob, name)
        }),
        map( () => true)
      )
  }
}
