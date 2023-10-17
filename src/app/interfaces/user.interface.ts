export interface User {
    _id:string
    username:string
    profileimg:string
    vendor:boolean
    storename?:string
    favoritestores?:[string]
    favoriteproducts?:[string]
    createdAt?:string
    updatedAt?:string
}

export interface registerhttpresponse {
    message?:string
    errormessage?:string
    user:User
    token:string
    refreshtoken:string
}

export interface loginhttpresponse {
    message?:string
    errormessage?:string
    user:User
    token:string
    refreshtoken:string
}


export interface getuserhttpresponse {

    errormessage?:string
    user?:User
}

export interface updateuserhttpresponse {

    updateuser:User
    errormessage?:string
   message?:string
   passwordnotifier?:string
   token:string
   refreshtoken:string
}
