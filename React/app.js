// const heading1 = React.createElement("h1",{id:"heading1",dataid:1},"Hello world from react1")
// console.log( typeof(heading1))
// console.log(heading1)

// const root = ReactDOM.createRoot(document.getElementById("root"))

// root.render(heading1)

// const heading = React.createElement("h1", {id:"heading1"}, "Nested Structure")
// const child = React.createElement("div", {id:"child"}, heading)
// const root = ReactDOM.createRoot(document.getElementById("root"))
// const parent = React.createElement("div", {id:"parent"}, child)
// root.render(parent)

import React from "react"
import ReactDOM from "react-dom/client"

// const heading = React.createElement("h1",{id:"heading1"}, "this is a heading")

// jsx - not html in js. it has html-like or xml-like syntax

//jsx element
const JsxHeading = () => (
    <h1 className="heading">
    Namaste Samyak from JSX 🚀
    </h1>
) 


const root = ReactDOM.createRoot(document.querySelector('#root'))
// root.render(heading)
// root.render(jsxHeading)

// React component:
// Class based components - OLD
// Functional based components - NEW its a js function. thats it

// heading component
// const HeadingComponent = () => {
//     return <h1>Namaste Samyak from React Component</h1>
// }

const HeadingComponent = () => (
    <div id="container">
        <JsxHeading />
        <h1>Namaste Samyak from React Component</h1>
    </div>  
)

root.render(<HeadingComponent />)
