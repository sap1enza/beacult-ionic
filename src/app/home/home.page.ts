import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var evothings: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm = '';
  beacon: any;

  constructor(
    private platform: Platform,
    private change: ChangeDetectorRef
  ) {}

  scanBeacons() {
    if(this.platform.is('cordova')) {
      evothings.eddystone.startScan(
        dados => {
          this.beacon = dados;

          setTimeout(() => this.change.detectChanges(), 1000);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  ionViewDidLoad() {
    this.setFilteredLocations();
  }

  setFilteredLocations() {

  }
}
