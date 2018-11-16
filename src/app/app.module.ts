import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 


import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { CargarImgProvider } from '../providers/cargar-img/cargar-img';
import { ServiceProvider } from '../providers/service/service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule, HttpClientModule,
    FormsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    CargarImgProvider,
    File,
    ServiceProvider
  ]
})
export class AppModule {}
