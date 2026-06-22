import { useState, useEffect } from 'react'

function Animated_Loader() {
    const [isLoading, setIsLoading] = useState(true)
    const [welcome] = useState('Welcome to the animated web app!')
    const [enter] = useState('Use any button to enter the app')
    const [count, setCount] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleKeyPress = () => {
            setIsLoading(false)
        }

        const handleClick = () => {
            setIsLoading(false)
        }

        window.addEventListener('keydown', handleKeyPress)
        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
            window.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div className="Animated-Loader">
            {isLoading ? (
                <div className="loading-screen">
                    <h2>Loading...</h2>
                    <p>Please wait a moment</p>
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="content">
                    <h1>{welcome}</h1>
                    <p>{enter}</p>

                    <button onClick={() => setCount(count + 1)}>
                        Count: {count}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Animated_Loader