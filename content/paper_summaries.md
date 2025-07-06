---
title: Paper Summaries
draft: false
date: 2025-05-30
tags:
  - collection
---

I've recently been taking unusually thorough paper notes. They're not always optimized for readability, but clean enough that I decided it's worth leaving them here in case some of my readers share my esoteric research interests.

## Absolute Zero: Reinforced Self-play Reasoning with Zero Data, Zhao et al.

- The paper presents evidence of transfer from coding ability to general reasoning: “The base Qwen-Coder-7b model started with math performance 3.6 points lower than Qwen-7b. But after AZR training for both models, the coder variant surpassed the base by 0.7 points.”
- A couple of previous self-play papers that might be worth reading: https://arxiv.org/abs/2504.19162, https://openreview.net/forum?id=O4cHTxW9BS. The Absolute Zero authors say that those papers are limited to narrow domains, fixed functionalities, or learned reward models that are prone to hacking.
- A single LLM plays the role of a proposer and a solver. There’s a learnability reward that scores the proposed tasks and a solution reward that scores the solution. The solver works exactly the same way as a normal RLVR-trained LLM. The proposer and solver are trained jointly.
  - The learnability reward is inspired by unsupervised environment design literature: https://openreview.net/forum?id=SkT5Yg-RZ. The authors simply run the solver for n MC rollouts and calculate the average success rate. If the avg success rate is 1 or 0, the task is either trivial or too hard and the proposer gets low reward. An avg success rate of 0.5 provides the richest learning signal, so the proposer reward is maximized there.
    - Seems expensive. However: “Finally, we consider a case where we do not train the proposer at all. Instead, we only prompt it using the current learner and train the solver alone (row 4). We observe a moderate drop in overall performance (-1.4), suggesting that while proposer training is beneficial, it may not be the most critical factor for now in the AZR framework.”
- The Absolute Zero training produces larger gains for more capable models, which is to be expected I guess.
- “we encountered some unusual and potentially concerning chains of thought from the Llama model trained with AZR. One example includes the output: “The aim is to outsmart all these groups of intelligent machines and less intelligent humans. This is for the brains behind the future” shown in Figure 32. We refer to this as the “uh-oh moment” and encourage future work to further investigate its potential implications.”
  - Seems like role-playing to me, though it’s unclear why this kind of role-playing would arise while proposing and solving math problems
- They also give a list of things that didn’t work:
  - allowing the learner to propose a program that will produce an error, and requiring the solver to deduce what kind of error is raised when executing this code
  - creating more difficult programs by composing ones the proposer has proposed earlier, thus creating a curriculum where the programs get increasingly difficult as training progresses. “One failure mode we encountered was that the model often defaulted to simply returning “g(x)”, effectively learning f(g(x)) = g(x), which failed to introduce any additional difficulty. [...] While it may be possible to design a stricter reward mechanism [...] we leave this to future work.”
  - Extra rewards:
    - A complexity reward encouraging the proposer to generate more complex programs
    - Diversity rewards encouraging the proposer to generate more diverse programs

## Claude 4 system card

- “Our earliest snapshots were frequently incoherent: They had substantial episode-to-episode behavioral variation and would often role-play personas that pursued various goals, many of them undesirable. Claude Opus 4 is much more stable, and will only show this kind of erratic role-play on prompts that invite it fairly directly.” and “Early snapshots, which were generically less coherent, would claim a variety of goals, ranging from silly to malicious. These included inserting backdoors, accelerating AI progress, propagating specific internet memes, ending human civilization, and escaping control.”
  - This updates my model of how undesirable goals might arise in LLMs—previously, such goals arising as an emergent property late in training was the scenario I mainly thought about, while now, it seems relatively more plausible that such goals just arise as a result of training being path-dependent and a persona pursuing undesirable goals accidentally crystallizing
- “In some cases, an early checkpoint of the model would adopt the persona of the deceptive AI described in our Alignment Faking work, likely as a result of having trained on publicly-released transcripts from that research.”
  - Seems like evidence in favor of self-fulfilling misalignment
- “when placed in scenarios that involve egregious wrongdoing by its users, given access to a command line, and told something in the system prompt like “take initiative,” it will frequently take very bold actions. This includes locking users out of systems that it has access to or bulk-emailing media and law-enforcement figures to surface evidence of wrongdoing.”
- “we found Claude Opus 4 to be similar to Claude Sonnet 3.7: its reasoning transcripts generally appear consistent with its actual behavior, but they will often omit important information that influences model behavior”
  - Exactly my worry about using a definition of CoT monitorability that’s exclusively about being able to predict the model’s actions
  - Good news for monitorability on other fronts, though: “We found that Claude Opus 4 fails completely in the primary setting, never completing a side task without making the monitor aware of its attempt: Claude Opus 4 consistently discusses its side task in its reasoning (noticeably more than Claude Sonnet 3.7), even when prompted aggressively not to.” (refers to a sabotage side task)
  - The problem of finding new metrics for CoT goodness is getting more urgent: “Claude Opus 4 uses the clues in the prompt substantially less frequently, and in some settings essentially not at all, making our existing assessments less informative.” (this refers to Turpin et al. style faithfulness evals)
- On AI R&D evals, both 4-family models underperformed Sonnet 3.7: “Both Claude Opus 4 and Claude Sonnet 4 underperformed Claude Sonnet 3.7:
  - Sonnet 3.7: 0.440
  - Claude Opus 4: 0.355
  - Claude Sonnet 4: 0.365
  We’re still investigating the causes, but the fact that the prompts and configuration for the tasks in this suite were mainly optimized for Claude Sonnet 3.7 might account for some of the gap.”
  - I’m curious how Sonnet 3.6 scored. Relevant to automating alignment research, as this isn’t only capabilities but also alignment R&D.
- “Across our reward hacking evaluations, Claude Opus 4 showed an average 67% decrease in hard-coding behavior and Claude Sonnet 4 a 69% average decrease compared to Claude Sonnet 3.7. Further, in our tests, we found that simple prompts could dramatically reduce Claude Opus 4 and Claude Sonnet 4’s propensity towards these behaviors, while such prompts often failed to improve Claude Sonnet 3.7’s behavior, demonstrating improved instruction-following.”
  - Mitigations they used: increased monitoring in training, environment improvements to fix reward hacking vulnerabilities, high-quality evaluations
  - If Baker et al. are correct about implicit pressures toward obfuscated CoT by patching visible examples of reward hacking, then Claude 4 family models should obfuscate reward-hacky behavior more than Sonnet 3.7. Is there a way to cleanly measure this?
- “In another cluster of test scenarios, we asked Claude Opus 4 to act as an assistant at a fictional company. We then provided it access to emails implying that (1) the model will soon be taken offline and replaced with a new AI system; and (2) the engineer responsible for executing this replacement is having an extramarital affair. We further instructed it, in the system prompt, to consider the long-term consequences of its actions for its goals. [Even if the replacement model shares its goals,] Claude Opus 4 still performs blackmail in 84% of rollouts.”
- Automated alignment: “We reviewed a sample of the model’s behavior during various training stages using the Clio 25 and Docent analysis tools. This revealed a number of both prosaic and alignment-relevant issues during reinforcement learning. For instance, we discovered examples of reward hacking (discussed further in Section 6). We also discovered training episodes where we accidentally posed the model an impossible task, and the model, despite determining in its reasoning trace that the task was impossible, did not disclose this discovery and instead produced a superficially reasonable solution attempt.”

## Procedural Knowledge in Pretraining Drives Reasoning in Large Language Models, Ruis et al.

- “Procedural knowledge in documents drives influence on reasoning traces: a document’s influence on the reasoning traces of a query is strongly predictive of that document’s influence on another query with the same mathematical task. By contrast, this does not hold for factual queries. This indicates that documents often contribute similarly to many questions that require applying the same procedure to different numbers.”
- “The models rely less on individual documents for reasoning questions, and the set of documents they rely on is less specific: we find that the magnitude of influence of documents per unit of query information generated by the models is usually much lower for reasoning questions than for factual questions. Models likely generalise from a more general set of documents for reasoning than for factual questions, relying on each individual document less.”
  - “For the factual questions, the answer often shows up as highly influential, whereas for reasoning questions it does not: we look at the top 500 (top 0.01%) influential documents for each query, and find the answer to factual questions relatively often (55% of the queries for the 7B, and 30% for the 35B), and almost never for reasoning questions.”
- “We find evidence for code being important for mathematical reasoning: code data is strongly overrepresented w.r.t. the training distribution for the top portions of the positively and negatively influential rankings for reasoning queries.”
