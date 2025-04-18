export interface BusquedaAlfanumericaRequest {
  rucEntidad?: string | null;
  cus?: string | null;
  codigoDepartamento?: string | null;
  codigoProvincia?: string | null;
  codigoDistrito?: string | null;
  direccion?: string | null;
  propietario?: string | null;
  areaMinima?: string | null;
  areaMaxima?: string | null;
  tipoPartida?: string | null;
  numeroPartida?: string | null;
  numeroSolictudIngreso?: string | null;
  ocurrencia?: string | null;
  pagina: string;
  numeroPagina: string;
}
