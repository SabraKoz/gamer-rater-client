import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const NewGame = ({ categories, fetchCategories, fetchGames }) => {
    const initialGameState = {
        title: "",
        description: "",
        designer: "",
        year_released: 1900,
        num_players: 0,
        estimated_playtime: 0,
        age_recommendation: 0,
        categories: []
    }
    const [gameData, setGameData] = useState(initialGameState)

    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleCategoryChange = (e) => {
        const categoryId = parseInt(e.target.value)
        const copy = {...gameData}

        if (copy.categories.includes(categoryId)) {
            copy.categories = copy.categories.filter((id) => id !== categoryId)
        } else {
            copy.categories.push(categoryId)
        }

        setGameData(copy)
    }

    const saveGame = async (e) => {
        e.preventDefault()

        await fetch("http://localhost:8000/games", {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameData)
        })
        await fetchGames()
        navigate(-1)
    }

    return (
        <section className="m-5">
            <form className="card m-5 p-5">
                <h1 className="m-6 title is-3 has-text-centered has-text-link">Register New Game</h1>
                <fieldset className="m-3">
                    <label className="title is-6">Title: </label>
                    <input id="title" type="text"
                        onChange={e => {
                            const copy = {...gameData}
                            copy.title = e.target.value
                            setGameData(copy)
                        }}
                        value={gameData.title} />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Description: </label>
                    <input id="description" type="text"
                        onChange={e => {
                            const copy = {...gameData}
                            copy.description = e.target.value
                            setGameData(copy)
                        }}
                        value={gameData.description} />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Designer: </label>
                    <input id="designer" type="text"
                        onChange={e => {
                            const copy = {...gameData}
                            copy.designer = e.target.value
                            setGameData(copy)
                        }} 
                        value={gameData.designer} />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Year Released: </label>
                    <input id="year_released" type="number"
                        onChange={e => {
                            const copy = {...gameData}
                            copy.year_released = e.target.value
                            setGameData(copy)
                        }}
                        value={gameData.year_released} />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Number of Players: </label>
                    <input id="num_players" type="number"
                        onChange={e => {
                            const copy = {...gameData}
                            copy.num_players = e.target.value
                            setGameData(copy)
                        }}
                        value={gameData.num_players} />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Estimate Time to Play: </label>
                    <input id="estimated_playtime" type="number"
                        onChange={e => {
                            const copy = {...gameData}
                            copy.estimated_playtime = e.target.value
                            setGameData(copy)
                        }} 
                        value={gameData.estimated_playtime}/>
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Age Recommendation: </label>
                    <input id="age_recommendation" type="number"
                        onChange={e => {
                            const copy = {...gameData}
                            copy.age_recommendation = e.target.value
                            setGameData(copy)
                        }} 
                        value={gameData.age_recommendation} />
                </fieldset>
                <fieldset className="m-3">
                    <label className="title is-6">Categories: </label>
                    <div className="m-3">
                        {categories.map(category => (
                            <div key={category.id}>
                                <input
                                    type="checkbox"
                                    value={category.id}
                                    checked={gameData.categories.includes(category.id)}
                                    onChange={handleCategoryChange} />
                                <label>{category.name}</label>
                            </div>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="m-3">
                    <button className="button is-primary m-3" type="submit" 
                        onClick={saveGame}>Save</button>
                </fieldset>
            </form>
        </section>
    )
}