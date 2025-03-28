import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


export const GameList = ({ games, fetchGames, currentUser }) => {

    const navigate = useNavigate()

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <section className="m-5">
            <h1 className="m-6 title is-3 has-text-centered has-text-primary">Game List</h1>
            <button onClick={() => navigate(`/create`)} className="button is-primary m-5">Register New Game</button>
            <div>
                {games.map(game => <div key={game.id}>
                    <div className="m-5 has-text-link"><Link to={`/games/${game.id}`}>{game.title}</Link></div>
                </div>)}
            </div>
        </section>
    )
}