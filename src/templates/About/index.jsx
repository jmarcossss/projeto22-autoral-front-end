import styled from "styled-components";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { textAbout, textPlace } from "./text";

import Artist from "../../assets/imgs/logooo.png"

function About(){
    return(
        <>
        <Header />
        <Main>
            <DivInfo>
              <DivPerson>
              <img src={Artist} alt="Artist" />
                <p>Sobre a academia - {textAbout}</p>
              </DivPerson>
              <DivPlace>
                <p>Sobre a academia - {textPlace}</p>
              </DivPlace>
            </DivInfo>
            <a href="https://www.instagram.com/matchfit.gracas/" target="_blank" rel="noreferrer">
            <Insta>Conheça o instagram da nossa academia!</Insta>
            </a>
        </Main>
        <Footer />
        </>
    )
};

export default About;

export const Main = styled.main`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 80px;
  margin-left: 150px;
`;

export const DivInfo = styled.div`
  width: 500px;
  height: 810px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  margin-left: 7px;
  margin-top: 40px;
  margin-right: 80px;
`;

export const Insta = styled.h1`
  font-family: brisa-sans;
  font-size: 18px;
  margin-top: -100px;
  margin-right: 40px;
`;

export const DivPerson = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  align-items: center;
  margin-left: 7px;
  margin-bottom: 50px;

  img{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 10px;
    margin-right: 20px;
  }

  p{
    font-size: 14px;
    line-height: 20px;
  }
`;

export const DivPlace = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  margin-left: 7px;

  p{
    font-size: 14px;
    line-height: 18px;
  }
`;