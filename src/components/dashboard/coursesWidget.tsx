import { Component } from "react";
import { Fab, Button, Card, Divider } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
type Props = {};
type State = {
  searchTitle: string;
};

export default class CoursesWidget extends Component<Props, State> {
    render() {
        return (<Card
            sx={{
              textAlign: 'center',
              p: 3
            }}
          >
            <Fab variant="extended" size="large" color="secondary" aria-label="Cursos">
              <CastForEducationIcon /> 153
            </Fab>
            <br />
            <Button variant="contained"
              size="large"
              sx={{
                mt: 4
              }} href="/courses">
              Ver Cursos
            </Button>
          </Card>);
    }
}