const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://nomad.org/CustomUI">
<soapenv:Header/>
<soapenv:Body>
   <cus:NomadTerminalBranchList_Input>
      <cus:BranchList>?</cus:BranchList>
   </cus:NomadTerminalBranchList_Input>
</soapenv:Body>
</soapenv:Envelope>`;

const axios = require("axios");
const xml2js = require('xml2js');

const parser = new xml2js.Parser({
      trim: true,
      normalizeTags: true,
      normalize: true,
      stripPrefix: true,
      mergeAttrs: true
    })

const getBranchList = async() =>{
    const result = await axios.post('http://10.10.111.99:3859', soapRequest);
    const a = parser.parseString(result.data);
    console.log(a);
}

module.exports = getBranchList;