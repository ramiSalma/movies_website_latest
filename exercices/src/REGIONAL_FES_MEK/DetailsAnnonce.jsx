import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useSelector , useDispatch}  from 'react-redux'
import {remove_annonce} from './ReducerAnnonce'
const DetailsAnnonce = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const annonce = useSelector(state => state.annonces.annonces.filter((e)=> e.id === Number(id)))
    const categories = useSelector(state => state.annonces.categories)
    const regions = useSelector(state => state.annonces.regions)

    const retourne = ()=>{
        navigate('/annoncestable')
    }
    const onDelete = (id)=>{
        dispatch(remove_annonce(id))
        navigate('/annoncestable')
    }



  return (
    <div className='container'>
        {annonce.map((a)=>{
            const category = categories.find((c)=> c.catid === a.catid).catnom
            const region = regions.find((c)=> c.regid === a.regid).regnom
        return(

            <div className="card" key={a.id}>
                <p>l'id de l'annonce : {a.id}</p>
                <p>texte de l'annonce : {a.texte}</p>
                <p>num de telephone : {a.tel}</p>
                <p>address de messageriee : {a.email}</p>
                <p>ville : {a.ville}</p>
                <p>code postal : {a.codepostal}</p>
                <p>montant : {a.prix}</p>
                <p>region : {region}</p>
                <p>category : {category}</p>
                <p>
                    <button onClick={()=>onDelete(a.id)} className='btn btn-primary'>supprimer</button>||
                    <button className='btn btn-primary'>modifier</button>||
                    <button onClick={retourne} className='btn btn-primary'>retourner a la liste</button>
                </p>
            </div>
        )})}
    </div>
  )
}

export default DetailsAnnonce
