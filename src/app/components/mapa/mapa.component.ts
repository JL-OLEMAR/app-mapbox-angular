import { Component, OnInit } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import { Lugar } from '../../interfaces/interfaces'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapa!: mapboxgl.Map

  lugares: Lugar[] = [{
    id: '1',
    nombre: 'Fernando',
    lng: -75.75512993582937,
    lat: 45.349977429009954,
    color: '#dd8fee'
  },
  {
    id: '2',
    nombre: 'Amy',
    lng: -75.75195645527508,
    lat: 45.351584045823756,
    color: '#790af0'
  },
  {
    id: '3',
    nombre: 'Orlando',
    lng: -75.75900589557777,
    lat: 45.34794635758547,
    color: '#19884b'
  }]

  // constructor () {}

  ngOnInit (): void {
    this.crearMapa()
  }

  // Crear mapa
  crearMapa (): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoib2xlbWFyMTk5NiIsImEiOiJja3dlcXFqdXQwN2N2MnFvNHVmZzI1dndsIn0.pm7JqYKifHWCJMMxthZ_pg'
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    })

    for (const marcador of this.lugares) {
      this.agregarMarcadores(marcador)
    }
  }

  // Agregar marcadores
  agregarMarcadores (marcador: Lugar): void {
    const html = `<h2>${marcador.nombre}</h2>
                  <br>
                  <button>Borrar</button>`

    // Popup se usa para mostrar información sobre el marcador
    const customPopup = new mapboxgl.Popup({
      offset: 25, // se usa para que el popup no se encuentre sobre el marcador, unidades en pixeles
      closeOnClick: false // no se cierra al hacer click en el mapa
    }).setHTML(html)

    new mapboxgl.Marker({
      draggable: true, // Permite arrastrar el marcador
      color: marcador.color
    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopup)
      .addTo(this.mapa)
  }
}
