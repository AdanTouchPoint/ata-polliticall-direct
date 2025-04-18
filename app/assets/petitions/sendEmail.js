import { fetchData } from "./fetchData";
const sendEmail = async (petitionMethod, backendURLBaseServices, endpoints, clientId,dataUser,emailData,allDataIn ) => {
    
    const payload = await fetchData(
      petitionMethod,
      backendURLBaseServices,
      endpoints.toSendBatchEmails,
      clientId,
      `to=${allDataIn.length > 0 ? allDataIn : emailData.email }&subject=${dataUser.subject}&firstName=${
        dataUser.userName
      }&emailData=${dataUser.emailUser}&text=${dataUser.message.replace(
        /\n\r?/g,
        "<br/>"
      )}`
    );
    console.log(payload, "payload");
    console.log(allDataIn, "allDataIn");
    return payload
}

export {
    sendEmail    
}
