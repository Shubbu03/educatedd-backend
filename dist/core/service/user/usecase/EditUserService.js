"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
const UserUseCaseDto_1 = require("@core/domain/user/usecase/dto/UserUseCaseDto");
class EditUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(payload) {
        const user = CoreAssert_1.CoreAssert.notEmpty(await this.userRepository.findUser({ id: payload.id, email: payload.email, }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: "User not found!!" }));
        await user.edit({ id: payload.id, firstName: payload.firstName, lastName: payload.lastName, email: payload.email, password: payload.password });
        await this.userRepository.updateUser(user);
        return UserUseCaseDto_1.UserUseCaseDto.newFromUser(user);
    }
}
exports.EditUserService = EditUserService;
//# sourceMappingURL=EditUserService.js.map