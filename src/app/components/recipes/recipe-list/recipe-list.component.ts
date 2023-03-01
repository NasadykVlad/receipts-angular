import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../../services/data-storage.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  subscription;

  constructor(private recipeService: RecipeService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataStorageService.fetchRecipes().subscribe();

    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  onNewRecipe = () => {
    this.router.navigate(['new'], {relativeTo: this.route}).then()
  }

}
