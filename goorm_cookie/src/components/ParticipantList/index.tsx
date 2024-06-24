import React from 'react';
import styles from './ParticipantList.module.css';
import User from 'class/User';

interface ParticipantListProps {
    usersOnline: User[];
}


const ParticipantList: React.FC<ParticipantListProps> = ({ usersOnline }) => {
    return (
        <div className={styles.userList}>
            <h4>온라인</h4>
            {usersOnline.filter(user => user.isOnline).map(user => (
                <div key={user.id} className={styles.userEntry}>{user.name}</div>
            ))}
            <h4>오프라인</h4>
            {usersOnline.filter(user => !user.isOnline).map(user => (
                <div key={user.id} className={styles.userEntry}>{user.name}</div>
            ))}
        </div>
    );
}

export default ParticipantList;
