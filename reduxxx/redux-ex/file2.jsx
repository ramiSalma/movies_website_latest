import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const File2 = () => {
  const books = useSelector((state) => state)
  
  //console.log(livres)
  const dispatch = useDispatch()
  const handleLike = (id) => {
    dispatch({ type: "like", id }); // Pass the ID to the action
  };
  return (
    <div>
      {books.map((book)=>(
      <div className="col-4 border border-info " key={book.id}>
        <h1>{book.title}</h1>
        <h1>{book.author}</h1>
        <button onClick={()=>handleLike(book.id)}> like ({book.like})</button>
      </div>
      ))}
    </div>
  )
}

export default File2
