export class API{
    async obtenerDatos(){
        const key = '16d2c2a6b857d242df70128cb49a9b775ee1e04c';
        const url = `//cne.cloudapi.junar.com/api/v2/datastreams/BENCI-EN-LINEA-V2-80280/data.ajson/?auth_key=${key}`;

        const datos = await fetch(url);
        
        const respuesta = await datos.json();

        return respuesta;
        
    }
}