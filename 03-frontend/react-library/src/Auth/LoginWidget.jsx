import {Redirect} from "react-router-dom";
import {useOktaAuth} from "@okta/okta-react";
import {SpinnerLoading} from "../layout/Utils/SpinnerLoading";
import {OktaSignInWidget} from "./OktaSigninWidget";

//This route hosts the Sign-In Widget and redirects the user to the default home page if the user is already signed in.
export const LoginWidget = ({config})=> {
    const {oktaAuth, authState} = useOktaAuth();
    //認証が成功したら、認可サーバからトークン（IDトークン、アクセストークン、リフレッシュトークン）が返される。
    const onSuccess = (tokens) => {
        //ユーザーの認証が成功した後にリダイレクトを処理するためのメソッド
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log("Sign in error : ", err);
    };

    if(!authState){
        return(
            <SpinnerLoading />
        );
    }
    //認証済みだったら"/"にリダイレクト、まだだったらsignin-widgetをレンダリングする
    return authState.isAuthenticated ? 
    <Redirect to={{pathname : "/"}} />
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;

}