# Snyk Security Example

A Node.js project demonstrating Snyk vulnerability scanning integration with GitHub Actions CI/CD pipeline.

## 🔒 Security Features

This project showcases:

- **Snyk CLI Integration**: Automated vulnerability scanning
- **GitHub Actions Workflows**: CI/CD with security checks
- **Pull Request Security Comments**: Automatic vulnerability reporting
- **Scheduled Security Scans**: Daily monitoring
- **Vulnerability Reporting**: JSON artifacts with detailed reports

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start the application
pnpm start
```

The API will be available at `http://localhost:3000`

### API Endpoints

- `GET /` - Basic info and lodash version
- `GET /health` - Health check endpoint
- `POST /process-data` - Process data using lodash

## 🛠️ Development

```bash
# Development mode with auto-reload
pnpm dev

# Run tests
pnpm test

# Code quality checks
pnpm lint
pnpm format:check
pnpm type-check
```

## 🔐 Security Commands

```bash
# Test for vulnerabilities
pnpm security:test
```

## 📋 Setup Instructions

### 1. Snyk Account Setup

1. Create a free account at [snyk.io](https://snyk.io)
2. Get your API token from Account Settings
3. Add `SNYK_TOKEN` to your GitHub repository secrets

### 2. GitHub Actions

The project includes two workflows:

**`snyk-security.yml`**:

- Runs on push to main/develop branches
- Scheduled daily scans at 2 AM UTC
- Fails builds on critical/high vulnerabilities
- Uploads SARIF results to GitHub Security tab
- Generates vulnerability count summaries

**`pull-request.yml`**:

- Runs on pull requests to main
- Comments security scan results on PRs
- Shows vulnerability breakdown by severity
- Uploads scan results as artifacts

### 3. Local Development

```bash
# Install Snyk CLI globally (optional)
npm install -g snyk

# Authenticate with your token
snyk auth YOUR_TOKEN_HERE

# Test current project
snyk test

# Monitor project (sends to Snyk dashboard)
snyk monitor
```

## 🧪 Testing Vulnerabilities

This project intentionally includes:

- **lodash@4.17.20** - Contains known vulnerabilities for demonstration
- **express@^4.18.0** - May have indirect vulnerable dependencies

Run `pnpm security:test` to see detected vulnerabilities.

## 📊 GitHub Actions Features

### Security Scan Results

- **Vulnerability Counts**: Critical, High, Medium, Low breakdown
- **Build Failures**: Automatic failure on critical/high vulnerabilities
- **Artifact Uploads**: 30-day retention of detailed JSON reports
- **SARIF Integration**: Results appear in GitHub Security tab

### Pull Request Integration

- **Automated Comments**: Security status on every PR
- **Vulnerability Details**: Package names, versions, and fixes
- **Risk Assessment**: Clear pass/fail indicators

## 🏗️ Workflow Configuration

The workflows support:

- **Branch Protection**: Different rules for main vs feature branches
- **Scheduled Scans**: Configurable cron schedules
- **Severity Thresholds**: Customizable failure conditions
- **Multiple Formats**: JSON, SARIF, and summary outputs

## 🔧 Customization

### Adjusting Security Thresholds

Edit `.github/workflows/snyk-security.yml`:

```yaml
args: --severity-threshold=medium # Change from 'low'
```

### Modifying Schedule

```yaml
schedule:
  - cron: '0 6 * * 1' # Weekly Monday 6 AM instead of daily
```

### Adding Ignore Rules

Edit `.snyk` file to ignore specific vulnerabilities:

```yaml
ignore:
  SNYK-JS-LODASH-567746:
    - '*':
        reason: 'This vulnerability is not applicable to our use case'
        expires: '2025-12-31T23:59:59.999Z'
```

## 📈 Monitoring Dashboard

After running `pnpm security:monitor`, view your project at:
`https://app.snyk.io/org/your-org/projects`

## 📚 Learn More

- [Snyk Documentation](https://docs.snyk.io/)
- [GitHub Actions for Snyk](https://github.com/snyk/actions)
- [Snyk CLI Commands](https://docs.snyk.io/snyk-cli/commands)

## Requirements

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Snyk account (free tier available)

## License

MIT - See [LICENSE](LICENSE) file for details
