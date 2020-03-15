import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicUtilsService } from '../../utils/basicUtils/basic-utils.service';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  constructor(private http: HttpClient, public basicUtils: BasicUtilsService) { }

  async getGlobalFeed() {
    //this.spinnerService.show();
    let res;
    try {
      res = await this.http
        .post(
          "/global/feed",
          {
            lowerLimit: 0,
            upperLimit: 100
          },
        )
        .toPromise();
      if (res.err) {
        alert(`Error: ${res.err}`);
      }
      //this.spinnerService.hide();
      return res["data"]["tweets"];
    } catch (e) {
      //this.basicUtils.openSnackBar("Network Error", "close");
    }
  }

  async login(username, password) {
    //this.spinnerService.show();
    let res;
    try {
      res = await this.http
        .post(
          "/login",
          {
            username: username,
            password: password
          },
        )
        .toPromise();
      if (res.err) {
        return alert(`Error: ${res.err}`);
      }
      //this.spinnerService.hide();
      this.basicUtils.openSnackBar("You are logged in.", "close");
      return true;
    } catch (e) {
      this.basicUtils.openSnackBar("Network Error", "close");
    }
  }

  async loggedIn() {
    //this.spinnerService.show();
    let res;
    try {
      res = await this.http
        .post(
          "/loggedIn",
          {},
        ).toPromise();
      if (res.err) {
        this.basicUtils.openSnackBar(`Error: ${res.err}`, "close");
        return false;
      }
      //this.spinnerService.hide();
      this.basicUtils.openSnackBar("You are logged in.", "close");
      return true;
    } catch (e) {
      this.basicUtils.openSnackBar("Network Error", "close");
      return false;
    }
  }
}
