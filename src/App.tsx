import React, { useEffect, useState } from "react";
import Scorm from "./scorm/Scorm.ts";

const App: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<string>("i1");
  const [buttonText, setButtonText] = useState<string>(
    "Compléter Item 1 et Passer à l'Item 2"
  );

  useEffect(() => {
    // Initialisation de SCORM
    Scorm.init();

    // Vérification de l'emplacement précédent
    const lessonLocation = Scorm.get("cmi.core.lesson_location");
    if (lessonLocation) {
      setCurrentItem(lessonLocation);
      if (lessonLocation === "i2") {
        setButtonText("Compléter Item 2 et Finir le Cours");
      }
    }

    return () => {
      // Terminaison de la session SCORM
      Scorm.terminate();
    };
  }, []);

  const handleCompleteAndNext = () => {
    // Marquer l'item actuel comme complété
    Scorm.setComplete();

    if (currentItem === "i1") {
      // Enregistrer l'emplacement de l'item suivant
      Scorm.setLocation("i2");
      // Passer à l'item suivant (rechargement simulé pour exemple)
      setCurrentItem("i2");
      setButtonText("Compléter Item 2 et Finir le Cours");
    } else if (currentItem === "i2") {
      // Marquer le cours entier comme complété
      Scorm.setComplete(); // Equivalent à Scorm.setCompletionStatus("completed")
    }

    // Terminer la session pour permettre le passage à l'item suivant ou finaliser le cours
    Scorm.terminate();

    // Recharger pour simuler la transition vers le nouvel item ou fin du cours
    window.location.reload();
  };

  return (
    <div>
      <h1>{currentItem === "i1" ? "item 1" : "item 2"}</h1>
      <button onClick={handleCompleteAndNext}>{buttonText}</button>
    </div>
  );
};

export default App;
