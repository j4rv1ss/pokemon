import express from "express"
import { addPokemon, getPokemon } from "../controller/pokemonController.js";

import { getUser, login, signup} from "../controller/userController.js";

import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.get("/getUser",isAuthenticated, getUser)

router.post("/addPokemon", isAuthenticated, addPokemon)

router.get("/getPokemon", isAuthenticated, getPokemon)
export default router