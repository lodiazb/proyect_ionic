import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  mdl_usuario: Usuario = new Usuario();

  isAlertOpen = false;
  public alertButtons = ['OK'];
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pregunta() {
    if (this.mdl_usuario.mdl_respuesta === 'dulce') {
      let extras: NavigationExtras = {
        state: {
          user: this.mdl_usuario.mdl_pregunta
        }
      };
    this.router.navigate(['correcto'], extras);
    } else {
      this.router.navigate(['incorrecto']);
    }
  }
}  
