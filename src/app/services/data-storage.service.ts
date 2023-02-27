import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes()

    this.http.delete('https://ng-course-recipe-book-54745-default-rtdb.firebaseio.com/recipes.json',)
      .subscribe()

    this.http.put('https://ng-course-recipe-book-54745-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe()
  }

}
