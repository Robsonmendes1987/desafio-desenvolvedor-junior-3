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

// src/controller/register-user-controller.ts
var register_user_controller_exports = {};
__export(register_user_controller_exports, {
  default: () => RegisterUserController
});
module.exports = __toCommonJS(register_user_controller_exports);

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
