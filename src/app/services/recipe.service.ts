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

  onFetchRecipes() {
    this.http.get('https://ng-course-recipe-book-54745-default-rtdb.firebaseio.com/recipes.json')
      .subscribe((res: Recipe[]) => {
        this.recipes = res;
        this.recipesChanged.next(this.recipes.slice());
      })
  }

  getRecipes() {
    this.onFetchRecipes()

    return this.recipes.slice()
  }

  getSelectedRecipe(id) {
    return this.recipes[id];
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
    this.recipes.splice(id, 1)
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice());
  }
}
