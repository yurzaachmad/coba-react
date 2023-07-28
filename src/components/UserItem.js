export default function UserItem({ no, student }) {
  return (
    <tr>
      <td>{no}</td>
      <td>{student.email}</td>
      <td></td>
    </tr>
  );
}
