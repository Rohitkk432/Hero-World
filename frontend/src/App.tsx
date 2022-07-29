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
import Arena from "./pages/arena";
import FightResult from "./pages/fightResult";
import MyHeroes from "./pages/myHeroes";
import NewHero from "./pages/newHero";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/heroes" element={<Heroes/>} />
        <Route path="/arena" element={<Arena/>} />
        <Route path="/my/heroes" element={<MyHeroes/>} />
        <Route path="/hero/:id" element={<HeroDetails/>} />
        <Route path="/fight/result" element={<FightResult/>} />
        <Route path="/new/hero" element={<NewHero/>} />
      </Routes>
    </Router>
  </ChakraProvider>
)
