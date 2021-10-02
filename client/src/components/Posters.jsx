import React, { useState } from 'react';

const Posters = (props) => {

  const [hover, setHover] = useState(false);
  const [favModal, setFavModal] = useState(false);

  const handleMouseEnter = (e) => {
    e.preventDefault();
    setHover(true);
  }

  const handleMouseLeave = (e) => {
    e.preventDefault();
    setHover(false);
  }

  const handleFavModal = () => {
    setFavModal(!favModal);
  }

  const handleLogin = (e) => {
    const userNameText = e.target.value;
    props.handleFavLogin(userNameText);
  }

  const handleFavClick = () => {
    props.handleFavItem(props.posterURL)
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="one_poster_container">
      <img className="movie_poster" src={props.posterURL}></img>
      <div className="button_container">
        {hover &&
          <>
            <div className="button later">More Info</div>
            <div className="button favorite">Watch Now</div>
            {!props.onlyFaves &&
              <>
                {!props.userName &&
                  <>
                    <div onClick={handleFavModal} className="button later">Favorite</div>
                    {favModal &&
                      <div className="darken_bg">
                        <div className="modal">
                          <div onClick={handleFavModal} className="exit_X">
                            ✖
                          </div>
                          <h2>Must Log In First!</h2>
                          <div>Please log in to add movies to favorites</div>
                        </div>
                      </div>

                    }
                  </>
                }
                {props.userName &&
                  <div onClick={handleFavClick} className="button later">Favorite</div>
                }
              </>
            }
          </>
        }
      </div>
    </div>
  )
};

export default Posters;
