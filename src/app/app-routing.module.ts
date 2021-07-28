import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@backbase/foundation-ang/auth';
import { EntitlementsGuard } from '@backbase/foundation-ang/entitlements';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'todo',
    loadChildren: () => import('todo-journey').then(m => m.TodoJourneyModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'heroes',
    loadChildren: () => import('heroes-journey').then(m => m.HeroesJourneyModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: "transfer",
    loadChildren: () => import('./bundles/transfer-journey-bundle.module').then(m => m.TransferJourneyBundleModule),
    canActivate: [ EntitlementsGuard ],
    data: {
      entitlements: 'Transfers.make.view'
    }
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
