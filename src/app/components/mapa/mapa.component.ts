import { Component, OnInit } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapa!: mapboxgl.Map
  // constructor () {}

  ngOnInit (): void {
    this.crearMapa()
  }

  crearMapa (): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoib2xlbWFyMTk5NiIsImEiOiJja3dlcXFqdXQwN2N2MnFvNHVmZzI1dndsIn0.pm7JqYKifHWCJMMxthZ_pg'
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937 , 45.349977429009954],
      zoom: 15.8
    })
  }
}
