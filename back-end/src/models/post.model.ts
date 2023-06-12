import { Model, STRING, DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import db from '.'

class Post extends Model {
  id!: string
  authorId!: string
  title!: string
  content!: string

  static associate(models: any) {
    Post.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    })
  }
}

Post.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    },
    title: {
      allowNull: false,
      type: STRING,
    },
    content: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'post',
    tableName: 'posts',
    timestamps: false,
  },
)

export default Post
