import React from 'react'

const SplashScreen = () => {
    return (
        <div className="intro-wrapper d-flex align-items-center justify-content-center text-center">
            <div className="background-shape"></div>
            <div className="container d-flex justify-content-center flex-column align-items-center">
                <img class="big-logo" src="/logo/logo.png" alt="" loading="lazy"/>
            </div>
        </div>
    )
}

export default SplashScreen