---
paths:
  - "Dockerfile"
  - "nginx.conf"
  - "config/**"
  - ".github/**"
  - ".envrc"
---

# Build & deployment

Pipeline: **GitHub Actions (manual `workflow_dispatch`)** → `docker build` with build-args → push `stepanklos/lightningeverywhere:<sha7>` to Docker Hub → `sed` placeholders in `config/deployment.yaml` → `doctl` kubeconfig → `kubectl apply` on DigitalOcean K8s → `kubectl rollout status`.

## Key facts

- `REACT_APP_*` values are **baked into the JS bundle at `npm run build`** inside the Dockerfile's build stage. They must be passed as `--build-arg`. The `env:` entries in `deployment.yaml` do nothing for the SPA at runtime (they are informational only).
- Adding a new env var therefore requires touching **four** places: `Dockerfile` (`ARG` + `ENV`), workflow `--build-arg`, workflow `sed` + `deployment.yaml` placeholder (for consistency), and GitHub repository secrets. Plus `.envrc` locally and the README list.
- Everything inlined into the bundle is public. Only put public identifiers there (API URL, OAuth client ID, GA ID) — never secrets.
- Runtime image: `nginxinc/nginx-unprivileged`, listens on **8080**, SPA fallback `try_files $uri /index.html` (required for client-side routes like `/admin/*`).
- K8s: `Deployment lightningeverywhere` (2 replicas, containerPort 8080) + `Service lightningeverywhere-service` (ClusterIP 80→8080). Ingress/TLS is managed outside this repo.
- Docker build uses `npm install --legacy-peer-deps` and copies only `package.json` first (no lockfile) — builds aren't fully reproducible.
- Placeholders in `config/deployment.yaml` (`<IMAGE>`, `<BLOG>`, `<API_BASE_URL>`, `<GOOGLE_CLIENT_ID>`, `<GA_MEASUREMENT_ID>`) must stay literal in git — CI substitutes them.

## Never

- Commit `.envrc` (gitignored) or real secrets.
- Trigger the workflow, push images, or `kubectl apply` without the user explicitly asking — see `/deploy` skill.
