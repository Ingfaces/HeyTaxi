import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        this.datos = this.formBuilder.group({
            nombre: ['', Validators.required]
        });
	}

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
            maximumImagesCount: 1
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


            this.formulario.append('nombre', this.datos.get('nombre').value);

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
