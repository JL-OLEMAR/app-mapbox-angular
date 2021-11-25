import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Socket } from 'ngx-socket-io'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus: boolean = false

  constructor (private readonly socket: Socket) {
    this.checkStatus()
  }

  // Check the status of the socket
  checkStatus (): void {
    // Socket emit an event when the connection is established
    this.socket.on('connect', () => {
      console.log('Conectado al servidor')
      this.socketStatus = true
    })

    // Socket emit an event when the connection is closed
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor')
      this.socketStatus = false
    })
  }

  // Emit any event to the server
  emit (event: string, payload?: any, callback?: Function): void {
    console.log('Emitiendo', event)
    this.socket.emit(event, payload, callback)
  }

  // Listen to any event from the server
  listen (event: string): Observable<any> {
    return this.socket.fromEvent(event)
  }
}
