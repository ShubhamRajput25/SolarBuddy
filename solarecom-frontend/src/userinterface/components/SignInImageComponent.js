import React from "react";
import { useState } from "react";


export default function SignInImageComponent(){

let image='jiomart.webp'

return(<div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10%',width:'100%'}}>
   <img style={{width:'80%',height:'80%'}} src={image} />
</div>)
}