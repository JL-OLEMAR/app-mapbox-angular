import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as mapboxgl from 'mapbox-gl'

import { Lugar } from '../../interfaces/interfaces'
import { WebsocketService } from '../../services/websocket.service'

interface RespMarcadores {
  [key: string]: Lugar
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapa!: mapboxgl.Map
  lugares: RespMarcadores = {}

  constructor (
    private readonly http: HttpClient,
    private readonly wsService: WebsocketService
  ) {}

  ngOnInit (): void {
    this.http.get<RespMarcadores>('http://localhost:5000/mapa')
      .subscribe((lugares) => {
        this.lugares = lugares
        this.crearMapa()
      })

    this.escucharSockets()
  }

  // Escuchar sockets
  escucharSockets (): void {
    // marcador-nuevo
    this.wsService.listen('marcador-nuevo').subscribe((marcador: Lugar) => {
      this.agregarMarcadores(marcador)
    })

    // marcador-mover
    // marcador-borrar
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

    // 🧑‍💻🌟 Object.entries devuelve un array con las llaves y valores de un objeto
    for (const [key, marcador] of Object.entries(this.lugares)) { // eslint-disable-line @typescript-eslint/no-unused-vars
      this.agregarMarcadores(marcador)
    }
  }

  // Agregar marcadores
  agregarMarcadores (marcador: Lugar): void {
    // crea un elemento HTML "h2"
    const h2 = document.createElement('h2')
    h2.innerText = marcador.nombre

    // crea un elemento HTML "button"
    const btnBorrar = document.createElement('button')
    btnBorrar.innerText = 'Borrar'

    // crea un elemento HTML "div"
    const div = document.createElement('div')
    div.append(h2, btnBorrar)

    // Popup se usa para mostrar información sobre el marcador
    const customPopup = new mapboxgl.Popup({
      offset: 25, // se usa para que el popup no se encuentre sobre el marcador, unidades en pixeles
      closeOnClick: false // no se cierra al hacer click en el mapa
    }).setDOMContent(div)

    // Crear el marcador en el mapa
    const marker = new mapboxgl.Marker({
      draggable: true, // Permite arrastrar el marcador
      color: marcador.color
    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopup)
      .addTo(this.mapa)

    // Evento para cuando se arrastra el marcador
    marker.on('drag', () => {
      // Obtener la posición del marcador
      const lngLat = marker.getLngLat() // eslint-disable-line @typescript-eslint/no-unused-vars

      // TODO: crear evento para emitir las coordenadas de este marcador
    })

    btnBorrar.addEventListener('click', () => {
      marker.remove()
      // TODO: eliminar el marcador mediante sockets
    })
  }

  // crear marcador
  crearMarcador (): void {
    const customMarker: Lugar = {
      id: new Date().toISOString(),
      nombre: 'Sin nombre',
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      // Función para generar un color HEX random
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    this.agregarMarcadores(customMarker)

    // emitir marcador-nuevo
    this.wsService.emit('marcador-nuevo', customMarker)
  }
}
