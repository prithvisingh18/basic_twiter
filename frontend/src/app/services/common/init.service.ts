import { Injectable, ChangeDetectorRef } from '@angular/core';
import { OutputService } from '../backend-communication/output/output.service';
import { GlobalStorageService } from '../global-storage/global-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(public outputService: OutputService, public globalService: GlobalStorageService) { }


  async init() {
    this.globalService.isLoggedIn = await this.outputService.loggedIn();
  }

}
