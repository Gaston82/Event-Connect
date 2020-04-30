import * as firebase from "firebase";

export const UPLOAD_STATUS = {
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  FINISHED: 'FINISHED'
}

export function uploadFile(folder, file, callback) {
  try {
    const storageRef = firebase.storage().ref();
    const fileName = `${+(new Date())}-${file.name}`;
    const uploadTask = storageRef.child(`${folder}/${fileName}`).put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      const result = {
        status: UPLOAD_STATUS.PENDING,
        error: '', 
        progress,
        url: ''
      }
      callback(result)
      
    }, (error) => {
      const result = {
        status: UPLOAD_STATUS.ERROR,
        error: 'Error subiendo archivo', 
        progress: 0,
        url: ''
      }
      callback(result)

    }, async ()  => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
      const result = {
        status: UPLOAD_STATUS.FINISHED,
        error: '', 
        progress: 100,
        url: downloadURL
      }
      callback(result)

    });

  } catch (err) {
    console.log("uploadFile -> err", err)
    
  }
}