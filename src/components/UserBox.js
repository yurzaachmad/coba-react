import UserList from "./UserList";
import UserForm from "./UserForm";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserBox() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      if (response.data.success) setData(response.data.data);
    });
  }, []);

  const addStudent = (email, password) => {
    setData([{ email, password }, ...data]);
    axios
      .post("http://localhost:3001/users", { email, password })
      .then((response) => {});
  };
  return (
    <div className="card">
      <div className="card-header">
        <h1>Daftar Siswa</h1>
      </div>
      <div className="card-body">
        <UserForm add={addStudent} />
      </div>
      <UserList students={data} />
      <div className="card-footer"></div>
    </div>
  );
}
