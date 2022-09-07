import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { AdminGuard } from '../services/admin-auth/admin.guard';
import { AuthGraud } from 'src/app/services/guard/auth-graud.guard';
import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
        canLoad: [AuthGraud],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        canLoad: [AuthGraud],
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchPageModule),
        canLoad: [AuthGraud],
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListPageModule),
        canLoad: [AuthGraud],
      },
      {
        path: 'details/:name',
        component: DetailsComponent,
        canLoad: [AuthGraud],
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create/create.module').then((m) => m.CreatePageModule),
        canLoad: [AdminGuard, AuthGraud],
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
        canLoad: [AuthGraud],
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginPageModule),
        canLoad: [AuthGraud],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminPageModule),
        canLoad: [AdminGuard, AuthGraud],
      },
      // {
      //   path: 'signup',
      //   loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
      //   // canLoad: [AuthGraud]
      // },
    ],
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
