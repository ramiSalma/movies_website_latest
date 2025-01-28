import {ADD_CLIENT , DELETE_CLIENT , UPDATE_CLIENT} from "./clinetsActions"


const initialState = {
    clients : [
    {
      id:1,
      name:  {firstname : "salma" , lastname : "rami"},
      age:22 ,
      skills : ['html', 'php','js'],
      adress : {
        "paris" : "street663psjsd",
        "london" : "street663psjsd",
      }
    },

    {
      id:2,
      name:  {firstname : "ali" , lastname : "merzouki"},
      age:25 ,
      skills : ['python', 'php'],
      adress : {
        "tokyo" : "stredjhwe",
        "madrid" : "streetwhuidf"
        }
    },
    {
      id:3,
      name :  {firstname : "mohamed" , lastname : "bahdou"},
      age:30 ,
      skills : ['java','react'],
      adress : {
        "monaco" : "street663psjsd",
        "syria" : "street663psjsd",
        }
    }
    ]
};
  
export   const ClientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_CLIENT:
        //return { ...state, clinets: [...state.clients ,  action.payload]};
        return { ...state, clients: [...state.clients, action.payload] };


      case UPDATE_CLIENT :
        return {
            ...state,
            clients: state.clients.map((client) =>
              client.id === action.payload.id ? { ...client, ...action.payload } : client
            ),
          };

      case DELETE_CLIENT:
        return {...state , clients : state.clients.filter((item) => item.id !== action.payload)};
      default:
        return state;
    }
  };
  