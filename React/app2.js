import React from "react"
import ReactDOM from "react-dom/client"

/*
 -Header
    -Logo
    -Navitems
 -Body
    - Search
    - Restuarant continer
        - restuarant card
            - image
            - name of resturant
            - star rating
            - cuisines
            - eta (time for delivery)
        - restuarant card
 -Footer
    - copyright
    - Links
    - Contact us
*/

const root = ReactDOM.createRoot(document.querySelector('#root'))

// Restuarant Card Component
const RestuarantCard = () => {
    return(
        <div className="res-card">
            <h3>Meghana Foods</h3>
        </div>
    )
}

// Header Component
const Header = () => {
    return(
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="https://static.vecteezy.com/system/resources/thumbnails/047/171/113/small_2x/logo-design-for-restaurant-and-food-company-vector.jpg" alt="foodlogo"/>
            </div>

            <div className="nav-items">
                <ul className="nav-items-list">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul> 
            </div>

        </div>
    )
}

const Body = () => {
    return (
        <div className="body">
            <div className="search">Search</div>
            <div className="res-container">
                <RestuarantCard />
                <RestuarantCard />
                <RestuarantCard />
            </div>
        </div>
    )
}

//Main App Component
const AppLayout = () => {
    return(
        <div className="app">
        {/* Header
        Body
        Footer */}
        <Header />
        <Body />
        </div>
    )
}

root.render(<AppLayout />)

