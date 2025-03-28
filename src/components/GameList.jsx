import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


export const GameList = ({ games, fetchGames, currentUser }) => {

    const navigate = useNavigate()

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <section className="m-5">
            <h1 className="m-3 title is-2 has-text-centered has-text-link">Game List</h1>
            <div className="has-text-centered">
            <button onClick={() => navigate(`/create`)} className="button is-primary is-rounded m-5">Register New Game</button>
            </div>
            <div className="card m-3 p-3">
                {games.map(game => <div key={game.id}>
                    <div className="m-6 has-text-link"><Link className="card p-3 has-text-link m-3" to={`/games/${game.id}`}>{game.title}</Link></div>
                </div>)}
            </div>
        </section>
    )
}