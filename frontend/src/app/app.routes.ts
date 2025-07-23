import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/portalweb/portalweb.component').then(
        (c) => c.PortalwebComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'register-success',
    loadComponent: () =>
      import('./pages/auth/register-success/register-success.component').then(
        (c) => c.RegisterSuccessComponent
      ),
  },
  {
    path: 'auth/verify-email',
    loadComponent: () =>
      import('./pages/auth/verifymails/verifymails.component').then(
        (c) => c.VerifymailsComponent
      ),
  },
  {
    path: '',
    children: [
      {
        path: 'artikel',
        loadComponent: () =>
          import('./pages/artikel-all/artikel-all.component').then(
            (c) => c.ArtikelAllComponent
          ),
      },
      {
        path: 'artikel/:slug',
        loadComponent: () =>
          import('./pages/artikel-all/artikel/artikel.component').then(
            (c) => c.ArtikelComponent
          ),
      },
    ],
  },
  {
    path: 'normal-price/:id',
    canActivate: [AuthGuard],
    data: { role: 'USER' },
    loadComponent: () =>
      import(
        './pages/pricing-registrant/normal-price/normal-price.component'
      ).then((c) => c.NormalPriceComponent),
  },
  {
    path: 'special-price/:id',
    canActivate: [AuthGuard],
    data: { role: 'USER' },
    loadComponent: () =>
      import(
        './pages/pricing-registrant/special-price/special-price.component'
      ).then((c) => c.SpecialPriceComponent),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    data: { role: 'USER' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/users/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'history-users',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/users/history-transaction/history-transaction.component'
              ).then((c) => c.HistoryTransactionComponent),
          },
          {
            path: 'null-transaction',
            loadComponent: () =>
              import(
                './pages/users/history-transaction/null-transaction/null-transaction.component'
              ).then((c) => c.NullTransactionComponent),
          },
        ],
      },
      {
        path: 'jadwal-users',

        loadComponent: () =>
          import('./pages/users/jadwalpages/jadwalpages.component').then(
            (c) => c.JadwalpagesComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/admin/auth/auth.component').then(
            (c) => c.AuthComponent
          ),
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'data-package',
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/admin/registration-data/all-packet-data/all-packet-data.component'
              ).then((c) => c.AllPacketDataComponent),
          },
          {
            path: ':packagesId/batches',
            loadComponent: () =>
              import(
                './pages/admin/registration-data/all-batch-data/all-batch-data.component'
              ).then((c) => c.AllBatchDataComponent),
          },
          {
            path: 'data-registran/:batchId',
            loadComponent: () =>
              import(
                './pages/admin/registration-data/data-registrant/data-registrant.component'
              ).then((c) => c.DataRegistrantComponent),
          },
          {
            path: 'data-prices/:batchId',
            loadComponent: () =>
              import(
                './pages/admin/registration-data/pricing/pricing.component'
              ).then((c) => c.PricingComponent),
          },
        ],
      },
      {
        path: 'setting-pages',
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },
        loadComponent: () =>
          import('./pages/admin/setting-pages/setting-pages.component').then(
            (c) => c.SettingPagesComponent
          ),
      },
      {
        path: 'setting-article',
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/admin/settingcms-article/settingcms-article.component'
              ).then((c) => c.SettingcmsArticleComponent),
          },
          {
            path: 'add-articlepage',
            loadComponent: () =>
              import(
                './pages/admin/settingcms-article/addcms-article/addcms-article.component'
              ).then((c) => c.AddcmsArticleComponent),
          },
          {
            // >>>>>> BAGIAN YANG DIPERBAIKI <<<<<<
            path: 'edit-articlepage/:slug', // <-- DITAMBAHKAN PARAMETER :slug
            loadComponent: () =>
              import(
                './pages/admin/settingcms-article/editcms-article/editcms-article.component'
              ).then((c) => c.EditcmsArticleComponent),
          },
        ],
      },

      // ROUTES PENGATURAN TESTIMONIAL
      {
        path: 'setting-testimoni',
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/admin/settingcms-testimoni/settingcms-testimoni.component'
              ).then((c) => c.SettingcmsTestimoniComponent),
          },
          {
            path: 'add-testimonial',
            loadComponent: () =>
              import(
                './pages/admin/settingcms-testimoni/addcms-testimonial/addcms-testimonial.component'
              ).then((c) => c.AddcmsTestimonialComponent),
          },
          {
            path: 'edit-testimonial/:id', 
            loadComponent: () =>
              import(
                './pages/admin/settingcms-testimoni/editcms-testimonial/editcms-testimonial.component'
              ).then((c) => c.EditcmsTestimonialComponent),
          },
        ],
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },
        loadComponent: () =>
          import(
            './pages/admin/profilesto-admin/profilesto-admin.component'
          ).then((c) => c.ProfilestoAdminComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(
            (c) => c.NotFoundComponent
          ),
      },
    ],
  },
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./pages/access-denied/access-denied.component').then(
        (c) => c.AccessDeniedComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];

// Tambahkan konfigurasi `withInMemoryScrolling` untuk mengaktifkan anchor scroll
export const appRoutingProviders = [
  provideRouter(
    routes,
    withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    })
  ),
];