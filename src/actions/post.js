import db from '../firebase';

export const postActionTypes ={
    AddPostToStoreRequested : 'AddPostToStoreRequested',
    AddPostToStoreRejected : 'AddPostToStoreRejected',
    AddPostToStoreFulfilled : 'AddPostToStoreFulfilled'
};

export function addPost(post){
  return (dispatch)=>{
      dispatch(AddPostToStoreRequestedAction());
      db.collection("posts").add({
          title: post.title,
          body : post.body
      })
      .then(function(docRef){
          console.log("Document written with ID: ", docRef.id)
          console.log('added')
          dispatch(AddPostToStoreFulfilledAction(post));
      })
      .catch(function(error) {
          console.log('rejected')
        console.error("Error adding document: ", error);
        dispatch(AddPostToStoreRejectedAction());
    });
  }
}

function AddPostToStoreRequestedAction(){
    console.log('requested')
    return{
        type:postActionTypes.AddPostToStoreRequested,
    }
}

function AddPostToStoreFulfilledAction(post){
    return{
        type:postActionTypes.AddPostToStoreFulfilled,
        post
    }
}
function AddPostToStoreRejectedAction(){
    return{
        type:postActionTypes.AddPostToStoreRejected
    }
}