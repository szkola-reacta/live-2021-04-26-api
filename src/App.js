import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  theme,
} from '@chakra-ui/react';
import useSWR from 'swr'

import { fetcher } from './services/users';

function App() {
  const { data: users, error, mutate } = useSWR('https://randomuser.me/api/?results=10', fetcher);

  if (error) return <div>failed to load</div>
  if (!users) return <div>loading...</div>

  return (
    <ChakraProvider theme={theme}>
      <Text fontSize="3xl">Users</Text>
      <Button onClick={mutate}>Refresh</Button>
      {users && users.results.map(user => (
          <Box key={`u-${user.login.uuid}`}>
            <Text fontSize="2xl">{user.name.first} {user.name.last}</Text>
          </Box>
      ))}
    </ChakraProvider>
  );
}

export default App;


// import React from 'react';
// import { useState, useEffect } from 'react';
// import {
//   ChakraProvider,
//   Box,
//   Text,
//   Button,
//   theme,
// } from '@chakra-ui/react';

// import { fetchUsers } from './services/users';

// function App() {
//   const [users, setUsers] = useState([]);

//   const fetchData = async () => {
//     try {
//       const users = await fetchUsers();
//       setUsers(users);
//     } catch (error) {
//       console.error(error);
//     }

//     // 1. Promises
//     // fetch('https://randomuser.me/api/?results=10')
//     // .then((response) => response.json())
//     // .then((data) => setUsers(data.results))
//     // .catch((error) => console.error(error));
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleRefresh = () => {
//     fetchData();
//   }

//   return (
//     <ChakraProvider theme={theme}>
//       <Text fontSize="3xl">Users</Text>
//       <Button onClick={handleRefresh}>Refresh</Button>
//       {users && users.map(user => (
//           <Box key={`u-${user.login.uuid}`}>
//             <Text fontSize="2xl">{user.name.first} {user.name.last}</Text>
//           </Box>
//       ))}
//     </ChakraProvider>
//   );
// }

// export default App;
