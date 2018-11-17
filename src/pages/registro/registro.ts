import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EqualValidator } from '../../validators';

//Plugin
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';



import { CargarImgProvider }  from '../../providers/cargar-img/cargar-img';
import { ServiceProvider }  from '../../providers/service/service';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
	datos: FormGroup;
    fotos: any[] = [];
    formulario: FormData;

    loading: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
                public formBuilder: FormBuilder, private imagePicker: ImagePicker,
                private cargarimg: CargarImgProvider, private serv: ServiceProvider,
                public loadingCtrl: LoadingController, private alertCtrl: AlertController, 
                public toastCtrl: ToastController) {
	}

  ionViewWillLoad() {
      this.datos = new FormGroup({

        nombres: new FormControl('', Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('[a-zA-ZñÑ ]*'),
          Validators.required
        ])),
        apellidos: new FormControl('', Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('[a-zA-ZñÑ ]*'),
          Validators.required
        ])),
        username: new FormControl('', Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('([a-zA-Z0-9-.ñÑ])*'),
          Validators.required
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z_.+-])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9-.ñÑ]+$')
        ])),
        confirmPassword: new FormControl('', Validators.required),
        agree: new FormControl(false, Validators.required)
      });

      this.datos.valueChanges
        .debounceTime(400)
        .subscribe(data => this.onValueChanged(data));
  } 
//funcion que revisa si hay cambios en el formulario 3 y muestra mensajes de error
  onValueChanged(data?: any) {
      if (!this.datos) { return; }
      const form = this.datos;
      for (const field in this.formErrors) {
          // Limpiamos los mensajes anteriores
          this.formErrors[field] = [];
          this.datos[field] = '';
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
      'nombres': [],
      'apellidos': [],
      'username': [],
      'email': [],
      'password': [],
      'confirmPassword': []
  };

//mensajes de error para cada validacion
  validationMessages = {
      'nombres': {
          'required':      'Username is required.',
          'minlength':     'Username must be at least 5 characters long.',
          'maxlength':     'Username cannot be more than 25 characters long.',
          'pattern':       'Solo letras',
          'validUsername': 'Your username has already been taken.'
      },
      'apellidos': {
          'required':      'Username is required.',
          'minlength':     'Username must be at least 5 characters long.',
          'maxlength':     'Username cannot be more than 25 characters long.',
          'pattern':       'Solo letras',
          'validUsername': 'Your username has already been taken.'
      },
      'username': {
          'required':      'Username is required.',
          'minlength':     'Username must be at least 5 characters long.',
          'maxlength':     'Username cannot be more than 25 characters long.',
          'pattern':       'Solo letras',
          'validUsername': 'Your username has already been taken.'
      },
      'email': {
          'required':      'Email is required',
          'pattern':       'Enter a valid email.'
      },
      'password': {
          'required':      'Password is required',
          'minlength':     'Password must be at least 5 characters long.',
          'pattern':       'Your password must contain at least one uppercase, one lowercase, and one number.'
      },
      'confirmPassword':{
          'required':      'Confirm password is required',
          'minlength':     'Confirm password must be at least 5 characters long.',
          'pattern':       'Your password must contain at least one uppercase, one lowercase, and one number.',
          'validateEqual': 'Password mismatch'
      }
  };

	ionViewDidLoad() {
	console.log('ionViewDidLoad RegistroPage');
	}

    presentarAlerta(mensaje) {
      let alert = this.alertCtrl.create({
        title: 'El sitio web dice',
        subTitle: mensaje,
        buttons: ['Ok']
      });
      alert.present();
    }


    presentarLoader() {
      this.loading = this.loadingCtrl.create({
        content: 'Registrando...'
      });

      this.loading.present();
    }


    mostrar_mensaje(msj){
        let toast = this.toastCtrl.create({
            message: msj,
            duration: 3000,
            position: 'buttom'
        });
        toast.present();
    }

	abrirGaleria(){
		/*let arr = [];
        arr[0] = '../../assets/imgs/logo.png';
        arr[1] = '../../assets/imgs/2.png';
        arr[2] = '../../assets/imgs/3.png';

        this.fotos = arr;*/
		let options: ImagePickerOptions = {
            maximumImagesCount: 3
        };

        /*this.imagePicker.getPictures(options)
            .then((results) => {
                this.fotos = results;
            }, (err) => {
                this.mostrar_mensaje(err);
            });*/
        this.imagePicker.getPictures(options)
          .then((results) => {
              for (var i = 0; i < results.length; i++) {
                  this.fotos = results;
              }
            }, (err) => { 
                  this.mostrar_mensaje(err);
              });

	}

    borrarFoto(index){
        this.fotos.splice(index, 1);
    }


	registrar(){
        this.presentarLoader();

        this.cargarimg.getFormulario(this.fotos)
          .then((result) => {
            this.formulario = result;


            this.formulario.append('nombres', this.datos.get('nombres').value);
            this.formulario.append('apellidos', this.datos.get('apellidos').value);
            this.formulario.append('username', this.datos.get('username').value);
            this.formulario.append('email', this.datos.get('email').value);
            this.formulario.append('clave', this.datos.get('password').value);


            this.serv.addUser(this.formulario)
              .then((result) => {

                if(result['error']){

                  this.presentarAlerta(result['mensaje']);
                }else{

                  //Eliminación de los valores
                  this.datos.get('nombre').setValue('');

                  /*------------------------------------------*/
                  this.fotos = [];

                  this.presentarAlerta(result['mensaje']);
                }

                this.loading.dismiss();
              }, err => {

                console.log(err);
                this.loading.dismiss();
              });

          })
          .catch(err =>{
            this.mostrar_mensaje(err);
          });


	}
}
