# Configure HTTPS for local development

## Configure `webpack-dev-server`

The `start` command in the `package.json` file is already configured to use the `localhost.pem` and `localhost-key.pem` files from the `certificates/` folder.  
If this is not the case, add the following config to the `start` command: `--cert certificates/localhost.pem --key localhost-key/key.pem`. If these are not passed explicitly, the dev server will generate some self-signed ones, which are, of course not trusted on the machine.

To make the current certificates trusted, register the `sigma certificate authority.crt` with the OS (as a trusted root authority). This should make the 'Your connection is not private' browser errors go away. The backend apis certificates are also signed with this very same authority - and the idea is to keep it that way (i.e. have all development certificates signed with the same authority).

## Generate certificates

In case these certificates do not work as expected, contact gertjan.verschuren@mediagenix.tv. Should you decide to generate new ones, please do not overrule the current ones in the git repo.

Execute: `openssl req -newkey rsa:2048 -nodes -keyout localost-key.pem -x509 -days 365 -out localhost.pem`.
Alternatively, use [makecert](https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/).