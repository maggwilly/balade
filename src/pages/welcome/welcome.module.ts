import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(WelcomePage),
  ],
})
export class WelcomePageModule {}
