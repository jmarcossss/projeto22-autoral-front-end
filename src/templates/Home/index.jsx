import { useState, useEffect, useContext } from "react";
import { userContext } from "../../contexts/userContext";
import styled from "styled-components";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header";
import CreateDepositionBox from "../../components/createDeposition";
import SlideBox from "../../components/slideBox";
import Logo from "./../../assets/imgs/logooo.png";
import Footer from "../../components/footer";
import * as stylized from "./style.js";
import { AiFillStar } from "react-icons/ai";
import image1 from "./../../assets/imgs/img1.png";
import image2 from "./../../assets/imgs/img2.jpg";
import image3 from "./../../assets/imgs/img3.jpg";

function Home() {
  const [createBox, setCreateBox] = useState(false);
  const [slide, setSlide] = useState(false);
  const [square, setSquare] = useState(false);
  const [logged, setLogged] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const slideImages = [
    { url: image1, },
    { url: image2, },
    { url: image3, },
  ];

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage) {
      setLogged(true);
    }
  }, []);

  useEffect(() => {
    const promise = api.get("/deposition");

    promise.then((response) => {
      const { data } = response;
      setTestimonials(data);
    });
    promise.catch((err) => console.log(err.response));
  }, []);

  function deleteDeposition(id) {
    const { sendUser } = user;
    const { token } = sendUser;
    const promise = api.delete(`/deposition/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    promise.then(() => {
      window.location.reload(false);
    });
    promise.catch((err) => console.log(err.response));
  }

  function renderStars(stars) {
    if(stars === 20)  return <Star />
    if(stars === 40)  return <> <Star /> <Star /> </>
    if(stars === 60)  return <> <Star /> <Star /> <Star /> </>
    if(stars === 80)  return <> <Star /> <Star /> <Star /> <Star /> </>
    if(stars === 100) return <> <Star /> <Star /> <Star /> <Star /> <Star /> </>
  }

  return (
    <>
      <Header />
      <stylized.Background>
        <stylized.Main>
          {square ? (
            <stylized.DivUp>
              <img src={Logo} alt="Logo" />
              <h1>Venha treinar com a gente e conquiste seus objetivos!</h1>
              <stylized.Button
                onClick={() => navigate("/schedule")}
                onMouseOut={() => setSquare(false)}
                type="submit"
              >
                Agende uma aula!
              </stylized.Button>
            </stylized.DivUp>
          ) : (
            <stylized.NoDivUp>
              <stylized.Button
                onMouseOver={() => setSquare(true)}
                type="submit"
              >
                Agende uma aula!
              </stylized.Button>
            </stylized.NoDivUp>
          )}
          {slide ? (
            <SlideBox slideImages={slideImages} />
          ) : (
            <stylized.ShowSlide onClick={() => setSlide(true)}>
              Veja as fotos da academia!
            </stylized.ShowSlide>
          )}
        </stylized.Main>
      </stylized.Background>
      <stylized.SubMain>
        <stylized.Div />
        <h1>Depoimentos</h1>
        <stylized.DivDepositions>
          {testimonials ? (
            testimonials.map((testimonial, index) => {
              const { id, stars, text, username, userId } = testimonial;
              if (user !== null && user.sendUser.id === userId) {
                return (
                  <stylized.Depositions key={index}>
                    <stylized.DivStars>{renderStars(stars)}</stylized.DivStars>
                    <stylized.Trash onClick={() => deleteDeposition(id)} />
                    <p>{text}</p>
                    <h1> - {username}</h1>
                  </stylized.Depositions>
                );
              } else {
                return (
                  <stylized.Depositions key={index}>
                    <stylized.DivStars>{renderStars(stars)}</stylized.DivStars>
                    <p>{text}</p>
                    <h1> - {username}</h1>
                  </stylized.Depositions>
                );
              }
            })
          ) : (
            <></>
          )}
        </stylized.DivDepositions>
        {logged ? (
          <>
            <stylized.Comment onClick={() => setCreateBox(true)}>
              Escreva um depoimento
            </stylized.Comment>
          </>
        ) : (
          <></>
        )}
        <stylized.Div />
        {createBox ? (
          <>
            <CreateDepositionBox setCreateBox={setCreateBox} user={user} />
          </>
        ) : (
          <></>
        )}
        <stylized.More>
          <stylized.Box>
            <h1>Contato</h1>
            <a
              href="https://wa.me/5581991858698"
              target="_blank"
              rel="noreferrer"
            >
              <button>Enviar Mensagem</button>
            </a>
            <p>(81) 9.91858698</p>
          </stylized.Box>
          <stylized.Box>
            <h1>Endereço</h1>
            <a
              href="https://www.google.com/maps/place/Match+Fit+Gra%C3%A7as/@-8.0452978,-34.90082,15z/data=!4m2!3m1!1s0x0:0x7367b7f965ca4016?sa=X&ved=2ahUKEwjpsLD_jr__AhV4r5UCHcw1CJ4Q_BJ6BAhMEAg"
              target="_blank"
              rel="noreferrer"
            >
              <button>Ver Rotas</button>
            </a>
            <p>R. Amélia, 637 - Graças</p> <p>Recife - PE</p> <p>52011-050</p>
          </stylized.Box>
          <stylized.Box>
            <h1>Horário de Funcionamento</h1> <p>Segunda a Sexta: 06:00 - 23:00</p> <p>Sábado e Domingo: 08:00 - 12:00</p>
          </stylized.Box>
        </stylized.More>
      </stylized.SubMain>
      <Footer />
    </>
  );
}

export default Home;

const Star = styled(AiFillStar)`
  color: #fbbc2a;
  font-size: 18px;
  margin: 0 2px;
`;
