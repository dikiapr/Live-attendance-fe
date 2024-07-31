import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';

export interface Marker {
  id?: number;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private currentMarker!: L.Marker;

  @Output() locationChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-6.9175, 107.6191],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const latLng = e.latlng;
      this.addMarker(latLng.lat, latLng.lng);
      const locationString = `${latLng.lat},${latLng.lng}`;
      console.log('Location emitted:', locationString); // Debug log
      this.locationChange.emit(locationString);
    });
  }

  addMarker(lat: number, lng: number): void {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    this.currentMarker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }
}
