const bcrypt = require("bcrypt");
const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const uuid = require('uuid/v1');
const saltRounds = 16;


let exportedMethods = {

  async updateUser(userId, updateUser) {

    return this.getUserById(userId).then(currentUser => {
      let updateCommand = {
        $set: updateUser
      };
      return user().then(userCollection => {
        return userCollection.updateOne({
          _id: userId
        }, updateCommand).then(() => {
          return this.getUserById(userId);;
        });
      });
    });
  },

  async deleteUser(userId) {

    return user().then(userCollection => {
      return userCollection.removeOne({
        _id: userId
      }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete user with id of ${userId}`;
        }
      });
    });
  },

  async getUserById(userId) {
    return user().then(userCollection => {
      return userCollection.findOne({
        _id: userId
      }).then(user => {
        if (!user) return false;
        else return user;
      });
    });
  },
  async getUserNameByRole(role) {
    
    const userCollection = await user();
    const users = await userCollection.find({
      role:role
    }).toArray();
    return users;
  },
  async getUserByUsername(username) {
    return user().then(userCollection => {
      return userCollection.findOne({
        username:username
      }).then(user => {
        if (!user) return false;
        else return user;
      });
    });
  },
  async getAllUsers() {
    const userCollection = await user();

    const getusers = await userCollection.find({}).toArray();
  

    return getusers;

},

  async createUser(userInfo) {
    const plainTextPassword = userInfo.password;
    const hashPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    let addedUser = user().then(userCollection => {
      let newUser = {
        _id: uuid(),
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        username: userInfo.username,
        password: hashPassword,
        mobile: userInfo.mobile,
        email: userInfo.email,
        streetAddress: userInfo.streetAddress,
        aptno: userInfo.aptno,
        city: userInfo.city,
        state: userInfo.state,
        country: userInfo.country,
        zipCode: userInfo.zipCode,
        dob: userInfo.dob,
        role: userInfo.role,
        gender: userInfo.gender
      }
      return userCollection
        .insertOne(newUser)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getUserById(newId);
        });

    });
    // if (addedUser.insertedCount === 0) {
    //   throw "Could not add user successfully";
    // } else {
      return true;

    
  }
};

module.exports = exportedMethods;
