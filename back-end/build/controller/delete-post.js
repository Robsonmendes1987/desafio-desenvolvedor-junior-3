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

// src/controller/delete-post.ts
var delete_post_exports = {};
__export(delete_post_exports, {
  DeletePostController: () => DeletePostController
});
module.exports = __toCommonJS(delete_post_exports);

// src/models/post.model.ts
var import_sequelize2 = require("sequelize");
var import_uuid = require("uuid");

// src/models/index.ts
var import_sequelize = require("sequelize");
var config = __toESM(require_database());
var sequelize = new import_sequelize.Sequelize(config);
var models_default = sequelize;

// src/models/post.model.ts
var Post = class extends import_sequelize2.Model {
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
      type: import_sequelize2.DataTypes.UUID,
      defaultValue: () => (0, import_uuid.v4)()
    },
    authorId: {
      type: import_sequelize2.DataTypes.UUID,
      allowNull: false
    },
    title: {
      allowNull: false,
      type: import_sequelize2.STRING
    },
    content: {
      allowNull: false,
      type: import_sequelize2.STRING
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

// src/services/post/delete-post.ts
var DeleteDataPost = class {
  constructor(postsRepositories) {
    this.postsRepositories = postsRepositories;
    this.delete = async ({ id }) => {
      const findPost = await this.postsRepositories.findById(id);
      if (!findPost) {
        return {
          type: 400,
          message: "Nao foi possivel excluir, Post nao encontrado"
        };
      }
      await this.postsRepositories.destroy(id);
      return { type: 204, message: "Post Excluido Com Sucesso" };
    };
  }
};

// src/services/factory/make-delete-post.ts
function MakeDeletePost() {
  const postRepository = new SequelizePostRepository();
  const DeletePost = new DeleteDataPost(postRepository);
  return DeletePost;
}

// src/controller/delete-post.ts
var DeletePostController = class {
  constructor() {
    this.deletepost = async (req, res) => {
      const { id } = req.params;
      console.log("FACTORY CONTROLLER DELETE POST", id);
      const deletePost = MakeDeletePost();
      const { type, message } = await deletePost.delete({ id });
      console.log("FACTORY CONTROLLER MESSAGE", message);
      res.status(type).json(message);
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeletePostController
});
