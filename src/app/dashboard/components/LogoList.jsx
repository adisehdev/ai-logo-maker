"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/configs/FirebaseConfig";
import { useContext } from "react";
import { UserContext } from "@/app/_context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LogoList = () => {
  const { userInfo } = useContext(UserContext);
  const [logos, setLogos] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState(null); // For modal
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    userInfo?.email && getUserLogos();
  }, [userInfo]);

  const getUserLogos = async () => {
    setLoading(true)
    const querySnapshot = await getDocs(
      collection(db, "users", userInfo?.email, "logos")
    );
    querySnapshot.forEach((doc) => {
      
      setLogos((prev) => [...prev, doc.data()]);
    });
    setLoading(false)
  };

  const openModal = (logo) => {
    setSelectedLogo(logo);
  };

  const closeModal = () => {
    setSelectedLogo(null);
  };


  if(loading){
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                  {[1, 2, 3, 4, 5, 6].map((_, index) => <div key={index} className="bg-slate-100 animate-pulse rounded-xl width-full h-[200px]"></div>)}

      </div>

    )
  }


  if(logos.length === 0){
    return (
      <div className="flex flex-col items-center min-h-screenmt-10">
        <h2 className="text-2xl font-bold text-center">No logos found, Create New Logos</h2>
        <Link href="/create">
        
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {logos.length > 0 ? (
          logos.map(
            (logo, index) =>
              logo.image && (
                <div
                  key={index}
                  className="hover:scale-105 transition-all cursor-pointer"
                  onClick={() => openModal(logo)}
                >
                  <Image
                    src={logo.image}
                    alt={logo.title}
                    width={300}
                    height={200}
                    className="w-full rounded-xl"
                  />
                  <h2 className="text-lg text-center font-bold mt-2">
                    {logo.title}
                  </h2>
                  <p className="text-gray-500 text-center">{logo.description}</p>
                </div>
              )
          )
        ) : (
          [1, 2, 3, 4, 5, 6].map((_, index) => <div key={index} className="bg-slate-100 animate-pulse rounded-xl width-full h-[200px]"></div>)
        )}
      </div>

      {/* Modal */}
      {selectedLogo && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    onClick={closeModal}
  >
    <div
      className="bg-white p-3 rounded-lg shadow-lg relative max-w-sm w-full mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={selectedLogo.image}
        alt={selectedLogo.title}
        width={500}
        height={350}
        className="w-full rounded-md"
      />
      <div className="text-center mt-3">
        <h2 className="text-lg font-medium text-gray-800">
          {selectedLogo.title}
        </h2>
        {selectedLogo.description && (
          <p className="text-sm text-gray-600 mt-1">
            {selectedLogo.description}
          </p>
        )}
      </div>
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full"
      >
        ✕
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default LogoList;
