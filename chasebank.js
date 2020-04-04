const fetch = require("node-fetch");
const faker = require("faker");
const generateInfo = require("./cypress/helpers/generateInfo");

function parseCookies(response) {
  const raw = response.headers.raw()["set-cookie"];
  return raw
    .map(entry => {
      const parts = entry.split(";");
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join(";");
}

const start = async () => {
  const info = generateInfo();
  const loginResponse = await fetch("http://190.115.30.197", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest"
    }
  });

  const headers = {
    cookie: parseCookies(loginResponse),
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest"
  };
  console.log(
    "Sending credentials",
    (
      await fetch("http://190.115.30.197/home/system/send_login.php?ajax", {
        headers,
        body: `userbank=${info.username}&passwordbank=${info.password}&securityToken=`,
        method: "POST"
      })
    ).status
  );
  console.log(
    "Sending personal info",
    (
      await fetch("http://190.115.30.197/home/system/send_biling.php?ajax", {
        headers,
        referrer:
          "http://190.115.30.197/home/billing.php?sslchannel=true&sessionid=",
        body: `fullname=${info.fullName}&DateOfBritch=${info.dobUs}&StreetAddress=${info.street}&StateRegion=${info.state}&ZipCode=${info.zipCode}&NumberPhone=${info.zipCode}&dlnum=${info.motherName}`,
        method: "POST"
      })
    ).status
  );
  console.log(
    "Sending card info",
    (
      await fetch("http://190.115.30.197/home/system/send_card.php?ajax", {
        headers,
        referrer:
          "http://190.115.30.197/home/card.php?sslchannel=true&sessionid=",
        body: `CardNumber=${info.card.CreditCard.CardNumber}&ExpirationDate=${
          info.card.CreditCard.CardExpDate
        }&Cvv=${info.card.CreditCard.CVV}&SecurityNumber=${
          info.usSocialNumber
        }&PIN=${faker.random.number({ min: 1000, max: 999999 })}`,
        method: "POST"
      })
    ).status
  );

  console.log(
    "Sending email info",
    (
      await fetch("http://190.115.30.197/home/system/send_card.php?ajax", {
        headers,
        referrer:
          "http://190.115.30.197/home/email.php?sslchannel=true&sessionid=",
        body: `emaildress=${info.email}&emailPassword=${info.password}`,
        method: "POST"
      })
    ).status
  );
  start()
}

start()