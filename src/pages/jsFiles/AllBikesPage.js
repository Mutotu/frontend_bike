import "../cssFiles/AllBikesPage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { Link } from "react-router-dom";
import PaymentPage from "./PaymentPage";

const AllBikes = (props) => {
  const [bikes, setBikes] = useState([]);
  const [owner, setOwner] = useState("");

  const get_all_bikes = async () => {
    // console.log(process.env);
    const allBikes = await axios(`${env.BACKEND_URL}/motorcycles`, {
      headers: { authorization: localStorage.getItem("userId") },
    });
    // console.log(allBikes.data.bikes);
    setBikes(allBikes.data.bikes);
  };

  const get_user = async (userId) => {
    try {
      const foundUser = await axios.get(`${env.BACKEND_URL}/user/${userId}`);

      setOwner(foundUser.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get_user();
  }, []);

  useEffect(() => {
    get_all_bikes();
  }, []);

  return (
    <div className='allBikes'>
      {bikes.map((item, i) => {
        return (
          <ul key={item.id}>
            <li>
              <div>
                <div>
                  <Link to={`${item.id}`}>
                    Click to see the comments on <h3>{item.make}</h3>
                  </Link>
                  <h4>
                    <span>Make: </span> {item.make}
                  </h4>
                  <h4>
                    <span>Description:</span> {item.description}
                  </h4>

                  <h4>
                    <span>Model:</span> {item.model}
                  </h4>
                  <h4>
                    <span>Daily Price:</span> ${item.price}
                  </h4>
                  <h4>
                    <span>Year:</span> {item.year}
                  </h4>
                  <img src={item.photo} alt={item.model}></img>
                  <a
                    href={`mailto: ${owner.email}`}
                    onClick={() => {
                      get_user(item.user_id);
                    }}
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </li>
            <div>
              <Link to={`/onebike/${item.id}`} className='rent-link'>
                Rent
              </Link>
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default AllBikes;
