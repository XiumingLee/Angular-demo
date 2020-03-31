import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class Person {

  constructor() {
  }

  say(){
    console.log("啦啦");
  }
}
