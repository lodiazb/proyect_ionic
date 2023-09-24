import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {



  constructor(

    private router: Router
    ) { 
    


  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }


}
