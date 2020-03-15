import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InputService } from 'src/app/services/backend-communication/input/input.service';
import { OutputService } from 'src/app/services/backend-communication/output/output.service';

@Component({
  selector: 'app-login-register-dialog',
  templateUrl: './login-register-dialog.component.html',
  styleUrls: ['./login-register-dialog.component.css']
})
export class LoginRegisterDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LoginRegisterDialogComponent>, public inputService: InputService, public outputService: OutputService) { }

  ngOnInit() {
  }
  username;
  password;

  register() {
    this.inputService.register(this.username, this.password);
  }

  async login() {
    let res = await this.outputService.login(this.username, this.password);
    if (res) {
      this.dialogRef.close(true);
    }
  }

}
