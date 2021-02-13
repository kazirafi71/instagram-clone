import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { UserContext } from "../App";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: 40,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const Home = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  // console.log(state)

  useEffect(() => {
    fetch("/post/all-posts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.posts);
        var res = Array.prototype.reverse.apply(result.posts);
        setData(result.posts);
      })
      .catch((e) => console.log(e));
  }, []);

  const like = (id) => {
    // console.log(id)
    fetch("/post/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        let newData = data.map((item) => {
          if (item._id == result.result._id) {
            // console.log("hello");
            return result.result;
          } else {
            // console.log("ho");
            return item;
          }
        });
        // console.log(newData);
        setData(newData);
      })
      .catch((e) => console.log(e));
  };
  const unlike = (id) => {
    fetch("/post/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        let newData = data.map((item) => {
          if (item._id == result.result._id) {
            // console.log("hello");
            return result.result;
          } else {
            // console.log("hi");
            return item;
          }
        });
        // console.log(newData);
        setData(newData);
      })

      .catch((e) => console.log(e));
  };

  const makeComment = (text, id) => {
    fetch("/post/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        let newData = data.map((item) => {
          if (item._id == result.result._id) {
            // console.log("hello");
            return result.result;
          } else {
            // console.log("hi");
            return item;
          }
        });
        // console.log(newData);
        setData(newData);
      })

      .catch((e) => console.log(e));
  };

  const delete_post = (postId) => {
    fetch(`/post/delete/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.post._id);

        const newData = data.filter((item) => {
          // console.log(item)
          return item._id !== result.post._id;
        });
        // console.log(newData)
        setData(newData);
      })

      .catch((e) => console.log(e));
  };

  const delete_comment = (postId) => {
    console.log(postId);
    fetch(`/post/comment/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        // const newData = data.filter((item) => {
        //   // console.log(item)
        //   return item._id !== result.post._id;
        // });
        // console.log(newData)
        // setData(newData);
      })

      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div className="container ">
        <div className="row">
          {data.map((val) => {
            // console.log(val)
            return (
              <div key={val._id} className="col-md-8 mx-auto ">
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {val.postedBy.name[0].toUpperCase()}
                        {/* {console.log((val.postedBy.name[0]).toUpperCase())} */}
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          delete_post(val._id);
                        }}
                      >
                        {val.postedBy._id === state._id && <DeleteIcon />}
                      </IconButton>
                    }
                    
                    title= {<Link className="text-primary" style={{fontSize:"20px", textDecoration:"none"}} to={val.postedBy._id === state._id ? '/profile' : '/profile/'+ val.postedBy._id }>{val.postedBy.name}</Link>}
                    
                    subheader={val.createdAt}
                  />
                  {console.log(val.postedBy._id)}

                  <CardMedia
                    className={classes.media}
                    image={val.photo}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {val.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {val.body}
                    </Typography>
                  </CardContent>
                  <p className="ml-3">{val.likes.length} Likes</p>
                  <CardActions disableSpacing>
                    {/* {console.log(val.likes.includes(state._id))} */}
                    {val.likes.includes(state._id) ? (
                      <div>
                        <FavoriteIcon color="error" fontSize="large" />
                        <IconButton
                          aria-label="thumsdown"
                          onClick={() => {
                            unlike(val._id);
                          }}
                        >
                          <ThumbDownIcon fontSize="large" />
                        </IconButton>
                      </div>
                    ) : (
                      <div>
                        <FavoriteBorderIcon fontSize="large" />
                        <IconButton
                          aria-label="thums"
                          onClick={() => {
                            like(val._id);
                          }}
                        >
                          <ThumbUpAltIcon fontSize="large" />
                        </IconButton>
                      </div>
                    )}
                    <br />
                  </CardActions>

                  {val.comments.map((com) => {
                    // console.log(com._id);
                    return (
                      <div className="d-flex " key={com._id}>
                        <h5 className="bold bg-primary">
                          {com.postedBy.name} :{" "}
                        </h5>
                        <p className="bg-danger"> {com.text}</p>

                        {val.postedBy._id === state._id && (
                          <DeleteIcon
                            onClick={() => {
                              delete_comment(com._id);
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                  <form
                    action=""
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, val._id);
                    }}
                  >
                    <input
                      placeholder="add your comment"
                      className="form-control"
                      type="text"
                      name=""
                      id=""
                    />
                  </form>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
