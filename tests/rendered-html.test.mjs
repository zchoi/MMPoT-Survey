import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../dist/client/", import.meta.url);

test("exports a complete paper landing page", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /A Survey on Post-training of Multimodal Large Language Models/);
  assert.match(html, /Instruction Following/);
  assert.match(html, /Preference Calibration/);
  assert.match(html, /Reason Enhancement/);
  assert.match(html, /Domain Adaptation/);
  assert.match(html, /Scalable Learning/);
  assert.match(html, /Awesome-Post-Training-for-MLLMs/);
  assert.doesNotMatch(html, /Starter Project|Your site is taking shape/);

  const affiliationOrder = [
    "Tongji University",
    "Qwen-Character Team, Alibaba Group",
    "Southwest Jiaotong University",
    "University of Trento",
    "ETH Zürich",
  ];
  let affiliationPosition = -1;
  for (const affiliation of affiliationOrder) {
    const nextPosition = html.indexOf(affiliation, affiliationPosition + 1);
    assert.ok(nextPosition > affiliationPosition, `${affiliation} appears in the requested order`);
    affiliationPosition = nextPosition;
  }
});

test("ships the social card and core figures", async () => {
  await Promise.all(
    [
      "og.jpg",
      "favicon.png",
      "figures/intro.png",
      "figures/mllm_post_training_timeline.webp",
      "figures/benchmark.webp",
      "institutions/tongji.png",
      "institutions/qwen.png",
      "institutions/southwest-jiaotong.png",
      "institutions/trento.svg",
      "institutions/eth-zurich.png",
    ].map((path) => access(new URL(path, root))),
  );
});
