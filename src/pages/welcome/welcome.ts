import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavController, Slides, NavParams, App } from 'ionic-angular';
import { LoginService } from '../../services';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  introSlides: any;
  isLoging:boolean=false;
  @ViewChild('slides') slides: Slides;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public app: App
      , private translate: TranslateService,
      public loginService: LoginService) {

     
      this.introSlides = [
      {
        title: this.translate.instant('WELCOME.SLIDES.DISCOVERPEOPLE') ,
        image: 'assets/img/intro/intro_1.png'
      },
      {
        title: this.translate.instant('WELCOME.SLIDES.SHARE') ,
        image: 'assets/img/intro/intro_2.png'
      },
      {
        title: this.translate.instant('WELCOME.SLIDES.MATCH') ,
        image: 'assets/img/intro/intro_3.png'
      }
    ]

    loginService.complete.then(user => {
			if (user&&user.userID) {	
			//	this.navCtrl.setRoot('HomePage', {}, {animate: true, direction: 'forward'});
			}
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }


	login() {
    this.isLoging=true
		this.loginService.login().then((userID:any) => {
    
      this.navCtrl.setRoot('ThermsservicePage', {userID:userID}, {animate: true, direction: 'forward'});
      this.isLoging=false
		}, data => {
      this.isLoging=false
		});
	};
}
