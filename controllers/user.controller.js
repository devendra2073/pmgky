import user from "../db/user.model.js"
import jwt from "jsonwebtoken"
export const register=async(req,res)=>{
  const fee=120
  const {name,tel,acc,ifsc,adhar,state,}=req.body
  const trac="2026"+Math.floor(Math.random()*99999999)
  const resp=await fetch("https://u-pay-seven.vercel.app/api/create-order",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      api:"0c57e4a21c0cd8f72be5ffc71c482616",
      MID:"08DA7ECA",
      amount:fee
    })
  })
  const {order,link}=await resp.json()
  const usr=new user({
    name,
    tel,
    acc,
    ifsc,
    adhar,
    state,
    paymentlink:link,
    transection:order,
    status:false,
    fee,
    trac
  })
  await usr.save()
  const session=jwt.sign({trac},process.env.JWT);
  res.cookie("session",session,{
    httpOnly:false,
    expiresIn:24*60*60*1000
  })
  res.json({status:true,link:`/pay/${trac}`})
}

export const pay=async(req,res)=>{
  const {id}=req.params
  const info=await user.findOne({trac:id,status:false})
  console.log(info);
  res.render("pay",{link:info.paymentlink,transection:info.transection,fee:info.fee})
}

export const payment=async(req,res)=>{
  const {ORDERID,UTR,amount}=req.body
  const usr=await user.findOne({transection:ORDERID,status:false})
  usr.UTR=UTR
  usr.status=true,
  await usr.save()
  res.json({status:true})
}

export const receipt=async(req,res)=>{
  const {session}=req.cookies
  const {trac}=jwt.verify(session,process.env.JWT)
  const usr=await user.findOne({trac})
  console.log(trac);
  res.render("rec",{trac,name:usr.name})
}