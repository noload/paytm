import React, { useEffect, useState } from "react";
import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { Users } from "./Users";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("userId");
  const [user, setUser] = useState({});
  async function getData(userId) {
    const resonse = await axios
      .get(`http://localhost:3000/api/v1/account/balance/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser(response.data.user);
      });
  }
  useEffect(() => {
    getData(id);
    return () => {
      null;
    };
  }, [user]);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={user.balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
