#!/bin/bash


SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

ENV_PATH="$SCRIPT_DIR/duckdns.env"

cd "$SCRIPT_DIR"

if [ -f "$ENV_PATH" ]; then
  export $(grep -v '^#' "$ENV_PATH" | xargs )
else
  echo "El archivo duckdns.env no se encuentra en el directorio actual."
  exit 1
fi

if [ -z "$DUCKDNS_TOKEN" ]; then
  echo "El token de DuckDNS no está definido."
  exit 1
fi
if [ -z "$DUCKDNS_DOMAIN" ]; then
  echo "El dominio DuckDNS no está definido."
  exit 1
fi

IP=$(curl -s http://ifconfig.me)
IP=$(echo "$IP" | tr -d '[:space:]')
DUCKDNS_TOKEN=$(echo "$DUCKDNS_TOKEN" | tr -d '[:space:]')

sleep 1

echo "IP: $IP"
echo "DUCKDNS_TOKEN: $DUCKDNS_TOKEN"

URL1="https://www.duckdns.org/update?domains=$DUCKDNS_DOMAIN&token=$DUCKDNS_TOKEN&ip=$IP"

echo "URL1: $URL1"

response1=$(curl -v -s "$URL1")
echo "Respuesta 1: $response1"

sleep 30

echo "Curl completado"