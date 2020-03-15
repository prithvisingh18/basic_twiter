import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BasicUtilsService {

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    const ref = this.snackBar.open(message, action, {
      duration: 2000
    });
    ref.onAction().subscribe(() => {
      ref.dismiss();
    });
  }
}
