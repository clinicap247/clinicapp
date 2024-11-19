import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../shared/components/button/button.component';
// import { AuthFacadeService } from '../../../../../application/facade/auth/AuthFacade.service';
// import { StateCallback } from '../../../../../application/states/StateCallback.interface';
// import { CredentialEntity } from '../../../../../domain/entities/auth/credential.entity';
import { state } from '@angular/animations';
import { timer } from 'rxjs';
import { Menu } from '../../../../core/constants/menu';
import { cleanStructure } from '../../../../utils/json.utils';
import {
  verifyRoute,
  getRoutesFromMenuItem,
} from '../../../../utils/routes.utils';
import { DialogType, DialogPosition } from '../../../shared/enum/dialog';
import { Dialog } from '../../../shared/models/dialog';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf,
    ButtonComponent,
  ],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) {}


  private authService = inject(AuthService);



  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    if (localStorage.getItem('token')) {
      this._router.navigate(['/']);
    }



    // if (this.credential()) {
    //   this._router.navigate(['/warehouse']);
    // }
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  // callback: StateCallback<CredentialEntity> = {
  //   onResult: (entity: CredentialEntity) => {
  //     const items = entity!.rols.split('~').map((rol) => JSON.parse(rol));
  //     const rules = items.map((item) =>
  //       JSON.parse(cleanStructure(item.rol_structure))
  //     );

  //     const appRules = rules.map((r) => r.apps);

  //     const validRoutes: string[][] = [];

  //     appRules?.forEach((rule) => {
  //       rule.forEach((ruleItem: any) => {
  //         ruleItem.pages.forEach((page: string) => {
  //           validRoutes.push(page.split('/'));
  //         });
  //       });
  //     });
  //     let routes: string[] = [];
  //     Menu.pages.forEach((page) => {
  //       page.items.forEach((item) => {
  //         const itemAux = getRoutesFromMenuItem(item, validRoutes);
  //         itemAux ? routes.push(itemAux.route ? itemAux.route! : itemAux.children![0].route!) : null;
  //       });
  //     });

  //     routes = routes.filter((r) => r);


  //     this._router.navigate([routes[0]]);
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // };

  onSubmit() {
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      return;
    }

    this.authService.login(email, password).subscribe((response) => {
      this._router.navigate(['/']);
    });

    // this.authFacadeService.login(email, password, this.callback);
  }
}
