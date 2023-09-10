import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {Animation, AnimationController, AlertController} from '@ionic/angular'


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit, AfterViewInit {

  mdl_correo: string = '';
  mdl_contrasena: string ='';

  @ViewChild('titulo', { read: ElementRef, static: true}) itemTitulo!: ElementRef;



  constructor(
    private activeroute: ActivatedRoute,
    private router:Router,
    private alertController: AlertController,
    private animationController: AnimationController) {} 

    


  ngOnInit(): void {
  }

  cerrarsesion(){

  }

  principal(){
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
