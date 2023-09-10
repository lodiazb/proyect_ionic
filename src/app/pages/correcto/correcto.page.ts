import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  mdl_password: string='1234'

  isAlertOpen = false;
  public alertButtons = ['OK'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

}
