import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import * as http from "http";
import {RecipeService} from "../../services/recipe.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() navigate
  private userSub: Subscription
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService
              ) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  saveRecipes() {
    this.dataStorageService.storeRecipes()
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout()
  }
}

