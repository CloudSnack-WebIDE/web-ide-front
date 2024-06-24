import styled from 'styled-components';
import { ProjectInfoType } from 'pages/dashboard/dashboard';

type Header2Type = {
  projectInfo: ProjectInfoType | null
}

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #0C081E;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: fixed;
  left: -0.5rem;
  margin-right: 42rem;
  margin-top: 15px;
  z-index: 100;
  `;

const Logo = styled.img`
    width: 100px;
    height: auto;
`;


export default function Header2({
  projectInfo
}: Header2Type) {
  return (
    <Container>
      <a href="/projects">
        <Logo src="/CODEinthebus-logo.png" alt="CODEinthebus logo" />
      </a>
      {projectInfo?.name}
    </Container>
  )
}
