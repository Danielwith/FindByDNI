export class Data {
  success: boolean;
  data: {
    numero: string;
    nombre_completo: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    ubigeo_sunat: string | null;
    ubigeo: (string | null)[];
  };
  source: string;
}
