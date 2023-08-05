import { useState } from "react";

export default function UserItem({ no, student, remove, resend, update }) {
  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState(student.email);
  return (
    <tr>
      <td>{no}</td>
      <td>
        {isEdit ? (
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        ) : (
          student.email
        )}
      </td>

      {student.sent ? (
        isEdit ? (
          <td>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                update(student._id, email);
                setIsEdit(false);
              }}
            >
              save
            </button>
            <button
              className="btn btn-warning"
              type="button"
              onClick={() => {
                setIsEdit(false);
                setEmail(student.email);
              }}
            >
              cancel
            </button>
          </td>
        ) : (
          <td>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => setIsEdit(true)}
            >
              edit
            </button>
            <button className="btn btn-danger" type="button" onClick={remove}>
              delete
            </button>
          </td>
        )
      ) : (
        <td>
          <button className="btn btn-warning" type="button" onClick={resend}>
            resend
          </button>
        </td>
      )}
    </tr>
  );
}
