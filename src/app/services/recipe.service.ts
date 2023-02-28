import {Recipe} from "../shared/recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  constructor(private http: HttpClient) {
  }

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getSelectedRecipe(id) {
    return this.recipes[id] || this.recipes[0];
  }

  deleteIngredient(idIngredient, id) {
    this.recipes[id].ingredients.splice(idIngredient, 1)
  }

  editRecipe(id, newRecipe) {
    this.recipes[id].name = newRecipe.name
    this.recipes[id].description = newRecipe.description
    this.recipes[id].imagePath = newRecipe.imagePath
    this.recipes[id].ingredients = newRecipe.ingredients;
  }

  deleteRecipe(id) {
    if (this.recipes.length === 1) {
      this.recipes.splice(0, 1)
    } else {
      this.recipes.splice(id, 1)
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice());
  }
}
