import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


export const GameList = ({ games, fetchGames, currentUser }) => {

    const navigate = useNavigate()

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <section>
            <h1>Game List</h1>
            <button onClick={() => navigate(`/create`)}>Register New Game</button>
            <div>
                {games.map(game => <div key={game.id}>
                    <div><Link to={`/games/${game.id}`}>{game.title}</Link></div>
                </div>)}
            </div>
        </section>
    )
}