import { Routes } from '@angular/router';
import { MakeTransferJourneyStoreGuard } from './make-transfer-journey-store-guard';
import { TransferJourneyComponent } from './transfer-journey.component';
import { MakeTransferSuccessViewComponent } from './views/make-transfer-success-view/make-transfer-success-view.component';
import { MakeTransferSummaryViewComponent } from './views/make-transfer-summary-view/make-transfer-summary-view.component';
import { MakeTransferViewComponent } from './views/make-transfer-view/make-transfer-view.component';
import { MakeTransferJourneyConfiguration } from './services/make-transfer-journey-config.service';
import { MakeTransferPermissionsService } from './services/make-transfer-permissions.service';
import { MakeTransferAccountHttpService } from './services/make-transfer-accounts.http.service';
import { MakeTransferRouteTitleResolverService } from './services/make-transfer-route-title-resolver.service';
import { MakeTransferJourneyState } from './state/make-transfer-journey-state.service';
import { TRANSLATIONS } from './constants/dynamic-translations';

export const transferJourneyRoutes: Routes = [{
  path: '',
  component: TransferJourneyComponent,
  providers: [
    MakeTransferJourneyState,
    MakeTransferJourneyStoreGuard,
    MakeTransferJourneyConfiguration,
    MakeTransferPermissionsService,
    MakeTransferAccountHttpService,
    MakeTransferRouteTitleResolverService,
  ],
  children: [
    {
      path: '',
      redirectTo: 'make',
      pathMatch: 'full',
    },
    {
      path: 'make',
      component: MakeTransferViewComponent,
      data: {
        title: TRANSLATIONS.makeTransferTitle,
      },
      resolve: {
        title: MakeTransferRouteTitleResolverService,
      },
    },
    {
      path: 'summary',
      component: MakeTransferSummaryViewComponent,
      data: {
        title: TRANSLATIONS.makeTransferTitle,
      },
      resolve: {
        title: MakeTransferRouteTitleResolverService,
      },
      canActivate: [MakeTransferJourneyStoreGuard],
    },
    {
      path: 'success',
      component: MakeTransferSuccessViewComponent,
      data: {
        title: TRANSLATIONS.makeTransferTitle,
      },
      resolve: {
        title: MakeTransferRouteTitleResolverService,
      },
      canActivate: [MakeTransferJourneyStoreGuard],
    },
  ],
}];
