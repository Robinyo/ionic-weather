import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';

import { LoggerService } from '../services/log4ts/logger.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = WeatherPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private logger: LoggerService) {

    this.logger.info('Application component initialised');
    // logger.warn('AppComponent: logger.warn()');
    // logger.error('AppComponent: logger.error()');

    this.pages = [
      { title: 'Edit Locations', component: LocationsPage, icon: 'create' },
      { title: 'Current Location', component: WeatherPage, icon: 'pin' }
    ];

    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
