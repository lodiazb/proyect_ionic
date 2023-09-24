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
  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = '';
  public horaFin: string = '';
  public horaInicio: string = '';
  public idAsignatura: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public seccion: string = '';
  public sede: string = '';  

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
      //this.router.navigate(['/login']);
    });
  }
  ngOnInit() {
    this.activeroute.paramMap.subscribe(params => {
      console.log(params); // Agrega este console.log para verificar los datos
      this.bloqueInicio = +params.get('bloqueInicio');
      this.bloqueTermino = +params.get('bloqueTermino');
      this.dia = params.get('dia');
      this.horaFin = params.get('horaFin');
      this.horaInicio = params.get('horaInicio');
      this.idAsignatura = params.get('idAsignatura');
      this.nombreAsignatura = params.get('nombreAsignatura');
      this.nombreProfesor = params.get('nombreProfesor');
      this.seccion = params.get('seccion');
      this.sede = params.get('sede');
    });
  }

  cerrarsesion() {
    this.router.navigate(['/login']);
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

