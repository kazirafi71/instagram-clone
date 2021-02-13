import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (url) {
      fetch("/post/create-post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.error) {
            return setError(result.error);
          } else {
            return history.push("/");
          }
        })
        .catch((e) => console.log(e));
    }
  }, [url]);

  const SubmitHandler = (e) => {
    setLoading(true);

    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "test-1");
    data.append("cloud_name", "dsiu5wh2t");
    fetch("https://api.cloudinary.com/v1_1/dsiu5wh2t/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.url) {
          setLoading(false);
          console.log(data.url);
          setUrl(data.url);
        }
        if (!data.url) {
          setError("please provide all info");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container  ">
        <div className="row">
          <div className="col-md-6 mx-auto card p-4 my-5">
            <h2 className="text-center">Create Your Post Here</h2>
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}
            <br />
            {console.log(Loading)}
            
            <form onSubmit={SubmitHandler}>
              <div className="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Please enter your title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label for="exampleInputPassword1">Status</label>
                <textarea
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Please enter your status"
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <br />
              <input type="file" onChange={(e) => setImg(e.target.files[0])} />
              {Loading ? (
              <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : null}
              <br />
              <br />

              <button type="submit" className="btn btn-primary">
                CreatePost
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
