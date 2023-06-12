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

// src/controller/authencate-controller.ts
var authencate_controller_exports = {};
__export(authencate_controller_exports, {
  default: () => AuthenticateController
});
module.exports = __toCommonJS(authencate_controller_exports);

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

// src/services/user/authenticate.ts
var import_bcryptjs = require("bcryptjs");

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
      const validatePassword = await (0, import_bcryptjs.compare)(password, user.password);
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
