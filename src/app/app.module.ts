import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { NativeAudio } from '@ionic-native/native-audio';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule ,Http} from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { MomentModule } from 'angular2-moment';

import { ChatsPage, ChatPage, LoginPage, AccountPage, ContactsPage } from '../pages';
import { CallModal, ContactModal, UserImage, CallModalTrigger, ContactAddModal, KeyboardAttach } from '../components';
import { AttachmentService, AudioService, CallService, ChatService, ContactService, LoginService, SocketService, VideoService} from '../services';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function customTranslateLoader(http: Http) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		MyApp,
		ChatsPage,
		ChatPage,
		LoginPage,
		AccountPage,
		CallModal,
		ContactModal,
		UserImage,
		ContactsPage,
		ContactAddModal,
		KeyboardAttach
	],
	imports: [
		BrowserModule,
		HttpModule,
		TranslateModule.forRoot({
			loader: {
			  provide: TranslateLoader,
				useFactory: customTranslateLoader,
				deps: [Http]
			  }
			}
		  ),
		IonicModule.forRoot(MyApp, {
			backButtonText: 'Back',
			iconMode: 'ios',
 			modalEnter: 'modal-slide-in',
			modalLeave: 'modal-slide-out',
			tabsPlacement: 'bottom',
			pageTransition: 'ios'
		}),
		IonicStorageModule.forRoot(),
		MomentModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		ChatsPage,
		ChatPage,
		LoginPage,
		AccountPage,
		CallModal,
		ContactModal,
		UserImage,
		ContactsPage,
		ContactAddModal
	],
	providers: [
		AttachmentService,
		CallModalTrigger,
		LoginService,
		AudioService,
		SocketService,
		CallService,
		ContactService,
		VideoService,
		ChatService,
		StatusBar,
		SplashScreen,
		Keyboard,
		NativeAudio,
		Facebook,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {}
