import User from "../models/User.js";
import {
    initializeApp
} from "firebase/app";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable
} from "firebase/storage";
import {
    v4
} from "uuid";

initializeApp({
    "type": "service_account",
    "project_id": "cadastrodeclientes-xmstdf",
    "private_key_id": "462febedd4b29c95a2f0cfb5ad0bbfc3e6136abf",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNDjdrr5FkXxmk\nnhp2fzQxX4K1PW4jhP6Ld/EE8jeJHa2/2Zgry4KWcC78lZ5GOuR6MSgZQLWj0kKF\ng6aH1e/wbeIASALSaNWMeEFPED6ygSjC2oz2I8X1rk4t/qEvbK/zEHbUTC5L3Dzi\nPmPLhsw4DrGhrRHhDW6OQLJACrI53JhFJECaTlDcCW4am+FRZ9b+OHaaqKopkYUi\nMRoAvNHpzfDcuDyTIdrlCGynTZZ1y+Yo+6da2FCC98CDXttlSSpyu7OX1oKwDzw9\ncYuopNM63MlwDlJK50UUPeeqGWU0ciJDyBEy9bixLRzLbtwoAzAHlvz3otAOZTRb\nEmx/+Ba/AgMBAAECggEADvb7eXA/L/A20Ao6doJoXeARYHENbCnaZSBJkSms1DoR\nF5VljcX/j5i7/R1dhyo+Hrgeq9/Klxw9qZPG4AFEzlWemZRSdxDv4MgCmtFd2gDO\nEjuz74oDJPUQaeU8Ky4HQI8SNQJ4RdCwCszbKJvQ+e2smKwnnWExu8+h5/A/5d6q\nKaM+rAD78+HFdWlyjBRW/P+5hvHNMXoWznrI50xeWKI+1fDQZMyxDO/4ZYHwRGgL\nwnTPx8qExeo8K9xRZGs8YnDtd9AlLd4opMRZbJRC5Trv80gD+V4omDDOwBvihQsC\nO+S0UHPG6F/MPH2HV6f8ZA9Q8g9xCdoDFkR4cYBg3QKBgQDyT3Ajef3Tuq5bAQA8\ne9RiseBZHlq2LBO89dLfsQHSY9wnnpsXDichLHy2dieNWwxXZwN9NSYkByAbyUOj\nzCGthL995qIZwCE6EGVx9UEQsC/xbt2eB8w26V2Z5Rft1TvIOODY8on6YS2OlHe7\nIPMlGwYjkBXpGvYMWKJ/V6mh9QKBgQDYo/VYCOXcYoBRi3E8k1YTWw1W9kvt+wOa\n/F6L19IIZjecXG/Ax59AMecxw5VTWgP/fVjKeaR6FtvJebwEzvUmSlNRNXnnPvxM\niy4K7oZNdzXEre8vYl2vz7hHgvnHUu1Gjk9OK6qNpDenCObrgsI3FF5EnwajkL2i\nwzQcMHqBYwKBgQDdYjC9aQa8vJHyOV7i4+wu4/9qzO3qBSlfemVY1NsqQuxxElr2\nXIrpp0CmYBtQ7f+/lzG74qRfRFdUq7Tt4WJfq6pdOCugRUbWSwa0cHQq8B5NgpJe\ngRdWkC5hncsYE7sT+suLy0S/CqxZ2VHvGXKs0xzvvwQVvvlQXGbS29/zRQKBgHRa\nw0gQJ1zRrredXCk7vOxSZ/y/9hIQUmRojWMwfEc0l0OsxfzVemvhIZoxwL7uxtzu\n9sRwxu0n3837SweOHE7/dnZUcW/I/Xsi+Yy3hXyPvVowTRm3DDiEKSaHax4qJPRT\nNLb4bvb6L0XQWy48oZExqFvUyZ0J/UAw9Yj6ZKGfAoGANPwjGUQbFzZBvF9st5dW\nEIsK/ohLCHepFSgm5BKX1upPhaehuwODb0kfJjIiLExLEKS6pEpRJI00x7IwlFMi\nCcElEogARZU3gehTLq4lGo08d4+ukj6u6nvq6/53VXfFHcie3RVGG0KwTXvlHEw8\n+Q8dEDnOu/fco6g/PXHI1Ts=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-3tqj2@cadastrodeclientes-xmstdf.iam.gserviceaccount.com",
    "client_id": "110899498780750109698",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3tqj2%40cadastrodeclientes-xmstdf.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com",
    "storageBucket": "gs://cadastrodeclientes-xmstdf.appspot.com"

});

const storage = getStorage();








export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export const createUser = async (req, res) => {
    const {
        name
    } = req.body
    const dateTime = v4()

    const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);



    try {
        const user = {
            name,
            urlImage: downloadURL
        }
        await User.create(user)

        return res.status(201).json({
            user,
            message: "USUARIO criado com suscesso"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                message: "usuario nao encontrado"
            })
        }
        await User.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Usuário deletado com sucesso!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}