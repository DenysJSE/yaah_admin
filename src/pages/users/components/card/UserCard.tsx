import './UserCard.css';

interface IUserData {
  id: number;
  nickname: string;
  email: string;
  roleValue: {
    id: number
    value: string
    description: string
  }[];
}

function UserCard({ id, nickname, email, roleValue }: IUserData) {
  return (
    <div className='user-card'>
      <div className='user-card-content'>
        <div className='user-card-info'>
            <p className='user-card-id'>ID: {id}</p>
            <p className='user-card-nickname'>Nickname: {nickname}</p>
          <p className='user-card-email'>Email: {email}</p>
          <div className='user-card-role-value'>
            Roles:
            {roleValue.map(role => (
              <p key={role.id}>
                {role.value}
              </p>
            ))}
          </div>
        </div>
        <div className='user-card-buttons'>
          <button className='user-card-button edit'>Edit</button>
          <button className='user-card-button delete'>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;