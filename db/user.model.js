import {Schema,model} from "mongoose"

const applicantSchema=new Schema({
  name:String,
  tel:String,
  acc:String,
  state:String,
  adhar:String,
  ifsc:String,
  trac:String,
  status:{
    type:Boolean,
    default:false
  },
  paymentlink:String,
  transection:String,
  fee:Number,
  UTR:String,
})

const applicant=model("applicant",applicantSchema)
export default applicant;