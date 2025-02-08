import React from 'react'

const Livre = ({l}) => {
  return (
    <>


      <tr key={l.id}>
        <td>{l.title}</td>
        <td>{l.author}</td>
        <td>{l.year}</td>
      </tr>
      {/* <div className="col-3 border border-2 border-info mx-5" key={props.id}>
                <h4>{props.title}</h4>
                <h4>{props.author}</h4>
                <h4>{props.year}</h4>
            </div> */}
    </>
  )
}

export default Livre
