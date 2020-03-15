import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStorageService {

  constructor() { }

  isLoggedIn = false;

  sections = []

  pageName = null;

  setSections() {
    this.sections.push({
      name: "Home",
      type: "link",
      value: "",
      icon: "home",
    });

    this.sections.push({
      name: "My Profile",
      type: "link",
      value: "userPage",
      icon: "face",
    });
  }

  setPageName() {
    let path = window.location.hash;
    let pageValue = path.split("#/")[1];
    console.log(pageValue, this.sections);
    for (let section of this.sections) {
      if (pageValue === section["value"]) {
        this.pageName = section["name"];
        break;
      }
    }
  }
}
