import React, { useEffect, useState, useMemo } from "react";
import { Typography, Container } from "@mui/material";

const getUserList = (users, role) => (
  <ul>
    {users.map((user, index) => {
      if (user.Role == role)
        return (
          <li key={index}>
            {user.FName} {user.LName}
          </li>
        );
      else return;
    })}
  </ul>
);

const Messages = () => {
  // const { messages, sendMessage } = useChat(room);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);

  const getRoleCount = () => {
    const roleCounts = {};
    debugger;
    if (users.length) {
      // Calculate counts for each role
      users.forEach((user) => {
        roleCounts[user.Role] = (roleCounts[user.Role] || 0) + 1;
      });

      return roleCounts;
    }
    return {};
  };

  const cachedRoleCount = useMemo(
    () => (users.length ? getRoleCount() : {}),
    [users]
  );

  useEffect(() => {
    debugger;
    setUsers([
      {
        FName: "John",
        LName: "Doe",
        Email: "john.doe@example.com",
        Password:
          "c15bb0033d152f63665d9b18e4f78699a92e5f2512d12593bc70326440f44d15",
        Role: "Admin",
      },
      {
        FName: "Jane",
        LName: "Smith",
        Email: "jane.smith@example.com",
        Password:
          "c340d29f4c99b714a0b6e6d3ff2cbfbdc6d87e9733bbf4d0a27c1d4db424b539",
        Role: "Student",
      },
      {
        FName: "Michael",
        LName: "Johnson",
        Email: "michael.johnson@example.com",
        Password:
          "a8dbb5a89e6b4c2da3b50715f0ad6634c81e7774f365a8253d2d358d2b6ea80c",
        Role: "Faculty",
      },
      {
        FName: "Emily",
        LName: "Williams",
        Email: "emily.williams@example.com",
        Password:
          "64c264a4a7ea9a8d836d2c22f3e0a421a0ea03c33bc9cd2c9400d4c30cf5b8d0",
        Role: "Student",
      },
      {
        FName: "David",
        LName: "Brown",
        Email: "david.brown@example.com",
        Password:
          "3a7dd1731c41b3e5109bdfc116a937d041df62d6844b4be3f2e03e0c0d139b7e",
        Role: "Student",
      },
      {
        FName: "Sarah",
        LName: "Miller",
        Email: "sarah.miller@example.com",
        Password:
          "9da53b2d557a85c7b5b2b12c206cf5f04e1e65674eebb7dcefd08bfbae2e4803",
        Role: "Student",
      },
      {
        FName: "Robert",
        LName: "Jones",
        Email: "robert.jones@example.com",
        Password:
          "db94b73ff16a5324c34c1b74c444f5e1cc89053f161d7d2e35bc005d7b312100",
        Role: "Student",
      },
      {
        FName: "Jessica",
        LName: "Davis",
        Email: "jessica.davis@example.com",
        Password:
          "fe6782efb48b110d57b0d7290f98ac8bb176a9c82c0216e4566e75c7794587f3",
        Role: "Student",
      },
      {
        FName: "William",
        LName: "Garcia",
        Email: "william.garcia@example.com",
        Password:
          "1b6e46ef6464f7b7f674f0ad1dd0c92b0f9bc67a7703a89de4336704c9e496b7",
        Role: "Student",
      },
      {
        FName: "Amanda",
        LName: "Martinez",
        Email: "amanda.martinez@example.com",
        Password:
          "2c9c6a164b1d5dd0aa615d74f1e3bdf181be9971c5723b4bbfebe77313e55e60",
        Role: "Student",
      },
      {
        FName: "Charles",
        LName: "Wilson",
        Email: "charles.wilson@example.com",
        Password:
          "9163df4f82e9edae5aa112bb77927c65cfa2873e49c4dbaf01012d1d6f23b9c6",
        Role: "Student",
      },
      {
        FName: "Jennifer",
        LName: "Anderson",
        Email: "jennifer.anderson@example.com",
        Password:
          "596e694c8508b5eab78281e9ef3f31cdef05c3cf23d1b5c7f7a75cc11f201eba",
        Role: "Student",
      },
      {
        FName: "Daniel",
        LName: "Thomas",
        Email: "daniel.thomas@example.com",
        Password:
          "d24d8a9a60a1ea79815f8e8d276c68d38d24d85c5245a44272f542a577ce8e64",
        Role: "Student",
      },
      {
        FName: "Lisa",
        LName: "Hernandez",
        Email: "lisa.hernandez@example.com",
        Password:
          "2c24e1d4ef1857329fc67a7cb0c9f756c58f9fe0b8352d0be63425f5c77c0c5c",
        Role: "Student",
      },
      {
        FName: "Mark",
        LName: "Lopez",
        Email: "mark.lopez@example.com",
        Password:
          "39ec4e6e1708e3a8a65eb3c996853265ce7698a94c27f1b4999833a76b5d5cf3",
        Role: "Student",
      },
      {
        FName: "Mary",
        LName: "Scott",
        Email: "mary.scott@example.com",
        Password:
          "e28c5d1f2d891f615248ef5f7f1636f98fb22d0efc4a222d3ef36c52e226e4c7",
        Role: "Student",
      },
      {
        FName: "James",
        LName: "Green",
        Email: "james.green@example.com",
        Password:
          "7a03d1199e722f6a2a6a189d1e53c2d6b6376432c180a207f5cc64fb6eaaed14",
        Role: "Student",
      },
      {
        FName: "Karen",
        LName: "Lewis",
        Email: "karen.lewis@example.com",
        Password:
          "f3c9d3c9c9c1e8fdd33a8ab6db02ad1b510b0b08ec4d26b2c547440eab689c47",
        Role: "Student",
      },
    ]);
  }, []);

  /* const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  }; */
  return (
    <>
      {Object.keys(cachedRoleCount).length &&
        Object.keys(cachedRoleCount).map((role, index) => {
          return (
            <div key={index}>
              <Typography variant="h6" gutterBottom>
                {role}: {cachedRoleCount[role]}
              </Typography>
              <hr />
              {getUserList(users, role)}
            </div>
          );
        })}
      {/* <Container maxWidth="md">
      </Container> */}
    </>
  );
};

export default Messages;
