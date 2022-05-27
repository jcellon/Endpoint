import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";

const SearchList = (props) => {
  const [userApi, setUserApi] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const { handleSubmit } = useForm();

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((data) => data.json())
      .then((json_result) => {
        setData(json_result.results);
        let userApi = renderData(json_result.results);
        setUserApi(userApi);
      });
  }, []);

  const save = (user) => {
    console.log(user);
  };

  const renderData = (data) => {
    return data.map((user, key) => {
      return (
        <form onSubmit={handleSubmit(save)}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="card" style={{ width: "20rem" }}>
              <div className="card-body">
                <div key={key}>
                  <img
                    style={{ marginLeft: "15px" }}
                    className="rounded-circle"
                    src={user.picture.large}
                    alt=""
                  />
                  <div className="card-body">
                    <input
                      style={{ marginBottom: "5px" }}
                      className="form-control"
                      placeholder={`${user.name.first}, ${user.name.last}`}
                      onChange={(e) => save(e.target.value)}
                    />
                    <input
                      style={{ marginBottom: "5px" }}
                      className="form-control"
                      placeholder={user.email}
                      onChange={(e) => save(e.target.value)}
                    />
                    <input
                      style={{ marginBottom: "5px" }}
                      className="form-control"
                      placeholder={user.phone}
                      onChange={(e) => save(e.target.value)}
                    />
                    <input
                      style={{ marginBottom: "5px" }}
                      className="form-control"
                      placeholder={`${user.location.city}, ${user.location.state}`}
                      onChange={(e) => save(e.target.value)}
                    />
                  </div>
                  <div>{/* <EditUser /> */}</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    });
  };

  // get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userApi?.slice(indexOfFirstPost, indexOfLastPost);

  // search users by user input
  const handleSearchInput = (event) => {
    const newData = renderData(
      data.filter(
        (user) =>
          user.name.first.toLowerCase().includes(event.target.value) ||
          user.name.first.toUpperCase().includes(event.target.value) ||
          user.name.last.toLowerCase().includes(event.target.value) ||
          user.name.last.toUpperCase().includes(event.target.value)
      )
    );
    setUserApi(newData);
  };

  return (
    <div>
      <Search onChange={handleSearchInput} />
      {currentPosts}
    </div>
  );
};

const Search = ({ onChange }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "20rem" }}>
        <div className="card-body">
          <div className="search">
            <input
              type="text"
              autoFocus={true}
              className="form-control"
              placeholder="search users"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: "5rem" }}></div>
    </div>
  );
};

export default SearchList;
