import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../services';
/**
 * Generated class for the ThermsservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thermsservice',
  templateUrl: 'thermsservice.html',
})
export class ThermsservicePage {

  text:String
  userID:String
  constructor(public navCtrl: NavController, public navParams: NavParams,public loginService: LoginService) {
    this.userID=this.navParams.get('userID')
    this.loginService.getCGUText().then(text=>{
      this.text=text
    
    },err=>{
      this.text=err.toString()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThermsservicePage');
  }
 accept(){
   this.loginService.acceptCGU(this.userID).then(()=>{
       this.navCtrl.setRoot('HomePage', {}, {animate: true, direction: 'forward'});
   })
 }

 refuse(){
   this.loginService.logout();
 }
}
