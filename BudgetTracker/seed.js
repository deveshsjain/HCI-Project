const dbConnection = require("../config/mongoConnections");
const data = require("../data");
const users = data.user;
const main = async () => {
const db = await dbConnection();
let userInfo ={
firstname: "Rozy",
lastname: "Gupta",
username: "rgupta11",
password: "Welcome123",
mobile: 1234567898,
email:"rgupta11@stevens.edu",
streetAddress:"1 Castle Point",
aptno:"C02",
city:"JERSEY CITY",
state:"New Jersey",
country:"United States",
zipCode:"07304",
dob:"05/30/1996",
gender:"Female"
}
let userInfo1 ={
    firstname: "Devesh",
    lastname: "Jain",
    username: "djain11",
    password: "Welcome123",
    mobile: 1234567898,
    email:"deveshjain@stevens.edu",
    streetAddress:"2 Castle Point",
    aptno:"C03",
    city:"JERSEY CITY",
    state:"New Jersey",
    country:"United States",
    zipCode:"07304",
    dob:"1/25/1996",
    gender:"Male"
    }
    let userInfo2 ={
        firstname: "Janiece",
        lastname: "Pandya",
        username: "jpandya4",
        password: "Welcome123",
        mobile: 1234567898,
        email:"jpandya4@stevens.edu",
        streetAddress:"3 Castle Point",
        aptno:"C03",
        city:"JERSEY CITY",
        state:"New Jersey",
        country:"United States",
        zipCode:"07304",
        dob:"2/2/1996",
        gender:"Female"
        }
    let userInfo3 ={
            firstname: "Shikha",
            lastname: "Soneji",
            username: "ssoneji@stevens.edu",
            password: "Welcome123",
            mobile: 1234567898,
            email:"ssoneji@stevens.edu",
            streetAddress:"3 Castle Point",
            aptno:"C03",
            city:"JERSEY CITY",
            state:"New Jersey",
            country:"United States",
            zipCode:"07304",
            dob:"2/2/1989",
            gender:"Female"
            }
    const user = await users.createUser(userInfo);
    const user1 = await users.createUser(userInfo1);
    const user2 = await users.createUser(userInfo2);
    const user3 = await users.createUser(userInfo3);
   
    console.log("Done seeding database");
    await db.serverConfig.close();
};














main();
