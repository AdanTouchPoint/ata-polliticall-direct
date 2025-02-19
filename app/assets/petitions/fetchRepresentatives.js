import { fetchData } from "./fetchData";
import {mailerExtracter} from "../helpers/utilities";
const fetchRepresentatives = async (petitionMethod, backendURLBase, endpoint, clientId, params = '', setMp, setSenator, setShowLoadSpin, setShowManualEmailForm,setShowListSelect,setShowFindForm,setAllDataIn) => {
    
    const datos = await fetchData(petitionMethod, backendURLBase, endpoint, clientId, params)
    
    let query = datos.mps;    
    let fill = await query.filter((el) => el.govt_type == 'Federal MPs');
    fill = mailerExtracter(fill)
    let data = mailerExtracter(datos.data)
    setMp(fill);
    setSenator(datos.data)
    setAllDataIn([...data,...fill])
    setShowLoadSpin(false)
    setShowFindForm(true)
    setShowManualEmailForm(false)
    //setShowListSelect(true)
}


export {
    fetchRepresentatives
}
