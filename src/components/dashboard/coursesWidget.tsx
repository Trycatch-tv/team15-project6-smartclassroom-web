import { Component } from "react";
import { Fab, Button, Card } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import DashboardDataService from "../../services/dashboard.services";
type Props = {};
type State = {
  total: number;
};

export default class CoursesWidget extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getCounter = this.getCounter.bind(this);
    this.state = {
      total: 0
    }
  }
  componentDidMount() {
    this.getCounter();
  }
  getCounter() {
    DashboardDataService.getCoursesCount()
      .then((response: any) => {
        this.setState({
          total: response.data.coursesCount
        });
      })
      .catch((e: Error) => {
        this.setState({
          total: -1
        });
        console.log(e);
      });
  }
    render() {
      const { total } = this.state;
        return (<Card
            sx={{
              textAlign: 'center',
              p: 3
            }}
          >
            <br />
            <Fab variant="extended" size="large" color="secondary" aria-label="Cursos" href="/courses">
              <CastForEducationIcon /> &nbsp; { total } Cursos
            </Fab>
            <br />
            <br />
          </Card>);
    }
}