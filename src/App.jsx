import { use, useState } from "react";
import HeaderComponent from "./components/HeaderComponent"; // adjust path as needed
import ButtonComponent from "./components/ButtonComponent";

function App() {

// let number = 0;

const [number, setNumber] = useState(0);
const [myValue, setMyValue] = useState("");
let myPlaceholder = "Escribe aqui"


const addOne = () => {
  setNumber(number+1)
  console.log(number)
}

const sayHello = () => {
  console.log(("Hello!"));
}

const handleChange = (e) => {
console.log(e.target.value)
}


  return (
    <>
      <HeaderComponent></HeaderComponent>
      <main className="main-conmtent">
        <h2 onClick={sayHello}>Hello everyone</h2>
        <h2 onClick={addOne}>Number: {number} </h2>
        <input value={myValue} placeholder={myPlaceholder} type="text" onChange={handleChange} /> 
        
        <ButtonComponent></ButtonComponent>
      </main>
    </>
  );
}

export default App;
