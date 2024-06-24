import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IdIcon, PasswordIcon } from '../../assets';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebaseAuth';
import './styles.css';
import "../../styles/commonStyles.css";

// 카카오 API 응답 타입 정의
interface KakaoAuthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
    token_type: string;
}

interface KakaoUserResponse {
    id: number;
    connected_at: string;
    properties: {
        nickname: string;
        profile_image: string;
        thumbnail_image: string;
    };
    kakao_account: {
        profile_needs_agreement: boolean;
        profile: {
            nickname: string;
            thumbnail_image_url: string;
            profile_image_url: string;
        };
        has_email: boolean;
        email_needs_agreement: boolean;
        is_email_valid: boolean;
        is_email_verified: boolean;
        email: string;
    };
}

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Kakao: any;
    }
}

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
        const savedPassword = localStorage.getItem('password') || sessionStorage.getItem('password');
        if (savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
            handleLogin({ preventDefault: () => {} } as React.FormEvent);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('YOUR_APP_KEY'); // Replace with your actual Kakao app key
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('아이디:', username);
            console.log('비밀번호:', password);

            // 실제 로그인 API 호출 예시
            // const response = await api.login({ username, password });
            // if (response.success) {
            //     login();
            //     navigate('/');
            // } else {
            //     setError('로그인에 실패했습니다. 사용자명 또는 비밀번호를 확인하세요.');
            // }

            // 로그인 성공 시 로그인 상태 업데이트
            login();
            if (autoLogin) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
            } else {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
            }
            navigate('/projects');
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.');
        }
        setLoading(false);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
            login();
            navigate('/projects');
          })
          .catch((error) => {
            console.error(error.code, error.message, error.customData.email);
            setError('구글 로그인 중 오류가 발생했습니다.');
            setLoading(false);
          });
    };

    const signInWithKakao = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.login({
                success: function (authObj: KakaoAuthResponse) {
                    console.log(authObj);
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        success: function (res: KakaoUserResponse) {
                            console.log(res);
                            login();
                            navigate('/projects');
                        },
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        fail: function (error: any) {
                            console.error(error);
                        }
                    });
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fail: function (err: any) {
                    console.error(err);
                }
            });
        } else {
            console.error('Kakao SDK not loaded');
        }
    };

    return (
        <>
            <div className="login-container">
                <h2>로그인</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username"></label>
                        <div className="input-icon-container">
                            <IdIcon className="input-icon" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="아이디를 입력하세요"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="auto-login-container">
                            <input
                                id="auto-login"
                                type="checkbox"
                                checked={autoLogin}
                                onChange={(e) => setAutoLogin(e.target.checked)}
                            />
                            <label htmlFor="auto-login">자동 로그인</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <div className="input-icon-container">
                            <PasswordIcon className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                                required
                            />
                            <Link to="/forgot-password" className="links pass-link">비밀번호가 기억나지 않는다면?</Link>
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="Login-button">
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                    <div className="kakao-google-login-container">
                        <img
                            src="/kakaoLogin.png"
                            alt="카카오 로그인"
                            className="kakao-login"
                            onClick={signInWithKakao}
                        />
                        <button className="google-login" onClick={signInWithGoogle}>
                            <img src="/googleLogo.png" alt="Google 로고" className="google-logo" />
                            Google 계정으로 로그인
                        </button>
                    </div>
                </form>
                <div className="ifNotRegistered">
                    <p>아직 회원이 아니라면? <Link to="/register" className="links register-link">회원가입</Link></p>
                </div>
            </div>
        </>
    );
};

export default Login;
