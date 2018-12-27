import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage, AccountPage, ContactsPage } from '../';
//import { ContactModal } from '../../components';
import {LoginService,  ChatService } from '../../services';

@Component({
	selector: 'page-chats',
	templateUrl: 'chats.html'
})
export class ChatsPage {

	constructor(private loginService: LoginService, public chatService: ChatService, private navCtrl: NavController) {
	
		loginService.complete.then(user => {
			if (!user||!user.id) {
				console.log('login fail');
				loginService.go();
			}
			console.log(user);
		}, (ERROR) => {			
		    loginService.go();
		})
	}

	// go to account

	account() {
		
		this.navCtrl.push(AccountPage, {}, {animate: true, direction: 'forward'});
	}

	// go to a chat
	chat(id) {
		this.navCtrl.push(ChatPage, {chatId: id}, {animate: true, direction: 'forward'});
	}

	goContacts() {
		this.navCtrl.setRoot(ContactsPage, {}, {animate: true, direction: 'back'});
	}
}