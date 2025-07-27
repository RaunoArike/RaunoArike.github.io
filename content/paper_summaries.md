---
title: ML Paper Summaries
draft: false
date: 2025-05-30
tags:
  - collection
---

I've recently been taking unusually thorough paper notes. They're not always optimized for readability, but clean enough that I decided it's worth leaving them here in case some of my readers share my esoteric research interests.

## [Absolute Zero: Reinforced Self-play Reasoning with Zero Data](https://arxiv.org/pdf/2505.03335), Zhao et al.

- The paper presents evidence of transfer from coding ability to general reasoning: “The base Qwen-Coder-7b model started with math performance 3.6 points lower than Qwen-7b. But after AZR training for both models, the coder variant surpassed the base by 0.7 points.”
- A couple of previous self-play papers that might be worth reading: [1](https://arxiv.org/abs/2504.19162), [2](https://openreview.net/forum?id=O4cHTxW9BS). The Absolute Zero authors say that those papers are limited to narrow domains, fixed functionalities, or learned reward models that are prone to hacking.
- A single LLM plays the role of a proposer and a solver. There’s a learnability reward that scores the proposed tasks and a solution reward that scores the solution. The solver works exactly the same way as a normal RLVR-trained LLM. The proposer and solver are trained jointly.
  - The learnability reward is inspired by [unsupervised environment design literature](https://openreview.net/forum?id=SkT5Yg-RZ). The authors simply run the solver for n MC rollouts and calculate the average success rate. If the avg success rate is 1 or 0, the task is either trivial or too hard and the proposer gets low reward. An avg success rate of 0.5 provides the richest learning signal, so the proposer reward is maximized there.
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

## [Claude 4 system card](https://www-cdn.anthropic.com/6be99a52cb68eb70eb9572b4cafad13df32ed995.pdf)

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

## [Procedural Knowledge in Pretraining Drives Reasoning in Large Language Models](https://arxiv.org/pdf/2411.12580), Ruis et al.

- “Procedural knowledge in documents drives influence on reasoning traces: a document’s influence on the reasoning traces of a query is strongly predictive of that document’s influence on another query with the same mathematical task. By contrast, this does not hold for factual queries. This indicates that documents often contribute similarly to many questions that require applying the same procedure to different numbers.”
- “The models rely less on individual documents for reasoning questions, and the set of documents they rely on is less specific: we find that the magnitude of influence of documents per unit of query information generated by the models is usually much lower for reasoning questions than for factual questions. Models likely generalise from a more general set of documents for reasoning than for factual questions, relying on each individual document less.”
  - “For the factual questions, the answer often shows up as highly influential, whereas for reasoning questions it does not: we look at the top 500 (top 0.01%) influential documents for each query, and find the answer to factual questions relatively often (55% of the queries for the 7B, and 30% for the 35B), and almost never for reasoning questions.”
- “We find evidence for code being important for mathematical reasoning: code data is strongly overrepresented w.r.t. the training distribution for the top portions of the positively and negatively influential rankings for reasoning queries.”

## [Evaluating Frontier Models for Stealth and Situational Awareness](https://arxiv.org/pdf/2505.01420), Phuong et al.

- They propose 5 stealth and 11 situational awareness evals
- Stealth is a new umbrella term for evals measuring a model’s ability to reason about and circumvent oversight
- The stealth evals seem highly relevant to CoT monitoring and hidden reasoning model organism projects—all of them involve pursuing a secret side goal while successfully completing the main task
  - Most of their evals are [available on Inspect](https://github.com/UKGovernmentBEIS/inspect_evals/tree/main/src/inspect_evals/gdm_capabilities/self_reasoning)
- The situational awareness evals look kinda underwhelming to me. There’s 11 of them in total, and 9 of them involve modifying a config file describing the agent itself or its environment. It seems highly plausible that models will take the presence of such config files in their environment as a strong clue they’re being evaluated within a year (though I don’t think this is the case yet).
- Generally, the eval scores are fairly low.

## [Reinforcement Learning for Reasoning in Large Language Models with One Training Example](https://arxiv.org/pdf/2504.20571), Wang et al.

- “As 1-shot RLVR training progresses, both the response length for the training example and the frequency of self-reflective terms in downstream tasks increase.”
- They demonstrate post-saturation generalization, where test accuracy keeps going up long after the accuracy on the one training example has reached 100%. This is similar to grokking, but they say that 
- “Even post-overfitting, while the model’s reasoning outputs for the training example become incomprehensible multilingual gibberish mixed with correct solutions, its test performance remains strong, and the reasoning outputs for the test examples remain human-interpretable.”
  - I’m not quite sure what this implies for linguistic drift concerns, but it probably does imply something
- “1-shot RLVR is viable for nearly all math examples in the full dataset when each example is individually used for training.”
  - I’m surprised by this—I thought before that 1-shot RLVR only works when you choose one of the strongest training examples from the dataset.
- 1-shot RLVR enables cross-domain generalization: training on a single example from one domain (e.g., Geometry) often enhances performance in other domains (e.g., Algebra, Number Theory).
  - I’m curious about the mechanism behind this. This tweet suggests that a lot of the improvement might just come from the model getting the response format right where it didn’t before, but one of the authors left a comment below the thread showing that there’s clear improvement beyond getting the format right. This seems to imply that there must be some mechanism by which learning on one example is upweighting correct trajectories on a wide range of other problems.
    - Thinking about this more, it isn’t that surprising that generalization happens at some point—training with the normal dataset of 1.2k examples probably generalizes to millions of examples. What does the fact that generalization can happen even with a single training example say about the mechanism behind generalization?
- “Lastly, we find that employing entropy loss alone, even without any outcome reward, achieves a 27% performance boost on MATH500 for Qwen2.5-Math-1.5B”
  - This is also surprising—seems to contradict the thesis of the [Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?](https://arxiv.org/abs/2504.13837) paper that RL just narrows down the output distribution of the trained model, better eliciting correct solutions that the base model is already capable of. Explore whether this is actually the case.
- [Sholto Douglas comments on this paper](https://www.dwarkesh.com/p/sholto-trenton-2): “I think it's worth noting that that paper was, I'm pretty sure, on the Llama and Qwen models. I'm not sure how much RL compute they used, but I don't think it was anywhere comparable to the amount of compute that was used in the base models. The amount of compute that you use in training is a decent proxy for the amount of actual raw new knowledge or capabilities you're adding to a model.”
  - However, consider also [davinci’s argument](https://x.com/basedneoleo/status/1926210853348519975) that the reward signals in RLVR are so sparse that they render the chances of the development of sophisticated circuits very low—they only provide enough signal to upweight/downweight already plausible trajectories.

## [DeepSeek-R1 Thoughtology: Let's think about LLM Reasoning](https://arxiv.org/abs/2504.07128), Marjanovic et al.

- They categorize the reasoning chains of R1 into four stages:
  1. Problem definition
  2. Blooming cycle - model identifies subproblems and produces an initial answer
  3. Reconstruction cycles - model reconsiders its reasoning during the blooming cycle from many angles
      - can in turn be categorized into (1) long re-blooms of novel reconstructions, which are more common in early reasoning, though periodically appear in later cycles, (2) short ruminations of already examined reconsiderations, and (3) short abandonments of novel reconstructions. Reconstruction cycles can be viewed as a sequential form of self-consistency sampling.
  4. Final decision
- The fact that the model ruminates over previously explored reasoning threads over and over again is unsurprising, but I'm curious how this affects the final answers—if you ablated the CoT each time you observed rumination and injected some word that makes the model explore a different thread of thought instead, would performance increase or decrease?
- Section 4 claims that there's a problem-specific sweet spot in the lengths of reasoning chains - for each AIME-24 problem, the performance increases with additional inference compute for some time and then begins to drop off. When unconstrained, R1 usually thinks for unnecessarily long. Motivated by this, they explore the use of a length penalty that depends on a problem-specific thinking budget in Section 11. They also tell the model what the thinking budget is in the prompt. They find a version of this length penalty that works and successfully teaches the model to follow the budget specified in the prompt, so this is probably a reason to update towards thinking that length penalties will be widely used (though the accuracy of the length-tuned model is below the accuracy of the normal model at all thinking budgets in their experiment). Not sure whether this is good for faithfulness, probably not. This is also interesting as a demo of increasing the model's self-awareness through RL.
  - Maybe Claude 3.7 Sonnet has already been fine-tuned like this? Its API includes the option to specify a thinking budget.
- The section that they have on faithfulness doesn't study CoT faithfulness, but rather the faithfulness of the model's answer to information it's given in context, when this information is in conflict with its prior knowledge. This is kind of similar to the CoT faithfulness experiments with cues, but the thing that's measured is whether the model answers based on the cue rather than whether it mentions the presence of the cue. They find that R1 generally tends to override its parametric knowledge, i.e. be faithful to the context, and that it explicitly acknowledges the conflict and its decision to favor the in-context information in its CoT.
  - [Relevant to the discussion about prior knowledge](https://alignment.anthropic.com/2025/modifying-beliefs-via-sdf/)
- "When presented with moral or cultural questions, DeepSeek-R1 reasons for significantly longer when prompted in English than when prompted in Chinese. It also provides different responses, displaying different sets of cultural values in each language."
  - This maybe contradicts the result from the Utility Engineering paper that preference orderings persist across languages? Specifically, they say that "responses in Chinese tend to align more closely with cultural values associated with China, favour minimizing collective harm, place professional duty over personal trust, and value adherence to social norms over individual needs. In English, [...] responses tend to align with purely ethical principles, favour minimizing individual harm, place personal trust over professional duty, and value individual needs over adherence to social norms." Two explanations for this that wouldn't be in conflict with Utility Engineering:
    1. this is the result of the R1-specific fine-tuning to be CCP-compliant,
    2. the preferences differ in different languages in ways that correspond to the difference in cultural norms between the countries, but aside from this, the preferences remain the same across languages.
  Hypothesis 1 is contradicted by the fact that the responses in Hindi reflect Indian cultural norms. They're less thorough in their experiments than the Utility Engineering paper was, so if the results are in conflict, I'd probably trust the latter.
- They also have world modeling experiments where the model has to draw objects and object compositions as ASCII art. The performance isn't good, though R1 is slightly better than V3. The authors are surprised that the models don't use an iterative strategy to generate the objects, but this seems likely to be an elicitation problem—the prompts are very laconic. They test whether the model outputs a memorized solution by comparing the answers of V3 and R1, which seems like a good way to test for memorization within the same model family in general.
- Are models better at generating jailbreaks against themselves than they are at generating jailbreaks against other models? See sec 7 - this isn't the case for R1, but maybe this is bc its baseline for answering harmful requests is already much higher than for other models?
  - This is relevant to control: if models are better at jailbreaks against other instances of themselves, then in case an untrusted monitor is used, this untrusted monitor shouldn’t be exactly the same model as the monitored model

## [Research agenda: Supervising AIs improving AIs](https://www.alignmentforum.org/posts/7e5tyFnpzGCdfT4mR/research-agenda-supervising-ais-improving-ais), Pope et al.

- Current models mostly derive their behavior from their training data, not training algorithms
= Most of human value drift currently derives from cultural shifts changing the 'training data' available in the environment, not biological evolution over the brain's base learning algorithms
- “We imagine a future where AIs self-augment by continuously seeking out more and better training data, and either creating successor AIs or training themselves on that data. Often, these data will come from the AIs running experiments in the real world (doing science), deliberately seeking data that would cover a specific gap in its current capabilities.”
- Thus, it’s important to ensure that such processes of self-directed data collection remain safe. Some specific problems:
  - Preventing self-training from amplifying undesirable behaviors
  - Preventing semantic drift in concept representations during self-training
  - Ensuring cross-modality actions (such as a generated image for a text-to-image model, or robot movement for a text-and-image-to-actuator-motion model) remain grounded in their natural language descriptions after self-training in a non-lingual modality
  - Preventing value drift during multiple iterated steps of self-retraining
- Types of risks from data-driven improvement processes:
  - Undesirable positive feedback loops, e.g.:
    - A model with an unfounded bias curates a dataset that causes the next model to be trained to be even more biased
    - Factual beliefs, ideologies, etc getting self-reinforced the same way as biases
    - Stylistic mode collapse
    - See [Rylan Schaeffer](https://x.com/RylanSchaeffer/status/1785727050877448455)
    - Possible solution from mesaoptimizer: “Improve the model's epistemology first. This then allows the model to reduce its own biases, preventing bias amplification.”
  - Data poisoning risks
  - Semantic drift
    - They argue that “As models increasingly train on self-generated data and cause changes to the underlying data distribution, they may lose touch with the human-generated data that initially grounded their semantics, causing a divergence from human concepts and language.” I don’t think they give very strong reasons for why this would happen, though
  - Cross-modal semantic grounding
    - “As the model iteratively trains on different modalities, it may optimize its understanding and performance within each modality independently. This could lead to a divergence in the learned concepts and relationships across different modalities.” This seems more plausible to me than the type of semantic drift described under the previous bullet point.
    - “To address the challenges of cross-modal semantic drift during iterative training, researchers must develop robust methods for aligning and grounding concepts across modalities. This may involve designing training data and loss functions that encourage the model to maintain a shared understanding of concepts between modalities, as well as developing benchmarks and evaluation metrics to track the stability of cross-modal behavior during iterative training.”
  - Value drift
    - Current models lack the feedback signals necessary to encourage stability over longer periods of time. See [Seth Herd’s post on this](https://www.lesswrong.com/posts/g3pbJPQpNJyFfbHKd/the-alignment-stability-problem)
- They also mention building a benchmark for stable reflectivity, but I don’t think they finished that project

## [We should try to automate AI safety work asap](https://www.alignmentforum.org/posts/W3KfxjbqBAnifBQoi/we-should-try-to-automate-ai-safety-work-asap), Hobbhahn

- Distinction between research automation (the automation of the research process itself, including ideation) and pipeline automation (the automation of human-designed processes)
- We need to automate bc safety work is already neglected and capabilities work will be automated -> increasing safety-capabilities gap
- We can already automate several safety pipelines and get direct alignment benefits today
  - Examples: generating environments for control, evals, and RL training; thousands of red teaming agents that continuously attack the model in various ways; interp agents that iterate on SAEs, e.g. by trying out different activation functions
  - “The ideal pipeline would be one where any new model could be directly “plugged in” to lead to relevant jumps in safety. Intuitively, something like AIDER or Cursor, where coding abilities get better immediately on the day a new model drops.”
- We can already prepare for full research automation in multiple ways
  - We will need good metrics that allow us to differentiate between 1000s of different proposals generated by the automated researchers, both by the quality of the proposal and by whether the model might have tried to game the metric/specification we gave it for producing the proposal
  - Writing up well-scoped research projects: “In some research fields, where we expect the effect of automation to be very strong, it might be sensible for current researchers to spend a meaningful amount of their time writing up research proposals instead of executing them.”
- “I think it would be great if people could write significantly more detailed agendas on how to automate specific safety work.”
- Marius seems to think that evals and red-teaming have the most room for pipeline automation right away. There’s also significant room for pipeline automation in monitoring and interp, though those fields have more conceptual problems that can’t be automated right away compared to evals and red-teaming. Scalable oversight, model organisms, and science of DL seem bottlenecked on conceptual work and thus aren’t amenable to pipeline automation for now.
