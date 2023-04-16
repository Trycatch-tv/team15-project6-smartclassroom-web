import dataTeam from "./team.json";
import "./AboutUs.css";
import Box from '@mui/material/Box';
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
}

export default class AboutUs extends Component {
  render() {
    return (
      <><HeaderComponent
        title="Smart Classroom"
        description="SmartClassroom es una completa aplicación web que ofrece una amplia gama de funcionalidades para gestionar cursos y estudiantes de manera efectiva. A través de esta plataforma, es posible realizar el registro y la edición de cursos con detalles importantes como su nombre, descripción, fechas, profesor y otros atributos relevantes. Asimismo, se puede llevar a cabo el registro y la edición de estudiantes con datos básicos como su nombre, correo electrónico, teléfono y otros detalles de contacto."
      // element={""
      //   /*<Button fullWidth variant="contained">
      //     Hola Mundo
      //   </Button>*/
      // }
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
                gitHub={""}
                linkedIn={""}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}