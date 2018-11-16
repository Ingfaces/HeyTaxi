import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  cerrar(){
		window.localStorage.removeItem("idUsuario");	
		this.navCtrl.setRoot(LoginPage, {}, { animate: true, duration: 300 });
	}

  registar(){
    window.localStorage.removeItem("idUsuario");  
    this.menuCtrl.close();
    this.navCtrl.push(RegistroPage, {}, { animate: true, duration: 300 });
  }

}
