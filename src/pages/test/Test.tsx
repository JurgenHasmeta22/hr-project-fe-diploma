import { Box, List, ListItem, ListItemButton, useMediaQuery } from "@mui/material";

const Test = () => {
    const breakpoint = useMediaQuery("(max-width: 900px)");

    return (
        <>
            <Box
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
                            <List sx={{ outline: "1px solid" }}>
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
                <Box gridArea={"topbar"} sx={{ outline: "1px solid" }}>
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
                    <Box sx={{ outline: "1px solid" }}>
                        <span>Content1</span>
                    </Box>
                    <Box sx={{ outline: "1px solid" }}>
                        <span>Content2</span>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Test;
