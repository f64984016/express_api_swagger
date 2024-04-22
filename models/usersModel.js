class UserModel {
    constructor () {
        this.users = {
            "demo@gmail.com":{
              "username": "foo",
              "password": "foopasswd"
            }
          }
    }

    getByEmail(email) {
        return this.users[email];
    };

    create(email, username, hashpassword) {
        this.users[email] = {
            password: hashpassword,
            username
          };

        return this.users[email];
    };
}

module.exports = new UserModel();