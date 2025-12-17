import bcrypt from 'bcrypt'

const Hash=async(text:string,salt:number)=>{
const hashText=await bcrypt.hash(text,salt)
return hashText
}
export default Hash