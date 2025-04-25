export function urlEncode(text) {
    var encodedText = encodeURIComponent(text);
    return encodedText;
  }

  const mailerExtracter =  (mps) => {
   // console.log(mps, "mps")
    let emailsArr =[];
    for (let index = 0; index < mps.length; index++) {
      //console.log(mps[0], "mps[index]?.email")
        emailsArr.push(mps[index]?.email ? mps[index]?.email : mps[index]?.contact )
    }
    return emailsArr
}
export {
  mailerExtracter
}