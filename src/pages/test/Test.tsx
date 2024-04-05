import { Container, Grid, Paper, useMediaQuery } from "@mui/material";

const Test = () => {
    const breakpoint = useMediaQuery("(max-width: 900px)");

    return (
        <>
            <Container>
                <Grid container columnSpacing={2}>
                    <Grid container item md={12}>
                        <Grid item md={3}>
                            <Paper>subheader1</Paper>
                        </Grid>
                        <Grid item md={9}>
                            <Paper>subheader2</Paper>
                        </Grid>
                    </Grid>
                    <Grid container item md={3} direction={"column"} rowSpacing={1}>
                        <Grid item md={3}>
                            <Paper>sidebar1</Paper>
                        </Grid>
                        <Grid item md={3}>
                            <Paper>sidebar2</Paper>
                        </Grid>
                    </Grid>
                    <Grid container item md={9} direction="row" columnSpacing={1}>
                        <Grid item md={6}>
                            <Paper>content1</Paper>
                        </Grid>
                        <Grid item md={6}>
                            <Paper>content2</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            {/* <Box
                sx={{
                    display: "grid",
                    gridTemplate: `
                    "sidebar topbar" 0.1fr
                    "sidebar content" 0.9fr
                    / 0.2fr  0.8fr
                `,
                    gap: "20px",
                    height: "100vh",
                    "@media (max-width: 900px)": {
                        gridTemplate: `
                        "topbar" 0.1fr
                        "content" 0.9fr
                        / 1fr
                    `,
                        gap: "10px",
                    },
                }}
            >
                {!breakpoint && (
                    <Box gridArea={"sidebar"} sx={{ outline: "1px solid", display: "grid", gridAutoFlow: "row", gap: "20px" }}>
                        <Box>
                            <List >
                                <ListItem>
                                    <ListItemButton>Item1</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Item1</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Item1</ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                )}
                <Box gridArea={"topbar"} >
                    <span>TopBar</span>
                </Box>
                <Box
                    gridArea={"content"}
                    sx={{
                        outline: "1px solid",
                        display: "grid",
                        gridTemplateColumns: "0.5fr 0.5fr",
                        gap: "20px",
                    }}
                >
                    <Box >
                        <span>Content1</span>
                    </Box>
                    <Box >
                        <span>Content2</span>
                    </Box>
                </Box>
            </Box> */}
            {/* <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 8">
                    <Item>xs=8</Item>
                </Box>
                <Box gridColumn="span 4">
                    <Item>xs=4</Item>
                </Box>
                <Box gridColumn="span 4">
                    <Item>xs=4</Item>
                </Box>
                <Box gridColumn="span 8">
                    <Item>xs=8</Item>
                </Box>
            </Box> */}
        </>
    );
};

export default Test;
