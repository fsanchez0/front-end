import axios from 'axios';

export class FianzaService{
    baseURL = "http://localhost:8080/api/WsFianzas/";

    getAll(){
        return axios.get(this.baseURL + "all").then(res => res.data);
    }

    getByIdOficina(Id_oficina){
        return axios.get(this.baseURL + "find/Id_oficina=" + Id_oficina).then(res => res);
    }
}