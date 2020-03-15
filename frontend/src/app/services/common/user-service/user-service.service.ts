import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginRegisterDialogComponent } from 'src/app/components/dialogs/login-register-dialog/login-register-dialog.component';
import { BasicUtilsService } from '../../utils/basicUtils/basic-utils.service';
import { GlobalStorageService } from '../../global-storage/global-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(public dialog: MatDialog, public basicUtils: BasicUtilsService, public globalService: GlobalStorageService) { }


  loginOrRegister() {

    let dialogRef = this.dialog.open(LoginRegisterDialogComponent, {
      width: "fit-content",
      data: {}
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.globalService.isLoggedIn = true;
      }
    });
  }



}
