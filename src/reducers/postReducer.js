import { postActionTypes } from '../actions//post';


const defaultState = {
  title : '',
  body : '',
  postingRequested:false,
  posted:false,
  postfailed:false
}

function postReducer (state=defaultState,action){
    switch(action.type){
        case postActionTypes.AddPostToStoreFulfilled :
           return {...state,...action.post,posted:true,postingRequested:false}       
        case postActionTypes.AddPostToStoreRequested :
           return {...state,postingRequested:true}
        case postActionTypes.AddPostToStoreRejected :
           return {...state,postfailed:true,postingRequested:false}
        default :
          return state;
        
    }
}

export default postReducer;