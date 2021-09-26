import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

function Home() {
    return (
        <div>
            <Box sx={{ flexGrow: 2 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Listentes
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default Home;