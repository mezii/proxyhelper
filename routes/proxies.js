

var express = require('express');
var router = express.Router();
const Proxy = require("../model/Proxy");


const proxyTypeList = ["auth","none"];

router.get("/", async(req,res) => {
    const {type} = req.query;
    if (proxyTypeList.indexOf(type) < 0) return res.status(400).send("Specific proxies type");

    const proxies = await Proxy.find({type: type});

    if (proxies.length == 0) return res.send("No proxies"); 

    let minNumber = proxies[0].numberOfConnection;
    let selectedProxy = proxies[0];
    for (let i = 0; i < proxies.length ; i ++){
        
        if (proxies[i].numberOfConnection < minNumber){
            minNumber = proxies[i].numberOfConnection;
            selectedProxy = proxies[i];
        } 
        
    }
    const updatedProxy = await Proxy.findOneAndUpdate({_id: selectedProxy._id},{numberOfConnection: selectedProxy.numberOfConnection + 1});

    return res.send(updatedProxy); 
})
router.post("/",async  (req,res,next) => {
  const {proxy,type} = req.body;

  if (proxyTypeList.indexOf(type) < 0) return res.status(400).send("Bad Request");

  const props = proxy.split(':');

  if (type == "auth"){
    const newCreatedProxy = await Proxy.create({
      host: props[0],
      port: props[1],
      username: props[2],
      password: props[3],
      type: type
    })
    return res.send(newCreatedProxy);
  } 
  if (type == "none"){
    const newCreatedProxy = await Proxy.create({
        host: props[0],
        port: props[1],
        type: type
    })
    return res.send(newCreatedProxy);
  }

  return res.send("Invalid parameters");

})

router.get("/view", async(req,res)=>{
    res.render("proxy",{"title": "Proxy Manager"});
})

module.exports = router;
