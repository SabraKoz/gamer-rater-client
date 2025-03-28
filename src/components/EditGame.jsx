import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditGame = ({ categories, fetchCategories, fetchGames }) => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [game, setGame] = useState([])

    const fetchGame = async () => {
        const response = await fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
            }
    })
        const gameData = await response.json()
        setGame({...gameData, categories: gameData.category_details.map(category => category.id)})
    }

    useEffect(() => {
        fetchCategories()
        fetchGame()
    }, [])

    const handleCategoryChange = (e) => {
        const categoryId = parseInt(e.target.value)
        const copy = {...game}

        if (copy.categories.includes(categoryId)) {
            copy.categories = copy.categories.filter((id) => id !== categoryId)
        } else {
            copy.categories.push(categoryId)
        }

        setGame(copy)
    }

    const updateGame = async (e) => {
        e.preventDefault()

        await fetch(`http://localhost:8000/games/${gameId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
        await fetchGames()
        navigate(-1)
    }

    return (
        <section className="m-5">
            <form className="card m-5 p-5">
                <h1 className="m-6 title is-3 has-text-centered has-text-link">Edit Game</h1>
                <fieldset className="m-3">
                    <label className="title is-6">Title: </label>
                    <input
                        id="title"
                        type="text"
                        onChange={(e) => {
                            const copy = { ...game };
                            copy.title = e.target.value;
                            setGame(copy);
                        }}
                        value={game.title || ""}
                    />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Description: </label>
                    <input
                        id="description"
                        type="text"
                        onChange={(e) => {
                            const copy = { ...game };
                            copy.description = e.target.value;
                            setGame(copy);
                        }}
                        value={game.description || ""}
                    />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Designer: </label>
                    <input
                        id="designer"
                        type="text"
                        onChange={(e) => {
                            const copy = { ...game };
                            copy.designer = e.target.value;
                            setGame(copy);
                        }}
                        value={game.designer || ""}
                    />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Year Released: </label>
                    <input
                        id="year_released"
                        type="number"
                        onChange={(e) => {
                            const copy = { ...game };
                            copy.year_released = e.target.value;
                            setGame(copy);
                        }}
                        value={game.year_released || 1900}
                    />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Number of Players: </label>
                    <input
                        id="num_players"
                        type="number"
                        onChange={(e) => {
                            const copy = { ...game };
                            copy.num_players = e.target.value;
                            setGame(copy);
                        }}
                        value={game.num_players || 0}
                    />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Estimate Time to Play: </label>
                    <input
                        id="estimated_playtime"
                        type="number"
                        onChange={(e) => {
                            const copy = { ...game };
                            copy.estimated_playtime = e.target.value;
                            setGame(copy);
                        }}
                        value={game.estimated_playtime || 0}
                    />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Age Recommendation: </label>
                    <input
                        id="age_recommendation"
                        type="number"
                        onChange={(e) => {
                            const copy = { ...game };
                            copy.age_recommendation = e.target.value;
                            setGame(copy);
                        }}
                        value={game.age_recommendation || 0}
                    />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Categories: </label>
                    <div className="m-3">
                        {categories.map((category) => (
                            <div key={category.id}>
                                <input
                                    type="checkbox"
                                    value={category.id}
                                    checked={game.categories?.includes(category.id) || false}
                                    onChange={handleCategoryChange}
                                />
                                <label>{category.name}</label>
                            </div>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="m-3">
                    <button className="button is-primary m-3" type="submit" onClick={updateGame}>Save Changes</button>
                </fieldset>
            </form>
        </section>
    );
};