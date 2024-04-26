const getServiceTicket = async (rows) => {
  try {
    const serviceTickets = {};

    await Promise.all(
      rows.map(async (row) => {
        try {
          const serviceName = row.servicename;

          if (!serviceTickets[serviceName]) {
            serviceTickets[serviceName] = [];
          }
          serviceTickets[serviceName].push(row);
        } catch (err) {
          console.log(err);
        }
      })
    );

    const serviceJson = {
      totalLength: Object.values(serviceTickets).reduce(
        (acc, service) => acc + service.length,
        0
      ),
      data: Object.keys(serviceTickets).map((serviceName) => ({
        servicename: serviceName,
        length: serviceTickets[serviceName].length,
        // rows: serviceTickets[serviceName],
      })),
    };

    return serviceJson;
  } catch (err) {
    console.error(err);
  }
};
module.exports = getServiceTicket;
