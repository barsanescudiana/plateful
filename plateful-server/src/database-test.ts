/* eslint-disable prettier/prettier */
import * as admin from 'firebase-admin';
// import * as serviceAccount from './serviceAccountKey.json';

// const firebaseConfig = {
//   type: 'service_account',
//   project_id: 'plateful-test',
//   private_key_id: '2326b0a964daffdc81649ad3dd7907d26548bca7',
//   private_key:
//     'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCK5xlsKqUCXj42\ndp57LdLA72Y6zNLLF5W7VvXGaAfGUh7CK2ITBe6KBd+dMp+WzSf+3vynRApBgRkt\nqsQ6l9fFWaw+ZY9cAu1OSfxSFwhopCdmMPAvB9zZAaVzgo38mvKiKOS/f5gzxVls\naw36vo8KMj5Hz5xOuWv65OiU2VPqxF0WJBcUwleRwS1LugXBdn9Rt/xTRo9tTOYr\nQnfbFbjEg19hoA7EOMOTvtqU0TD2Plx8w+zH40vt1efiQDtTz3shlAX80ngV74zz\nw/TzzPzCFJYn/D4N/CZ7RAF+F2uAV9Ej+I5EaI4vtJ5TXLtem8axI6tXViGSj/nL\nrIDhTcpnAgMBAAECggEAEV25UPZim6bavQZxjqb4/YQw0ih/hkK+8VAlpED8uoUp\nMU9+kIWiVYFMfCPdzgXST/bjEaqGZGWBQgi38IzBaPwVdoD4vnaN4sbfPrLV1fdd\nXFUWrQVHovNQvd3/EIDy1ZFVSsKSGI7o547ZjZWQ3qPPeOec/D60dbF0M//ukkr8\nHnWAhS2eu+uoeh3xGztxKzZH1sxJSiBBoCbm4v+y4F/5hZ6O3ritxa1v3yXnojG9\nbKmX5puqQaN0hLeOeg6CMLnMGVs1RYGTi4fcVCIEH+0+9+spyst5QmWXkXn5I8aT\nCtSWVQ2YhWvNW158P1tPxLDgE/JQuFDwYk1QG6o24QKBgQDBpHSm3/bpsVSYKQjc\nY0sgUqzzPAYjnfGNQlbUmxqCV5krusJo0+zQWrt3cn7Vf1nXYLSsyJXw3DPGj4Ip\ndpaXyiRO0MsENMXU/+aNVnxo/QoHhG9GI2zmYNk+hGcgck9/tJSGsh36WROcgZZ6\n3iLB/xD1t57cC6jPnIdKL27uFwKBgQC3of/0LdABAcUKrl6JN8j7lFJU+AELvmUy\nYlPC2cvZ48/d2T+3lSROrBEOB2g2vViHc2KPJubEKbsuw1TwdLkdWopR2r6P/KbW\nXBdluCHBex4byuHdzuvlgtaC+c6fNlMsU2sd5qwXf6LzfnvaHGcXS8A5GksTKc69\n2twHOdqIMQKBgQCxT89pBmdncXNOqTRt6ZXfERVA3FOaxYNrn7U2lJffhirBOg/O\nQU/1MT+7jmHJSQWRDAIkvL9ff6MBTGMZaHdYokZAzTs4rMIB2hjYjrr4v8sxOvlR\nNhr/kOscLczojwNwon/mHq8IkAw/IQITm9gj31U+SlbyktKO2HuhWHGxHQKBgQCb\n+6MEUmnugQdUFFu/KUCy2wG4pVWWGSuyya0mxYSQWB/47ZJfKfPGVAjEpuwSG3J4\n1D1zJfM9y8jxZwDeo/eehIscDrhybIV3bpB9WhRqWl9v8j08AYmF0kbOyM2Hlki+\nTTmfE5M4/rV3KgigdCHpuvHUT45X/9pakO73wF/t8QKBgAteMiYpKXd01i4v7u7c\ngEwE396xAGetywR/szM+NtARkr0ynsUDh/xfKoqVAiowBqCk1IKm9luCkj+AzGOv\ncMtl//V9xh8Obz3jMi1O5erGIYE1VvkNhMJC9l5Hle5NeqqQwliNiFCwJWpnXbgg\nVZ43GXbCtgfDuCfcgByfIvaJ\n',
//   client_email: 'firebase-adminsdk-nvnll@plateful-test.iam.gserviceaccount.com',
//   client_id: '103808245070539432505',
//   auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//   token_uri: 'https://oauth2.googleapis.com/token',
//   auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//   client_x509_cert_url:
//     'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nvnll%40plateful-test.iam.gserviceaccount.com',
//   universe_domain: 'googleapis.com',
// };

const serviceAccount = {
  apiKey: 'AIzaSyDvY6ZMbceYzQkkY6Dub7GvjMob69K0bLM',
  authDomain: 'plateful-c97b0.firebaseapp.com',
  projectId: 'plateful-c97b0',
  storageBucket: 'plateful-c97b0.appspot.com',
  messagingSenderId: '898012584981',
  appId: '1:898012584981:web:669bfffd77d0feabf9821c',
  measurementId: 'G-3H68ZPFKKM',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const database = admin.firestore();

export default database;
