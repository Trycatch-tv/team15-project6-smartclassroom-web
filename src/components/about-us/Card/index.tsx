import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
//import { LinkedIn, GitHub } from '@mui/icons-material';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    IconButton,
    Typography
} from "@mui/material";

type CardProps = {
    image: string;
    name: string;
    position: string;
    description: string;
    gitHub: string;
    linkedIn: string;
}

export const CardComponent: React.FC<CardProps> = ({ image, name, position }) => {

    return (
        <div>
            <Card sx={{ mt: 3, maxWidth:"250px", transition: 'box-shadow 0.3s ease-in-out', '&:hover': { boxShadow: '0px 0px 15px rgba(0,0,0,0.3)' }  }}>
                <CardMedia
                    component="img"
                    height="auto"
                    image={image}
                    alt="Fotografía" />
                <CardContent sx={{pb:0}}>
                    <Typography textAlign="center" fontWeight="bold" variant="h5" sx={{ mb: 1 }} color="text.secondary">{name}</Typography>
                    <Divider />
                    <Typography textAlign="center" fontSize={20} sx={{ mt: 1 }} variant="body2" color="text.secondary">{position}</Typography>
                </CardContent>
                <div style={{ display: 'flex', justifyContent: 'center'}} >
                    <IconButton style={{color:"#0077B5"}}>
                        {" "}
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton style={{color:"#620296"}}>
                        {" "}
                        <GitHubIcon />
                    </IconButton>
                </div>
                {/* <CardActions>
                    <Button fullWidth variant="contained" size="small">Learn More</Button>
                </CardActions> */}
            </Card>
        </div>
    );
}

/*import "./AboutUs.css";
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
} from "@mui/material";
import { type } from "os";

type CardNames = {
    image: string;
    name: string;
    description: string;
}

export default class AboutUs extends Component {
    render() {
        return (
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image="https://www.unimed.coop.br/site/documents/3643882/0/retrato-jovem-homem-camisa-xadrez-segurando-laptop.jpg"
                    alt="Paella dish" />
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 1 }} color="text.secondary">Nombre</Typography>
                    <Divider />
                    <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">Description</Typography>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant="contained" size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}*/