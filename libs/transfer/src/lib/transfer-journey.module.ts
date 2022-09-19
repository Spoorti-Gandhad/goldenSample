import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideRoutes, Route } from '@angular/router';
import { MakeTransferJourneyStoreGuard } from './make-transfer-journey-store-guard';
import { TransferJourneyComponent } from './transfer-journey.component';
import { MakeTransferSuccessViewComponent } from './views/make-transfer-success-view/make-transfer-success-view.component';
import { MakeTransferSummaryViewComponent } from './views/make-transfer-summary-view/make-transfer-summary-view.component';
import { MakeTransferViewComponent } from './views/make-transfer-view/make-transfer-view.component';
import { MakeTransferJourneyConfiguration } from './services/make-transfer-journey-config.service';
import { MakeTransferPermissionsService } from './services/make-transfer-permissions.service';
import { MakeTransferAccountHttpService } from './services/make-transfer-accounts.http.service';
import { MakeTransferRouteTitleResolverService } from './services/make-transfer-route-title-resolver.service';
import { TRANSLATIONS } from './constants/dynamic-translations';

const defaultRoute: Route = {
  path: '',
  component: TransferJourneyComponent,
  children: [
    {
      path: '',
      redirectTo: 'make-transfer',
      pathMatch: 'full',
    },
    {
      path: 'make-transfer',
      component: MakeTransferViewComponent,
      data: {
        title: TRANSLATIONS.makeTransferTitle,
      },
      resolve: {
        title: MakeTransferRouteTitleResolverService,
      },
    },
    {
      path: 'make-transfer-summary',
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
      path: 'make-transfer-success',
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
};

@NgModule({
  imports: [TransferJourneyComponent],
  providers: [
    MakeTransferJourneyStoreGuard,
    MakeTransferJourneyConfiguration,
    MakeTransferPermissionsService,
    MakeTransferAccountHttpService,
    MakeTransferRouteTitleResolverService,
  ],

  exports: [TransferJourneyComponent],
})
export class TransferJourneyModule {
  static forRoot(
    data: { [key: string]: unknown; route: Route } = { route: defaultRoute }
  ): ModuleWithProviders<TransferJourneyModule> {
    return {
      ngModule: TransferJourneyModule,
      providers: [provideRoutes([data.route])],
    };
  }
}
