const faker = require("faker");
const list = require("../fixtures/list.json");
const dateFns = require("date-fns");
const cards = require("../fixtures/cards.json");

const getEmailAddress = (firstName, lastName) => {
    const dot = faker.random.arrayElement(["", "."]);
    const suffix = faker.random.arrayElement([
      "",
      faker.random.number({ min: 1, max: 99 })
    ]);
    const domain = faker.random.arrayElement(["gmail", "outlook"]);
    return `${firstName}${dot}${lastName}${suffix}@${domain}.com`.toLocaleLowerCase();
  };

module.exports = () => {
    const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const accountNumber = faker.random.number({
        min: 10000000,
        max: 9999999999
      });
      const username = `${firstName}${lastName}`.toLowerCase()
      const fullName = `${firstName} ${lastName}`
      const email = getEmailAddress(firstName,lastName)
      const password = faker.internet.password()
      const card = faker.random.arrayElement(cards);
      const sortCode = faker.random.number({ min: 100000, max: 999999 });
      const dateOfBirth = faker.date.between(
        dateFns.subYears(new Date(), 40),
        dateFns.subYears(new Date(), 20)
      );

      const dobUs = dateFns.format(dateOfBirth, "MM/dd/yyyy")
      const dobEu = dateFns.format(dateOfBirth, "dd/MM/yyyy")
      const street = faker.address.streetAddress()
      const state = faker.address.state()
      const zipCode = faker.address.zipCode()
      const usPhone = faker.phone.phoneNumber()
      const motherName = faker.name.lastName()

      const usSocialNumber = faker.random.number({min:100000000,max:999999999})
      return {firstName,lastName,fullName, username, email,dobUs, dobEu, usSocialNumber, password,motherName,zipCode,usPhone, street,state, accountNumber,card,sortCode,dateOfBirth}
}