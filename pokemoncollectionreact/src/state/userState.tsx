let userState = "";
let collectionState = "";

export function setUserState(userId:string){
    userState = userId
}

export function getUserState(){
    return userState
}

export function setCollectionState(collectionId:string){
    collectionState = collectionId
}

export function getCollectionState(){
    return collectionState
}
