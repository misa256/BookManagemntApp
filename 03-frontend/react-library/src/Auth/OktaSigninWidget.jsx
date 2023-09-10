import { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaConfig } from '../lib/oktaConfig';

//To render the Sign-In Widget in React, you must create a wrapper that allows your app to treat it as a React component. 
export const OktaSignInWidget = ({ onSuccess, onError }) => {
    // ウィジェットを表示するための DOM 要素への参照を作成
    // useRef フックは、DOM 要素への参照や、Reactコンポーネント内で状態を保持するために使用されます。特にこのコードでは、widgetRef は Okta 認証ウィジェットが表示される DOM 要素への参照を保持するために使用されます。
    const widgetRef = useRef();

    useEffect(() => {
        //widgetRefが存在しなければfalseを返す
        // widgetRefが初期化されていない場合は何もしない
        if (!widgetRef.current) {
            return false;
        }
        //widgetの初期化、設定情報の提供
        const widget = new OktaSignIn(oktaConfig);
        //認証トークンを取得する(Authorization code request)
        widget.showSignInToGetTokens({
            //widgetを表示するDOM要素を指定
            el: widgetRef.current,
        }).then(onSuccess).catch(onError);

        return () => widget.remove();
    }, [onSuccess, onError]);

    return (
        <div className='container mt-5 mb-5'>
            <div ref={widgetRef}></div>
        </div>
    );
};
