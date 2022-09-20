import { Routes } from '@angular/router';
import { EntitlementsGuard } from '@backbase/foundation-ang/entitlements';
import { AuthGuard } from './auth/auth.guard';
import { triplets } from './services/entitlementsTriplets';
import { UserContextGuard } from './user-context/user-context.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'transactions',
  },
  {
    path: 'select-context',
    loadComponent: () =>
      import('./user-context/user-context.component').then(
        (m) => m.UserContextComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'transfer',
    loadChildren: () =>
      import('./transfer/transfer-journey-bundle.routes').then(
        (m) => m.routes
      ),
    canActivate: [AuthGuard, UserContextGuard],
  },
  {
    path: 'positive-pay',
    loadChildren: () =>
      import('./positive-pay/positive-pay-journey-bundle.module').then(
        (m) => m.PositivePayJourneyBundleModule
      ),
    canActivate: [AuthGuard, UserContextGuard, EntitlementsGuard],
    data: {
      entitlements: triplets.canViewPositivePay,
    },
  },
  {
    path: 'ach-positive-pay',
    loadChildren: () =>
      import('./ach-positive-pay/ach-positive-pay-journey-bundle.module').then(
        (m) => m.AchPositivePayJourneyBundleModule
      ),
    canActivate: [AuthGuard, UserContextGuard, EntitlementsGuard],
    data: {
      entitlements: triplets.canViewAchRule,
    },
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transactions/transactions-journey-bundle.module').then(
        (m) => m.TransactionsJourneyBundleModule
      ),
    data: {
      entitlements: triplets.canViewTransactions,
    },
    canActivate: [AuthGuard, UserContextGuard, EntitlementsGuard],
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('./user-accounts/user-accounts-view/user-accounts-view.component').then(
        (m) => m.UserAccountsViewComponent
      ),
    canActivate: [AuthGuard, UserContextGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'transactions',
  },
];
