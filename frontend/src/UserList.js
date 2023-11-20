import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./graphql/queries";

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>
        <h2>Users List</h2>
        <ul>
          {data.users.map((user) => (
            <li key={user?.id}>{user?.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UsersList;
