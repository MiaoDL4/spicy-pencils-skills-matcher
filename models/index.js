const Users = require("./Users");
const Learn = require("./Learn");
const Teach = require("./Teach");
const Skills = require("./Skills");

Users.belongsTo(Learn, {
  foreignKey: "learn_id",
});

Users.belongsTo(Teach, {
  foreignKey: "teach_id",
});

Teach.hasMany(Skills, {
  foreignKey: "skill_id",
});

Learn.hasMany(Skills, {
  foreignKey: "skill_id",
});

module.exports = {
  Users,
  Learn,
  Teach,
  Skills,
};
