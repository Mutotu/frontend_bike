import "../cssFiles/SingleBikePage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { useParams } from "react-router-dom";

const SingleBikePage = (props) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(null);
  const [moto, setMoto] = useState([]);
  const [profile, setProfile] = useState({});
  const { motoId } = useParams();
  const getMoto = async () => {
    console.log(motoId);
    const motoData = await axios(`${env.BACKEND_URL}/comments/${motoId}`, {
      headers: { authorization: localStorage.getItem("userId") },
    });
    setMoto(motoData.data.comments);
    // console.log(motoData);
    moto.length > 0 ? setLoad(true) : setLoad(false);

    const motoProfile = await axios.get(
      `${env.BACKEND_URL}/motorcycle/${motoId}`
    );
    // setProfile(motoProfile);
  };

  // console.log(profile.data.moto.make);
  const display = () => {
    return (
      <div className='single-page-display'>
        <button
          className='single-page-bt'
          onClick={() => {
            navigate("/allbikes");
          }}
        >
          Go back to bikes
        </button>
        <div>
          {/* <h3>Comments on {profile.data.moto.make}</h3> */}
          {/* <p>{profile.data.moto.photo}</p> */}
        </div>
        <div>
          {moto.map((item, i) => {
            return (
              <ul key={item.id}>
                <div>
                  <li>Title: {item.title}</li>
                  <li>Comment: {item.comment}</li>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getMoto();
  }, []);
  return (
    <>
      {!moto.length < 1 ? (
        <div className='card'>
          {moto.length > 0 ? display() : <p>Loading...</p>}
        </div>
      ) : (
        <p>No comments</p>
      )}
    </>
  );
};

export default SingleBikePage;
