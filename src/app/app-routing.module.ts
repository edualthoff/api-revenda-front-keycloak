import { pathValues } from './core/util/path-values';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppAuthGuard } from './core/security/router/app-auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { LayoutsModule } from './layouts/layouts.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeycloakBearerInterceptor } from 'keycloak-angular';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

/** link de retorno PADRAO quando digitado URL errada */
export const routerRedirectError = {
  path: '**', redirectTo: `${pathValues.ROUTING_APP}/dashboard`, pathMatch: 'full'
};

const routes: Routes = [
  { path: '', redirectTo: `${pathValues.ROUTING_APP}/dashboard`, pathMatch: 'full' },
  { path: `${pathValues.ROUTING_APP}`, component: CommonLayoutComponent, canActivate: [AppAuthGuard], data: {roles: ['user']}, children: [
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', },
    { path: 'produtos', loadChildren: () => import('./pages/produtos/produtos.module').then(m => m.ProdutosModule) },
    { path: 'mercado-livre', loadChildren: () => import('./pages/mercado-livre/mercado-livre.module').then(m => m.MercadoLivreModule) },
    routerRedirectError,
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, onSameUrlNavigation: 'reload' }),  LayoutsModule],
  providers: [
    AppAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
     }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
