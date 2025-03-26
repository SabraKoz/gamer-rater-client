import { useEffect } from "react"
import { Link } from "react-router-dom"


export const GameList = ({ games, fetchGames, currentUser }) => {

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <section>
            <h1>Game List</h1>
            <div>
                {games.map(game => <div key={game.id}>
                    <div><Link to={`/games/${game.id}`}>{game.title}</Link></div>
                </div>)}
            </div>
        </section>
    )
}