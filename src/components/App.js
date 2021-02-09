import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/toys`)
      .then(resp => resp.json())
      .then(toyArray => {
        setToys(toyArray)
      })
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const updateToys = (newToy) => {
    const updatedToys = [...toys, newToy]
    setToys(updatedToys)
  }

  const displayToys = (id) => {
    const updatedToys = toys.filter(toy => {
      return toy.id !== id
    })

    setToys(updatedToys)
  }

  const addUpdatedToToys = (toy) => {
    const newToyList = toys.map(toyObj => {
      if (toy.id === toyObj.id) {
        console.log("toy", toy)
        return toy
      } else {
        console.log("toyObj", toyObj)
        return toyObj
      }
    })

    // console.log(newToyList)

    setToys(newToyList)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm updateToys={updateToys} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} displayToys={displayToys} addUpdatedToToys={addUpdatedToToys}/>
    </>
  );
}

export default App;
