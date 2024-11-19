import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { cleanStructure } from '../../utils/json.utils';
import { getRoutesFromMenuItem, verifyRoute } from '../../utils/routes.utils';
import { DialogService } from '../../modules/shared/services/Dialog.service';
import { timer } from 'rxjs';
import { DialogType, DialogPosition } from '../../modules/shared/enum/dialog';
import { Dialog } from '../../modules/shared/models/dialog';
import { Menu } from '../constants/menu';
import { SubMenuItem } from '../models/menu.model';

export const authGuard: CanActivateFn = (route, state) => {
  const dialogService = inject(DialogService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
