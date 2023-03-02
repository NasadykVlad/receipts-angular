import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "../../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../alert/alert.component";
import {PlaceholderDirective} from "../../directives/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  error;
  loading = false;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective
  private closeSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    const email = form.value.email
    const password = form.value.password
    this.loading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs
      .subscribe(res => {
        this.loading = false;
        this.router.navigate(['/recipes']).then()

      }, errorMessage => {
        this.loading = false;
        this.error = errorMessage
        this.showErrorAlert(errorMessage)
      })

    form.reset()
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponent = new AlertComponent()
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory)
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }
}
