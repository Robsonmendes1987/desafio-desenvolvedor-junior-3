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

// src/services/post/create-post.ts
var create_post_exports = {};
__export(create_post_exports, {
  RegisterPost: () => RegisterPost
});
module.exports = __toCommonJS(create_post_exports);

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
    this.create = async ({ authorId, title, content }) => {
      const findUser = await this.usersRepositories.findById(authorId);
      if (!findUser) {
        throw new ResourceNotFoundError();
      }
      const post = await this.postsRepositories.create({ authorId: findUser.id, title, content });
      return { post };
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterPost
});
