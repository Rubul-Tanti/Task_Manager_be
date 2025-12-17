import crypto from 'crypto'
const GenerateOtp=(length:number)=>{
     const min = Math.pow(10, length - 1);
     const max = Math.pow(10, length) - 1;
    return crypto.randomInt(min,max)
}
export default GenerateOtp