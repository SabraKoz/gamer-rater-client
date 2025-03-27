import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { GameList } from "./GameList"
import { useEffect, useState } from "react"
import { NavBar } from "./Navbar"
import { GameDetails } from "./GameDetails"
import { NewGame } from "./NewGame"
import { ReviewGame } from "./ReviewGame"


export const ApplicationViews = () => {
    const [games, setGames] = useState([])
    const [categories, setCategories] = useState([])
    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        const GamerRaterUser = JSON.parse(
            localStorage.getItem("rater_token")
        ).token;
        setCurrentUser(GamerRaterUser)
    }, [])

    const fetchGames = async () => {
        let url = "http://localhost:8000/games"

        const response = await fetch(url, 
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
                }
            }
        )
        const allGames = await response.json()
        setGames(allGames)
    }

    const fetchCategories = async () => {
        const response = await fetch("http://localhost:8000/categories", 
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
                }
            }
        )
        const allCategories = await response.json()
        setCategories(allCategories)
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<><NavBar/><Outlet/></>} >
            <Route path="/games">
                <Route index element={<GameList games={games} fetchGames={fetchGames} currentUser={currentUser} />} />
                <Route path=":gameId" element={<GameDetails currentUser={currentUser} />} />
                <Route path=":gameId/review" element={<ReviewGame />} />
            </Route>
            <Route path="/create" element={<NewGame categories={categories} fetchCategories={fetchCategories} fetchGames={fetchGames} />} />
            </Route>
        </Routes>
    </BrowserRouter>
}