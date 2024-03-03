import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  constructor() { }

    get(key: string, sessionType: string): any {
      let data = sessionType === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key);
      return data ? JSON.parse(data) : data;
    }

    addToLocal(key: string,data: any): any{
      localStorage.setItem(key,JSON.stringify(data));
    }
    addToSession(key:string,data:any){
      sessionStorage.setItem(key,JSON.stringify(data))
    }
}
