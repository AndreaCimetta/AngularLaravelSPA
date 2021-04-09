import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public set( value_name: string, value ){
    return localStorage.setItem(value_name, value);
  }

  public get( value_name: string){
    return localStorage.getItem(value_name);
  }

  public remove( value_name: string ){
    return localStorage.removeItem(value_name);
  }

  public clear(){
    return localStorage.clear();
  }

}
