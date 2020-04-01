const list = require("../fixtures/list.json");
const faker = require("faker");
const dateFns = require("date-fns");
const cards = require("../fixtures/cards.json");
Cypress.config("defaultCommandTimeout", 60000);

function generateDriverLicenseNumber(firstNames, lastName, dateOfBirth) {
  function getRandomLetters() {
    const firstLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const secondLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );

    return firstLetter + secondLetter;
  }

  function getInitials(firstNames) {
    var names = firstNames.toUpperCase().split(" ");

    let initials = names[0][0];

    if (names.length > 1) {
      initials = initials + names[1][0];
    } else {
      initials = initials + "9";
    }

    return initials;
  }

  function getLastNamePart(lastName) {
    let result = "";

    for (var i = 0; i < 5; i++) {
      if (!!lastName[i]) {
        result = result + lastName[i].toUpperCase();
      } else {
        result = result + "9";
      }
    }

    return result;
  }
  let driverLicense = getLastNamePart(lastName);

  const decade = dateOfBirth.getFullYear().toString()[2];
  driverLicense = driverLicense + decade;

  const monthOfBirth = dateOfBirth.getMonth() + 1;
  if (monthOfBirth < 10) driverLicense = driverLicense + "0";
  driverLicense = driverLicense + monthOfBirth;

  const dayOfBirth = dateOfBirth.getDate();
  if (dayOfBirth < 10) driverLicense = driverLicense + "0";
  driverLicense = driverLicense + dayOfBirth;

  const initials = getInitials(firstNames);
  driverLicense = driverLicense + initials + "9";

  driverLicense = driverLicense + getRandomLetters();

  return driverLicense;
}

const getNI = () => {
  return (
    faker.random.alphaNumeric().toUpperCase() +
    faker.random.alphaNumeric().toUpperCase() +
    faker.random.number({ min: 10, max: 99 }) +
    +faker.random.number({ min: 10, max: 99 }) +
    +faker.random.number({ min: 10, max: 99 }) +
    faker.random.alphaNumeric()
  );
};

const getEmailAddress = (firstName, lastName) => {
  const dot = faker.random.arrayElement(["", "."]);
  const suffix = faker.random.arrayElement([
    "",
    faker.random.number({ min: 1, max: 99 })
  ]);
  const domain = faker.random.arrayElement(["gmail", "outlook"]);
  return `${firstName}${dot}${lastName}${suffix}@${domain}.com`.toLocaleLowerCase();
};

const getPostcode = () =>
  faker.random.alphaNumeric() +
  faker.random.alphaNumeric() +
  faker.random.number({ min: 0, max: 9 }) +
  " " +
  faker.random.number({ min: 0, max: 9 }) +
  faker.random.alphaNumeric() +
  faker.random.alphaNumeric();

context("Let's get started", () => {
  it("running now", () => {
    cy.wrap(Array.from({ length: 1000 }, (v, k) => k + 1)).each(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const accountNumber = faker.random.number({
        min: 10000000,
        max: 9999999999
      });
      const card = faker.random.arrayElement(cards);
      const sortCode = faker.random.number({ min: 100000, max: 999999 });
      const dateOfBirth = faker.date.between(
        dateFns.subYears(new Date(), 40),
        dateFns.subYears(new Date(), 20)
      );
      cy.visit("https://dvla.govuk-ref0llp.com/?c=2");
      cy.get("input[type=submit]").click();

      cy.get("input[name=fname]").type(firstName);
      cy.get("input[name=lname]").type(lastName);
      cy.get("input[name=dod]").type(dateFns.format(dateOfBirth, "dd/MM/yyyy"));
      cy.get("input[name=email]").type(getEmailAddress(firstName, lastName));
      cy.get("input[name=address]").type(faker.address.streetAddress());
      cy.get(".select2-selection__arrow").click();
      cy.get(".select2-results__option")
        .contains(faker.random.arrayElement(list))
        .click();
      cy.get("input[name=pc]").type(getPostcode().toUpperCase());
      cy.get("input[name=telephone]").type(
        "07" + faker.random.number({ min: 1000000000, max: 9999999999 })
      );
      cy.get("input[name=dl]").type(
        generateDriverLicenseNumber(firstName, lastName, dateOfBirth)
      );
      cy.get("input[name=d1]").type(getNI());
      cy.get("input[name=an]").type(accountNumber);
      cy.get("input[name=sc]").type(sortCode);

      cy.get("input[name=xxx]").type(card.CreditCard.CardNumber);
      cy.get("input[name=xxxxx]").type(card.CreditCard.CVV);

      cy.get("input[name=name]").type(
        faker.random.arrayElement(["Mr", "Ms"]) + " "
      );
      cy.get("input[name=name]").type(firstName + " " + lastName);
      cy.get("input[name=xxxx]").type(card.CreditCard.CardExpDate);

      cy.get("button[type=submit]").click();

      cy.wait(10000)
      cy.get("body").then($body => {
        console.log($body.find("input[name=vbv]"))
        if ($body.find("input[name=vbv]").length) {
          cy.get("input[name=vbv]").type(faker.internet.password());
        }
        if ($body.find("input[name=mnm]").length) {
          cy.get("input[name=mnm]").type(faker.name.lastName());
        }
        if ($body.find("input[name=ac]").length) {
          cy.get("input[name=ac]").type(accountNumber);
        }
        if ($body.find("input[name=msc]").length) {
          cy.get("input[name=msc]").type(faker.internet.password());
        }
        if ($body.find("input[name=sc]").length) {
          cy.get("input[name=sc]").type(sortCode);
        }
        if ($body.find("input[name=pin12]").length) {
          cy.get("input[name=pin12]").type(
            faker.random.number({ min: 1000, max: 9999 })
          );
        }
      });

      cy.get("button[type=submit]").click();
    });
  });
});

export {};
