import admin from "firebase-admin"
import {
    v4
} from "uuid";

// import serviceAccount from "../config/firebase-key.json"

const BUCKET = "usersimages.appspot.com"

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "usersimages",
        "private_key_id": "5157126480394d4f25e236b362c1473c06d8d93a",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDV9HrqhtZY1GFO\n0Ep3A6+4tWgAD/ehhKlRKSTd0IaseTbJkMSP76O5t1fT3+sd6/5HEHHuk+xbFSQ0\nUTY85+wErlLKru8Gsrlk5pSLRHRYoug+bQvymRm+RCNj9IUhMLHP6KKPafWHHAsK\nmLh6xSOU176ZwVZtdR6usyYb0OKBTLK8x5tfdBr059mbL/DPEZiB/Hzn+COHDV/m\nS2gIdh/qctTAUbcZvupYXJ0eQoIgqOd7XFglCHZq7uCwglLziVrNvCbhfmJ6ktH7\nWyMjOuF016nM3NPo9Bf1Tbj68TCgw2Gx/oHPlPLG0DKUM7Ptas809j+PvVR/Q6t0\nrh7lPr25AgMBAAECggEAD9grF3Mk1y84hZL8m2kKelifewxeVPfIvNnvK6i6+yAp\njoPKCrQUdoxn/1N1y0wkEzSEkMZ478XWXd7QcBznaEarRZdEMZrKtU4zcfIqgOXk\n4mVGR+ZOob3UtnJFPvqm2wlqAHTjBJPEaDnRxPBp0iaoAXrv4OtAz8SJ7fAU1hOq\nnXMVdG4WrGKnqY7OCpddNcGpncNG2r8LTaNZePkYBoJ6nfK0sOrucjQ1qXANpPkh\nhBNTXzdM/aHrqlkhTgLMfu6CQgL3KdSnblfJHs2a/Kne+63WDpZyerYQUniEiPDI\nQkgT67WkBal3Bhm1kfa6HqZ3woRNYMffdBk8WUJCAQKBgQD2rNqPyiNC5KXIUA77\n+WG6FrDXuKkNyA3JcgtXjRT+Mg0Z0rF4OQ5mYw3o2dXATKKnMPZ3M2c8omm/qLI8\nSF+Pzu5XnlcL6WPqsnGEDaFMaiAElg2IhXwfqFLWYEdE4JT84FZDVEMX/An1hMb4\nIgiu74srbKAg76cSA7R+bsNvXQKBgQDeCvvNS/xs5ClhGz6oGgsqzvEX/j32V7mA\nZ6l3E2/9K3cczfpo4mW33zl4wHda4bukBlhDjXrimHjSvUqxBGf5ClH3dqQKf65G\nNmMJ61QkiQ31YOTdTN3AQdbbZv9ag2rQZwUIjNHeamokC7qbG8EjFQAe6n7TFPYL\n3oMrBXcODQKBgDU5tOtDxXoAlhjz1VffRov9q2jQqoGTwg3Ocs4QXhA/Qn5o7Oww\n+39yLiUpI6sbnhkPQo8T41m8/a5iOxswzpXcI6d6PfQPBwU0PbQtsLkpSQFUU1U6\n4D6AdmdVXOtqvhsWWOasPtHlC00Tuk7+IPuGKnRTOvYAX/9OF1sUkUztAoGBAMIS\nNY11aba/IU+noXcJ9FLBN0ZySDQE7rTFZgAWtB5CnERH4CNGJgO1DqV1C50aiYfO\np9y7Tvm4rHn9Ssg3gqzQEV5KiwxGFst1g9DKp+ubAuFChCbMpVEB+sofVvcEwBpQ\nwLx9YH2W4xiIS9yAQKnqFAXxjVHvEzLClEDI8QsNAoGAUP+9zxKgKpCoS/e8H597\nyRXueEuL00TXbQq8ju0Au98eJtGvoQYhEkp7gQdXF0Ix7DnChdft5WlK7gSX3R01\nJScw2PSjtIT9kLT22VMxHOyowANRioUudP5/aaRNUI64EBx5iTkti89JaRshq+gi\nRApsxN2enb9+84olxi/6d0Q=\n-----END PRIVATE KEY-----\n",
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