import React, { useState } from 'react';
import { EmailIcon, IdIcon, PasswordIcon } from '../../assets';
import './styles.css';
import "../../styles/commonStyles.css";
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;

        // Reset errors
        setPasswordError('');
        setConfirmPasswordError('');

        // 비밀번호 길이 확인
        if (password.length < 6) {
            setPasswordError('비밀번호는 6자 이상이어야 합니다.');
            valid = false;
        }

        // 비밀번호 일치 여부 확인
        if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            valid = false;
        }

        if (!valid) {
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // 회원가입 완료 후 알림 표시 및 로그인 페이지로 리다이렉트
                alert('회원가입이 완료되었습니다!');
                navigate('/login');
            } else {
                // 서버에서 반환된 에러 메시지를 표시
                alert(`회원가입 실패: ${data.result_message}`);
            }
        } catch (error) {
            // 네트워크 에러 등 처리
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="register-container">
            <h2>회원가입</h2>
            <form onSubmit={handleRegister}>
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
                    <label htmlFor="email"></label>
                    <div className="input-icon-container">
                        <EmailIcon className="input-icon" />
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                            required 
                        />
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
                            className={passwordError ? 'input-error' : ''}
                        />
                    </div>
                    {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword"></label>
                    <div className="input-icon-container">
                        <PasswordIcon className="input-icon" />
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="비밀번호를 다시 입력하세요"
                            required 
                            className={confirmPasswordError ? 'input-error' : ''}
                        />
                    </div>
                    {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                </div>
                <button type="submit">회원가입</button>
            </form>
            <div className="ifAlreadyRegistered">
                <p>이미 회원이라면? <Link to="/login" className="links login-link">로그인</Link></p>
            </div>
        </div>
    );
};

export default Register;
