import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Animation, AnimationController, AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit, AfterViewInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';

  @ViewChild('titulo', { read: ElementRef, static: true }) itemTitulo!: ElementRef;

  public usuario: Usuario = new Usuario('correo', 'contraseña', 'nombre', 'pregunta', 'respuesta');


  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {

    this.activeroute.queryParams.subscribe(params => {

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          console.log(this.usuario.toString());
          return;
        }
      }
      this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
  }

  cerrarsesion() {
    // Implementa la lógica para cerrar sesión
  }

  principal() {
    let extras: NavigationExtras = {
      state: {
        user: this.mdl_correo,
        pass: this.mdl_contrasena
      }
    }

    this.router.navigate(['principal'], extras);
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1)

      animation.play();
    }
  }
}

