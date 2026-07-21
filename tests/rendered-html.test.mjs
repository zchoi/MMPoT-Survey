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
  assert.match(html, /Multimodal Behavior-Shaping Loop/);
  assert.match(html, /Key milestones of MLLMs post-training/);
  assert.match(html, /A Venn diagram showing the interrelationships among key AI fields/);
  assert.match(html, /An overall landscape of MLLMs post-training research/);
  assert.doesNotMatch(html, /Starter Project|Your site is taking shape/);
  assert.doesNotMatch(
    html,
    /Unified lens|Five-family taxonomy|Evaluation loop|Research roadmap|Instruction activation|Feedback calibration|self-improvement/,
  );

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
      "mm-pot-logo.png",
      "figures/intro.png",
      "figures/mllm-post-training-timeline.png",
      "figures/mllm-fields-venn.png",
      "figures/mllm-post-training-landscape.png",
      "figures/benchmark.webp",
      "institutions/tongji.png",
      "institutions/qwen.png",
      "institutions/southwest-jiaotong.png",
      "institutions/trento.png",
      "institutions/eth-zurich.png",
    ].map((path) => access(new URL(path, root))),
  );
});
