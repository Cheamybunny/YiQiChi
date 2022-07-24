const firebase = require("@firebase/testing");

const MY_PROJECT_ID = "yiqichi-b784d";
describe("unAuthenticated Users", () => {
    it("Cannot write to a user document with the same user ID", async () => {
      const db = firebase
        .initializeTestApp({ projectId: MY_PROJECT_ID })
        .firestore();
      const testDoc = db.collection("users").doc("user_abc");
      await firebase.assertFails(testDoc.set({ foo: "bar" }));
    });
  
    it("Can't write to a user document with a different user ID", async () => {
      const db = firebase
        .initializeTestApp({ projectId: MY_PROJECT_ID })
        .firestore();
      const testDoc = db.collection("users").doc("user_xyz");
      await firebase.assertFails(testDoc.set({ foo: "bar" }));
    });
  
    it("Cannot view other users posts", async () => {
      const db = firebase
        .initializeTestApp({ projectId: MY_PROJECT_ID })
        .firestore();
      const testDoc = db.collection("posts").doc("testDoc");
      await firebase.assertFails(testDoc.get());
    });
    
    it("Cannot create a new post", async() => {
        const db = firebase
            .initializeTestApp({ projectId: MY_PROJECT_ID})
            .firestore();
        const testDoc = db.collection("posts").doc("testDoc")
        await firebase.assertFails(testDoc.set( {foo: "bar"}))
    })
   
    it("Cannot update items in the posts collection", async () => {
        const db = firebase
          .initializeTestApp({ projectId: MY_PROJECT_ID })
          .firestore();
        const testDoc = db.collection("posts").doc("testDoc");
        await firebase.assertFails(testDoc.update({ foo: "bar" }));
      });

  });
describe("Authenticated Users", () => {
    it("Can write to a user document with the same user ID", async () => {
      const myAuth = { uid: "user_abc" };
      const db = firebase
        .initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth })
        .firestore();
      const testDoc = db.collection("users").doc("user_abc");
      await firebase.assertSucceeds(testDoc.set({ foo: "bar" }));
    });
  
    it("Can't write to a user document with a different user ID", async () => {
      const myAuth = { uid: "user_abc" };
      const db = firebase
        .initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth })
        .firestore();
      const testDoc = db.collection("users").doc("user_xyz");
      await firebase.assertFails(testDoc.set({ foo: "bar" }));
    });
  
    it("Can view other users posts", async () => {
      const myAuth = { uid: "user_abc" };
      const db = firebase
        .initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth })
        .firestore();
      const testDoc = db.collection("posts").doc("testDoc");
      await firebase.assertSucceeds(testDoc.get());
    });
    
    it("Can create a new post", async() => {
        const myAuth = { uid: "user_abc"};
        const db = firebase
            .initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth})
            .firestore();
        const testDoc = db.collection("posts").doc("testDoc")
        await firebase.assertSucceeds(testDoc.set( {foo: "bar"}))
    })
   
    it("Can update items in the posts collection", async () => {
        const myAuth = { uid: "user_abc" };
        const db = firebase
          .initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth })
          .firestore();
        const testDoc = db.collection("posts").doc("testDoc");
        await firebase.assertSucceeds(testDoc.update({ foo: "bar" }));
      });

  });