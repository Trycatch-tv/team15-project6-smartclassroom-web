import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

type HeaderProps = {
    title: string;
    description: string;
    //element?: React.ReactNode | null;
}

export const HeaderComponent: React.FC<HeaderProps> = ({ title, description/*, element*/ }) => {
    return (
        <div>
            <Box sx={{ width: "100%", height: "auto" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "100%" }}
                >
                    <Grid item xs={10}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: "100%" }}
                        >
                            <Grid item>
                                <Typography fontWeight="bold" variant="h2">{title}</Typography>
                            </Grid>
                            <Grid item sx={{ mt: 1, mb:2 }}>
                                <Typography fontSize={18}>{description}</Typography>
                            </Grid>
                            {/* {element !== undefined && (
                                <Grid sx={{ mt: 4, width: "100%" }} item>
                                    {element}
                                </Grid>
                            )} */}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
        </div>
    )
};