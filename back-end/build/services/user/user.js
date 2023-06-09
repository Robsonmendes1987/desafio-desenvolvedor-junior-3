"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/user/user.ts
var user_exports = {};
__export(user_exports, {
  RegisterUser: () => RegisterUser
});
module.exports = __toCommonJS(user_exports);
var import_bcryptjs = require("bcryptjs");

// src/services/errors/user-already-exists-error.ts
var userAlreadyExistsError = class extends Error {
  constructor() {
    super("Email Already Exist");
  }
};

// src/services/user/user.ts
var RegisterUser = class {
  constructor(usersRepositories) {
    this.usersRepositories = usersRepositories;
    this.create = async ({ name, email, password }) => {
      const passwordHash = await (0, import_bcryptjs.hash)(password, 6);
      const userAlreadyExist = await this.usersRepositories.findByEmail(email);
      if (userAlreadyExist) {
        throw new userAlreadyExistsError();
      }
      const user = await this.usersRepositories.create({ name, email, password: passwordHash });
      return { user };
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterUser
});
