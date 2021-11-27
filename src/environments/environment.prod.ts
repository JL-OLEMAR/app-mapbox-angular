import { SocketIoConfig } from 'ngx-socket-io'

const config: SocketIoConfig = {
  url: 'http://localhost:5000',
  options: {}
}

export const environment = {
  production: true,
  mapboxToken: 'pk.eyJ1Ijoib2xlbWFyMTk5NiIsImEiOiJja3dlcXFqdXQwN2N2MnFvNHVmZzI1dndsIn0.pm7JqYKifHWCJMMxthZ_pg',
  socketConfig: config
}
