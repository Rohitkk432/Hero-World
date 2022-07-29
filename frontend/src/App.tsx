import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/nav";
import Landing from "./pages/landing";
import Heroes from "./pages/heroes";
import HeroDetails from "./pages/heroDetails";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/heroes" element={<Heroes/>} />
        <Route path="/arena" element={<Heroes/>} />
        <Route path="/profile" element={<Landing/>} />
        <Route path="/hero/:id" element={<HeroDetails/>} />
      </Routes>
    </Router>
  </ChakraProvider>
)
