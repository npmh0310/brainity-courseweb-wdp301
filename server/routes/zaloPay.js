const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const { v1: uuidv1 } = require("uuid"); // npm install uuid
const moment = require("moment"); // npm install moment
const express = require("express");
const zalopayRoute = express.Router();

// APP INFO
const config = {
  appid: "554",
  key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
  key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder",
};

zalopayRoute.post("/", async (req, res) => {
  const embeddata = {
    redirecturl: "fb.com/linhne194",
  };

  const items = [
    {
      itemid: "knb",
      itemname: "kim nguyen bao",
      itemprice: 198400,
      itemquantity: 1,
    },
  ];

  const order = {
    appid: config.appid,
    apptransid: `${moment().format("YYMMDD")}_${uuidv1()}`, // mã giao dich có định dạng yyMMdd_xxxx
    appuser: "linhne94",
    apptime: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embeddata: JSON.stringify(embeddata),
    amount: 10000,
    description: "Brainity course payment",
    bankcode: "zalopayapp",
    callbackurl: "localhost:4000/api/v1/payment/callback",
  };

  // appid|apptransid|appuser|amount|apptime|embeddata|item
  const data =
    config.appid +
    "|" +
    order.apptransid +
    "|" +
    order.appuser +
    "|" +
    order.amount +
    "|" +
    order.apptime +
    "|" +
    order.embeddata +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const response = await axios.post(config.endpoint, null, { params: order });
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

zalopayRoute.post("/callback", (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.returncode = -1;
      result.returnmessage = "mac not equal";
    } else {
      console.log(" hi Tam");
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where apptransid =",
        dataJson["apptransid"]
      );

      result.returncode = 1;
      result.returnmessage = "success";
    }
  } catch (ex) {
    result.returncode = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.returnmessage = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

module.exports = zalopayRoute;
