import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  mdl_correo: string = '';
  


  isAlertOpen = false;
  public alertButtons = ['OK'];
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  correo(){
    if(this.mdl_correo == 'lo.diazb@duocuc.cl'){
      let extras: NavigationExtras ={
        state:{
          user: this.mdl_correo
        }
      }
      
      this.router.navigate(['pregunta'],extras)
    }else {
      this.isAlertOpen = true;  
    }
    
  

  }

}
