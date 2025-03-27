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
        <section>
            <h1>{game.title}</h1>
            <div>Description: {game.description}</div>
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
            {game.is_owner === true && (
                <button onClick={() => navigate(`/games/${gameId}/edit`)}>Edit Game</button>
            )}
            <div>
                <h3>Reviews</h3>
                <button onClick={() => navigate(`/games/${gameId}/review`)}>Review Game</button>
                <div>
                    {reviews.map(review => <div key={review.id}>{review.content}</div>)}
                </div>
            </div>
        </section>
    )
}