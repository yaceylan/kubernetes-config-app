# Kubernetes Konfigurations-App

Dieses Repository enthält eine einfache Node.js-Anwendung, die zeigt, wie Konfiguration und sensible Daten in Kubernetes mithilfe von ConfigMaps und Secrets verwaltet werden können.

## Aufgabe

Die Aufgabe umfasst die Erstellung einer Node.js-Anwendung, deren Dockerisierung und das Deployment in einem lokalen Kubernetes-Cluster unter Verwendung von ConfigMaps für nicht-sensible und Secrets für sensible Konfigurationsdaten. Die Anwendung loggt die gelesene Konfiguration, wobei sensible Werte als Platzhalter dargestellt werden.

## Deployment

Um die Ressourcen in einem Kubernetes-Cluster zu deployen, müssen folgende Schritte aus dem `kubernetes/`-Verzeichnis ausgeführt werden:

1.  **ConfigMap und Secret anwenden:**
    ```bash
    kubectl apply -f app-configmap.yaml
    kubectl apply -f app-secret.yaml
    ```
2.  **Deployment und Service anwenden:**
    ```bash
    kubectl apply -f app-deployment.yaml
    kubectl apply -f app-service.yaml
    ```

Nach dem Anwenden der Manifeste wird der Status der Pods und des Deployments überprüft:

```bash
kubectl get deployment my-config-app-deployment
kubectl get pods -l app=my-config-app