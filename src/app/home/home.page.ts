import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm = '';

  constructor() {}

  ionViewDidLoad() {
    this.setFilteredLocations();
  }

  setFilteredLocations() {

  }
}
