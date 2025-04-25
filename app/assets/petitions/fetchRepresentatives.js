import { fetchData } from "./fetchData";
import {mailerExtracter} from "../helpers/utilities";
const fetchRepresentatives = async (petitionMethod, backendURLBase, endpoint, clientId, params = '', setMp, setSenator, setShowLoadSpin,setAllDataIn) => {
    
    const datos = await fetchData(petitionMethod, backendURLBase, endpoint, clientId, params)
    //console.log(datos, "datos")  
    const emails = datos.data[0]
    const data =  mailerExtracter(emails)
    setAllDataIn([...data])
    setShowLoadSpin(false)
//console.log(data)
}


export {
    fetchRepresentatives
}
