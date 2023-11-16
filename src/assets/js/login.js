export const naverService = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "5V7kxxbzkL0QzEFF_8gA",
        callbackUrl: "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=jyvqXeaVOVmV&redirect_uri=localhost:8080&state=hLiDdL2uhPtsftcU",
        isPopup: false /* 팝업을 통한 연동처리 여부 */,
        loginButton: {
            color: "green",
            type: 3,
            height: 40,
        } /* 로그인 버튼의 타입을 지정 */,
    });
    const setNaver = () => {
        naverLogin.init();
    };
    const getUserInfo = () => {
        setNaver();
        naverLogin.getLoginStatus((status) => {
            if (status) {
                const email = naverLogin.user.email;
                const name = naverLogin.user.name;
                console.log(email, name);
            } else {
                console.log("AccessToken이 올바르지 않습니다.");
            }
        });
    };
    return {
        setNaver,
        getUserInfo,
    };

};

export const kakoLogin = () => {
    
    const loginWithKakao = () => {
        const params = {
            redirectUri: "http://localhost:8080/auth",
        };
        window.Kakao.Auth.authorize(params);
    }
};