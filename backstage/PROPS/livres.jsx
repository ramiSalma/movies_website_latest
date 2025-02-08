import React from 'react'
import Livre from './livre'

const Livres = () => {
    const books = [
        {
            "id": 1,
            "title": "Harry Potter et la pierre philosophale",
            "author": "J.K. Rowling",
            "year": 1997

        },
        {
            "id": 2,
            "title": "Le Seigneur des anneaux",
            "author": "J.R.R. Tolkien",
            "year": 1954
        },
        {
            "id": 3,
            "title": "Le Comte de Monte-Cristo",
            "author": "Alexandre Dumas",
            "year": 1844
        }
    ]
  return (
    <div className='container'>
      <table border={2} className='table'>
        <thead>
            <tr>
                <th>title</th>
                <th>author</th>
                <th>year</th>
            </tr>
        </thead>
        <tbody>
            {books.map((book) => <Livre l={book} /> )}
        </tbody>
      </table>


      {/* ============= card affichage        */}
      {/* <div className="row">
        {books.map((t)=> <Livre id={t.id} title={t.title} author={t.author} year={t.year} />)}
      </div> */}
        
            
        
    </div>
  )
}

export default Livres
