const axios = require("axios");
const xml2js = require("xml2js");
const {nomad_host, nomad_port} = require("../../constants/constant")

const parseOptions = {
  explicitArray: false, // Don't put single child elements in an array
  mergeAttrs: true, // Merge attributes and elements with the same name
};

const getBranchList = async () => {
  const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://nomad.org/CustomUI">
<soapenv:Header/>
<soapenv:Body>
   <cus:NomadTerminalBranchList_Input>
      <cus:BranchList>?</cus:BranchList>
   </cus:NomadTerminalBranchList_Input>
</soapenv:Body>
</soapenv:Envelope>`;

  try {
    const result = await axios.post(`http://${nomad_host}:${nomad_port}`, soapRequest);
    const parsedResult = await new Promise((resolve, reject) => {
      xml2js.parseString(result.data, parseOptions, (err, parsedData) => {
        if (err) {
          reject(err);
        } else {
          resolve(parsedData);
        }
      });
    });

    const branches =
      parsedResult["soapenv:Envelope"]["soapenv:Body"][
        "cus:NomadTerminalBranchList_Output"
      ]["Branch"];
    // console.log(JSON.stringify(branches, null, 2)); // Convert to JSON and print
    return JSON.stringify(branches, null, 2);
  } catch (error) {
    console.error("Error:", error);
    console.log(error); // Rethrow the error to handle it outside
  }
};

module.exports = getBranchList;
