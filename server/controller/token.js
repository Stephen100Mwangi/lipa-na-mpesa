const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const createToken = async (req,res,next)=>{
    const consumerKey= process.env.consumerKey;
    const consumerSecret=process.env.consumerSecret;

    const auth = new Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    
    await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
        headers: {
            authorization: `Basic ${auth}`
        }
    }).then((data) =>{
        token = data.data.access_token;
        console.log(data.data);
        // Token
        next();
    }).catch((error) =>{
        console.log(error);
        res.status(400).json(error.message)
    })

}

const stkPush = async (req,res) => {
    const shortCode= 174379
    const phone=req.body.phone;
    // const phone=req.body.phone.subString(1);
    const amount=req.body.amount;
    const passKey="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    // const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    const date = new Date();
    const timeStamp = date.getFullYear()+
    ("0" + (date.getMonth() + 1)).slice(-2) + 
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

    const password = new Buffer.from(shortCode+passKey+timeStamp).toString("base64");

    const data = {    
        "BusinessShortCode": shortCode,    
        "Password": password,    
        "Timestamp":timeStamp,    
        "TransactionType": "CustomerPayBillOnline",    
        "Amount": amount,    
        "PartyA": `254${phone}`,    
        "PartyB":shortCode,    
        "PhoneNumber":`254${phone}`,    
        "CallBackURL": "https://mydomain.com/path",    // *********************
        "AccountReference":"Test",    
        "TransactionDesc":"Test"
     }

    await axios.post(
        url,data,{
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
    ).then((data) =>{
        console.log(data);
        res.status(200).json(data.data);
    }).catch((error) =>{
        console.log(error);
        res.status(400).json(error.message);
    })

}

module.exports = {createToken,stkPush}