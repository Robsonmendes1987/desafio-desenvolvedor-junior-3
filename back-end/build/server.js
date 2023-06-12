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

// src/database/config/database.ts
var require_database = __commonJS({
  "src/database/config/database.ts"(exports, module2) {
    "use strict";
    var import_config3 = require("dotenv/config");
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
      return res.status(201).send();
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
      const { title, content } = req.body;
      const token = req.headers.authorization;
      const email = tokenemail(String(token));
      try {
        console.log("PEGOU POST", req.body);
        const registerPostCase = MakePost();
        await registerPostCase.create({ email, title, content });
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return res.status(409).json({ message: error.message });
        }
      }
      return res.status(201).send();
    };
  }
};

// src/routes/post-routes.ts
var router = import_express2.default.Router();
var registerPost = new RegisterPostController();
router.post("/post", async (req, res) => registerPost.register(req, res));
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
  start(PORT2) {
    this.app.listen(PORT2, () => console.log(`Running on port ${PORT2}`));
  }
};
var app_default = App;

// src/server.ts
var import_config2 = require("dotenv/config");
var PORT = process.env.APP_PORT || 3001;
new app_default().start(PORT);
