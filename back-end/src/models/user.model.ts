import { Model, STRING, DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import db from '.'

class User extends Model {
  id!: string
  name!: string
  email!: string
  password!: string

  static associate(models: any) {
    User.hasOne(models.Post, {
      foreignKey: 'authorId',
      as: 'post',
    })
  }
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
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
    modelName: 'user',
    tableName: 'users',
    timestamps: false,
  },
)

export default User
