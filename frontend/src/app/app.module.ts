import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialImport } from "./angular.material.import";
import { MainpageComponent } from './views/mainpage/mainpage.component';
import { UserpageComponent } from './views/userpage/userpage.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterDialogComponent } from './components/dialogs/login-register-dialog/login-register-dialog.component';
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: "", component: MainpageComponent },
  { path: "userPage", component: UserpageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    UserpageComponent,
    LoginRegisterDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialImport,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
    LoginRegisterDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
