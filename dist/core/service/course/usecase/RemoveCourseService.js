"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCourseService = void 0;
const Code_1 = require("@core/common/code/Code");
const Exception_1 = require("@core/common/exception/Exception");
const CourseRemovedEvent_1 = require("@core/common/message/event/events/course/CourseRemovedEvent");
const CoreAssert_1 = require("@core/common/util/assert/CoreAssert");
class RemoveCourseService {
    constructor(mediaRepository, eventBus) {
        this.mediaRepository = mediaRepository;
        this.eventBus = eventBus;
    }
    async execute(payload) {
        const course = CoreAssert_1.CoreAssert.notEmpty(await this.mediaRepository.findCourse({ id: payload.courseId }), Exception_1.Exception.new({ code: Code_1.Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Course not found.' }));
        const hasAccess = payload.executorId === course.getOwnerId();
        CoreAssert_1.CoreAssert.isTrue(hasAccess, Exception_1.Exception.new({ code: Code_1.Code.ACCESS_DENIED_ERROR }));
        await this.mediaRepository.removeCourse(course);
        await this.eventBus.sendEvent(CourseRemovedEvent_1.CourseRemovedEvent.new(course.getId(), course.getOwnerId(), course.getType()));
    }
}
exports.RemoveCourseService = RemoveCourseService;
//# sourceMappingURL=RemoveCourseService.js.map