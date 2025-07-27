---
title: "Review: The Conscious Mind"
draft: false
date: 2025-04-10
tags:
  - review
  - essay
  - philosophy
---

*I recommend reading Rafael Harth’s [Why it's so hard to talk about Consciousness](https://www.lesswrong.com/posts/NyiFLzSrkfkDW4S7o/why-it-s-so-hard-to-talk-about-consciousness) before reading any other piece on consciousness.*

## Introduction

Reading David Chalmers's *The Conscious Mind* was a conflicting experience. On the one hand, I can very much relate to a Goodreads reviewer who commented on the book that “my margin notes became increasingly hostile before abandoning this book altogether.” The main reason behind this is that I disagree with Chalmers on a core premise behind his theory—that a world identical to ours atom-by-atom that is inhabited by p-zombies is logically conceivable. In Chalmers’s mind, it’s easy to imagine this p-zombie world, and that the burden of proof should lie with those who believe that such a world is logically impossible. Consequently, his argumentation for this claim comes across as rather handwavy, despite a key cornerstone of the entire book.

On the other hand, the book was valuable to me in three ways:
1. It gives a good conceptual grounding for reasoning about consciousness and a good overview of the space of different theories of consciousness,
2. It’s an interesting example of a smart person trying to challenge your core beliefs and to form a coherent theory that rests on premises that go very strongly against the beliefs of an average science-pilled person today, and
3. Leaving Chalmers’s dualist leaning aside, his theory of consciousness is actually fairly similar to what a reductive functionalist might develop. I’ll discuss how he puts together those viewpoints in depth below. The book is overall interesting and Chalmers is certainly a strong philosopher.

## The Fundamentals

Chalmers begins with an extended tour across things that he does not mean when he’s discussing consciousness. These things include:
- **awakeness**—an ability to process information about the world and deal with it in a rational fashion,
- **introspection**—awareness of the contents of our internal states,
- **reportability**—the ability to report our mental states,
- **self-consciousness**—our ability to think about ourselves and notice that we exist as individuals distinct from others,
- **attention**,
- **voluntary control**—the ability to perform deliberate actions, and
- **knowledge**.

Chalmers makes a distinction between functional/psychological and phenomenal notions. He claims that the above qualities all qualify as functional notions, while his focus is on explaining phenomenal consciousness. Phenomenal consciousness is defined as the subjective, first-person experience of what it's like to be in a particular mental state—the qualitative, experiential aspects of consciousness such as the redness of red, the pain of a headache, or the taste of chocolate. Chalmers argues that the discourse around consciousness is muddled by the fact that the psychological and phenomenal notions are often conflated, and people who claim to explain consciousness actually explain psychological states.

Chalmers then introduces the concept of supervenience. The notion of supervenience formalizes the intuitive idea that one set of facts can fully determine another set of facts. For example, once all the physical facts are set, all biological facts follow. In other words, biological facts supervene on physical facts.

It’s worth distinguishing two kinds of supervenience relations: logical and natural supervenience. Logical supervenience means that the supervening facts follow from the base facts as a matter of logical necessity. Natural supervenience means that the supervening facts follow from the base facts as a matter of natural law in our world, but it's logically possible for the base facts to remain the same while the supervening facts differ.

Armed with the concept of supervenience, we can now define materialism (i.e. physicalism). Materialism is true if all the positive facts about the world are globally logically supervenient on the physical facts. {Global supervenience means that …}

## The Core Claims

Chalmers claims that consciousness does not logically supervene on physical laws and facts. This view is based on the following arguments:
1. **Conceivability of p-zombies**: We can easily imagine the existence of p-zombies—entities who are functionally equivalent to us in every possible way, but who lack conscious experience. Chalmers argues that this fact alone is sufficient to establish that p-zombies are conceivable, arguing that the burden of proof lies on those who claim this to be inconceivable: “In general, a certain burden of proof lies on those who claim that a given description is logically impossible. If someone truly believes that a mile-high unicycle is logically impossible, she must give us some idea of where a contradiction lies, whether explicit or implicit.”
2. **The inverted spectrum argument**: In making a conceivability argument against logical supervenience, one need not establish the logical possibility of zombies: it’s sufficient to establish the logical possibility of a world physically identical to ours where conscious experiences are different. It seems easy to imagine an identical world where the conscious experiences of my clone are inverted—e.g., my red experiences are my clone’s blue experiences and vice versa.
3. **The epistemic asymmetry argument**: Even if we knew every last detail about the physics of the universe, it wouldn’t lead us to postulate the existence of conscious experience. The knowledge of consciousness comes from first-person experience, not any external observations.
4. **The knowledge argument**: Imagine that we are living in an age of a completed neuroscience. Mary, one of the world’s leading neuroscientists, has been brought up in a black-and-white room and has never seen any colors except for black, white, and shades of gray. She knows all physical facts about the neuroscience of vision, but she nevertheless doesn’t know what it is like to experience redness.

Chalmers says that consciousness is almost unique in its failure to supervene logically on the facts and laws of physics. Specifically, he claims: “we can say that the facts about the world are exhausted by (1) particular physical facts, (2) facts about conscious experience, (3) laws of nature, (4) a second-order "That's all" fact, and perhaps (5) an indexical fact about my location (The last two are minor compared to the others, and the status of the last is dubious, but I include them for completeness.).” This bugs me: why should I believe that everything in the world is reductively explainable, but there happens to be this one very specific thing unique to living organisms on Earth that isn't?[^1] Alas, "it bugs me" is not a particularly good refutation of a theory, so what are my specific disagreements with the aforementioned four arguments?

Consider a physicist at the beginning of the 20th century who’s just beginning to understand quantum mechanics. She already knows the Born rule and understands that if an event has $n$ possible outcomes, then the 2-norm of the amplitudes corresponding to those events has to sum to unity. Assume that the physics behind how state transformations happen in quantum mechanics is yet to be worked out. It would then be easy for this physicist to claim that quantum mechanics is a generalization of probability theory, and that it’s easy to imagine other worlds just like ours governed by different generalizations of probability theory, e.g. ones where the 3-norm of the outcome vector has to sum to unity.

As it turns out, this 3-norm world actually isn't logically possible. Suppose that you want to invent a theory that's based on the p-norm for some $p \notin \{1, 2\}$. Call $(v_1, \ldots, v_N)$ a unit vector in the *p*-norm if

$|v_1|^p + \cdots + |v_N|^p = 1.$

Then, to enable unitary state evolution, we'll need a set of linear transformations that map any unit vector in the p-norm to another unit vector in the *p*-norm. If $p \notin \{1, 2\}$, the only linear transformations that satisfy this requirement are permutation matrices (rearranging components), diagonal matrices with entries ±1 (sign flips), and combinations of these two. In our universe, many more linear transformations are possible: rotations, complex phase shifts, etc. Thus, any world like ours that evolves in rich and complex ways must be described by a physical theory where *p* is set to either 1 or 2.

The moral of the story is that in the domain of logical conceivability, *generation is easier than verification*. It’s easy to imagine logically incoherent worlds if you, like the physicist in our example, are missing the tools required to disprove your conjectures (our physicist’s mistake comes from the fact that the theory of state transformations in quantum mechanics is yet to be worked out). I cannot prove that a similar lack of theoretical tools is also behind our inability to explain consciousness, but this analogy makes me think that the burden of proof should lie with those who claim that an imaginary world is logically possible, not the other way around. Thus, for me, arguments (1) and (2) are moot as Chalmers doesn’t offer any proof for them aside from saying that such worlds are easy to imagine. Argument (3) suffers from a similar problem—we don’t know what knowing every physical detail about the universe looks like, so it’s perilous to make any claims about what postulations such knowledge would lead us to. The knowledge argument doesn’t convince me either: it seems plausible that Mary would acquire new ways of accessing facts she already knew rather than learn entirely new ones when she sees red.

## A Taxonomy of Theories of Consciousness

But enough with the criticism—let’s move on to one of my favourite parts of the book. To differentiate between various views on consciousness, Chalmers states the following four premises:
1. Conscious experience exists.
2. Conscious experience is not logically supervenient on the physical.
3. If there are phenomena that are not logically supervenient on the physical facts, then materialism is false.
4. The physical domain is causally closed.

He then gives a taxonomy of seven popular views on consciousness:
1. **Eliminativism**. Eliminativism denies premise (1) and asserts that there are no positive facts about conscious experience. Nobody is conscious in the phenomenal sense.
2. **Reductive functionalism**. Reductive functionalism denies premise (2) and claims that the p-zombie world is logically impossible. Reductive functionalists claim that what it means for a state to be conscious is for it to play a certain causal role. In a world physically identical to ours, exactly the same causal interactions would arise and therefore, consciousness would also necessarily arise.
3. **Nonfunctionalist reductive materialism**. This view denies premise (2) and claims that the facts about consciousness are logically implied by the physical facts in virtue of some nonfunctional property. Possible candidates might include biochemical and quantum properties, or properties yet to be determined.
4. **New-physics materialism**. This view also denies premise (2) and claims that we can’t explain consciousness because our current conception of physical facts is too narrow. This view agrees that our universe as described by current physics would indeed also be conceivable as a zombie universe, but claims that new physics will be discovered that will entail consciousness.
5. **Nonreductive materialism**. Nonreductive materialists deny premise (3) and posit a third supervenience category: metaphysical supervenience. They claim that although a zombie world is logically coherent, it is metaphysically impossible that a universe identical to ours contains p-zombies.
6. **Interactionist dualism**. This view denies premise (4) and denies that the physical world is causally closed, so that consciousness can play an autonomous causal role.
7. **Naturalistic dualism**. This is Chalmers’s view—it accepts all of the four premises. It asserts that consciousness supervenes naturally on the physical, but not logically or metaphysically.

This isn’t a comprehensive overview: Chalmers also mentions biological materialism, physicalist-functionalism, psychofunctionalism, anomalous monism, representationalism, consciousness as higher-order thought, reductive teleofunctionalism, emergent causation, mysterianism, neutral monism, and don’t-have-a-clue materialism. Most of them turn out to be versions of the views described above, and this post is already getting too long, so I won’t discuss them here.

I’m personally in the reductive functionalist camp. I’m not an eliminativist, as I do believe that there’s something to be explained—that in my current state of knowledge, I could imagine looking at a red thing without having an associated feeling of ‘redness’. I am happy to attach the label ‘consciousness’ on this thing that needs to be explained. However, I’m unwilling to claim that the fact that I can imagine a p-zombie version of myself that looks at a red thing without a feeling of ‘redness’ implies that such a p-zombie is logically possible.

If Chalmers were asked to convert me, he would say the following:

> The problem with [reductive functionalism], of course, is that it misrepresents what it means to be a conscious experience, or to be conscious. When I wonder whether other beings are conscious, I am not wondering about their abilities or their internal mechanisms, which I may know all about already; I am wondering whether there is something it is like to be them. This point can be supported in various familiar ways. One way is to note that even once we have explained various functional capacities, the problem of explaining experience may still remain. Another rests on the observation that we can imagine any functional role being played in the absence of conscious experience. A third derives from the fact that knowledge of functional roles does not automatically yield knowledge of consciousness. There are also the objections, made earlier, that a functionalist analysis cannot account for the semantic determinacy of attributions of consciousness and that it collapses the conceptual distinction between consciousness and awareness.

My answer is again that it’s very much not obvious to me that p-zombies are logically possible. To me, it seems possible that a deeper understanding of physics and neuroscience would enable me to understand why the experiences we have are an inevitable byproduct of the functional activity of our brains, and then, I will no longer be able to imagine the same functional activity taking place in the absence of conscious experience.

## Chalmers's Theory of Consciousness

In the second half of the book, Chalmers attempts to lay out the beginnings of a nonreductive theory of consciousness. He claims that a theory of consciousness requires the discovery of psychophysical laws, which … Parts of the theory are interesting, while others appear weak. Among the foundational principles of his theory is the principle that people's reports concerning their experiences by and large accurately reflect the contents of their experience. Notice that this immediately renders the theory incapable of distinguishing between conscious people and p-zombies, since p-zombies would produce exactly the same self-reports as we do. However, under the assumption that p-zombies are logically conceivable and produce exactly the same reports about their consciousness as we do, it seems like explaining the difference between the two is perhaps the most important thing about consciousness that needs to be explained! To answer the question “What is consciousness?”, it seems to me that we necessarily need to answer the question “What makes us different from functionally identical p-zombies, if they exist, or if they don’t, what do we point to when we say that our experience of the world involves something on top of pure information processing?”

There’s also the problem of coming to know about our experiences. Chalmers claims that this happens through non-causal pathways:

> Our knowledge of conscious experience does not consist in a causal relationship to experience, but in another sort of relationship entirely. [...] Where there is causation, there is contingency: a causal connection that holds might not have held. If the sole source of justification for a belief about X is a causal connection to X, then a subject cannot know for certain that the causal connection exists. The only way they might know this for certain would be if they had some independent access to X or to the causal chain, but this would imply knowledge grounded in something more than the causal chain itself. There will always be a skeptical scenario in which everything seems just the same to the subject, but in which the causal connection is absent and in which X does not exist; so the subject cannot know for certain about X. But we do know for certain that we are conscious; so a causal account of this knowledge is inappropriate.
>         
> Of course, an opponent might simply deny that our knowledge of consciousness is certain, and assert that there are skeptical scenarios that we cannot rule out—a zombie scenario, for example. But anyone who takes this view will likely be an eliminativist (or a reductive functionalist) about consciousness from the start. If one accepts that our immediate evidence does not rule out the possibility that we are zombies, then one should embrace the conclusion that we are zombies: it leads to a much simpler view of the world, for a start. But the reason there is a problem about consciousness is that our immediate evidence does rule out that possibility. To take consciousness seriously is to accept that we have immediate evidence that rules out its nonexistence.

It’s hard for me to see how my observations about my internal states could be different from any other observations I make, and [I’m not 100% certain of anything](https://www.lesswrong.com/posts/QGkYCwyC7wTDyt3yT/0-and-1-are-not-probabilities). It’s also hard for me to see how I could make any observations that don’t have a causal chain leading up to them: the belief that I’m having an experience results from the activity of my neurons, and something has to cause my neurons to fire. Finally, Chalmers’s position here raises problems for the view that there can exist a zombie world that’s functionally equivalent to ours: shouldn’t we expect that Chalmers’s book would be relatively less popular in the zombie world, given that we should be absolutely certain that we’re conscious and thus take consciousness seriously, unlike the zombies?

## Absent Qualia, Fading Qualia, Inverted Qualia, Dancing Qualia

**(to be completed)**

Despite all of the above, the rest of the book takes a viewpoint surprisingly close to one that a reductive functionalist might take. Chalmers writes:

> “The project I have outlined can be seen as a search for a sort of functionalist account of consciousness. It is not a reductive functionalist account—it does not say that the playing of some functional role is all there is to consciousness, or all there is to be explained. Rather, it is a nonreductive account, one that gives functional criteria for when consciousness arises. All the same, there is a sense in which it is playing in the same ballpark as reductive functionalist accounts; these also give functional criteria for when consciousness arises, alongside their more ambitious metaphysical claims.”

The main difference between Chalmers and reductive functionalists is thus in metaphysical rather than in object-level beliefs, meaning that the objections he addresses would also need to be addressed by any functionalist theory. Let’s go over those objections next.

First, Chalmers discusses objections against the invariance principle. The first one, the **absent qualia** argument, comes from the camp which holds that for a system to be conscious, it must have the right sort of biochemical makeup. This objection attempts to construct a reductio ad absurdum by describing systems functionally equivalent to the brain but structurally so outlandish that we must not ascribe consciousness to them. In a popular example, it is imagined that the entire population of China is made to emulate a brain, with each individual person playing the role of an individual axon or dendrite (see [the China brain](https://en.wikipedia.org/wiki/China_brain) thought experiment)—should we accept that such a system is conscious? Chalmers answers that …

The second objection, the **inverted qualia** argument, grants that systems with a very different functional organization (e.g. computers) might be conscious, but claims that such systems could have a very different conscious experience from ours. ...

Chalmers also argues for a version of panpsychism, though panpsychism isn’t central to his theory. Rather, it’s the most intuitive view that falls out when working out the details of his property dualist theory. Since the way he figures out the details is akin to how a reductive functionalist might do that, his arguments are worth discussing even in light of my rejection of his property dualism.

## Applications

To finish the book, Chalmers discusses the applications of theories of consciousness. The chapter on AI is the first one where I found myself nodding along with Chalmers pretty much the whole time. In this chapter, Chalmers treats famous arguments against machine consciousness, such as Searle’s Chinese room and Penrose’s claim that human minds can transcend Gödel’s Incompleteness Theorem. Chalmers’s response to the Chinese room argument is basically a restatement of his earlier response to the absent qualia argument: that the functional relations that occur inside the Chinese room do in fact give rise to consciousness. His response to Penrose is that humans cannot in fact “just see” the consistency of an arbitrary formal system.

Finally, Chalmers discusses interpretations of quantum mechanics. After some discussion about the pros and cons of various widely known interpretations, Chalmers ends up endorsing an Everettian view. He then discusses various problems with the view, the problem of the preferred basis being a significant one. This problem goes as follows. The Everett interpretation claims that the Schrödinger equation is all there is, there is no wave function collapse, and the world is always in a huge superposition, even the macroscopic parts. A wave function does not come with an objective division into components, but can be decomposed in many ways, depending on the choice of a basis. Where the brain state can be decomposed into a "perceiving up" and a "perceiving down" state, it can equally be decomposed into two states each of which have confused perceptions. Everett’s own treatment of the issue allowed only for discrete minds, but thus added an additional postulate on top of the Schrödinger equation.

Chalmers claims that the resolution of this problem depends on a theory of consciousness, and further, that his information-theoretic theory already predicts a satisfactory resolution! This is a strong claim. What are his arguments?

For Chalmers, consciousness arises when a physical system $P$ implements a computation $C$. Now, consider a superposition of $P$ with other orthogonal states. For a substate $S$ of the original system, we can find a corresponding substate $S'$ of the superposed system: the superposed system is in $S'$ if the system obtained by projecting it onto the hyperplane of P is in S. Since the Schrödinger equation is linear, the state-transition relations between the substates $S'$ precisely mirror the relations between the original substates $S$. These relations in turn precisely mirror the relations between the substates of $C$, establishing that the superposed system also implements $C$.

This argument appears valid to me, but not particularly unique to Chalmers’s theory: it seems like it could be made based on any functionalist account of consciousness. Thus, it seems like Chalmers oversells his theory by claiming that this is a specific prediction made by it.

[^1]: One might argue for panpsychism and say that consciousness thus isn’t unique to us on Earth, but the empirical observations that would lead one to argue for panpsychism are still uniquely concentrated in living beings on Earth—one wouldn’t look at a rock and conjecture panpsychism.