import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import {  Navigation, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  public usuario: Usuario | undefined;
  public mdl_contrasena: string='';
  public mdl_nombre: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,)
  {
    this.activatedRoute.queryParams.subscribe((params) => {
      const navigation: Navigation | null = this.router.getCurrentNavigation();
      if (navigation) {
        const state: any | undefined = navigation.extras.state;
        if (state) {
          if (state['usuario']) {
            this.usuario = state['usuario'];
          }
        }
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

}

