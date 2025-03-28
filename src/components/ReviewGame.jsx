import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const ReviewGame = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const initialReview = {
        content: "",
        rating: 0,
        game: parseInt(gameId)
    }

    const [newReview, setNewReview] = useState(initialReview)

    const submitReview = async (e) => {
        e.preventDefault()

        await fetch("http://localhost:8000/reviews", {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        })

        navigate(-1)
    }

    return (
        <section className="m-5">
            <form className="m-5 p-5 card">
                <fieldset className="m-3">
                    <label className="title is-6">Review: </label>
                    <textarea 
                        onChange={e => {
                            const copy = {...newReview}
                            copy.content = e.target.value
                            setNewReview(copy)}
                        }
                        value={newReview.content} />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Rating: </label>
                    <input 
                        type="number"
                        onChange={e => {
                            const copy = {...newReview}
                            copy.rating = e.target.value
                            setNewReview(copy)
                        }}
                        value={newReview.rating} />
                </fieldset>
                <fieldset className="m-3">
                    <button className="m-3 button is-primary" type="submit" onClick={submitReview}>Save</button>
                </fieldset>
            </form>
        </section>
    )
}