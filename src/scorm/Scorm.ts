const SCORM = require("pipwerks-scorm-api-wrapper").SCORM;

const Scorm = {
  init() {
    const initialized = SCORM.init();
    if (!initialized) {
      console.error("SCORM API failed to initialize.");
    } else {
      console.log("SCORM API initialized successfully.");
    }
  },

  terminate() {
    const terminated = SCORM.quit();
    if (!terminated) {
      console.error("SCORM API failed to terminate.");
    } else {
      console.log("SCORM API terminated successfully.");
    }
  },

  get(parameter) {
    const value = SCORM.get(parameter);
    if (value === null) {
      console.error(`Failed to get value for parameter: ${parameter}`);
    }
    return value;
  },

  set(parameter, value) {
    const success = SCORM.set(parameter, value);
    if (!success) {
      console.error(`Failed to set value for parameter: ${parameter}`);
    } else {
      SCORM.save();
      console.log(`Value set for ${parameter}: ${value}`);
    }
  },

  setComplete() {
    this.set("cmi.core.lesson_status", "completed");
  },

  setLocation(location: any) {
    this.set("cmi.core.lesson_location", location);
  },
};

export default Scorm;
