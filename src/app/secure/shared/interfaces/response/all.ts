import { AbstractResponse } from "../abstract/abstract-request"

export interface CategorieResponse extends AbstractResponse {

  unite:[UniteResponse]


}

export interface UniteResponse extends AbstractResponse {
  etat:0|1

}
