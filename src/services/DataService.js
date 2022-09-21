import { getAuth } from "firebase/auth";
import { database } from "../firebase";
import { auth } from "../firebase";

let dbRef = database.ref("Users");
var admin = false;
auth.onAuthStateChanged((user) => {
  if (user) {
    const userId = getAuth().currentUser.uid;
    dbRef = database.ref("Users/" + userId + "/History");
    const checkUser = database.ref("Users/" + userId + "/User Information");

    checkUser
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.key == "Admin") {
              if (childSnapshot.val() == true) {
                dbRef = database.ref("Users");
                admin = true;
              } else {
                dbRef = database.ref("Users/" + userId + "/History");
                admin = false;
              }
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

class DataService {
  isAdmin() {
    return admin;
  }

  getAll() {
    return dbRef;
  }

  create(history) {
    return dbRef.push(history);
  }

  update(userID, key, value) {
    if (userID == "0") {
      return dbRef.child(key).update(value);
    } else {
      return dbRef.child(userID).child("History").child(key).update(value);
    }
  }

  delete(userID, key) {
    return dbRef.child(userID).child("History").child(key).remove();
  }

  deleteAll() {
    return dbRef.remove();
  }
}

export default new DataService();
