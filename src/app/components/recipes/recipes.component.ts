import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../shared/recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeSelected;
  ngOnInit() {
    this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.recipeSelected = recipe
        }
      )
  }

  constructor(private recipeService: RecipeService) {
  }
}
