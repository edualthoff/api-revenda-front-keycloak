import { environment } from './../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';



export function initializerKeycloak(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const { keycloakConfig } = environment;
      try {
        //await authTokenStorageService.loadTokenBD();
        //alert(authTokenStorageService.getAuthToken());
        let token: any = localStorage.getItem('token');
        let refreshToken: any = localStorage.getItem('refreshToken');
        //console.log("cheugie", token);
        if (token === "undefined" || refreshToken === undefined) {
          //console.log("cheugie");
          token = '';
          refreshToken = '';
        }
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            //redirectUri: 'http://localhost:4200/dashboard',
            pkceMethod: 'S256',
            flow: 'standard',
            onLoad: 'check-sso',
            checkLoginIframe: false,
            token,
            refreshToken
            //token: authTokenStorageService.getAuthToken(),
            //refreshToken: authTokenStorageService.getRefreshAuthToken()
          },
          enableBearerInterceptor: true,
          bearerPrefix: 'Bearer',
          //bearerExcludedUrls: [
            //'main.js',
          //]
        }).then(auth => {
          //keycloak.isLoggedIn().then(x => {alert(x)})
          //alert(auth+" ")
          if (!auth) {
            //alert("cheguei aqui"+ auth)
            keycloak.login({
              scope: 'openid offline_access',
            });
          }
          localStorage.setItem('token', keycloak.getKeycloakInstance().token);
          localStorage.setItem('refreshToken', keycloak.getKeycloakInstance().refreshToken);
          //authTokenStorageService.setAuthSessionToken(keycloak.getKeycloakInstance().token, keycloak.getKeycloakInstance().refreshToken);

        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
}