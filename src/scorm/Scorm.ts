import { SCORM } from "pipwerks-scorm-api-wrapper";

let Scorm = {

  init() {
    SCORM.init();
  },

  
  recordObjectiveProgress(objectiveId: string, score: number) {
    let interactionIndex = this.getInteractionIndex(objectiveId);
    if (interactionIndex === -1) {
      interactionIndex = this.createInteraction(objectiveId);
    }
    this.setInteractionScore(interactionIndex, score);
  },
  
   getInteractionIndex(objectiveId: string) {
    const count = parseInt(SCORM.get("cmi.interactions._count") || "0", 10);
    for (let i = 0; i < count; i++) {
      if (SCORM.get(`cmi.interactions.${i}.id`) === objectiveId) {
        return i;
      }
    }
    return -1;
  },
  
   createInteraction(objectiveId: string) {
    const count = parseInt(SCORM.get("cmi.interactions._count") || "0", 10);
    SCORM.set(`cmi.interactions.${count}.id`, objectiveId);
    SCORM.set(`cmi.interactions.${count}.type`, "choice");
    return count;
  },
  
   setInteractionScore(index: number, score: number) {
    SCORM.set(
      `cmi.interactions.${index}.result`,
      score > 0 ? "correct" : "incorrect"
    );
    SCORM.set(`cmi.interactions.${index}.student_response`, score.toString());
    SCORM.save();
  },

  setObjective(objectiveId: string) {
    const count = parseInt(SCORM.get("cmi.objectives._count") || "0", 10); // Récupère le nombre d'objectifs, le nombre 10 est le maximum
    let objectiveIndex = -1;

    for (let i = 0; i < count; i++) {
      if (SCORM.get(`cmi.objectives.${i}.id`) === objectiveId) { // vérifie que l'objectif n'existe pas déjà
        objectiveIndex = i;
        break;
      }
    }

    if (objectiveIndex === -1) { // si l'objectif n'existe pas, crée un nouvel objectif
      objectiveIndex = count;
      SCORM.set(`cmi.objectives.${objectiveIndex}.id`, objectiveId);
    }

    // Pas besoin de sauvegarder ici car c'est simplement la création de l'objectif
    return objectiveIndex;
  },
  
   setObjectiveStatus(objectiveId: string, status: "completed" | "incomplete") {
    const count = parseInt(SCORM.get("cmi.objectives._count") || "0", 10);
    let objectiveIndex = -1;
    for (let i = 0; i < count; i++) {
      if (SCORM.get(`cmi.objectives.${i}.id`) === objectiveId) {
        objectiveIndex = i;
        break;
      }
    }
  
    SCORM.set(`cmi.objectives.${objectiveIndex}.status`,status === "completed" ? "completed" : "incomplete");
    SCORM.save();
  },
  
   setCompletionStatus(status: "completed" | "incomplete") {
    const statusValue = status === "completed" ? "completed" : "incomplete";
    SCORM.set("cmi.core.lesson_status", statusValue);
    SCORM.save();
  },
  
  
   getObjectiveStatus(objectiveId: string): "completed" | "incomplete" | null {
    const count = parseInt(SCORM.get("cmi.objectives._count") || "0", 10);
    for (let i = 0; i < count; i++) {
      if (SCORM.get(`cmi.objectives.${i}.id`) === objectiveId) {
        return SCORM.get(`cmi.objectives.${i}.status`) as "completed" | "incomplete";
      }
    }
    return null;
  },
  
  getSuspendData() {
    const data = SCORM.get("cmi.suspend_data");
    return data ? JSON.parse(data) : null;
  },
  
   setSuspendData(data: object) {
    SCORM.set("cmi.suspend_data", JSON.stringify(data));
    SCORM.save();
  },
  
   finishLMS() {
    SCORM.quit();
  }

}


export default Scorm;
