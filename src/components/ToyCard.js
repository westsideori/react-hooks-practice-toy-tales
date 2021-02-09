import React from "react";

function ToyCard({toy, displayToys, addUpdatedToToys}) {

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'DELETE'
    })
      .then(displayToys(id))
  }

  const handleLike = (toy) => {

    const updatedToy = {likes: toy.likes + 1}
    console.log(updatedToy)

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedToy)
    })
      .then(resp => resp.json())
      .then(updatedToyObj => {
        addUpdatedToToys(updatedToyObj)
      })
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button onClick={() => handleLike(toy)} className="like-btn">Like {"<3"}</button>
      <button onClick={() => handleDelete(toy)} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
