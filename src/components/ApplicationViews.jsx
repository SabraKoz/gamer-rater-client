import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { GameList } from "./GameList"
import { useEffect, useState } from "react"
import { NavBar } from "./Navbar"
import { GameDetails } from "./GameDetails"


export const ApplicationViews = () => {
    const [games, setGames] = useState([])
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

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<><NavBar/><Outlet/></>} >
            <Route path="/games">
                <Route index element={<GameList games={games} fetchGames={fetchGames} currentUser={currentUser} />} />
                <Route path=":gameId" >
                    <Route index element={<GameDetails currentUser={currentUser} />} />
                </Route>
            </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}