import React, { useContext, useEffect,useState } from "react";
import { UserContext } from "../App";

const Profile = () => {
  const [data, setData] = useState([]);
  const {state,dispatch}=useContext(UserContext)
  console.log(state)
  useEffect(()=>{
    fetch("/post/my-posts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.posts)
        setData(result.posts);
      })
      .catch((e) => console.log(e));
  },[])

  return (
    <div>
     
   
      <div className="d-flex justify-content-around my-5  border-bottom py-5">

        
        
        <img
        src={data.length>0 ?( data[0].photo) : <div className="spinner-border text-danger text-center" role="status">
        <span className="sr-only">Loading...</span>
      </div>}
          className=" " style={{width:'250px', height:" 250px",borderRadius:"50%"}}
          alt="no photo"
          srcset=""
        />
        <div className="">
          <h2 className="text-center"> {state ? state.name : <div class="spinner-border text-danger text-center" role="status">
                <span class="sr-only">Loading...</span>
              </div>} </h2>
          <div className="d-flex justify-content-between ">
            <p className="mx-3">{data.length} Posts</p>
            <p>40 Followers</p>
            <p className="mx-3">40 Followings</p>
          </div>
        </div>
      </div>
      <div className="container my-4">
          <div className="row">
            {data.length<=0 ? <h2 className="text-center">No photos posted</h2>:'' }
            {data.map(val=>{
              
              return(<div className="col-sm-4 ">
              <img className='img-fluid' src={val.photo} alt="No photo"/>
              </div>)
            })}
            
              
              
          </div>
      </div>
    </div>
  );
};

export default Profile;
