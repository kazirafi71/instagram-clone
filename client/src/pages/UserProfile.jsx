import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

const UserProfile = () => {
  const [data, setData] = useState([]);
  const[user,setUser]=useState([])
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  // console.log(userId);
  // console.log(state)
  useEffect(() => {
    fetch(`/profile/${userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user)
        setData(result.result);
      })
      .catch((e) => console.log(e));
  }, []);

  // console.log(user)
  return (
    <div>
      <div className="d-flex justify-content-around my-5  border-bottom py-5">
        <img alt="no photo"
          src="https://images.unsplash.com/photo-1568166460861-fcaf9bb7c1a0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          className=" "
          style={{ width: "250px", height: " 250px", borderRadius: "50%" }}
          alt="no photo"
          srcset=""
        />
        <div className="">
          
          <h2 className='text-center my-4'>{user.name ?  user.name : <div className="spinner-border text-danger text-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>}</h2>
          <h5 className='text-center my-4'>{user.email ?  user.email : <div className="spinner-border text-danger text-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>}</h5>
          
          
          <div className="d-flex justify-content-between ">
            <p className="mx-3">{data.length} Posts</p>
            <p>40 Followers</p>
            <p className="mx-3">40 Followings</p>
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="row">
          {data.length <= 0 ? (
            <h2 className="text-center">No photos posted</h2>
          ) : (
            ""
          )}
          {data.map((val) => {
            // console.log(val)

            return (
              <div className="col-sm-4 ">
                <img className="img-fluid" src={val.photo} alt="No photo" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
