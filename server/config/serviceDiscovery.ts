const GATEWAY_LOCAL_SERVICE: string = 'http://local.gateway/'

const serviceList: Array<{ name: string, url: string }> = [
  { name: 'pingService', url: 'http://localhost:4001' },
  { name: 'userService', url: 'http://localhost:4002' },
  { name: 'authService', url: `${GATEWAY_LOCAL_SERVICE}auth` }
];

export {
  serviceList,
  GATEWAY_LOCAL_SERVICE
}