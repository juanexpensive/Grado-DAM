export class Connection {
  static readonly BASE_URL = 'https://juan-eaajbycgctbmbxf4.spaincentral-01.azurewebsites.net/api';

  static readonly ENDPOINTS = {
    PERSONAS: `${Connection.BASE_URL}/Personas`,
    DEPARTAMENTOS: `${Connection.BASE_URL}/Departamentos`,
  };
}