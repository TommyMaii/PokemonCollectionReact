let authState = "";

export function setAuthState(token:string){
    authState = token
}

export function getAuthState(){
    return authState
}