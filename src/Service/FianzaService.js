import axios from 'axios';
/**
 * Fernando Sánchez Castro
 */
export class FianzaService{
    // URL del servidor
    baseURL = "http://localhost:8080/api/WsFianzas/";
    // Obtener todos los registros
    getAll(){
        return axios.get(this.baseURL + "all").then(res => res.data);
    }
    // Obtener mediante Id_oficina, como indica el examen.
    getByIdOficina(Id_oficina){
        return axios.get(this.baseURL + "find/Id_oficina=" + Id_oficina).then(res => res);
    }
}