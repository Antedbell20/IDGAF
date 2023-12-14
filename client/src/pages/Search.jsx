// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// import { SEARCH_USERS } from '../utils/queries';
// import './Search.module.css'; // Ensure CSS file exists

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

//   const { data, loading, error } = useQuery(SEARCH_USERS, {
//     variables: { searchTerm: debouncedSearchTerm },
//     skip: !debouncedSearchTerm,
//   });

//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, 500);

//     return () => {
//       clearTimeout(timerId);
//     };
//   }, [searchTerm]);

//   const handleSearchInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className="search-container">
//       <div className="right">
//         <div className="search-input">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchInputChange}
//             placeholder="Search for users"
//           />
//         </div>
//         {loading && <p>Loading...</p>}
//         {error && <p>Error occurred: {error.message}</p>}
//         <div className="search-results">
//           {data && data.searchUsers.length > 0 ? (
//             <ul>
//               {data.searchUsers.map((user) => (
//                 <li key={user.username}>{user.username}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No users found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;
