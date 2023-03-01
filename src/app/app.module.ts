import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {RecipeListComponent} from './components/recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './components/recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './components/shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './components/shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule} from "@angular/forms";
import {DropdownDirective} from "./directives/dropdown.directive";
import {RecipeService} from "./services/recipe.service";
import {ShoppingListService} from "./services/shopping-list.service";
import {AppRoutingModule} from "./modules/app-routing.module";
import {SelectRecipeComponent} from './components/recipes/select-recipe/select-recipe.component';
import {RecipeEditComponent} from './components/recipes/recipe-edit/recipe-edit.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DataStorageService} from "./services/data-storage.service";
import {AuthComponent} from './components/auth/auth.component';
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {AuthInterceptorService} from "./services/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    SelectRecipeComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    DataStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
