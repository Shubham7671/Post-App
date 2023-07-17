import React from 'react'

export default function Post(prop) {
    console.log(prop)
  return (
    <div style={{textAlign:"center",width:"50%",margin:"50px auto",padding:"10px" ,border:"2px solid black"}} key={prop.id}>
        <h1 >{prop.id}</h1>
        <h3>{prop.title}</h3>
        <p>{prop.body}</p>
    </div>
  )
}
