require('dotenv').config()
import express from 'express'
import axios from 'axios'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/ipInfo', async (req, res, next) => {
    try {
        const ip = req.query.ip || req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        
        // FOR TESTING
        // res.json({"ip":"8.8.8.8","location":{"country":"US","region":"California","city":"Mountain View","lat":37.4223,"lng":-122.085,"postalCode":"94043","timezone":"-07:00","geonameId":5375480},"domains":["0--9.ru","000.lyxhwy.xyz","000180.top","00049ok.com","001998.com.he2.aqb.so"],"as":{"asn":15169,"name":"Google LLC","route":"8.8.8.0/24","domain":"https://about.google/intl/en/","type":"Content"},"isp":"Google LLC","proxy":{"proxy":false,"vpn":false,"tor":false}});
        // return;

        const info = await axios.get('https://geo.ipify.org/api/v1', {
            params: {
                apiKey: process.env.IPIFY_KEY,
                ipAddress: ip,
            }
        }).then(res => res.data);
        
        res.json(info);
    } catch (e){
        next(e);
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 'Something broke!',
    })
})

module.exports = {
    path: '/api',
    handler: app
}
