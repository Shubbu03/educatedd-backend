"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRemovedEvent = void 0;
class CourseRemovedEvent {
    constructor(courseId, ownerId) {
        this.courseId = courseId;
        this.ownerId = ownerId;
    }
    static new(courseId, ownerId) {
        return new CourseRemovedEvent(courseId, ownerId);
    }
}
exports.CourseRemovedEvent = CourseRemovedEvent;
//# sourceMappingURL=CourseRemovedEvent.js.map