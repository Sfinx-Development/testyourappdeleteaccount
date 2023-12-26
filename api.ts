import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./config";

export const signInWithAPI = async (createUser: UserCreate) => {
  console.log("create use: ", createUser);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    createUser.email,
    createUser.password
  );
  console.log(userCredential);
  return {
    uid: userCredential.user.uid,
    email: createUser.email,
  } as User;
};

export const deleteUserFromDB = async (userId: string) => {
  const account = await getAccountByUid(userId);

  if (account) {
    //radera alla testertoapps som denna testern är i
    const testerToAppQuery = query(
      collection(db, "testerToApps"),
      where("accountId", "==", account.id)
    );
    const testerToAppSnapshot = await getDocs(testerToAppQuery);

    testerToAppSnapshot.forEach(async (testerToAppDoc) => {
      await deleteDoc(testerToAppDoc.ref);
    });

    //radera alla appar som den har
    const appQuery = query(
      collection(db, "apps"),
      where("accountId", "==", account.id)
    );
    const appSnapshot = await getDocs(appQuery);
    appSnapshot.forEach(async (appDoc) => {
      await deleteDoc(appDoc.ref);
    });

    //radera accountet som den har
    const accountDocRef = doc(db, "accounts", account.id);
    await deleteDoc(accountDocRef);

    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);
  }
  return true;
};

export const getAccountByUid = async (uid: string) => {
  console.log("UID: ", uid);
  const accountCollectionRef = collection(db, "accounts");
  console.log("coll: ", accountCollectionRef);

  const q = query(accountCollectionRef, where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  const accountData = querySnapshot.docs[0].data() as Account;

  console.log("konto som returneras av uid: ", accountData);
  if (accountData) {
    return accountData;
  }
  return null;
};

export interface User {
  uid: string;
  email: string | null;
}

export interface Account {
  id: string;
  username: string;
  playStoreMail: string | null;
  appStoreMail: string | null;
  uid: string;
}

export interface App {
  id: string;
  name: string;
  linkToTest: string;
  description: string;
  imageUrl: string;
  operatingSystem: string;
  accountId: string;
  testersMin: number;
  testersRegistered: number;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface TesterToApp {
  id: string;
  accountId: string;
  appId: string;
  confirmed: boolean;
}
