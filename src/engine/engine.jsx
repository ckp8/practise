const enigma = require("enigma.js");
const schema = require("enigma.js/schemas/12.20.0.json"); // see 'What is a schema?'

const config = {
  host: "sense-demo.qlik.com",
  isSecure: true,
  port: 443,
  prefix: "",
  appId: "372cbc85-f7fb-4db6-a620-9a5367845dce",
};

const session = enigma.create({
  schema, // schema see 'What is a schema?'
  url: `ws${config.isSecure ? "s" : ""}://${config.host}:${config.port}/${
    config.prefix ? `${config.prefix}/` : ""
  }app/engineData`,
}); // calculated url based on variables provided in config

export function openSession() {
  return new Promise(async (resolve, reject) => {
    // const objectId = "fQdkG";
    // open a session
    // const qDoc = await openSession();
    session
      .open()
      .then((global) => {
        global
          .openDoc(config.appId)
          .then((doc) => {
            resolve(doc);
          })
          .catch(() => {
            reject("Qlik-Enigma Error: unable to openDoc");
          });
      })
      .catch(() => {
        reject("Qlik-Enigma Error: unable to open session");
      });
  });
}
// const objectId = "fQdkG";
// const qDoc = await openSession();
// console.log(qDoc);
