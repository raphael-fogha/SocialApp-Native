import firebase from "firebase"
import '@firebase/firestore';

export function addPost ({text, localUri}){


    const remoteUri = uploadPhoto(localUri)
    const uid = firebase.auth().currentUser.uid;

    // console.log(remoteUri);
        firebase.firestore()
        .collection("posts")
        .add({
            text: text,
            uid: uid,
            timestamp: Date.now(),
            image: remoteUri
        })
        .then(() => {
            console.log(`Success!`)
        })
        .catch((err) => console.log(err.message))


}




export function uploadPhoto(uri){
    const uid = firebase.auth().currentUser.uid;
    const path = `photos/${uid}/${Date.now()}.jpg`;

    fetch(uri)
        .then((res) => {
            const file = res.blob();
            return file;
        })
        .then((file) => {
            let upload = firebase
                            .storage()
                            .ref(path)
                            .put(file);
            upload.on(
                "state_changed",
                snapshot => { 
                    console.log(`Snapshot : ${snapshot.state}`)
                },
                err => {
                    // unsubscribe()
                    console.log(`Upload failed : ${err.message}`)
                }, () => {
                    upload.snapshot.ref.getDownloadURL()
                        .then((downloadURL) =>  {
                            console.log(downloadURL);
                            console.log(`File : ${downloadURL}`);
                            return downloadURL;

                        } )
                }

            )
        })
}

export function addPost2({text, localUri}){
    const uid = firebase.auth().currentUser.uid;
    const path = `photos/${uid}/${Date.now()}.jpg`;

    fetch(localUri)
        .then((res) => {
            const file = res.blob();
            return file;
        })
        .then((file) => {
            let upload = firebase
                            .storage()
                            .ref(path)
                            .put(file);
            upload.on(
                "state_changed",
                snapshot => { 
                    console.log(`Snapshot : ${snapshot.state}`)
                },
                err => {
                    // unsubscribe()
                    console.log(`Upload failed : ${err.message}`)
                }, () => {
                    upload.snapshot.ref.getDownloadURL()
                        .then((downloadURL) =>  {
                            firebase.firestore()
                                    .collection("posts")
                                    .add({
                                        text: text,
                                        uid: uid,
                                        timestamp: Date.now(),
                                        image: downloadURL
                                    })
                                    .then(() => {
                                        console.log(`Success!`)
                                    })
                                    .catch((err) => console.log(err.message))

                        } )
                }

            )
        })

}
