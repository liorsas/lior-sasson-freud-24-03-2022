import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import Switch from "./Switch";
import { Paper } from "@mui/material";

function Main() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "250vh" }}>
        <div>
          <header className="main-hdr">
            <Navbar bg="light" variant="light">
              <Container>
                <Navbar.Brand href="#home">Weather App</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/favorite">
                    Favorites
                  </Nav.Link>
                </Nav>
                <Switch
                  checked={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
              </Container>
            </Navbar>
          </header>

          <Outlet />
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default Main;
