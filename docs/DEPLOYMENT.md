# Deployment & scaling

## Local development

From the repo root:

```bash
npm install
npm run dev
```

Or run each app separately:

```bash
cd apps/api && cp .env.example .env && npm run dev
cd apps/web && cp .env.example .env.local && npm run dev
```

Dependencies for all workspaces can be installed once from the root with `npm install` (see root `package.json` workspaces).

## Production topology (recommended)

- **Web**: Vercel (or CloudFront + Lambda@Edge) for Next.js.
- **API**: ECS/Fargate, Cloud Run, or Kubernetes — **min 2 replicas**, autoscale on CPU/latency.
- **Data**: Starter uses JSON. For production, migrate to RDS PostgreSQL, MySQL, or managed document storage with backups and PITR.
- **Cache**: Redis for rate limiting + session store if moving to cookies.
- **Object storage**: S3 + CloudFront signed URLs.
- **Secrets**: AWS Secrets Manager / GCP Secret Manager; never commit `.env`.
- **Observability**: OpenTelemetry traces, structured logs to Datadog/CloudWatch, Sentry for errors.

## CI/CD

- Lint + typecheck on every PR.
- Use seeded JSON fixtures or a preview database once production persistence is introduced.
- Gate future data migrations on a release pipeline with backward-compatible deploys.

## Scaling checklist

- [ ] Production database and read replicas for heavy GETs
- [ ] Dedicated search cluster
- [ ] Queue workers for notifications and webhooks
- [ ] WAF + bot management at edge
- [ ] Data residency review per region
