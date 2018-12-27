// display list of contacts

import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ChatPage, AccountPage, ChatsPage } from '../';
import { ContactModal } from '../../components';
import {  ContactService, ChatService } from '../../services';

@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})
export class ContactsPage {

	constructor(
		private chatService: ChatService,
		 private modalCtrl: ModalController,
		private navCtrl: NavController,
		  public contactService: ContactService) {


		console.debug('Contacts: ', contactService.contacts);
	}

	// tap and hold contact card
	contactCard(contact) {
		let modal = this.modalCtrl.create(ContactModal, {contact: contact});
		modal.present();
	}

	// go to accounts
	account() {
		this.navCtrl.push(AccountPage, {}, {animate: true, direction: 'forward'});
	}

	// go to a chat
	chat(id) {
		this.chatService.getChatByContact(id).then((chat:any) => {
			console.debug('Pushing to chat: ', chat)
			this.navCtrl.push(ChatPage, {chatId: chat.id}, {animate: true, direction: 'forward'});
		});
	}

	goChats(id) {
		this.navCtrl.setRoot(ChatsPage, {}, {animate: true, direction: 'forward'});
	}

}