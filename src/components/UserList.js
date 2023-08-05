import UserItem from "./UserItem";

export default function UserList({ students, remove, resend, update }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>No.</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <UserItem
            key={student._id}
            student={student}
            no={index + 1}
            remove={() => remove(student._id)}
            resend={() => resend(student)}
            update={update}
          />
        ))}
      </tbody>
    </table>
  );
}
