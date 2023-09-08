"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const UserUseCaseDto_1 = require("@core/domain/user/usecase/dto/UserUseCaseDto");
class GetUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(payload) {
        const user = await this.userRepository.findUser({ id: payload.userId });
        if (!user) {
            throw Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'User not found.' });
        }
        return UserUseCaseDto_1.UserUseCaseDto.newFromUser(user);
    }
}
exports.GetUserService = GetUserService;
//# sourceMappingURL=GetUserService.js.map