import React, { useState, useEffect } from "react"
import { FaStar, FaRegStar } from "react-icons/fa"
import { useUser, TopicRef } from "common/context/UserContext"
import "./FavoriteButton.css"

type FavoriteButtonProps = {
  topic: TopicRef
}

const FavoriteButton = ({ topic }: FavoriteButtonProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useUser()
  const [favorited, setFavorited] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setFavorited(isFavorite(topic.id))
  }, [topic.id, isFavorite])

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorited) {
      removeFavorite(topic.id)
      setFavorited(false)
    } else {
      addFavorite(topic)
      setFavorited(true)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  return (
    <>
      <button
        className={`favorite-button ${favorited ? "favorited" : ""}`}
        onClick={handleToggleFavorite}
        title={favorited ? "Remove from favorites" : "Add to favorites"}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        {favorited ? <FaStar /> : <FaRegStar />}
        <span className="favorite-text">
          {favorited ? "Favorited" : "Favorite"}
        </span>
      </button>

      {showToast && (
        <div className="favorite-toast">
          <FaStar /> Added to favorites!
        </div>
      )}
    </>
  )
}

export default FavoriteButton
