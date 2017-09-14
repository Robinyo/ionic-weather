import { Component } from '@angular/core';

import { LoggerService } from '../../services/log4ts/logger.service';

import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';

import { WeatherService } from '../../services/weather-service/weather-service';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {

  theWeather: any = {};
  currentData: any = {};
  daily: any = {};
  loader: LoadingController;
  refresher: Refresher;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private logger: LoggerService, private weatherService: WeatherService) {

    this.logger.info('Weather Page component initialised');

    let loader = this.loadingCtrl.create({
      content: "Loading weather data...",
      duration: 3000
    });

    loader.present();

    this.weatherService.getWeather().then(theResult => {
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.daily = this.theWeather.daily;
    });
  }



  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}

/*

  ionViewDidLoad() {
    this.logger.info('Weather Page component: ionViewDidLoad()');
  }


 */
