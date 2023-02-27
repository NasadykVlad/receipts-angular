import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../shared/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeSelected: Recipe

  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  onAddToShoppingList = () => {
    this.shoppingListService.addIngredients(this.recipeSelected.ingredients)
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.recipeSelected = this.recipeService.getSelectedRecipe(+params['id'])
      })
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeSelected.id)
    this.router.navigate(['../']).then()
  }
}
