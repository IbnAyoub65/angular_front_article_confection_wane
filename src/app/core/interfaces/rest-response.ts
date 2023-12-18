export interface RestReponse<T> {

 data:T,
 succes:boolean,
 message:string,
 statut:number,
 links?:Links[]
}

export interface Links {
  url:string,
  label:string,
  active:boolean
}
