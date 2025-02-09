import axios from 'axios'
import React, { useState , useEffect } from 'react'

const Products = () => {
    const [list , setList] = useState([])
    useEffect(()=>{
        const getData = async()=>{
            try{
                const res = await axios.get('https://fakestoreapi.com/products')
                setList(res.data)
                console.log(list);
            }catch(e){
                console.log(e.message)
            }
            
        }
        getData()
},[])
  return (
    <div>
      <div className="container">
        <div className="row">
            {list.map((p)=>(
                <div key={p.id} className="col-3 border border-2 m-3 border-info p-4">
                    <img src={p.image} alt="" width={100} height={100}/>
                </div>
            ))}
        </div>
    </div>
    </div>
    
  )
}

export default Products
