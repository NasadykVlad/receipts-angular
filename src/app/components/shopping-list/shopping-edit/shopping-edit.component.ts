import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../../shared/ingredient.model";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  subscription: Subscription
  editMode = false
  editedItemIndex: number;
  editedItem: Ingredient

  @ViewChild('f') shoppingListForm: NgForm

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index)
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  addIngredient = (form) => {
    const nameIngredient = form.value.name;
    const amountIngredient = form.value.amount

    if (nameIngredient.length > 2 && amountIngredient > 0) {
      const newIngredient = new Ingredient(
        nameIngredient,
        amountIngredient
      );

      if (this.editMode) {
        this.shoppingListService.changeIngredient(newIngredient, this.editedItemIndex)
      } else {
        this.shoppingListService.addIngredient(newIngredient)
      }

      form.resetForm()
      this.editMode = false
    }
  }

  clearIngredient = () => {
    this.shoppingListForm.resetForm()
    this.editMode = false;
  }

  deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.shoppingListForm.resetForm()
    this.editMode = false;
  }

}
