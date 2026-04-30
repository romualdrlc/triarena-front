# Quasar App (triarena-front)

A Quasar Project
## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


Host gitlab.pro.com
HostName gitlab.pro.com
User git
Port 443
IdentityFile ~/.ssh/id_ed25519
AddKeysToAgent yes
UseKeychain yes

Host gitlab.com
HostName gitlab.com
User git
IdentityFile ~/.ssh/id_ed25519
AddKeysToAgent yes
UseKeychain yes

# GitHub Perso (Port 443 pour passer Zscaler)
Host github.com
HostName ssh.github.com
User git
Port 443
IdentityFile ~/.ssh/id_github_perso
IdentitiesOnly yes
AddKeysToAgent yes
UseKeychain yes
~                       