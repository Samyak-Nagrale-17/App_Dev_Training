import React from "react"
import ReactDOM from "react-dom/client"
import {useState} from "react"
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
const RestuarantCard = (props) => {

    // useState
    const [orderStatus, setOrderStatus] = useState("Order")

    const placeOrder = (res) => {
        console.log(`Order Placed for {} `)
    }
    const {resData} = props
    return(
        <div className="res-card">
            <img className="res-card-img" src={resData.imgLink} alt="res-card-image"/>
            <h3>{resData.resName}</h3>
            <h4>{resData.cuisine}</h4>
            <h4>{resData.rating}⭐</h4>
            <h4>{resData.deliveryTime}</h4>
            {/* Order button */}
            {/* <button onClick = {placeOrder(resData.resName)}>{color}</button> */}
            <button onClick = {() => setOrderStatus("Placed!")}>{orderStatus}</button>
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
                {/* <RestuarantCard resData = {resList[0]}/>

                <RestuarantCard resData = {resList[1]}/>

                <RestuarantCard resData = {resList[2]}/>

                <RestuarantCard resData = {resList[3]}/> */}
                {
                    resList.map((res,index) => (<RestuarantCard key={index} resData={res}/>))
                }

            </div>
        </div>
    )
}


// main array of object
const resList = [

    {
        resName:"Meghana Foods",
        cuisine : "North Indian, Biryani, Tandoor",
        rating :"4.3",
        deliveryTime : "30-45 mins",
        imgLink :"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/gp1ityra6utvzqn6ghnv"
    },

    {
        resName:"Bakery World",
        cuisine : "Bakery, Ice cream, Snacks",
        rating : "4.4",
        deliveryTime : "50-55 mins",
        imgLink : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/mt2aggiscfl3yviatwng"
    },

    {
        resName:"The Fusion Lounge",
        cuisine : "North Indian, South Indian, Chinese",
        rating :"4.1",
        deliveryTime : "55-60 mins",
        imgLink : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/fa4944f0cfdcbca2bec1f3ab8e3db3f7"
    },

    {
        resName:"Urban Cafe",
        cuisine : "Snacks, Pizza, Pasta",
        rating :"3.4",
        deliveryTime : "50-55 mins",
        imgLink : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/21/dbe91f1f-b400-4f4b-a78d-c6b99bdc61c5_912754.JPG"
    }

]

//  create a footer component with class component
class Footer extends React.Component{
    render(){
        return (
        <div className="footer">
            <ul className="nav-items-list">
                <li>&#169;</li>
                <li>About us</li>
                <li>Contact us</li>
            </ul>
        </div>
        )
    }
}

//Main App Component
const AppLayout = () => {
    return(
        <div className="app">
            <Header />
            <Body />
            {/* <Footer /> */}
        </div>
    )
}

root.render(<AppLayout />)

