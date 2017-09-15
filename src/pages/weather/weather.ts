import { Component} from '@angular/core';

import { LoggerService } from '../../services/log4ts/logger.service';

import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Location, WeatherService } from '../../services/weather-service/weather-service';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
  // styleUrls: ['weather.css'] or styleUrls: ['weather.scss'] ???
})
export class WeatherPage {

  theWeather: any = {};
  currentData: any = {};
  daily: any = {};
  location: Location = {lat:0 , lon: 0};
  refresher: Refresher;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private logger: LoggerService, private weatherService: WeatherService, private geolocation: Geolocation) {

    this.logger.info('Weather Page component initialised');

    let loader = this.loadingCtrl.create({
      content: "Loading weather data..."
    });

    loader.present();

    // https://stackoverflow.com/questions/42549928/geolocation-error-in-google-chrome
    // Set location manually via Dev Tools -> Sensors -> e.g., Latitude/Longitude	-35.3151,149.1512

    this.geolocation.getCurrentPosition().then(pos => {

      this.logger.info('Weather Page component: this.geolocation.getCurrentPosition()');
      this.logger.info('latitude: ' + pos.coords.latitude + ', longitude: ' + pos.coords.longitude);

      this.location.lat = pos.coords.latitude;
      this.location.lon = pos.coords.longitude;
      this.location.timestamp = pos.timestamp;
      return this.location;

    }).then (location => {

      this.logger.info('Weather Page component: this.weatherService.getWeather()');

      this.weatherService.getWeather().then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;
        this.currentData.temperature = this.convertFtoC(this.currentData.temperature);
        loader.dismiss();
      });

    }).catch((err) => {

      this.logger.error('geolocation.getCurrentPosition() error: ' + err.message);
    })
  }

  // https://www.thoughtco.com/fahrenheit-to-celsius-formula-609230

  convertFtoC(temperature: number): number {
    return (temperature - 32) * 5 / 9;
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}

/*

import {OnAfterViewInit, Component} from '@angular/core';
export class WeatherPage implements OnAfterViewInit {
  ngAfterViewInit() {}

// this.logger.error('Error code: ' + err.code + ', Error message: ' + err.message);

// http://blog.ionic.io/navigating-lifecycle-events/

ionViewDidLoad() {
  this.logger.info('Weather Page component: ionViewDidLoad()');
}

  static convertFahrenheitToCelsius(temperature: number): number {
    return (temperature - 32) * 5 / 9;
  }

*/
