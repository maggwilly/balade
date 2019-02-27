import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams,App } from 'ionic-angular';
import {LoginService ,CallService} from '../../services';
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
  two='two'
  constructor(public appCtrl:App,private events: Events, loginService: LoginService,public navCtrl: NavController, public navParams: NavParams, public callService: CallService) {
    this.callService.preview();
    loginService.complete.then(user => {
      console.log(user);
      
			if (!user||!user.userID) {
				loginService.go();
      }
     
		}, (ERROR) => {			
		    //loginService.go();
		})
  }


  select(e) {
    console.log(e);
    switch (e.index) {
        case 'one':
            this.appCtrl.getRootNav().push("AccountPage", {}, { animate: true, direction: 'back' });
            break;
        case 'three':
            this.appCtrl.getRootNav().push("ChatsPage", {}, { animate: true, direction: 'forward' });
            break;
        default:
            this.appCtrl.getRootNav().push("SearchPage", {});
            break;
    }
};
  swipe (event) {
    if (event.direction === 2) {
        this.select({ index: 'three' });
    }
    if (event.direction === 4) {
        this.select({ index: 'one' });
    }
};


historiques() {
  this.appCtrl.getRootNav().push("HistoriquePage");
};

preferences () {
  this.appCtrl.getRootNav().push("PreferencesPage");
};
}
