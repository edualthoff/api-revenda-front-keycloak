// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const keycloakConfig = {
  clientId: 'front-angular-revenda',
  realm: 'revenda-certa',
  url: 'http://localhost:8095/auth',
}
export const environment = {
  production: false,
  keycloakConfig,
  apis:{ gate: 'http://localhost:8080'},
  serverUrl: 'http://localhost:8080',
  serverAuthUtl: 'http://localhost:8083',
  loginUrl: 'http://localhost:8083/oauth/token',

  //signinUrl: 'http://localhost:8080/api/signin',
  //clientId: 'frontangular',
  //clientSecret: "6eX;nLclEooE<#'Rg3f{NBfe)pbk,W"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
