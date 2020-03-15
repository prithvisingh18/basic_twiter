import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { GlobalStorageService } from './services/global-storage/global-storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserServiceService } from './services/common/user-service/user-service.service';
import { InitService } from './services/common/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public globalStorage: GlobalStorageService, public router: Router, public userService: UserServiceService, public initService: InitService) {
    this.initService.init();
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.globalStorage.setPageName();
      }
    });
    this.globalStorage.setSections();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
