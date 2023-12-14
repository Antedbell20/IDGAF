// UserList.js
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS, ADD_FRIEND } from '../../utils/queries';
import styles from './UserList.module.css';
import Chat from '../box/chat'; // Import your Chat component

function UserList() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [selectedUser, setSelectedUser] = useState(null);

  const [addFriend] = useMutation(ADD_FRIEND, {
    onCompleted: () => {
      alert(`Added ${selectedUser.username} as a friend!`);
      setSelectedUser(null);
    },
    onError: (error) => {
      console.error('Error adding friend:', error);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleAddFriend = () => {
    if (selectedUser) {
      addFriend({ variables: { username: selectedUser.username } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.addFriendSection}>
        <button onClick={handleAddFriend} disabled={!selectedUser}>
          Add Friend
        </button>
      </div>
      <div className={styles.usersSection}>
        <div className={styles.userListContainer}>
          <h2 className={styles.userListTitle}>All Users:</h2>
          <ul className={styles.userList}>
            {data.getAllUsersExceptMe.map((user) => (
              <li
                key={user.id}
                className={`${styles.userListItem} ${selectedUser && selectedUser.id === user.id ? styles.selectedUser : ''}`}
                onClick={() => handleUserSelect(user)} // Handle user selection
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.chatSection}>
        {/* Display the chat with the selected friend */}
        {selectedUser && <Chat selectedUser={selectedUser} />}
      </div>
    </div>
  );
}

export default UserList;
