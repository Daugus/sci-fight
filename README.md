# sci-fight

Instalar:

```bash
npm i
```

## Desarrollo

Iniciar servidor de desarrollo:

```bash
npm run dev
```

## Build

```bash
npm run build
#
npm run preview
```

## Docker

Crear imagen y subir a Docker Hub:

```bash
docker tag $(docker build -q .) dlcde/sci-fight:1.0
docker push dlcde/sci-fight:1.0
```
