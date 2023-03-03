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
npm run preview
```

## Docker

Crear imagen y subir a Docker Hub:

```bash
docker build -t dlcde/sci-fight -t dlcde/sci-fight:[tag] .
docker push dlcde/sci-fight dlcde/sci-fight:[tag]
```

Descargar imagen e iniciar servidor:

```bash
docker pull dlcde/sci-fight
docker run -dp [port]:3000 --name sci-fight dlcde/sci-fight
```
