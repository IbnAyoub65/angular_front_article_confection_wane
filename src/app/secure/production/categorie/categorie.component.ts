import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSave } from '../../shared/enums/action-save';
import { CategorieService } from '../../shared/services/categorie.service';
import { RestReponse } from 'src/app/core/interfaces/rest-response';
import { CategorieResponse } from '../../shared/interfaces/response/all';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {


  constructor(private categorieService:CategorieService){}


  mmode: ActionSave=ActionSave.Add
  loader:boolean=true
  url: any
  dataList:RestReponse<CategorieResponse[]>=<RestReponse<CategorieResponse[]>>{};
  dataRemove=[] as CategorieResponse[];
  checkAll:boolean=false
  libelle!:string;
  uniteLibelle!:string;
  @ViewChild('myForm') myForm!: NgForm;

  ngOnInit(): void {
    this.list();

  }

 list(){
    this.categorieService.all(this.url).subscribe(
     {
      next: (res: RestReponse<CategorieResponse[]>)=>{
        this.loader = true
        this.dataList = res
       // console.log(this.dataList.data.forEach(p=>p.id))
      },
      complete:()=>{
        this.loader = false
      }
     }
    )
  }

  onPaginate(urls:string){
    this.url = urls
    this.list()

  }


  mode:ActionSave=ActionSave.Add
  onChangeMode(checkMode:HTMLInputElement) {
    if(!checkMode.checked){
      this.mode=ActionSave.Add
     }else{
      this.mode=ActionSave.Edit
    }
 }

 editingCategory: CategorieResponse | null = null;

 onAddArrRemove(event:Event,cat:CategorieResponse){
  const inputCheckRemove  = event.target as HTMLInputElement;
  if (inputCheckRemove.checked) {
    this.editingCategory = cat;
  } else {
    // Si la case à cocher est désélectionnée, vérifiez si l'élément en cours d'édition est désélectionné
    if (this.editingCategory && this.editingCategory.id === cat.id) {
      this.editingCategory = null;
    }
  }
  this.dataRemove.push(cat);
  if(!inputCheckRemove.checked){
    this.dataRemove = this.dataRemove.filter(elt=>elt.id != cat.id);
  }else {
    this.checkAll = this.dataList.data.length == this.dataRemove.length
  }
 }

 onRemoveAll(checkAlls: HTMLInputElement){
  this.dataRemove = [];
  this.checkAll = false;
  if(checkAlls.checked){
    this.dataRemove = [...this.dataList.data]
    this.checkAll = true
   // console.log(this.checkAll)
  }
 }

storeCategorieUnite(saveForm:NgForm):void{

  this.categorieService.store(this.libelle,this.uniteLibelle).subscribe(
    (response) => {
      console.log('Catégorie et unité ajoutées avec succès', response);
      this.list();
      saveForm.resetForm();
    },
        (error) => {
            console.error('Erreur lors de l\'ajout de la catégorie et de l\'unité', error);
            // Ajoutez le code pour gérer les erreurs ici
        }
  )


}



unite: string = '';


updateCategory(): void {
  this.unite = (this.editingCategory?.unite.map(u => u.libelle) || []).join(', ');
  console.log(this.unite)
  if (this.editingCategory) {
    this.categorieService.update(this.editingCategory.id, this.editingCategory.libelle, this.unite).subscribe(() => {
      // Réinitialisez l'édition après la mise à jour
      this.editingCategory = null;
      // Rechargez les catégories après la mise à jour
      this.list();
    });
  }
}

// ...





}
