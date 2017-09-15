import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

export abstract class Location {

  lat: number;
  lon: number;
  timestamp?: number;
}

@Injectable()
export class WeatherService {

  data: any = null;

  constructor(public http: Http) {
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get('assets/data/kingston.json')  // 'api/forecast/-35.3151,149.1512' See: ionic.config.json
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getWeather() {
    return this.load().then(data => {
      return data;
    });
  }
}

// this.http.get('/api/forecast/-35.3151,149.1512') See: ionic.config.json

// this.http.get('assets/data/kingston.json')
