import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  mdl_pregunta: string='';
  mdl_nombre: string='Loreto Díaz';
  mdl_respuesta: string='';

  isAlertOpen = false;
  public alertButtons = ['OK'];
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pregunta(){
    if(this.mdl_respuesta=='dulce'){
      let extras: NavigationExtras ={
        state:{
          user: this.mdl_pregunta
        }
      }
    if(this.isAlertOpen)
      this.router.navigate(['correcto'])
    if(this.isAlertOpen)
      this.router.navigate(['incorrecto'])
    }else{
      this.isAlertOpen = true;  
    }

    }
  }

      
