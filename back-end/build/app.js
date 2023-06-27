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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
module.exports = __toCommonJS(app_exports);
var import_express3 = __toESM(require("express"));

// src/routes/users-routes.ts
var import_express = __toESM(require("express"));

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

// src/services/user/user.ts
var import_bcryptjs = require("bcryptjs");

// src/services/errors/user-already-exists-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("Email Already Exist");
  }
};

// src/services/user/user.ts
var RegisterUserService = class {
  constructor(usersRepositories) {
    this.usersRepositories = usersRepositories;
    this.create = async ({
      name,
      email,
      password
    }) => {
      const passwordHash = await (0, import_bcryptjs.hash)(password, 6);
      const userAlreadyExist = await this.usersRepositories.findByEmail(email);
      if (userAlreadyExist) {
        throw new UserAlreadyExistsError();
      }
      const user = await this.usersRepositories.create({
        name,
        email,
        password: passwordHash
      });
      console.log("CHEGOU", password);
      return { user };
    };
  }
};

// src/services/factory/make-user.ts
function MakeUser() {
  const useRepository = new SequelizeUserRepository();
  const registerUser = new RegisterUserService(useRepository);
  return registerUser;
}

// src/controller/register-user-controller.ts
var RegisterUserController = class {
  constructor() {
    this.register = async (req, res) => {
      const { name, email, password } = req.body;
      try {
        console.log("PEGOU", req.body);
        const registerUseCase = MakeUser();
        await registerUseCase.create({ email, name, password });
      } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
          return res.status(409).json({ message: error.message });
        }
      }
      return res.status(201).json({ message: "usuario criado com sucesso" });
    };
  }
};

// src/services/user/authenticate.ts
var import_bcryptjs2 = require("bcryptjs");

// src/services/errors/invalid-credentials-error.ts
var InvalidCredentialError = class extends Error {
  constructor() {
    super("Invalid Credential");
  }
};

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

// src/services/user/authenticate.ts
var AuthenticateService = class {
  constructor(usersRepositories) {
    this.usersRepositories = usersRepositories;
    this.authenticate = async ({ email, password }) => {
      const user = await this.usersRepositories.findByEmail(email);
      if (!user) {
        throw new InvalidCredentialError();
      }
      const validatePassword = await (0, import_bcryptjs2.compare)(password, user.password);
      if (!validatePassword) {
        throw new InvalidCredentialError();
      }
      const token = jwt_utils_default.createToken(email);
      return { token };
    };
  }
};

// src/services/factory/make-authenticat.ts
function MakeAuthenticate() {
  const useRepository = new SequelizeUserRepository();
  const authenticateService = new AuthenticateService(useRepository);
  return authenticateService;
}

// src/controller/authencate-controller.ts
var AuthenticateController = class {
  constructor() {
    this.authenticate = async (req, res) => {
      const { email, password } = req.body;
      try {
        const authenticateService = MakeAuthenticate();
        const token = await authenticateService.authenticate({ email, password });
        return res.status(201).json(token);
      } catch (error) {
        if (error instanceof InvalidCredentialError) {
          return res.status(409).json({ message: error.message });
        }
      }
    };
  }
};

// src/routes/users-routes.ts
var rout = import_express.default.Router();
var resgisterUser = new RegisterUserController();
var authenticateController = new AuthenticateController();
rout.post(
  "/authenticate",
  async (req, res) => authenticateController.authenticate(req, res)
);
rout.post("/user", async (req, res) => resgisterUser.register(req, res));
var users_routes_default = rout;

// src/routes/post-routes.ts
var import_express2 = __toESM(require("express"));

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
  const registerPost2 = new RegisterPost(postRepository, useRepository);
  return registerPost2;
}

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

// src/services/post/find-all-posts.ts
var FindAllPost = class {
  constructor(postsRepositories) {
    this.postsRepositories = postsRepositories;
    this.findAll = async () => {
      const findAllPost2 = await this.postsRepositories.findAll();
      return findAllPost2;
    };
  }
};

// src/services/factory/find-post.ts
function FindPost() {
  const postRepository = new SequelizePostRepository();
  const FindPost3 = new FindAllPost(postRepository);
  return FindPost3;
}

// src/controller/find-all-post.ts
var FindAllPost2 = class {
  constructor() {
    this.resultAll = async (req, res) => {
      console.log("PEGOU POST", req.body);
      const findAllPostCase = FindPost();
      const result = await findAllPostCase.findAll();
      return res.status(201).json(result);
    };
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
      const deletePost2 = MakeDeletePost();
      const { type, message } = await deletePost2.delete({ id });
      console.log("FACTORY CONTROLLER MESSAGE", message);
      res.status(type).json(message);
    };
  }
};

// src/services/post/find-post-by-id.ts
var FIndByIdPost = class {
  constructor(postsRepositories) {
    this.postsRepositories = postsRepositories;
    this.findPostById = async ({ id }) => {
      const findPost = await this.postsRepositories.findById(id);
      if (!findPost) {
        throw new ResourceNotFoundError();
      }
      return { findPost };
    };
  }
};

// src/services/factory/find-post-by-id.ts
function FindPost2() {
  const postRepository = new SequelizePostRepository();
  const FindPost3 = new FIndByIdPost(postRepository);
  return FindPost3;
}

// src/controller/find-post-by-id.ts
var FindPostById = class {
  constructor() {
    this.findbyid = async (req, res) => {
      const { id } = req.params;
      console.log("CONTROLLER FIND POST ID", id);
      const findPostId = FindPost2();
      const result = await findPostId.findPostById({ id });
      return res.status(200).json({ result });
    };
  }
};

// src/services/post/puth-post.ts
var PuthPost = class {
  constructor(postsRepositories) {
    this.postsRepositories = postsRepositories;
    this.puthpost = async ({
      id,
      title,
      content
    }) => {
      console.log("ID DO POST", id);
      const findPostById2 = this.postsRepositories.findById(id);
      if (!findPostById2) {
        throw new ResourceNotFoundError();
      }
      const puth = await this.postsRepositories.puth({
        id,
        title,
        content
      });
      return { puth };
    };
  }
};

// src/services/factory/make-puth.ts
function MakePuthPost() {
  const postRepository = new SequelizePostRepository();
  const FindPost3 = new PuthPost(postRepository);
  return FindPost3;
}

// src/controller/puth-post.ts
var PuthPost2 = class {
  constructor() {
    this.puth = async (req, res) => {
      const { id } = req.params;
      const { content, title } = req.body;
      console.log("CONTROLLER PUTH POS TBY ID", id);
      const makePuthPost = MakePuthPost();
      await makePuthPost.puthpost({ id, content, title });
      return res.status(201).send("Post Atualizado");
    };
  }
};

// src/routes/post-routes.ts
var router = import_express2.default.Router();
var registerPost = new RegisterPostController();
var findAllPost = new FindAllPost2();
var deletePost = new DeletePostController();
var findPostById = new FindPostById();
var puthPost = new PuthPost2();
router.put("/puth/:id", async (req, res) => puthPost.puth(req, res));
router.post("/post", async (req, res) => registerPost.register(req, res));
router.get("/findbyid/:id", async (req, res) => findPostById.findbyid(req, res));
router.get("/getallposts", async (req, res) => findAllPost.resultAll(req, res));
router.delete("/:id", async (req, res) => deletePost.deletepost(req, res));
var post_routes_default = router;

// src/app.ts
var App = class {
  constructor() {
    this.app = (0, import_express3.default)();
    this.config();
    this.app.get("/", (req, res) => res.json({ ok: true }));
  }
  config() {
    const accessControl = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH"
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };
    this.app.use(import_express3.default.json());
    this.app.use(accessControl);
    this.app.use("/", users_routes_default);
    this.app.use("/", users_routes_default);
    this.app.use("/", post_routes_default);
  }
  start(PORT) {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
};
var app_default = App;
