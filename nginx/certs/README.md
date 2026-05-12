# TLS Certificates

Drop your ZeroSSL certificate files here before starting nginx. Two files are required:

- `fullchain.pem` — your server certificate **concatenated with** the ZeroSSL intermediate bundle
- `privkey.pem`  — the private key you generated when ordering the cert

## Building `fullchain.pem` from a ZeroSSL download

ZeroSSL typically delivers a zip containing `certificate.crt`, `ca_bundle.crt`, and `private.key`.
Combine the server cert and intermediate chain in that order:

```bash
cat certificate.crt ca_bundle.crt > fullchain.pem
cp private.key privkey.pem
chmod 600 privkey.pem
```

The files are mounted read-only into the nginx container at `/etc/nginx/certs/`
(see `docker-compose.yml`). They are gitignored so they will not be committed.

After dropping the files in, reload nginx:

```bash
docker compose restart nginx
```
