import { Injectable } from '@angular/core';
import { BasicUtilsService } from '../../utils/basicUtils/basic-utils.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor(public basicUtils: BasicUtilsService, private http: HttpClient) { }

  async register(username, password) {
    //this.spinnerService.show();
    let res;
    try {
      res = await this.http
        .post(
          "/register",
          {
            username: username,
            password: password
          },
        )
        .toPromise();
      if (res.err) {
        if (res.err === "DUP_USER") {
          this.basicUtils.openSnackBar("User Already Registered", "close");
        } else {
          this.basicUtils.openSnackBar("Uh oh somthings not right !!", "close");
        }
      } else {
        this.basicUtils.openSnackBar("Registeration Complete", "close");
      }
      //this.spinnerService.hide();
    } catch (e) {
      this.basicUtils.openSnackBar("Network Error", "close");
    }
  }

  async tweet(tweet, hashTags, rid) {
    //this.spinnerService.show();
    let res;
    try {
      res = await this.http
        .post(
          "/tweet/create",
          {
            tweet: tweet,
            hashTags: hashTags,
            rid: rid
          }
        )
        .toPromise();
      if (res.err) {
        this.basicUtils.openSnackBar("Uh oh somthings not right !! Tweer Failed", "close");
      } else {
        this.basicUtils.openSnackBar("Published", "close");
      }
      //this.spinnerService.hide();
    } catch (e) {
      this.basicUtils.openSnackBar("Network Error", "close");
    }
  }
}
