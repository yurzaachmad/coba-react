import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import UserBox from "./components/UserBox";
import UserForm from "./components/UserForm";

function Layout() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Apps
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="add">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location = "/";
                  }}
                >
                  LogOut
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="login">
                  {user ? user.email : "guest"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <Outlet />
    </div>
  );
}

function NotFound() {
  return <h1>Halaman tidak ditemukan</h1>;
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
      .then((response) => {
        if (response.data.success)
          setData(response.data.data.map((item) => ({ ...item, sent: true })));
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  const addStudent = (email, password) => {
    const _id = Date.now().toString();
    setData([{ _id, email, password, sent: true }, ...data]);
    axios
      .post(
        "http://localhost:3001/users",
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.token
            }`,
          },
        }
      )
      .then((response) => {
        setData((currentData) =>
          currentData.map((item) => {
            if (item._id === _id) item._id = response.data.data._id;
            return item;
          })
        );
      })
      .catch(() => {
        setData((currentData) =>
          currentData.map((item) => {
            if (item._id === _id) item.sent = false;
            return item;
          })
        );
      });
  };

  const removeStudent = (id) => {
    axios
      .delete(`http://localhost:3001/users/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
      .then((response) => {
        setData(data.filter((item) => item._id !== id));
      })
      .catch(() => {
        alert("hapus gagal");
      });
  };

  const resendStudent = ({ _id, email, password }) => {
    axios
      .post(
        "http://localhost:3001/users",
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.token
            }`,
          },
        }
      )
      .then((response) => {
        setData((currentData) =>
          currentData.map((item) => {
            if (item._id === _id) {
              item._id = response.data.data._id;
              item.sent = true;
            }
            return item;
          })
        );
      })
      .catch(() => {});
  };

  const updateStudent = (_id, email) => {
    axios
      .put(
        `http://localhost:3001/users/${_id}`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.token
            }`,
          },
        }
      )
      .then((response) => {
        setData((currentData) =>
          currentData.map((item) => {
            if (item._id === _id) item.email = response.data.data.email;
            return item;
          })
        );
      })
      .catch(() => {
        alert("update gagal");
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <UserBox
                data={data}
                removeStudent={removeStudent}
                resendStudent={resendStudent}
                updateStudent={updateStudent}
              />
            }
          />
          <Route path="add" element={<UserForm add={addStudent} />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
