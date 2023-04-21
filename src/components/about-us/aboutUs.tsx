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
        <Grid container spacing={2} justifyContent="center">
          {dataTeam.map((cardData: CardData, index: number) => (
            <Grid item xs={2.5}>
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