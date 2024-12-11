import { useEffect, useState } from 'react'
import './Loader.css'

const Loader = () => {

    const [text, setText] = useState('')
    const [showImg, setShowImg] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowImg(false)
            setText(
                'Wait'
            )
        }, 2000)
    }, [])

    return (

        <>
            <div>
                {
                    showImg ? (
                        <img src='src\assets\svg\Rolling@1x-1.0s-200px-200px.svg' alt='loader_image' />
                    ) : (
                        <h3>{text}</h3>
                    )
                }
            </div>
        </>

    )

}

export default Loader