import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
`;

const Text = styled.p`
  color: white;
  font-size: 20px;
  text-align: center;
`;

const IconOrigin = styled.a`
  color: white;
  font-size: 20px;
  text-decoration: none;
  margin-top: 3rem;
  display: block;
  text-align: center;
`;

export default function Inpopage() {
  return (
    <>
      <Header />
      <Container>
        <Text>
          구름톤 트레이닝 풀스택 7회차 구름과자조의 Web IDE 만들기
          프로젝트입니다.
        </Text>

        <IconOrigin
          href="https://www.flaticon.com/kr/free-animated-icons/"
          title="교통 애니메이션 아이콘"
        >
          교통 애니메이션 아이콘 제작자: Freepik - Flaticon
        </IconOrigin>
        <Footer />
      </Container>
    </>
  );
}
