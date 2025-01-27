import { NextResponse } from "next/server";
import { db } from "@/app/configs/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const POST = async (req) => {
  const { userName, userEmail } = await req.json();
  try {
    //check if user already in db
    const docRef = doc(db, "users", userEmail);
    if (docRef) {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return NextResponse.json(docSnap.data());
      }
    }

    //if user not in db add in db

    const data = {
      name: userName,
      email: userEmail,
      credits: 5,
    };
    await setDoc(doc(db, "users", userEmail), {
      ...data,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};



