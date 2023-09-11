"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRemovedEvent = void 0;
class CourseRemovedEvent {
    constructor(courseId, ownerId, type) {
        this.courseId = courseId;
        this.ownerId = ownerId;
        this.type = type;
    }
    static new(courseId, ownerId, type) {
        return new CourseRemovedEvent(courseId, ownerId, type);
    }
}
exports.CourseRemovedEvent = CourseRemovedEvent;
//# sourceMappingURL=CourseRemovedEvent.js.map