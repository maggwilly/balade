import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams } from 'ionic-angular';
import {LoginService,  ChatService ,CallService} from '../../services';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private events: Events, loginService: LoginService,public navCtrl: NavController, public navParams: NavParams, public callService: CallService) {
    this.callService.preview();
    loginService.complete.then(user => {
			if (!user||!user.userID) {
				loginService.go();
      }
     
		}, (ERROR) => {			
		    //loginService.go();
		})
  }


  ionViewDidLoad() {
 
  }

}
