
const keycloakConfig = {
  clientId: 'front-angular-revenda',
  realm: 'revenda-certa',
  url: 'https://auth.revendacerta.com.br/auth',
}

export const environment = {
  production: true,
  keycloakConfig,
  apis: { gate: 'https://back.revendacerta.com.br' },
};

