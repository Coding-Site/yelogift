/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/FacebookLogin.js
import { useEffect } from 'react';


interface FacebookLoginProps {
    onLogin: (userInfo: any) => void;
}


const FacebookLogin: React.FC<FacebookLoginProps> = ({ onLogin }) => {
    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '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', // Replace with your Facebook app ID
                cookie: true,
                xfbml: true,
                version: 'v12.0',
            });
            window.FB.AppEvents.logPageView();
        };
    }, []);





const handleLogin = () => {
    window.FB.login(function (response) {
        if (response.authResponse) {
            window.FB.api('/me', { fields: 'name,email,picture' }, function (userInfo) {
                onLogin(userInfo);
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
};

return (
    <button onClick={handleLogin}>Login with Facebook</button>
);
};

export default FacebookLogin;

