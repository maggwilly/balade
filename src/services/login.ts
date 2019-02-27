// handle login and authenticaion for users

import { Injectable } from '@angular/core';
import { Events,  NavController, AlertController, App, Platform } from 'ionic-angular';
import { AudioService, SocketService, ContactService } from './';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { Config } from '../app/config';




@Injectable()
export class LoginService {
	user //={id:'14jhu'} //null
	playLoginSound = true
	complete = null
	private nav:NavController;
	private headers=new Headers({ 
		'Content-Type': 'application/json'
	  });
	constructor(
		private contactService: ContactService,
		public platform: Platform,
		public app: App,
		public audio: AudioService,
		public socket: SocketService,
		public events: Events,
		public alertCtrl: AlertController,
		public storage: Storage,
		public http:Http,
		public fb: Facebook) {
		this.socket.connect();
		this.socket.on('connect', socket => {
	         console.log('connected')             
			 this.auth(true);
			 //this.go()
			});
	
		this.storage.get('weelder_token_auth').then((res)=>{
			if (!this.user) {
				if (!res||res.status != "connected") {
				 return this.events.publish('auth', false);
				}
			}
		})

		// triggered when the user logs in
		this.events.subscribe('user.login', data => {
			this.user = data.user;
		});
		// unused
		this.socket.on('disconnect', socket => {
		});
		
		this.complete = this.makeComplete();
		this.nav = app.getActiveNav();

	}


	
	public auth(force) {
		let complete =(res : FacebookLoginResponse)=> {	
			if (!this.user) {
				if (!res||res.status != "connected") {
				 return this.events.publish('auth', false);
				}
			}
			let done = () => {
				this.socket.removeListener('auth_error', error);
				this.socket.removeListener('login_successful', success);
			};

			let error = message => {
				done();
				this.storage.remove('weelder_token_auth');
				this.events.publish('auth', message);
			};

			let success = (user) => {
				done();
				if (this.playLoginSound) {
					this.playLoginSound = false;
					this.audio.play('login');
				}
				this.events.publish('user.login', {
					user: user
				});
			};
			this.socket.on('login_successful', success);
			this.socket.on('auth_error', error);			
			this.socket.emit('auth', res.authResponse.userID);

		};

		this.storage.get('weelder_token_auth').then(complete).catch(err=>{this.events.publish('auth', err);});
	}

	// go to the login page with no transitions
	public go() {
		//this.nav.setRoot(LoginPage, {}, {animate: false})
		this.nav.setRoot('WelcomePage', {}, {animate: false})
	}

	public getLoginStatus(){
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				resolve({
					authResponse: {
					  userID: '12345678912345',
					  accessweelder_token_auth: 'kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn',
					  session_Key: true,
					  expiresIn: '5183738',
					  sig: '...'
					},
					status: 'connected'
				  })
			},500)
		})
	}


	login()
	{
	
	return new Promise((resolve, reject) => {
		 this.fb.login(['public_profile',  'email'])
		// this.getLoginStatus()
		 .then( (res: FacebookLoginResponse) => {
			// The connection was successful
			if(res.status == "connected") {
				this.storage.set('weelder_token_auth', res);
			    resolve(res.authResponse.userID);
			} 
			else {
				console.log("An error occurred...");
			}
		},(e) => {
			console.log('Error logging into Facebook', e);
			alert(JSON.stringify(e))
		})
		//this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ACTIVATED_APP);
	});
	}

	acceptCGU(userID){
	 this.complete = this.makeComplete();
	return 	new Promise((resolve, reject) => {
		let done = () => {
			this.socket.removeListener('login_error', error);
			this.socket.removeListener('login_successful', success);
		};

		let error = (message) => {
			let alert = this.alertCtrl.create({
				title: 'Error',
				subTitle: message,
				buttons: ['OK']
			});
			alert.present();
			done();
		};

		let success = (user) => {
			done();
			this.events.publish('user.login', {
				user: user
			});
			if (this.playLoginSound) {
				this.playLoginSound = false;
				this.audio.play('login');
			}
			resolve(user);
		};
		this.socket.on('login_error', error);
	   this.socket.on('login_successful', success);	
	 /*  this.socket.emit('login', {
		//gender: user.gender,
	  //	birthday: user.birthday,
		//name: user.name,
	 //	email: user.email,
	   userID:userID
	   });*/

	  	return   this.fb.api("/me?fields=name,email,picture,gender", []).then((user) => {
				    this.socket.emit('login', {
					     gender: user.gender,
					     picture: user.picture,
					     name: user.name,
					     email: user.email,
					     userID:userID
					 });
					 
			});
		});
	}

	// log the user out
	public logout() {
		this.playLoginSound = true;
	
	//	this.fb.logout().then(()=>{
			this.storage.remove('weelder_token_auth');
			this.contactService.contacts.length = 0;
			this.events.publish('user.logout');
			this.go();
			this.complete = this.makeComplete();
			if(!this.user)
			    return
			this.socket.emit('logout', this.user.userID);
			this.user = null;
		   
		//})	
	}

	// a promise that fires once we have logged in
	// used by controllers
	public makeComplete() {
		let self = this;
		return new Promise((resolve, reject) => {
			if (self.user) {
				resolve(self.user);
				return;
			}
			
			self.events.subscribe('user.login', data => {
				//cleanA(); cleanB();
				resolve(data.user);
			});
			 self.events.subscribe('auth', (pb) => {
				 
				console.log("auth",pb);

				resolve();
				//cleanA(); cleanB();
				//reject('auth fail');
			});
		
		})
	};

	getCGUText() {
		return this.http.get(Config.server + '/tos' , { headers: this.headers })
		  .toPromise()
		  .then(response => response.text());
	  }
	
}
