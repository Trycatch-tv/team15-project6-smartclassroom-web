import dataTeam from "./team.json";
import "./AboutUs.css";
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';
import { Component } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import { type } from "os";
import { HeaderComponent } from "./Header";
import { CardComponent } from "./Card";

export { HeaderComponent } from "./Header"
export { CardComponent } from "./Card"

type CardData = {
  image: string;
  name: string;
  position: string;
  description: string;
  gitHub: string;
  linkedIn: string;
}

export default class AboutUs extends Component {
  render() {
    return (
      
      <>
      <Helmet>
        <title>Sobre Nosotros - Smart Classroom</title>
      </Helmet>

      <HeaderComponent
        title="Smart Classroom"
        description="SmartClassroom es una completa aplicación web que ofrece una amplia gama de funcionalidades para gestionar cursos y estudiantes de manera efectiva. A través de esta plataforma, es posible realizar el registro y la edición de cursos con detalles importantes como su nombre, descripción, fechas, profesor y otros atributos relevantes. Asimismo, se puede llevar a cabo el registro y la edición de estudiantes con datos básicos como su nombre, correo electrónico, teléfono y otros detalles de contacto."
      />
      <blockquote>
        <p dir="auto">Este proyecto se ha realizado con fines educativos, sin ánimo de lucro y con el objetivo meramente de aprender sobre las tecnologías con las que se ha implementado. Forma parte de la iniciativa impulsada por <a href="https://linktr.ee/trycatch.tv" rel="nofollow">TryCatch.TV</a> (Aprendizaje colaborativo) para realizar proyectos de forma colaborativa con varios desarrolladores que están apuntando a mejorar sus habilidades en ciertas áreas y para aquellos que están en búsqueda de sus primeros empleos como desarrolladores de software.</p>
        <p dir="auto">Nosotros no somos responsables de cómo se use este proyecto ni de las consecuencias que puedan derivarse de su uso. Todos los participantes en este proyecto han contribuido de manera voluntaria y no se ha pagado a nadie por su colaboración. El código fuente de este proyecto se proporciona tal cual, sin garantías de ningún tipo.</p>
        <p dir="auto">Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.</p>
      </blockquote>
        <Grid container spacing={2} justifyContent="center">
          {dataTeam.map((cardData: CardData, index: number) => (
            <Grid key={index} item xs={2.5}>
              <CardComponent
                key={index}
                image={cardData.image}
                name={cardData.name}
                description={cardData.description}
                position={cardData.position}
                gitHub={cardData.gitHub}
                linkedIn={cardData.linkedIn}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}