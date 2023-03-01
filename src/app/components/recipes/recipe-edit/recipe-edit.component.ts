import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {RecipeService} from "../../../services/recipe.service";
import {Recipe} from "../../../models/recipe.model";
import {Ingredient} from "../../../models/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode = false
  recipeEditItem: Recipe;
  ingredientsForNewReceipt: Ingredient[] = [
    {
      name: '',
      amount: 0
    }
  ]

  newIngredients = [
    {
      id: 0,
      name: '',
      amount: 0
    }
  ]

  newImageLink;
  subscription;
  @ViewChild('f') recipeEditForm: NgForm
  @ViewChild('fNew') newForm: NgForm

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
  }

  addNewIngredientField() {
    this.newIngredients.push(
      {
        id: this.newIngredients.length,
        name: '',
        amount: 0
      }
    )
  }

  changeNewIgredient(id) {
    const name: HTMLInputElement = <HTMLInputElement>document.getElementById(`newField${id}`)
    const amount: HTMLInputElement = <HTMLInputElement>document.getElementById(`newFieldAmount${id}`)

    this.newIngredients[id].name = name.value;
    this.newIngredients[id].amount = +amount.value;
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editMode = params['id'] != null;
        }
      )

    this.recipeEditItem = this.recipeService.getSelectedRecipe(this.id)

    setTimeout(() => {
      if (this.editMode) {
        this.recipeEditForm.setValue({
          name: this.recipeEditItem.name,
          imagePath: this.recipeEditItem.imagePath,
          description: this.recipeEditItem.description
        })
      }
    }, 0)
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      let ingredients;

      ingredients = this.recipeEditItem.ingredients
        .concat(this.newIngredients)
        .filter(ingredient => ingredient.name.length && ingredient.amount > 0)

      this.recipeService.editRecipe(this.id, {
        name: form.value.name,
        description: form.value.description,
        imagePath: form.value.imagePath,
        ingredients
      })
      this.router.navigate(['/recipes', this.id]).then()
    } else {
      const name = form.value.name;
      const description = form.value.description
      const imagePath = form.value.imagePath

      const newRecipe = new Recipe(
        this.recipeService.getRecipes().length,
        name,
        description,
        imagePath,
        this.ingredientsForNewReceipt
      );

      this.recipeService.addRecipe(newRecipe)

      const newId = this.recipeService.getRecipes().length - 1;

      this.router.navigate(['/recipes', newId]).then()
    }
  }

  deleteIngredient(index) {
    this.recipeService.deleteIngredient(index, this.id)
  }

  deleteNewIngredient(id) {
    if (this.newIngredients.length === 1) {
      this.newIngredients = []
    } else {
      this.newIngredients.splice(id, 1)
    }
  }

  redirectToRecipe() {
    this.router.navigate(['/recipes', this.id]).then()
  }

  changeImgUrl(event) {
    if (this.recipeEditItem && this.editMode) this.recipeEditItem.imagePath = event.value
    if (!this.editMode) this.newImageLink = event.value
  }

  change() {
    this.ingredientsForNewReceipt = [{
      name: this.newForm.value.text,
      amount: this.newForm.value.number
    }]
  }
}
