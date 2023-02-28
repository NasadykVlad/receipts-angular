import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../components/recipes/recipes.component";
import {ShoppingListComponent} from "../components/shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "../components/recipes/recipe-detail/recipe-detail.component";
import {NgModule} from "@angular/core";
import {SelectRecipeComponent} from "../components/recipes/select-recipe/select-recipe.component";
import {RecipeEditComponent} from "../components/recipes/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "../services/recipes-resolver.service";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: SelectRecipeComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
