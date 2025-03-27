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
            <div>Designer: {game.designer}</div>
            <div>Year Released: {game.year_released}</div>
            <div>Number of Players: {game.num_players}</div>
            <div>Estimated Time to Play: {game.estimated_playtime}</div>
            <div>Age Recommendation: {game.age_recommendation}</div>
            <div>Categories: {" "}
                {game.category_details?.length > 0 ? (
                    <ul>
                        {game.category_details.map(category => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                ) : (
                    <span>No Categories Available</span>
                )}
            </div>
        </section>
    )
}