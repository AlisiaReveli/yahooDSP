// import { createHmac } from 'crypto';
const { createHmac } = require('crypto');

const express = require('express')


const app = express();
app.use((request, response) => {
    let header = {
        'alg': 'HS256',
        'typ': 'jwt'
    }

    let encodedHeader = base64url(header, 'header');

    let body = {
        'aud': 'https://id.b2b.verizonmedia.com/identity/oauth2/access_token?realm=dsp',
        'iss': process.env.client_id,
        'sub': process.env.client_id,
        'exp': Math.floor(Date.now() / 1000) + 600,
    }

    let encodedBody = base64url(body, 'body');


    let jwt_signing_string = encodedHeader + '.' + encodedBody;

    const jwt_signature = createHmac('sha256', process.env.client_secret)
        .update(jwt_signing_string)
        .digest('base64');
    let final_jwt = jwt_signing_string + '.' + jwt_signature
    response.json({ response: final_jwt });

});

  function base64url (source, type) {
    let encodedSource;
    if (type === 'body') {
        encodedSource = Buffer.from(JSON.stringify(source)).toString('base64');
    } else {
        // Encode in classical base64
        encodedSource = Buffer.from(JSON.stringify(source)).toString('base64');
        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
    }


    return encodedSource;
}


// export default app;
module.exports= app;