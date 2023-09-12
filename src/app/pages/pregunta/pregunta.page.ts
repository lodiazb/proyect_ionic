import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  public usuario: Usuario | undefined;
  public mdl_nombre: string = '';
  public mdl_pregunta: string = '';
  public mdl_respuesta: string = '';
  
  
  isAlertOpen: boolean = false;
  alertButtons: any[] = [];


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {

      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.usuario = this.router.getCurrentNavigation()?.extras.state?.['usuario'];
        } else {
          this.router.navigate(['/login']);
        }
      });
    }

  ngOnInit() {
  }

  

  public validarRespuestaSecreta(): void {
    if (this.usuario?.mdl_respuesta === this.mdl_respuesta) {
      let extras: NavigationExtras = {
        state: {
          usuario: this.usuario.mdl_respuesta
        }
      };

      this.router.navigate(['correcto'], extras);
    } else {
      this.router.navigate(['incorrecto']);
    }
  }
}