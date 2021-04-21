const GATEWAY_LOCAL_SERVICE: string = 'http://local.gateway/'

const serviceList: Array<{ name: string, url: string, isActive: boolean }> = [
  { name: 'pingService', url: 'http://localhost:4001', isActive: true },
  { name: 'authService', url: `${GATEWAY_LOCAL_SERVICE}auth`, isActive: true }
];

export {
  serviceList,
  GATEWAY_LOCAL_SERVICE
}