import UserItem from "./UserItem";

export default function UserList({ students }) {
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
          <UserItem key={index} student={student} no={index + 1} />
        ))}
      </tbody>
    </table>
  );
}
