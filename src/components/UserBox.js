import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import { useEffect } from "react";

export default function UserBox({
  data,
  removeStudent,
  resendStudent,
  updateStudent,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!(user && user.token)) {
      navigate("login");
    }
  }, [navigate]);

  return (
    <div className="card">
      <div className="card-header">
        <h1>Daftar Siswa</h1>
      </div>
      <div className="card-body">
        <UserList
          students={data}
          remove={removeStudent}
          resend={resendStudent}
          update={updateStudent}
        />
      </div>

      <div className="card-footer"></div>
    </div>
  );
}
