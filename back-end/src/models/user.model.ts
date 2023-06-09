import { Model, INTEGER, STRING, DataTypes, UUID, NUMBER } from "sequelize";
import db from ".";
import {randomUUID} from "node:crypto"




class User extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string
}

User.init(
  {
    id: {
      // allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4,
      defaultValue: () => randomUUID(),
    },
    name: {
      allowNull: false,
      type: STRING,
    },
    email: {
      allowNull: false,
      type: STRING,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: "user",
    tableName: "users",
    timestamps: false,
  }
);

export default User;
