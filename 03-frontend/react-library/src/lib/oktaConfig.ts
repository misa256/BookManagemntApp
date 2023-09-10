//オブジェクト
export const oktaConfig = {
    clientId : '0oab43uyhpiOA2gDr5d7',
    // 認可サーバ
    issuer : 'https://dev-16689714.okta.com/oauth2/default',
    redirectUri : 'http://localhost:3000/login/callback',
    scopes : ['openid', 'profile', 'email'],
    pkce : true,
    disableHttpsCheck : true
}