import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  startedEditing = new Subject<number>()
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  addIngredient(newIngredient) {
    this.ingredients.push(newIngredient)
  }

  changeIngredient(newIngredient, id) {
    this.ingredients[id] = newIngredient

  }

  addIngredients = (ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients)
  }

  deleteIngredient = (id) => {
    this.ingredients.splice(id, 1)
  }

  getIngredient(index: number) {
    return this.ingredients[index]
  }
}
