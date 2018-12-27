import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';


import * as moment from 'moment';
//import * as locales from 'moment/min/locales';

declare var cordova:any;
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage = 'HomePage';
	isInCall = false
	constructor(platform: Platform, 
		 events: Events,
		 statusBar: StatusBar,
		  splashScreen: SplashScreen
		  , private translate: TranslateService
		  ) {

			this.setLanguage();
	    /*	moment.locale('fr', {
			relativeTime: {
				future: 'now',
				past: '%s',
				s: 'now',
				m: '1 m',
				mm: '%d m',
				h: '1 h',
				hh: '%d h',
				d: '1 d',
				dd: '%d d',
				M: '1 m',
				MM: '%d m',
				y: '1 y',
				yy: '%d y'
			}
		});*/

		platform.ready().then(() => {
			statusBar.styleBlackTranslucent();
			splashScreen.hide();

			if (platform.is('cordova') && cordova.plugins.iosrtc) {
				cordova.plugins.iosrtc.registerGlobals();
			}
		});

		events.subscribe('call.status.isincall', status => {
			console.debug('call status changed to ', status);
			this.isInCall = status;
		});
	}

	setLanguage() {
		var userLang = navigator.language.split('-')[0];
		console.log("Language: " + userLang);
		userLang = /(en|de|it|fr|es)/gi.test(userLang) ? userLang : 'en';
		this.translate.use(userLang);
	  }
}
