import React, { useState, useEffect, useRef } from 'react';

import styles from './ChatComponent.module.css';
import { Client } from '@stomp/stompjs';
import { SERVER_URL, WEBSOCKET_URL } from '../../constant/constant';
import axios from 'axios';


const ChatComponent: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ sender: string, message: string, timestamp: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [currentUser, setCurrentUser] = useState<{id: number, name: string}|null>(null);

    useEffect(() => {
        (async() => {
            try {
                const { data } = await axios.get(`${SERVER_URL}/api/user`);
                const user = data.data;
                console.log(user);
                setCurrentUser({
                    id: user.id,
                    name: user.username
                });
            } catch (error) {
                console.error('Failed to fetch current user:', error);
            }
        })();
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        const stomp = new Client({
            brokerURL: WEBSOCKET_URL,
            connectHeaders: {
                Authorization: 'Bearer ' + sessionStorage.getItem("access_token")
            },
            debug: (str: string) => {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        
        stomp.activate();
        stomp.onConnect = () => {
            console.log('WebSocket 연결이 열렸습니다.');
            stomp.subscribe("/topic/meetings/1/chat", ({body}) => {
                const message = JSON.parse(body);

                if (currentUser?.name === message.sender_name) {
                    return;
                }

                setChatHistory(prevHistory => [...prevHistory, {
                    sender: message.sender_name,
                    message: message.text,
                    timestamp: formatTimestamp(message.created_at),
                }]);
            });

            stomp.subscribe("/topic/meetings/1/update", () => {

            });
        };

        setStompClient(stomp);

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
          };

    }, [currentUser]);


    useEffect(() => {
        // 타이핑 상태 관리
        const typingTimeout = setTimeout(() => {
            if (isTyping) {
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
                sender: currentUser?.name ?? 'gd',
                message,
                timestamp: new Date().toLocaleTimeString(),
            };
            stompClient?.publish({
                destination: "/app/meetings/1/chat",
                body: JSON.stringify({
                    text: message
                })
            })
            // socket.emit('chat message', messageObject);
            setChatHistory(prevHistory => [...prevHistory, messageObject]);
            setMessage('');
            setIsTyping(false);
        }
    };

    const addHours = (date: Date, hours: number) => {
        date.setHours(date.getHours() + hours);
        return date;
    };
    
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const kstDate = addHours(date, -9); // UTC-9
        return kstDate.toLocaleTimeString();
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatContainer}>
                <ul className={styles.messages}>
                    {chatHistory.map((msg, index) => (
                        <li key={index} className={`${styles.messageItem} ${msg.sender === currentUser?.name ? styles.myMessage : ''}`}>
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
