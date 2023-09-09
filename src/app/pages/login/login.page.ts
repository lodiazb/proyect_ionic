import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string ='';

  isAlertOpen = false;
  public alertButtons = ['OK'];

  constructor(private router: Router) { }

  ngOnInit() {
  }


  contrasena(){
    this.router.navigate(['correo'])
  }

  login(){
    if (this.mdl_correo == 'lo.diazb@duocuc.cl' && this.mdl_contrasena == '1234'){

      let extras: NavigationExtras ={
        state:{
          user: this.mdl_correo,
          pass:this.mdl_contrasena

        // state: propiedad para recibir variables para que puedan navegar
        }
      }
      
    // let para crear variables en JavaScript, las variables existen solo donde se definen.
    // si hay llaves {es un objeto}

      this.router.navigate(['principal'],extras)
    }else {
      this.isAlertOpen = true;  
    }
  }


  

}

  
