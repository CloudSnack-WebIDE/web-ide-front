/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './ChatRoomList.css';
import styled from 'styled-components';


interface ChatRoom {
    meetingId: string;
    title: string;
}

interface ChatRoomListProps {
    chatrooms: ChatRoom[];
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatrooms }) => {
    return (
        <StyledChatRoomList className="chatroom-list">
            {chatrooms.map((chatroom, key) => (
                <StyledChatRoom key={chatroom.meetingId}>
                    <StyledChatRoomEntry className="chatroom-entry">
                        {chatroom.title}
                    </StyledChatRoomEntry>
                </StyledChatRoom>
            ))}
        </StyledChatRoomList>
    );
};

const StyledChatRoomList = styled.div`
    height : 100%;
    width : 900px;
`

const StyledChatRoom = styled.div`
    display: flex;
    align-items: 'center';
    border-top: '1px solid #f0f0f0';
    min-height: '40px';
    color: '#f0f0f0';  
    margin-bottom: 10px;
`


const StyledChatRoomEntry= styled.div`
    margin-top: auto;
    margin-bottom: auto;
`


export default ChatRoomList;
