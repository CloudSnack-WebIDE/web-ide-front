import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './C_Room.css';
import axios from 'axios';
import LanguageIcon, { RoomIcon } from '../../assets/index';

const C_Room: React.FC = () => {
  const [roomTitle, setRoomTitle] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const navigate = useNavigate();

  const handleRoomTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const createRoom = async () => {
    if (roomTitle.trim() !== '') {
      try {
        await axios.post('/api/rooms', { title: roomTitle, language });
      } catch (error) {
        console.error('방 생성에 실패했습니다:', error);
        alert('방 생성에 실패했습니다:');
      }
    } else {
      alert('방 제목을 입력하세요.');
    }
    navigate(`/room/${roomTitle}/${language}`); //if 문 밖으로 이동
  };

  return (
    <>
      <Header />
      <div className="cr_room">
        <div id="create_room-container">
          <label htmlFor="room_title"></label>
          <div className="create_room-icon">
            <RoomIcon className="roomicon" />
            <input
              id="room_title"
              type="text"
              placeholder="방 제목을 입력하세요"
              value={roomTitle}
              onChange={handleRoomTitleChange}
            />
          </div>
          <div className="select-container">
            <LanguageIcon className="language-icon" />
            <select
              id="room_language"
              className="create_room-icon"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="">언어를 선택해 주세요</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
            </select>
          </div>
          <div>
            <button id="cr_room_button" onClick={createRoom}>
              Create Room
            </button>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default C_Room;
