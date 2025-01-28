import React from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import File2 from './file2';

const livres = [
  { id: 1,
     title: "Le Petit Prince",
     author: "Antoine de Saint-Exupéry", 
     image : "https://i5.walmartimages.com/seo/Le-Petit-Prince-French-Edition-Pre-Owned-Hardcover-0152164154-9780152164157-Antoine-de-Saint-Exupry_0028025a-d2fd-4a9b-8054-fdd89799de36.b41821fd7ee7d75ac4e0f3e298445792.jpeg",
     
     like: 0 },
  { id: 2, 
    title: "Les Trois Mousquetaires", 
    author: "Alexandre Dumas", 
    image : "" ,
    like: 0 },
  { id: 3, 
    title: "Le Comte de Monte-Cristo", 
    author: "Alexandre Dumas", 
    image : "" ,
    like: 0 },
  { id: 4, 
    title: "Les Misérables", 
    author: "Victor Hugo", 
    image : "" ,
    like: 0 },
];
function reducer(state = livres , action){
  switch(action.type){
    case "like":
      return state.map((l)=>{
        if(l.id === action.id){
          return { ...l, like: l.like + 1 } 
        }else{
          return l
        }
      });
      default:
        return state
      }
      
    }
const store = createStore(reducer)
const File1 = () => {
  return (
    <div>
      <h1 className="text-info">hello redux example</h1>
      <div className="container">
        <div className="row">
          <Provider store={store}>
        <File2 />
      </Provider>
        </div>
      </div>
      
    </div>
  )
}

export default File1
