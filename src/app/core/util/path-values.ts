import { AppInjector } from './../services/app-injector.service';
import { KeycloakService } from 'keycloak-angular';
import { environment } from './../../../environments/environment';



//export const API_URL = environment.serverUrl;
//export const API_URL_AUTHENTIC = environment.serverAuthUtl;
//export const API_URL_LOGIN_AUTHENTIC = environment.loginUrl;
//const KEYCLOAK_API = AppInjector.getInjector().get(KeycloakService).getKeycloakInstance().createLoginUrl().match(/((.*)(openid\-connect))/)[0];

const REVENDA_API = environment.apis.gate;
const ROUTING_APP = '';
const ROTA_LOGIN = 'auth/login';
const ROTA_MAIN = '';
const ROTA_REDIRECT_LOGGED = '/';

export const SESSION_NAME = 'session';

export const pathValues = {
    ROTA_LOGIN,
    ROUTING_APP,
    REVENDA_API,
    //KEYCLOAK_API,
    ROTA_MAIN,
    ROTA_REDIRECT_LOGGED
};

export enum pathPredicates {
    REVENDA = 'revenda',
    MERCADO_LIVRE = 'mercadolivre'
}
