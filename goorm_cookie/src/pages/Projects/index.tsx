/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header2 from '../../components/Header2';
import ChatRoomList from '../../components/ChatRoomList';
import ParticipantList from '../../components/ParticipantList';
import ProjectList from '../../components/ProjectList';
import './projects.css';
import styled from 'styled-components';
import userDummy from '../../dummy/user.dummy';
import axios from 'axios';
import { SERVER_URL } from '../../constant/constant';

axios.interceptors.request.use(function (config) {
    const accessToken = sessionStorage.getItem('access_token') || localStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token') || localStorage.getItem('refresh_token');

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
        config.headers['x-refresh-token'] = refreshToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

type MeetingsType = { id: string; name: string };
let bufferSize: number = 0;
let buffer: any[] = [];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]); // ProjectList
  const { roomId, lang } = useParams<{ roomId: string; lang: string }>();

  const [usersOnline, setUsersOnline] = useState<
    { id: string; name: string; isOnline: boolean }[]
  >([
    { id: '1', name: 'Alice', isOnline: true }, //  PariticipantList
    { id: '2', name: 'Bob', isOnline: false },
  ]);

  const [meetings, setMeetings] = useState<
    { meetingId: string; title: string }[]
  >([]); // ChatRoomList
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/user/projects`);
        setProjects(data.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    bufferSize = projects.length;
    projects.forEach((value, key) => {
      axios
        .get(`${SERVER_URL}/api/projects/${value.id}/meetings?userId=1`)
        .then((response) => {
          if (response.data === null || response.data === undefined) {
            response.data = [];
          }
          buffer = [...buffer, response.data];
          if (buffer.length === bufferSize) {
            setMeetings(buffer.reduce((acc, cur) => [...acc, ...cur], []));
            projects.length = 0;
          }
        });
    });
  }, [projects]);

  useEffect(() => {
    console.log(meetings);
  }, [meetings]);

  return (
    <StyledProjects id="projects">
      <Header2 projectInfo={null} />
      <div className="projects-grid">
        <StyledProjectsGridLeft className="projects-grid-left">
          <ProjectList projects={projects} />
          {roomId && lang}
        </StyledProjectsGridLeft>

        {/* <div className="dashboard-grid-right chat-component-wrapper">
          <ParticipantList usersOnline={userDummy} />
          <ChatRoomList chatrooms={meetings} />
        </div> */}
      </div>
    </StyledProjects>
  );
};

const StyledProjects = styled.div`
  height: 100%;
`;

const StyledProjectsGridLeft = styled.div`
  margin-right: 30px;
`;

export default Projects;
