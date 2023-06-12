"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/database/config/database.ts
var require_database = __commonJS({
  "src/database/config/database.ts"(exports, module2) {
    "use strict";
    var import_config = require("dotenv/config");
    var config2 = {
      username: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "123456",
      database: "BLOGS",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      dialect: "mysql",
      dialectOptions: {
        timezone: "Z"
      },
      logging: false
    };
    module2.exports = config2;
  }
});

// src/services/factory/make-post.ts
var make_post_exports = {};
__export(make_post_exports, {
  MakePost: () => MakePost
});
module.exports = __toCommonJS(make_post_exports);

// src/models/user.model.ts
var import_sequelize2 = require("sequelize");
var import_uuid = require("uuid");

// src/models/index.ts
var import_sequelize = require("sequelize");
var config = __toESM(require_database());
var sequelize = new import_sequelize.Sequelize(config);
var models_default = sequelize;

// src/models/user.model.ts
var User = class extends import_sequelize2.Model {
  static associate(models) {
    User.hasMany(models.Post, {
      foreignKey: "authorId",
      as: "post"
    });
  }
};
User.init(
  {
    id: {
      primaryKey: true,
      type: import_sequelize2.DataTypes.UUID,
      defaultValue: () => (0, import_uuid.v4)()
    },
    name: {
      allowNull: false,
      type: import_sequelize2.STRING
    },
    email: {
      allowNull: false,
      type: import_sequelize2.STRING
    },
    password: {
      allowNull: false,
      type: import_sequelize2.STRING
    }
  },
  {
    underscored: true,
    sequelize: models_default,
    modelName: "user",
    tableName: "users",
    timestamps: false
  }
);
var user_model_default = User;

// src/repositories/sequelize-db/sequelize-user-repository.ts
var SequelizeUserRepository = class {
  async create({ email, name, password }) {
    const { dataValues } = await user_model_default.create({ name, email, password });
    return dataValues;
  }
  async findByEmail(email) {
    const user = await user_model_default.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user.dataValues;
  }
  async findById(id) {
    const user = await user_model_default.findByPk(id);
    if (!user) {
      return null;
    }
    return user.dataValues;
  }
};

// src/models/post.model.ts
var import_sequelize3 = require("sequelize");
var import_uuid2 = require("uuid");
var Post = class extends import_sequelize3.Model {
  static associate(models) {
    Post.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author"
    });
  }
};
Post.init(
  {
    id: {
      primaryKey: true,
      type: import_sequelize3.DataTypes.UUID,
      defaultValue: () => (0, import_uuid2.v4)()
    },
    authorId: {
      type: import_sequelize3.DataTypes.STRING,
      allowNull: false
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    },
    title: {
      allowNull: false,
      type: import_sequelize3.STRING
    },
    content: {
      allowNull: false,
      type: import_sequelize3.STRING
    }
  },
  {
    underscored: true,
    sequelize: models_default,
    modelName: "post",
    tableName: "posts",
    timestamps: false
  }
);
var post_model_default = Post;

// src/repositories/sequelize-db/sequelize-post-repository.ts
var SequelizePostRepository = class {
  async findById(id) {
    const user = await post_model_default.findByPk(id);
    if (!user) {
      return null;
    }
    return user.dataValues;
  }
  async findAll() {
    const user = await post_model_default.findAll();
    if (!user) {
      return null;
    }
    return user;
  }
  async delete(id) {
    await post_model_default.findByPk(id);
  }
  async puth({
    id,
    authorId,
    title,
    content
  }) {
    const user = await post_model_default.findByPk(authorId);
    if (!user) {
      return null;
    }
    await user.update({ title, content }, { where: { authorId } });
    return user;
  }
  async create({
    authorId,
    title,
    content
  }) {
    console.log("DATAVELUES SEQUELIZE DB", authorId, title, content);
    const { dataValues } = await post_model_default.create({ authorId, title, content });
    return dataValues;
  }
};

// src/services/errors/resource-not-found.error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found");
  }
};

// src/services/post/create-post.ts
var RegisterPost = class {
  constructor(postsRepositories, usersRepositories) {
    this.postsRepositories = postsRepositories;
    this.usersRepositories = usersRepositories;
    this.create = async ({
      email,
      title,
      content
    }) => {
      const findUser = await this.usersRepositories.findByEmail(email);
      console.log("FACTORY CREATE POST", email, title, content);
      if (!findUser) {
        throw new ResourceNotFoundError();
      }
      const post = await this.postsRepositories.create({
        authorId: findUser.id,
        title,
        content
      });
      return { post };
    };
  }
};

// src/services/factory/make-post.ts
function MakePost() {
  const useRepository = new SequelizeUserRepository();
  const postRepository = new SequelizePostRepository();
  const registerPost = new RegisterPost(postRepository, useRepository);
  return registerPost;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakePost
});
