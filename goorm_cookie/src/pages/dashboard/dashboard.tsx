/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../../components/CodeEditor/codeEditor';
import Header2 from '../../components/Header2';
import ChatComponent from '../../components/ChatComponent/ChatComponent';
import ParticipantList from '../../components/ParticipantList';
import './dashboard.css';
import styled from 'styled-components';
import userDummy from '../../dummy/user.dummy';
import axios from 'axios';
import { SERVER_URL } from '../../constant/constant';

type UsesOnlineType = {
  id: string;
  name: string;
  isOnline: boolean;
};

export type ProjectInfoType = {
  contained_id?: string;
  created_at: string;
  created_by: object;
  id: number;
  name: string;
  updated_at: string;
};

const Dashboard: React.FC = () => {
  const { roomId, lang } = useParams<{ roomId: string; lang: string }>();
  const [usersOnline, setUsersOnline] = useState<UsesOnlineType[]>([
    { id: '1', name: 'Alice', isOnline: true },
    { id: '2', name: 'Bob', isOnline: false },
  ]);
  const [projectInfo, setProjectInfo] = useState<ProjectInfoType | null>(null);

  useEffect(() => {
    const getProjectId = async () => {
      const { data } = await axios.get(`${SERVER_URL}/api/projects/${roomId}`);
      setProjectInfo(data.data);
    };
    getProjectId();
  }, []);

  return (
    <>
      <Header2 projectInfo={projectInfo} />
      <StyledDashboard id="dashboard">
        <div className="dashboard-grid">
          <StyledDashboardGridLeft className="dashboard-grid-left">
            {roomId && lang && <CodeEditor roomId={roomId} language={lang} />}
          </StyledDashboardGridLeft>

          <div className="dashboard-grid-right chat-component-wrapper">
            <ParticipantList usersOnline={userDummy} />
            <ChatComponent />
          </div>
        </div>
      </StyledDashboard>
    </>
  );
};

const StyledDashboard = styled.div`
  height: 100%;
`;

const StyledDashboardGridLeft = styled.div`
  margin-right: 30px;
`;

export default Dashboard;
