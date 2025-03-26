import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const GameDetails = ({ currentUser }) => {
    const [game, setGame] = useState([])

    const { gameId } = useParams()

    const fetchGame = async () => {
        const response = await fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
            }
    })
        const gameData = await response.json()
        setGame(gameData)
    }

    useEffect(() => {
      fetchGame()
    }, [])


    return (
        <section>
            <h1>{game.title}</h1>
        </section>
    )
}