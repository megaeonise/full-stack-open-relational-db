const Blogs = require("./blog");
const User = require("./user");

Blogs.sync();
User.sync();

User.hasMany(Blogs);
Blogs.belongsTo(User);
Blogs.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  Blogs,
  User,
};
