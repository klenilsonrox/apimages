import admin from "firebase-admin"
import {
    v4
} from "uuid";

import {config} from "dotenv"

config()

// import serviceAccount from "../config/firebase-key.json"

const BUCKET = "usersimages.appspot.com"

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "usersimages",
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": "firebase-adminsdk-p1323@usersimages.iam.gserviceaccount.com",
        "client_id": "112937445029714974686",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p1323%40usersimages.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    }),
    storageBucket: BUCKET
});


const bucket = admin.storage().bucket()


export const uploadImage = (req, res, next) => {
    if (!req.file) return next();

    const image = req.file
    const nomeArquivo = `${v4()}${image.originalname.split(".").pop()}`

    const file = bucket.file(nomeArquivo)

    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype
        }
    })

    stream.on("error", (e) => {
        console.error(e)
    })

    stream.on('finish', async () => {
        await file.makePublic()
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`
        next()
    })

    stream.end(image.buffer)

}