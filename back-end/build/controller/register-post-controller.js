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
    var import_config2 = require("dotenv/config");
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

// src/controller/register-post-controller.ts
var register_post_controller_exports = {};
__export(register_post_controller_exports, {
  default: () => RegisterPostController
});
module.exports = __toCommonJS(register_post_controller_exports);

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
    User.hasOne(models.Post, {
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
      as: "users",
      onDelete: "CASCADE"
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
      type: import_sequelize3.DataTypes.UUID,
      allowNull: false
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

// src/services/errors/resource-not-found.error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found");
  }
};

// src/repositories/sequelize-db/sequelize-post-repository.ts
var SequelizePostRepository = class {
  async findById(id) {
    const result = await post_model_default.findByPk(id);
    if (!result) {
      throw new ResourceNotFoundError();
    }
    return result;
  }
  async findAll() {
    const user = await post_model_default.findAll();
    return user;
  }
  async destroy(id) {
    const user = await post_model_default.findByPk(id);
    if (!user) {
      return {
        type: 400,
        message: "Nao foi possivel excluir, Post nao encontrado"
      };
    }
    await post_model_default.destroy({ where: { id } });
    return {
      type: 204,
      message: "Post excluido com sucesso"
    };
  }
  async puth(data) {
    console.log("SEQUELIZE", data);
    const puth = await post_model_default.update({ ...data }, { where: { id: data.id } });
    return puth;
  }
  async create({
    authorId,
    title,
    content
  }) {
    console.log("authorid SEQUELIZE DB", authorId);
    const { dataValues } = await post_model_default.create({ authorId, title, content });
    console.log("DATAVELUES SEQUELIZE DB", dataValues);
    return dataValues;
  }
};

// src/services/post/create-post.ts
var RegisterPost = class {
  constructor(postsRepositories, usersRepositories) {
    this.postsRepositories = postsRepositories;
    this.usersRepositories = usersRepositories;
    this.create = async ({
      authorId,
      email,
      title,
      content
    }) => {
      const findUser = await this.usersRepositories.findByEmail(email);
      console.log("FACTORY CREATE POST", authorId, email, title, content);
      console.log("FACTORY FINDUSER", findUser?.id);
      if (!findUser) {
        throw new ResourceNotFoundError();
      }
      const post = await this.postsRepositories.create({
        authorId: findUser?.id,
        title,
        content
      });
      console.log("FACTORY FINDUSER", authorId);
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

// src/utils/jwt.utils.ts
var jwt = __toESM(require("jsonwebtoken"));
var import_config = require("dotenv/config");
var createToken = (email) => {
  const token = jwt.sign({ email }, `${process.env.TOKEN_SECRET}`, {
    expiresIn: "1d",
    algorithm: "HS256"
  });
  return token;
};
var validateToken = (token) => {
  if (!token) {
    return { type: 401, message: "Token not found" };
  }
  try {
    const data = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    return { type: null, message: data };
  } catch (error) {
    return { type: 401, message: "Invalid token" };
  }
};
var decodeToken = (token) => {
  const decode2 = jwt.decode(token);
  return { decode: decode2 };
};
var jwt_utils_default = { validateToken, createToken, decodeToken };

// src/utils/token-email.ts
var tokenemail = (token) => {
  const decode2 = jwt_utils_default.decodeToken(String(token));
  const {
    decode: { email }
  } = decode2;
  return email;
};

// src/controller/register-post-controller.ts
var RegisterPostController = class {
  constructor() {
    this.register = async (req, res) => {
      const { title, content, authorId } = req.body;
      console.log("PEGOU MAKEPOST", authorId);
      const token = req.headers.authorization;
      const email = tokenemail(String(token));
      try {
        console.log("PEGOU POST", req.body);
        const registerPostCase = MakePost();
        await registerPostCase.create({
          authorId,
          email,
          title,
          content
        });
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return res.status(409).json({ message: error.message });
        }
      }
      return res.status(201).json({ authorId, content, title });
    };
  }
};
