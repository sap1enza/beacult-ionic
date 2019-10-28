import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {IBeacon} from '@ionic-native/ibeacon/ngx';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    searchTerm = '';


    constructor(public navCtrl: NavController, public ibeacon: IBeacon) {
    }

    ionViewDidLoad() {
        this.setFilteredLocations();
    }

    setFilteredLocations() {

    }

    ionViewDidEnter() {
        // Request permission to use location on iOS
        this.ibeacon.requestAlwaysAuthorization();
        // create a new delegate and register it with the native layer
        const delegate = this.ibeacon.getDelegate();

        console.log(this.ibeacon);
        console.log(delegate);

        // Subscribe to some of the delegate's event handlers
        delegate.didRangeBeaconsInRegion()
            .subscribe(
                data => console.log('didRangeBeaconsInRegion: ', data),
                error => console.error()
            );
        delegate.didStartMonitoringForRegion()
            .subscribe(
                data => console.log('didStartMonitoringForRegion: ', data),
                error => console.error()
            );
        delegate.didEnterRegion()
            .subscribe(
                data => {
                    console.log('didEnterRegion: ', data);
                }
            );

        const beaconRegion = this.ibeacon.BeaconRegion('deskBeacon', 'F7826DA6-ASDF-ASDF-8024-BC5B71E0893E');

        this.ibeacon.startMonitoringForRegion(beaconRegion)
            .then(
                () => console.log('Native layer received the request to monitoring'),
                error => console.error('Native layer failed to begin monitoring: ', error)
            );
    }
}
