---
name: deploy
description: Build and deploy Lightning Everywhere (Docker image → Docker Hub → DigitalOcean Kubernetes) via the manual GitHub Actions workflow, or explain/modify the pipeline. Outward-facing — only when the user explicitly asks to deploy.
argument-hint: "[status|run|local-image]"
disable-model-invocation: true
---

# Deploy

Read `.claude/rules/deployment.md` first. Production is https://lightningeverywhere.com — **confirm with the user before any step that pushes an image or changes the cluster.**

## Preferred: GitHub Actions (manual)

Workflow: `.github/workflows/build-push-deploy.yaml` ("Build+Push+Deploy Lightning Everywhere into my Kubernetes"), trigger `workflow_dispatch`.

```bash
git status && git log origin/main..HEAD --oneline    # what's unpushed? the workflow builds the remote ref
gh workflow run build-push-deploy.yaml --ref main    # after user confirms
gh run list --workflow=build-push-deploy.yaml --limit 3
gh run watch <run-id>
```

The image tag is the first 7 chars of the commit SHA. Secrets used: `REACT_APP_BLOG`, `REACT_APP_API_BASE_URL`, `REACT_APP_GOOGLE_CLIENT_ID`, `REACT_APP_GA_MEASUREMENT_ID`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `DIGITALOCEAN_ACCESS_TOKEN`, `CLUSTER_NAME`.

## Local image (manual, from README)

```bash
docker build \
  --build-arg REACT_APP_BLOG=false \
  --build-arg REACT_APP_API_BASE_URL=https://lightningeverywhere.com/api \
  --build-arg REACT_APP_GOOGLE_CLIENT_ID=... \
  --build-arg REACT_APP_GA_MEASUREMENT_ID=... \
  -t stepanklos/lightningeverywhere:<tag> .
docker run --rm -p 8080:8080 stepanklos/lightningeverywhere:<tag>   # smoke test at http://localhost:8080
```

Without `--build-arg`s the bundle has no API URL and the app shows no data. Push (`docker push`) only on explicit request.

## Before deploying

- `verify` skill passes, including `npm run build`.
- Changes are pushed to `origin/main` (the workflow checks out the remote).
- New env var? Update Dockerfile `ARG/ENV`, workflow `--build-arg` + `sed`, `config/deployment.yaml` placeholder, GitHub secret, README.

## Rollback

Re-run the workflow on a previous commit, or `kubectl set image deployment/lightningeverywhere lightningeverywhere=stepanklos/lightningeverywhere:<old-sha7>` (requires user's kube access; confirm first).
