"use client";
import { Invite } from "@/types/types";
import React, { useState } from "react";
import Image from "next/image";
import uuid4 from "uuid4";
import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

function GuestTable({
  timeTable,
}: {
  timeTable: { time: string; event: string; location: string }[];
}) {
  const [imena, setImena] = useState("");
  const [poruka, setPoruka] = useState("");
  const [smjestaj, setSmjestaj] = useState(false);
  const [response, setResponse] = useState(false);

  const sendResponseToFirebase = () => {
    if (imena === "") {
      alert("Molimo unesite imena gostiju");
      return;
    }
    const newInvite: Invite = {
      id: uuid4(),
      guests: imena,
      responded: true,
      poruka: poruka,
      smjestaj: smjestaj,
      date: `${new Date().toISOString()} ${new Date().toLocaleTimeString()}`,
    };
    console.log(newInvite);
    //send to firebase
    const inviteRef = doc(db, "invites", newInvite.id);
    setDoc(inviteRef, newInvite)
      .then(() => {
        console.log("Invite saved successfully!");
        setResponse(true);
      })
      .catch((error) => {
        console.error("Error saving invite: ", error);
      });
  };

  return (
    <div className="w-100 flex flex-col justify-center items-start gap-6 mt-8">
      {timeTable.map((time, index) => (
        <div
          className="flex m-auto"
          key={time.event}
          style={{ width: "22rem" }}
        >
          <p
            style={{
              fontWeight: "600",
              letterSpacing: "2px",
              fontSize: "1.07em",
            }}
            className="mr-6 flex-2"
          >
            {time.time}
          </p>
          <div className="flex flex-col flex-1">
            <p
              style={{
                fontWeight: "600",
                letterSpacing: "2px",
                marginBottom: "0.26em",
                fontSize: "1.07em",
              }}
            >
              {time.event}
            </p>
            <p
              style={{
                fontWeight: "300",
                letterSpacing: "2px",
                fontSize: "12px",
              }}
            >
              {time.location}
            </p>
          </div>
        </div>
      ))}

      <div>
        <Image
          src="/images/flower_one.png"
          alt="hero"
          width={600}
          height={600}
        />
      </div>
      <div
        className="w-full flex flex-col  justify-center items-center mb-0"
        style={{ marginTop: "-150px" }}
      >
        {response ? (
          <p
            className="font-sans"
            style={{
              color: "#333",
              fontWeight: "400",
              letterSpacing: "0.05em",
              fontSize: "14px",
              paddingLeft: "1em",
            }}
          >
            Hvala na odgovoru! <br />
          </p>
        ) : (
          <p
            className="font-sans"
            style={{
              color: "#333",
              fontWeight: "400",
              letterSpacing: "0.05em",
              fontSize: "14px",
              paddingLeft: "1em",
            }}
          >
            svoj dolazak, molimo, potvrdite <br />
            <span style={{ paddingLeft: "1.25em" }}>
              ovdje do 15. kolovoza 2023.
            </span>
          </p>
        )}
      </div>
      {response ? (
        <div className="flex flex-col gap-4 w-full"></div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-center mx-10 p-2 ">
            <input
              value={imena}
              onChange={(e) => setImena(e.target.value)}
              type="text"
              placeholder="Ime i prezime gostiju"
              className="w-full px-3 py-2 border rounded-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
            />
            <textarea
              value={poruka}
              onChange={(e) => setPoruka(e.target.value)}
              placeholder="Poruka po želji"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-row items-center  mx-20 p-2 shadow-slate-400">
            <p className="flex-1">Smještaj</p>
            <div className="flex-2 flex flex-row h-10 gap-2">
              <button
                className={`px-3 py-2 border border-gray-300 rounded-md ${
                  smjestaj && "outline-none border-indigo-500"
                }`}
                onClick={() => setSmjestaj(true)}
              >
                Da
              </button>
              <button
                className={`px-3 py-2 border border-gray-300 rounded-md ${
                  !smjestaj && "outline-none border-indigo-500"
                }`}
                onClick={() => setSmjestaj(false)}
              >
                Ne
              </button>
            </div>
          </div>
          <button
            className="px-8 py-2 border border-gray-300 rounded-md m-auto focus:outline-none focus:border-#dab6ba backg"
            style={{ backgroundColor: "#f0dde0", borderColor: "#bb979b" }}
            onClick={sendResponseToFirebase}
          >
            Potvrdi odgovor
          </button>
        </div>
      )}
      <div className="flex flex-col m-auto items-center ">
        <h2
          className="font-sans mt-16"
          style={{
            fontWeight: "bold",
            letterSpacing: "3px",
          }}
        >
          KONTAKT
        </h2>
        <div className="flex items-center mt-4">
          <div className="flex flex-col items-center mr-4">
            <p style={{ fontWeight: "500", fontSize: "15px" }}>FILIPA ČAGALJ</p>
            <p style={{ fontSize: "13px" }}>095 822 1955</p>
          </div>
          <hr className="border border-black-300 h-px flex-grow" />
          <div className="flex flex-col items-center ml-4">
            <p style={{ fontWeight: "500", fontSize: "15px" }}>NIKOLA MATIĆ</p>
            <p style={{ fontSize: "13px" }}> 098 6422 35</p>
          </div>
        </div>
      </div>
      <h1 className="font-vibes m-auto" style={{ fontSize: "40px" }}>
        Veselimo se vašem dolasku!
      </h1>
    </div>
  );
}

export default GuestTable;
