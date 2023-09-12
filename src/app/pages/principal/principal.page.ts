import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {Animation, AnimationController, AlertController} from '@ionic/angular'
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit, AfterViewInit {

  mdl_correo: string = '';
  mdl_contrasena: string ='';
  mdl_nombre: string = '';

  @ViewChild('titulo', { read: ElementRef, static: true}) itemTitulo!: ElementRef;

  public usuario: Usuario = new Usuario('correo', 'contraseña', 'nombre', 'pregunta', 'respuesta');

  constructor(
    private activeroute: ActivatedRoute,
    private router:Router,
    private alertController: AlertController,
    private animationController: AnimationController) {

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
    this.mdl_nombre = 'Ana Torres Leiva';
  }

  cerrarsesion(){

  }

  miclase(){
    let extras: NavigationExtras ={
      state:{
        user: this.mdl_correo,
        pass:this.mdl_contrasena

      // state: propiedad para recibir variables para que puedan navegar
      }
    }
    
  // let para crear variables en JavaScript, las variables existen solo donde se definen.
  // si hay llaves {es un objeto}

    this.router.navigate(['miclase'],extras)
    
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2 , 1)

      animation.play();
    }
  }

}
