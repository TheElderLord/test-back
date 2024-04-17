const query = require("../../db/connection");

const ExcelJS = require("exceljs");

const downloadExcel = async () => {
  let sql = `
        SELECT * from facts`;

  try {
    // Fetch data from the database
    const data = await query(sql);

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Define columns
    worksheet.columns = [
      { key: "eventid", header: "ID" },
      { key: "ticketno", header: "Номер билета" },
      { key: "servicename", header: "Название услуги" },
      { key: "idbranch", header: "Отделение" },
      { key: "operator", header: "Оператор" },
      { key: "state", header: "Статус" },
      { key: "starttime", header: "Время регистрации" },
      // { key: "waittime", header: "Время ожидания" },
      { key: "startservtime", header: "Время обслуживания" },
      { key: "rating", header: "Оценка" },
      { key: "waitover", header: "Превышение времени ожидания" },
      { key: "servover", header: "Превышение времени обслуживания" },
    ];
    data.map((e) => {
      e.starttime = new Date(e.starttime).toLocaleString("RU-ru");

      e.startservtime = new Date(e.startservtime).toLocaleString("ru-RU");
      e.rating =
        e.rating === "5"
          ? "Отлично"
          : e.rating === "4"
          ? "Хорошо"
          : e.rating === "4"
          ? "Плохо"
          : "Нет оценки";
      e.waitover = e.waitover === "true" ? "Да" : "Нет";
      e.servover = e.servover === "true" ? "Да" : "Нет";
      e.state =
        e.state === "COMPLETED"
          ? "Обслужен"
          : e.state === "NEW"
          ? "Новый"
          : "Бронь";
    });
    // console.log(data)

    // Add data to the worksheet
    worksheet.addRows(data);

    // Generate Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Send the buffer as response
    return buffer;
  } catch (error) {
    console.error("Error downloading Excel:", error);
   
  }
};

module.exports = downloadExcel;
