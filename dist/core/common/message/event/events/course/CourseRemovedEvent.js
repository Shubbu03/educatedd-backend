"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRemovedEvent = void 0;
class CourseRemovedEvent {
    constructor(id, ownerId) {
        this.id = id;
        this.ownerId = ownerId;
    }
    static new(id, ownerId) {
        return new CourseRemovedEvent(id, ownerId);
    }
}
exports.CourseRemovedEvent = CourseRemovedEvent;
//# sourceMappingURL=CourseRemovedEvent.js.map