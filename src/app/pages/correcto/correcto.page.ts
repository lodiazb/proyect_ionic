import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  isAlertOpen = false;
  public alertButtons = ['OK'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

}
