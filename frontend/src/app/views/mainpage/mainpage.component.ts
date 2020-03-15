import { Component, OnInit } from '@angular/core';
import { OutputService } from 'src/app/services/backend-communication/output/output.service';
import { GlobalStorageService } from 'src/app/services/global-storage/global-storage.service';
import { InputService } from 'src/app/services/backend-communication/input/input.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(public inputService: InputService, public outputService: OutputService, public globalStorage: GlobalStorageService) { }

  ngOnInit() {
    this.init();
  }

  globalFeed = [];

  newTweet = "";
  hashTagsString = "";
  publish() {

    this.hashTagsString = this.hashTagsString.split("#").map(el => el.trim()).join("#");
    console.log(this.newTweet, this.hashTagsString);
    this.inputService.tweet(this.newTweet, this.hashTagsString, null);
  }


  async init() {
    this.globalFeed = await this.outputService.getGlobalFeed();
  }
}
