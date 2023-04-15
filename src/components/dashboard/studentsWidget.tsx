import { Component } from "react";
import { Fab, Button, Card } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
type Props = {};
type State = {
  searchTitle: string;
};

export default class StudentsWidget extends Component<Props, State> {
  render() {
    return (<Card
        sx={{
          textAlign: 'center',
          p: 3
        }}
      >
        <Fab variant="extended" size="large" color="secondary" aria-label="Cursos">
          <Diversity3Icon /> 153
        </Fab>
            <br />
        <Button variant="contained"
          size="large"
          sx={{
            mt: 4
          }} href="/courses">
          Ver Estudiantes
        </Button>
      </Card>);
  }
}