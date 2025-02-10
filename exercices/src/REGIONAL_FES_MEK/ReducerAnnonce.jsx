import { createSlice } from "@reduxjs/toolkit"

const annonces = [
    { 
        id: 1, 
        texte: "Recherche jardinier", 
        tel: "0119304885", 
        email: "gegefernand@hotmail.com", 
        prix: "à discuter", 
        ville: "Paris", 
        codepostal: 75000, 
        regid: 1, 
        catid: 1
    },
    { id: 2,
         texte: "Vend coccinelle choupette", 
        tel: "0423456783", 
        email: "valerie.dupont@yahoo.com", 
        prix: "à débattre", 
        ville: "Marseille", 
        codepostal: 13000, 
        regid: 4, 
        catid: 2}, 
    { id: 3, 
        texte: "Vend appartement neuf", 
        tel: "0450789800", 
        email: "dumoulin@anix.fr", 
        prix: "à débattre", 
        ville: "Annecy", 
        codepostal: 74000, 
        regid: 1, 
        catid: 7} 
]

const categories = [
    {catid: 1, catnom: "Emploi" },
    { catid: 2, catnom: "Véhicule" },
    { catid: 3, catnom: "Immobilier" },
    { catid: 4, catnom: "Jardinage"}, 
    {catid: 5, catnom: "Bricolage"}, 
    {catid: 6, catnom: "Informatique" }, 
    {catid: 7, catnom: "Maison" }, 
    { catid: 8, catnom: "Sports" } 
    ]

const regions = [
    {regid: 1, regnom: "Alsace" }, 
    {regid: 2, regnom: "Aquitaine" }, 
    {regid: 3, regnom: "Auvergne" }, 
    {regid: 4, regnom: "Bourgogne" }, 
    {regid: 5, regnom: "Bretagne" }, 
    {regid: 6, regnom: "Centre" }, 
    {regid: 7, regnom: "Champagne" }, 
    {regid: 8, regnom: "Limousin" } 
]
const utilisateurs = [
    {id: 1, uname: 'user1', upass: 'pass1'}, 
    {id: 2, uname: 'user2', upass: 'pass2'}, 
    {id: 3, uname: 'user3', upass: 'pass3'}, 
    {id: 4, uname: 'user4', upass: 'pass4'}, 
    {id: 5, uname: 'user5', upass: 'pass5'} 
]


const AnnonceSlice = createSlice({
    name: 'annonces',
    initialState: {
        annonces: annonces,
        categories: categories,
        regions: regions,
        utilisateurs: utilisateurs },
    reducers : {
        add_annonce : (state , action) => {
            state.annonces.push(action.payload)
        },
        remove_annonce : (state,action)=>{
            state.annonces = state.annonces.filter((e)=>e.id !== action.payload)
        }
    }
})

export default AnnonceSlice.reducer
export const {add_annonce , remove_annonce} = AnnonceSlice.actions



