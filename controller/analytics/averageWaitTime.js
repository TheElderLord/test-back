
// "total": 152391.56,
//       "data": {
//         "Прием документов": 21800.1599,
//         "Налоги на землю, имущество": 43572.75281666665,
//         "Налог на транспортные средства": 43460.7978,
//         "Выдача готовых документов ": 43558.53606666667,
//         "Лица с ограниченными возможностями ФЛ": 0.50255,
//         "Терминал самообслуживания": -1.9230333333333332,
//         "Банкротство физических лиц": 0.09696666666666667,
//         "Административное производство": 0.6405666666666666
//       }
const getAverageWaitTime = async (facts) => {
    // console.log(facts);
    const resultArray = {};
    let totalWaitT = 0;
    facts.map((fact) => {
        const servicename = fact.servicename;
        if (!resultArray[servicename]) {
            resultArray[servicename] = 0;
        }
        fact.rows.map((row) => {
            const state = row.state;
            const start = row.starttime;
           
            if(state == "NEW"){
                const end = new Date();
                const diff = end - start;
                // console.log("NEW",diff)
                const diffInMinutes = diff / 60000;
                resultArray[servicename] += diffInMinutes;
            }
            else if(state == "INSERVICE" || state == "COMPLETED"){
                const end = row.startservtime;
                const diff = end - start;
                // console.log("INSERVICE",end);
                const diffInMinutes = diff / 60000;
                resultArray[servicename] += diffInMinutes;
            }
           
        });
        if(fact.rows.length > 0)
        resultArray[servicename] /= fact.rows.length;
        
        totalWaitT += resultArray[servicename];


    });
    const waitObject = {
        total: Math.abs(Math.round(totalWaitT)) ,
        data: Object.keys(resultArray).map((servicename) => ({
            servicename: servicename,
            count: Math.abs(Math.round(resultArray[servicename])),
        })),
    }
    return waitObject;
}


module.exports = getAverageWaitTime;

//Wait time per branches
// const connection = require('../../db/connection');

// const getAverageWaitTime = async (branches) => {
//   const resultArray = [];
//   let totalWaitT = 0;
//   for (const branch of branches) {
//     const branchName = branch.F_NAME;
//     const branchData = {
//       branchName,
//       totalAverageWaitTime: 0,
//       childBranches: [],
//     };

//     for (const child of branch.children) {
//       const childName = child.F_NAME;
//       const childData = {
//         childName,
//         averageWaitTime: 0,
//       };

//       const id = child.F_ID;
//       const tickets = await query(`SELECT * FROM facts WHERE idbranch = ${id}`);

//       if (tickets.length > 0) {
//         let totalWaitTime = 0;

//         tickets.forEach((ticket) => {
//           const start = ticket.starttime;
//           const end = ticket.startservtime;
//           const diff = end - start;
//           const diffInMinutes = diff / 60000;
//           totalWaitTime += diffInMinutes;
//         });

//         // let avgW = ;
//         // if(avgW > 60){
//         //     avgW/=60;
//         // }
//         childData.averageWaitTime = Math.round(Math.abs(totalWaitTime / tickets.length)*100)/100;

//         branchData.childBranches.push(childData);
//         branchData.totalAverageWaitTime += childData.averageWaitTime;
//       }
//     }

//     if (branch.children.length > 0) {
//       branchData.totalAverageWaitTime /= branch.children.length;
//     }
//     branchData.totalAverageWaitTime = Math.round(branchData.totalAverageWaitTime*100)/100;
//     totalWaitT += branchData.totalAverageWaitTime;

//     resultArray.push(branchData);

//   }

//   return {
//     total: Math.round(totalWaitT*100)/100,
//     branches: resultArray,
//   };
// };



// module.exports = getAverageWaitTime;
