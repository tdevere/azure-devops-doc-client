# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public issue.** Instead, send an email to the repository maintainers or use GitHub's private vulnerability reporting feature under the **Security** tab of this repository.

Please include:

- A description of the vulnerability
- Steps to reproduce
- The potential impact
- Suggested remediation (if any)

We will acknowledge receipt within 48 hours and aim to provide a fix or mitigation plan within 7 days.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.x     | Yes       |

## Security Best Practices for Users

- **Never commit `.env` files** containing secrets. Use `.env.example` as a template.
- Rotate your `AZDO_PAT` regularly and scope it to the minimum required permissions.
- When running in CI, store secrets in GitHub Actions secrets — never in workflow files.
- Use `AZDO_ACCESS_TOKEN` (short-lived bearer tokens) over `AZDO_PAT` when possible.
