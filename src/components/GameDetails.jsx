import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameDetails = ({ currentUser }) => {
    const [game, setGame] = useState([])
    const [reviews, setReviews] = useState([])
    const [isModalActive, setIsModalActive] = useState(false)

    const { gameId } = useParams()

    const navigate = useNavigate()

    const fetchGame = async () => {
        const response = await fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
            }
        })
        const gameData = await response.json()
        setGame(gameData)
    }

    const fetchReviews = async () => {
        const response = await fetch(`http://localhost:8000/reviews`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
            }
        })
        const reviewData = await response.json()
        const filteredReviews = reviewData.filter(review => review.game === parseInt(gameId))
        setReviews(filteredReviews)
    }

    useEffect(() => {
        fetchGame()
        fetchReviews()
    }, [])

    const handleDelete = async (gameId) => {
        await fetch(`http://localhost:8000/games/${gameId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
            }
        })

        navigate(`/games`)
    }

    return (
        <section className="m-6">
            <div className="card p-5 m-5">
                <h1 className="m-3 title is-3 has-text-centered has-text-link">{game.title}</h1>
                <div className="m-2"><span className="title is-6">Description: </span>{game.description}</div>
                <div className="m-2"><span className="title is-6">Designer: </span>{game.designer}</div>
                <div className="m-2"><span className="title is-6">Year Released: </span>{game.year_released}</div>
                <div className="m-2"><span className="title is-6">Number of Players: </span>{game.num_players}</div>
                <div className="m-2"><span className="title is-6">Estimated Time to Play: </span>{game.estimated_playtime}</div>
                <div className="m-2"><span className="title is-6">Age Recommendation: </span>{game.age_recommendation}</div>
                <div className="m-2"><span className="title is-6">Categories: </span>{" "}
                    {game.category_details?.length > 0 ? (
                        <ul className="m-2">
                            {game.category_details.map(category => (
                                <li className="m-2" key={category.id}>{category.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <span>No Categories Available</span>
                    )}
                </div>
                {game.is_owner === true && (
                    <div>
                        <div>
                            <button className="button is-warning m-3" onClick={() => navigate(`/games/${gameId}/edit`)}>Edit Game</button>
                            <button className="button is-danger m-3" onClick={() => setIsModalActive(true)}>Delete Game</button>
                        </div>
                        <div id="deleteModal" className={`modal ${isModalActive ? "is-active" : ""}`}>
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">Confirm Delete</p>
                                    <button className="delete" aria-label="close" onClick={() => setIsModalActive(false)}></button>
                                </header>
                                <section className="modal-card-body">
                                    Are you sure you want to delete this game? This action cannot be undone.
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-danger m-3" onClick={() => handleDelete(gameId)}>Delete</button>
                                    <button className="button is-primary m-3" onClick={() => setIsModalActive(false)}>Cancel</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="card m-6 p-6">
                <h3 className="m-3 title is-4 has-text-centered has-text-link">Reviews</h3>
                <button className="button is-primary is-outlined m-3" onClick={() => navigate(`/games/${gameId}/review`)}>Review Game</button>
                <div className="m-3">
                    {reviews.map(review => <div className="m-3 p-3 card" key={review.id}>{review.content}</div>)}
                </div>
            </div>
        </section>
    )
}