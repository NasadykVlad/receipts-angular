import {Component} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = this.shoppingListService.ingredients;

  constructor(private shoppingListService: ShoppingListService) {
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }

}
