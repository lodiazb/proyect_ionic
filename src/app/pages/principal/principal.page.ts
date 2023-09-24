import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {Animation, AnimationController, AlertController, LoadingController, NavController} from '@ionic/angular'
import { Usuario } from 'src/app/models/usuario';
import jsQR, { QRCode } from 'jsqr'

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
  @ViewChild('fileinput', {static: false})  fileinput: ElementRef;
  @ViewChild('video', {static: false}) video : ElementRef;
  @ViewChild('canvas', {static: false}) canvas : ElementRef;

  //private fileinput: ElementRef;

  public usuario: Usuario = new Usuario('correo', 'contraseña', 'nombre', 'pregunta', 'respuesta');
  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement = null;
  

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
  
  
  constructor(
    private loadingController: LoadingController,
    private activeroute: ActivatedRoute,
    private router:Router,
    private navCtrl: NavController,
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

    public limpiarDatos(): void {
      this.escaneando = false;
      this.datosQR = '';
      this.loading = null;
      (document.getElementById('input-file') as HTMLInputElement).value = '';
    }


  ngOnInit(): void {
    this.mdl_nombre = 'Ana Torres Leiva';
  }

  public async comenzarEscaneoQR() {
    this.limpiarDatos();
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }

    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source ? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      this.mostrarDatosQROrdenados(this.datosQR);

      
    }
    return this.datosQR !== '';
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    const objetoDatosQR = JSON.parse(datosQR);
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.dia = objetoDatosQR.dia;
    this.horaFin = objetoDatosQR.horaFin;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.seccion = objetoDatosQR.seccion;
    this.sede = objetoDatosQR.sede;
  
    // Navegar a la otra página con los datos como parámetros
    this.navCtrl.navigateForward([
      '/miclase',
      this.bloqueInicio,
      this.bloqueTermino,
      this.dia,
      this.horaFin,
      this.horaInicio,
      this.idAsignatura,
      this.nombreAsignatura,
      this.nombreProfesor,
      this.seccion,
      this.sede
    ]);
   
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log(1);
      } else {
        if (this.escaneando) {
          console.log(2);
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log(3);
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }  



  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }



  public cargarImagenDesdeArchivo(): void {
    this.limpiarDatos();
    this.fileinput.nativeElement.click();
  }

  public verificarArchivoConQR(files: FileList): void {
    const file = files.item(0);
    const img = new Image();
    img.onload = () => {
      this.obtenerDatosQR(img);
    };
    img.src = URL.createObjectURL(file);
  }



  cerrarsesion(){
    this.router.navigate(['/login']);
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
    this.limpiarDatos();
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
