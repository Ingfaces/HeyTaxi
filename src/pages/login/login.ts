import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { HomePage } from '../home/home';
import 'rxjs/add/operator/debounceTime';
import { AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { ServiceProvider }  from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	public type = 'password';
  	public showPass = false;
	loginform: FormGroup;
	dominio : string;
	//dominio: string = 'http://aab33f14.ngrok.io/controlador.php';
	listado;
  	  showPassword() {
	    this.showPass = !this.showPass;
	 
	    if(this.showPass){
	      this.type = 'text';
	    } else {
	      this.type = 'password';
	    }
	  }

		
	constructor(public navCtrl: NavController, private http:HttpClient,
	 public formBuilder: FormBuilder, public alertCtrl: AlertController, 
	 private serv: ServiceProvider) {
  		//verifica si hay una secion iniciada
  		if (window.localStorage.getItem("idUsuario") != null) {
		    //Hay una sesión iniciada
		    //Dirige a la pantalla principal ya logueada.
		    console.log(window.localStorage.getItem("idUsuario"))
		    this.navCtrl.setRoot(HomePage, {}, { animate: true, duration: 300 });
		} else {
		    //Manda la pantalla de inicio de sesión o autentificación
		}

	}

	ionViewWillLoad() {
	    this.loginform=new FormGroup({
	      email: new FormControl('jtuarez@utm', Validators.compose([
	        Validators.required
	      ])),
	      contra: new FormControl('', Validators.compose([
	        Validators.required
	      ]))
	    });

	    this.loginform.valueChanges
	      .debounceTime(400)
	      .subscribe(data => this.onValueChanged(data));
	}	
	
//funcion que revisa si hay cambios en el formulario 3 y muestra mensajes de error
	onValueChanged(data?: any) {
	    if (!this.loginform) { return; }
	    const form = this.loginform;
	    for (const field in this.formErrors) {
	      	// Limpiamos los mensajes anteriores
	      	this.formErrors[field] = [];
	      	this.loginform[field] = '';
	     	const control = form.get(field);
      		if (control && control.dirty && !control.valid) {
	        	const messages = this.validationMessages[field];
	        	for (const key in control.errors) {
	          		this.formErrors[field].push(messages[key]);
	        	}
	    	}
    	}
	}


	formErrors = {

	    'email': [],
	    'contra': []
	};

//mensajes de error para cada validacion
	validationMessages = {

	    'email': {
	      	'required':      'Campo Obligatorio',
	      	'pattern':       'Ingrese un Correo Valido.'
	    },
	    'contra': {
	      	'required':      'Contraseña Obligatoria'
	    }
	};
//funcion del boton del formulario 3
	onSubmit(values){
		this.dominio=this.serv.obtenerDominio();
		console.log(this.loginform.value.email);
		console.log(this.loginform.value.contra);
		this.http.get(this.dominio+"?opcion=1&email="+ this.loginform.value.email+"&clave="+this.loginform.value.contra).subscribe(snap => {
      	console.log(snap);
      	this.listado = snap;
      	if(this.listado == 1){
      		window.localStorage.setItem("idUsuario", this.loginform.value.email);
	      	this.navCtrl.setRoot(HomePage, {}, { animate: true, duration: 300 });
	    }else{
		   let alert = this.alertCtrl.create({
		    title: 'Datos incorrectos',
		    subTitle: 'Los datos ingresados son incorrectos.',
		    buttons: ['OK']});
		    alert.present();
		    //this.navCtrl.setRoot(LoginPage, {}, { animate: true, duration: 300 });
		}
    	});	   
	}

  irregistar(){
    this.navCtrl.push(RegistroPage, {}, { animate: true, duration: 300 });
  }


}