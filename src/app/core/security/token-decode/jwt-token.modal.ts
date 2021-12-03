/************************************
 * Classes responsaveis por receber os atributos do Claims - JWT Token
***********************************/

export class JwtUserToken {
  session: boolean;
  modulo = new Array<string>();
}

export class JwtAuthorities {

  private _authority: string;

  public get authority(): string {
    return this._authority;
  }
  public set authority(value: string) {
    this._authority = value;
  }
}
