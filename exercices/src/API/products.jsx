import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
    // const [products,setProducts] = useState([])
    // useEffect(()=>{
    //     const getData = async()=>{
    //         try{
    //             const res = await axios.get('https://api.escuelajs.co/api/v1/products')
    //             setProducts(res.data)
    //             console.log(res.data);
    //         }catch(e){
    //             console.log(e)
    //         }
    //     }
    //     getData()
    // },[])
  return (
    <div>
      <h1>produfc</h1>
      {/* {products.map((e) =>{
        return(
            
            <div key={e.id}>
                <h1>{e.title}</h1>
                <h1 className='text-info'>{e.category.creationAt}</h1>
                {e.images.map((e)=><img src={e} width={100} alt="" />)}
                
            </div>
        )
      }
    )
      } */}
    </div>
  )
}

export default Products
