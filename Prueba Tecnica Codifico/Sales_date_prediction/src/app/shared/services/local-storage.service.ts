import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getIndexPage(){
    const page = localStorage.getItem('indexPage');
    return page;
  }

  saveIndexPage(page: string) {
    localStorage.setItem('indexPage', page);
  }
}
