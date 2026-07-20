# MMPoT Survey — Project Website

Project website for **A Survey on Post-training of Multimodal Large Language Models**.

The site presents the survey through a unified behavior-shaping taxonomy:

1. instruction following;
2. preference calibration;
3. reason enhancement;
4. domain adaptation;
5. scalable learning.

It also links to the companion [Awesome Post-Training for MLLMs](https://github.com/zchoi/Awesome-Post-Training-for-MLLMs) reading list.

## Local development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm test
```

The static export is written to `dist/client/`.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. It reads the GitHub Pages base path at build time, so the same code works for both user pages and project pages.
