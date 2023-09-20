"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadCourseService = void 0;
const fs = __importStar(require("fs"));
class UploadCourseService {
    constructor(courseRepository, fileRepository, courseFileStorage) {
        this.courseRepository = courseRepository;
        this.fileRepository = fileRepository;
        this.courseFileStorage = courseFileStorage;
    }
    async execute(payload) {
        console.log("new payload from UploadCourseService.ts:", payload.file);
        var name = payload.name;
        var callback = (err) => {
            if (err) {
                console.log("File not saved");
                throw err;
            }
            else {
                console.log("file is successfully saved!!");
            }
        };
        const directoryPath = `uploadedFiles`;
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        const data = fs.writeFile(`${directoryPath}/${name}.pdf`, payload.file, callback);
        return `${directoryPath}/${name}.pdf`;
    }
}
exports.UploadCourseService = UploadCourseService;
//# sourceMappingURL=UploadCourseService.js.map