import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './ChatComponent.module.css';
import { Client } from '@stomp/stompjs';

const socket: Socket = io('http://localhost:5173');

const ChatComponent: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ sender: string, message: string, timestamp: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        const stomp = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {},
            debug: (str: string) => {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        setStompClient(stomp);

        stomp.activate();
        stomp.onConnect = () => {
            console.log('WebSocket 연결이 열렸습니다.');
            stompClient?.publish({
                destination: '/app/meetings/1/chat',
                body: JSON.stringify({}),
            });
        };
    }, []);

    useEffect(() => {
        // chat 이벤트 수신, history 저장
        socket.on('chat message', (msg: { sender: string, message: string, timestamp: string }) => {
            setChatHistory(prevHistory => [...prevHistory, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    useEffect(() => {
        // 타이핑 상태 관리
        const typingTimeout = setTimeout(() => {
            if (isTyping) {
                socket.emit('stop typing');
                setIsTyping(false);
            }
        }, 500);

        return () => clearTimeout(typingTimeout);
    }, [message]);

    useEffect(() => {
        // 자동 스크롤
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 메시지 입력, 타이핑 상태 표시
        setMessage(e.target.value);
        if (!isTyping) {
            socket.emit('start typing');
            setIsTyping(true);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Enter 키 이벤트 처리
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (message !== '') {
            const messageObject = {
                sender: 'User', // 로그인 데이터 받아와서 유저 닉네임으로 대체하기
                message: message,
                timestamp: new Date().toLocaleTimeString(),
            };
            socket.emit('chat message', messageObject);
            setChatHistory(prevHistory => [...prevHistory, messageObject]);
            setMessage('');
            setIsTyping(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatContainer}>
                <ul className={styles.messages}>
                    {chatHistory.map((msg, index) => (
                        <li key={index} className={styles.messageItem}>
                            <div className={styles.messageHeader}>
                                <span className={styles.sender}>{msg.sender}</span>
                                <span className={styles.timestamp}>{msg.timestamp}</span>
                            </div>
                            <p>{msg.message}</p>
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>
            </div>
            <div className={styles.messageForm}>
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="메시지 입력..."
                    className={styles.messageInput}
                />
                <button onClick={sendMessage} className={styles.sendButton}>보내기</button>
            </div>
        </div>
    );
};

export default ChatComponent;
