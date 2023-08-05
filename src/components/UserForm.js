import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserForm({ add }) {
  const [student, setStudent] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    add(student.email, student.password);
    setStudent({ email: "", password: "" });
    navigate("/");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!(user && user.token)) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <form className="row g-3" onSubmit={submit}>
      <div className="col-md-10">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={student.email}
          onChange={(event) =>
            setStudent({ ...student, email: event.target.value })
          }
        />
      </div>
      <div className="col-md-10">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={student.password}
          onChange={(event) =>
            setStudent({ ...student, password: event.target.value })
          }
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Tambahkan
      </button>
    </form>
  );
}
