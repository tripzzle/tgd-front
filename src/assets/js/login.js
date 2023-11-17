const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
const redirectUrl = import.meta.env.VITE_NAVER_REDIRECT_URL;
const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_url=${redirectUrl}&state=triptrace`;

export const naverLogin = () =>{
    location.href = authUrl;
};
export const kakoLogin = () => {
    
    const loginWithKakao = () => {
        const params = {
            redirectUri: "http://localhost:8080/auth",
        };
        window.Kakao.Auth.authorize(params);
    }
};