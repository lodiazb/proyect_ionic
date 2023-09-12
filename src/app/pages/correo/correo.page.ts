import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public correo: string = '';
  public isAlertOpen: boolean = false;
  public alertButtons: any[] = [];

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async recuperarContrasena() {
    if (this.correo.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Campo obligatorio',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      // Tu lógica para recuperar la contraseña aquí
      // Puedes usar this.correo para obtener la dirección de correo ingresada
      const usuario = new Usuario('', '', '', '', '');
      const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);

      if (!usuarioEncontrado) {
        alert('El correo no se encuentra');
      } else {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usuarioEncontrado
          }
        };
        this.router.navigate(['/pregunta'], navigationExtras);
      }
    }
  }

  volverAlInicio() {
    this.router.navigate(['/login']);
  }

}
