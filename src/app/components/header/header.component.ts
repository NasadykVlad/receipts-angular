import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import * as http from "http";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() navigate

  constructor(private dataStorageService: DataStorageService, private recipeSerice: RecipeService) {
  }

  saveRecipes() {
    this.dataStorageService.storeRecipes()
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}

