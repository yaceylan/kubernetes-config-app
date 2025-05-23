# Reflexion

1.  **Best Practice: Konfiguration außerhalb von Docker Images** 

    Die Entkopplung von Konfiguration und Docker Images ist eine empfohlene Vorgehensweise, die mehrere Vorteile bietet (im Sinne der 12-Factor App). Sie verbessert die Portabilität, da dasselbe Image in unterschiedlichen Umgebungen eingesetzt werden kann. Die Sicherheit wird erhöht, weil sensible Informationen nicht im Image selbst hinterlegt sind. Zudem erleichtert es die Wartung, da Konfigurationsänderungen keinen Image-Neubau erfordern, und ermöglicht eine klarere Trennung in der Versionskontrolle. Es unterstützt die Skalierbarkeit durch einfache Anpassung der Einstellungen für jede Umgebung.

2.  **Zweckunterscheidung: ConfigMap vs Secret**

    Der Unterschied zwischen ConfigMaps und Secrets liegt in ihrem Einsatzbereich. ConfigMaps dienen der Speicherung unkritischer Konfigurationsdaten. Secrets hingegen sind für die Verwaltung sensibler Informationen konzipiert und werden base64-kodiert gespeichert.

3.  **Bereitstellung von Konfiguration für Container in Kubernetes** 
(YAML-Konfiguration)

    In Kubernetes gibt es hauptsächlich zwei Wege, Konfigurationen an Container im Pod zu übergeben. Zum einen können einzelne Werte aus ConfigMaps oder Secrets als Umgebungsvariablen gesetzt werden, indem man im `env`-Abschnitt über `valueFrom` auf spezifische Schlüssel referenziert (`configMapKeyRef` oder `secretKeyRef`). Zum anderen besteht die Möglichkeit, den gesamten Inhalt einer ConfigMap oder einzelne Einträge aus Secrets als Dateien in ein Volume zu mounten und so im Container unter einem bestimmten Pfad zugänglich zu machen (`volumes` und `volumeMounts`).


4.  **Umgang mit kritischen Passwörtern in Produktion: ENV Var vs. Gemountete Datei**

    Für sensible Produktionsdaten wie Datenbankpasswörter ist das Mounten als Datei sicherer, da Dateisystemberechtigungen besser kontrolliert werden können und die Werte nicht in Prozesslisten auftauchen. Dies ermöglicht auch potenziell Updates ohne Neustart und eine genauere Überwachung.

5.  **Vorsicht bei `stringData` in Kubernetes Secrets und Git-Repositories**

    Obwohl stringData die Handhabung von Secrets vereinfacht, indem Geheimnisse direkt im YAML eingegeben werden können, sollte man die potenziellen Sicherheitsrisiken bedenken. 
    Da die Geheimnisse bei der Nutzung von stringData im YAML-File im Klartext enthalten sind und dies im Git-Verlauf protokolliert wird, empfiehlt es sich, diese Secret-Manifeste nicht in öffentlichen Repositories zu verwalten.