import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameDetails = ({ currentUser }) => {
    const [game, setGame] = useState([])
    const [reviews, setReviews] = useState([])

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

    return (
        <section className="m-6">
            <div className="card p-5 m-5">
                <h1 className="m-3 title is-3 has-text-centered has-text-primary">{game.title}</h1>
                <div className="m-2">Description: {game.description}</div>
                <div className="m-2">Designer: {game.designer}</div>
                <div className="m-2">Year Released: {game.year_released}</div>
                <div className="m-2">Number of Players: {game.num_players}</div>
                <div className="m-2">Estimated Time to Play: {game.estimated_playtime}</div>
                <div className="m-2">Age Recommendation: {game.age_recommendation}</div>
                <div className="m-2">Categories: {" "}
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
                    <button className="button is-primary m-3" onClick={() => navigate(`/games/${gameId}/edit`)}>Edit Game</button>
                )}
            </div>
            <div className="card m-6 p-6">
                <h3 className="m-3 title is-4 has-text-centered has-text-primary">Reviews</h3>
                <button className="button is-primary m-3" onClick={() => navigate(`/games/${gameId}/review`)}>Review Game</button>
                <div className="m-3">
                    {reviews.map(review => <div className="m-2 p-2 card" key={review.id}>{review.content}</div>)}
                </div>
            </div>
        </section>
    )
}