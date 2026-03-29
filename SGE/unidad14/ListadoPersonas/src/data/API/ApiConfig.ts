export class ApiConfig {
  static readonly BASE_URL = 'https://juan-eaajbycgctbmbxf4.spaincentral-01.azurewebsites.net/api';

  static readonly ENDPOINTS = {
    PERSONAS: `${ApiConfig.BASE_URL}/Personas`,
    DEPARTAMENTOS: `${ApiConfig.BASE_URL}/Departamentos`,
  };
}