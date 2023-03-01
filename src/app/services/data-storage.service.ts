import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {Recipe} from "../shared/recipe.model";
import {map, tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes()

    this.http.delete('https://ng-course-recipe-book-54745-default-rtdb.firebaseio.com/recipes.json')
      .subscribe()

    this.http.put('https://ng-course-recipe-book-54745-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe()
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-54745-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      )
  }

}
