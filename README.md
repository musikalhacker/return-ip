# return-ip

A minimal Node.js app that displays the visitor’s public IP address.  
Infrastructure is defined in Terraform and the app is deployed to an Azure App Service **Free (F1)** plan via GitHub Actions.

## What it does

- Returns a clean page showing only the caller’s public IP (IPv4 or IPv6).
- Runs on the Azure App Service Free tier.
- Infrastructure can be created or destroyed with Terraform.
- Application code is deployed automatically by GitHub Actions on every push to `main`.

## Free tier limitations

- Plan: **F1 (Free)**
- Always On is not available.
- **Custom domains are not supported** on Free or Shared tiers.  
  You must scale to at least Basic (B1) to bind a custom domain or use an App Service managed certificate.
- The public URL is `https://<app-name>.azurewebsites.net`.

## Prerequisites

- Azure subscription
- Azure CLI authenticated (`az login`)
- Terraform >= 1.5
- GitHub repository with Actions enabled

## Deploy

1. Clone the repo and change into the Terraform directory:
   ```bash
   cd terraform
   ```

2. Create the infrastructure:
   ```bash
   terraform init
   terraform apply
   ```
   Note the App Service name (default: `return-ip-mhacker`).

3. Retrieve the publish profile:
   ```bash
   az webapp deployment list-publishing-profiles \
     --name return-ip-mhacker \
     --resource-group rg-return-ip \
     --xml
   ```

4. In the GitHub repository go to **Settings → Secrets and variables → Actions** and add:
   - `AZURE_WEBAPP_NAME` = `return-ip-mhacker`
   - `AZURE_WEBAPP_PUBLISH_PROFILE` = the full XML output from the previous command

5. Push a commit to `main` (or manually re-run the workflow).  
   GitHub Actions will deploy the app.

6. Visit `https://return-ip-mhacker.azurewebsites.net`.

## Tear down

```bash
cd terraform
terraform destroy
```

## Project layout

```
.
├── app/                  # Node.js source
│   ├── server.js
│   └── package.json
├── terraform/            # Infrastructure as code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── .github/workflows/    # Deploy pipeline
    └── deploy.yml
```

## License

MIT
