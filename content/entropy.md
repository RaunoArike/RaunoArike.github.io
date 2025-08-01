---
title: Does the Entropy of the Universe Always Increase?
draft: false
date: 2025-06-25
tags:
  - physics
  - essay
---

> "The law that entropy always increases holds, I think, the supreme position among the laws of Nature. If someone points out to you that your pet theory of the universe is in disagreement with Maxwell's equations — then so much the worse for Maxwell's equations. If it is found to be contradicted by observation — well, these experimentalists do bungle things sometimes. But if your theory is found to be against the Second Law of Thermodynamics I can give you no hope; there is nothing for it to collapse in deepest humiliation."
>
> — Sir Arthur Eddington

I have twice participated in conversations where my friends have questioned whether the second law of thermodynamics actually holds when applied to the universe as a whole. The argument roughly goes like this:

- The early universe, roughly at the time of the Big Bang, was in a high-entropy state (i.e., it had a uniform distribution of matter/energy).
- The final heat death state will also be a high-entropy state.
- In the meantime, the universe expands, but this expansion can be viewed as akin to a rescaling: we can just change the scale of the early universe, adding vast amounts of vacuum between the particles of the early universe, and we'll end up with the heat death universe. Therefore, entropy doesn't meaningfully increase over the universe's lifetime.

They agree, of course, that there are local fluctuations in entropy — if matter clumps up to form a planet, that's clearly a lower-entropy state compared to the same matter forming a uniform cloud of gas —, but in the grand scheme of things, there's no second law of thermodynamics at play.

It's intuitively clear that this argument cannot be right, for if the universe started off in a thermal equilibrium, there would have been no reason for stars and planets to form in the first place and we wouldn't be here debating the matter. However, in neither of my two conversations have I been able to convincingly refute the argument. To shield myself and my friends against collapse in deepest humiliation in case this topic comes up for a third time, I've decided to write up a proper analysis of the argument here.[^1]

This post will assume a fair amount of background knowledge in statistical mechanics, quantum mechanics, and cosmology. If you need a refresher, I've got you covered — just skip to the end of the post and read the last section before reading the main body.

## Some basic observations

First, note that there are numerous ways to define entropy. There's Boltzmann entropy, there's Gibbs entropy, there's von Neumann entropy, there's Shannon entropy, and more. By default, I'll be using Boltzmann entropy. With this out of the way, let's figure out what implications the expansion of the universe has for the calculation of its entropy. Some observations:

### Classical considerations

1. Using the common-sense definition of the universe as that which encompasses all time and space, it cannot be anything but an isolated system. By definition, there is nothing outside the universe to exchange matter and energy with. This points us to a potential issue: if there's nothing outside the universe, then what is it expanding into?
2. For the calculation of entropy to make sense, we need a system where some parameters (a combination of temperature, volume, pressure, enthalpy, and some other macro-level parameters) remain constant.
3. If we assume the holographic principle, the maximum entropy of any region of space is proportional not to its volume but to the area of the boundary surface enclosing that region. In an expanding universe, the boundary area enclosing the universe grows and thus, the maximum possible entropy also increases.

### Quantum mechanical considerations

1. Every pure state has a von Neumann entropy of zero, while a maximally mixed state has a von Neumann entropy of one. If we were to take the many-worlds view, then the universal wavefunction is always in a pure state and mixed states arise in our maps of the world due to the fact that our observations are fundamentally limited only to a small subsystem of the universal wavefunction. From an observer-free perspective, the multiverse is an isolated system undergoing unitary evolution. Such a system is always in a pure state and thus, its entropy starts out zero and remains zero forever. Since the resolution of the question is fairly straightforward in this case, I'll focus on the question of whether entropy is increasing inside our specific branch of the multiverse.
2. The entropy of a system depends on the size of its quantum phase space. As the size of the phase space increases (through more degrees of freedom, energy levels, particles, etc.), the maximum possible entropy increases accordingly.
3. In quantum mechanics, we don't have a single second law, but rather a family of second laws.

https://claude.ai/chat/63b635f8-a745-434d-b1a7-a3028aa0d737

Now, some of those observations suggest that the entropy in the universe is increasing, while others suggest that it's constant and yet others require in-depth investigation before we can decide what they imply. In particular, there seems to be some tension between the classical and QM considerations. Let's go through each of them in turn.

## Entropy in an expanding classical universe

You may protest that our universe isn't classical, so there's no point in wasting our time discussing it. However, classical theories generally approximate the behavior of our universe so well that it would be very surprising if classical and quantum theory reached wildly different conclusions on the second law of thermodynamics.

### If the universe is an isolated system, then what is it expanding into? 

One can imagine three very different coherent interpretations of the statement that 'space is expanding':

1. We should view the universe as an isolated system whose coordinate system is being rescaled, increasing distances between objects without requiring any outside system to expand into. Space itself is stretching, increasing distances between objects without requiring that any additional space be created from somewhere.
2. We should give up on the notion that what we call the universe is an isolated system. Instead, we should employ different terms to point at the clump of matter that gave rise to the Big Bang and to the entire spacetime, and say that the clump of matter coming from the Big Bang is expanding to fill the entire spacetime. In this view, the Big Bang would be an explosion within spacetime, rather than an expansion of spacetime.
3. There's a higher-dimensional flat embedding space that our curved space-time is expanding into.

By General Relativity, the first view is correct — the expansion of the universe is an intrinsic property of spacetime itself. Our standard model of cosmology is given by the FLRW (Friedmann-Lemaitre-Robertson-Walker) solutions of Einstein's field equations.

*(does space stretch or does spacetime stretch?)*

The second view mistakenly treats space as a static background against which objects move, rather than as a dynamic entity that itself evolves. Any short description of this in English is prone to misunderstandings: see Sean Carroll's blog post on this. The third explanation is technically plausible: it's possible to embed our 4D space-time inside a 10D flat space-time. However, that embedding space is unobservable by construction, so by Occam's razor, we're better off just leaving this embedding space out of our theory.

### What macro-level parameters can we assume to be constant when calculating entropy? 

If the coordinate system is stretching, then intuitively, the volume of the universe should remain constant at all times. However, cosmologists distinguish between proper volume (which expands with the universe) and comoving volume (which factors out the cosmic expansion). The entropy density per comoving volume provides a meaningful measure that accounts for expansion...

### Is the boundary area enclosing the universe growing? 

Recall our conclusion from above: we shouldn't say that the universe is expanding into something, but rather that spacetime is stretching. Should we then also say that the boundary area enclosing the universe is stretching out?

Here, an important clarification is that we can make arguments based on the holographic principle only once we have defined the boundary that we're talking about. One well-defined boundary we might choose is the cosmic event horizon — the boundary beyond which we cannot receive signals due to the expansion of space. Due to the fact that our universe is expanding, the proper distance to the cosmic event horizon is growing, but it's approaching a constant value rather than growing indefinitely. Thus, the maximum entropy bound is also growing and approaching a constant value.

Assuming that the universe is fairly uniform, the same thing would be happening in other parts of the universe, meaning that the maximum entropy bound would also be increasing everywhere.

## Entropy in a quantum multiverse

### Is the wavefunction governing our universe approaching a maximally mixed state?

As established before, we're going to think about entropy inside our Everettian multiverse branch, rather than over the entire multiverse. Quantum decoherence theory says that the branches of the multiverse look like a nicely pruned tree:

/ fig /

Over time, each individual branch keeps losing contact with more and more of the other branches. The quantum state inside one single branch becomes more and more mixed, the knowledge of the observers within that branch becomes more and more limited from a global perspective, and thus, from the perspective of the observers inside that branch, entropy increases further and further.

Decoherence theory also says that eventually, this tree will run out of room to expand and the branches of the multiverse will start interfering with each other again. However, decoherence theory is still very much an open research domain, so I'm unsure how much we should trust this prediction. Even the intellectual giant that is Scott Aaronson appears to still be confused about the details of the interplay between cosmic expansion and decoherence theory — a quote from his book Quantum Computing Since Democritus reads: “Incidentally, the fact that our universe is expanding exponentially — that there’s this vacuum energy pushing the galaxies apart — seems like it might play an important role in “thinning out the multiverse tree,” and thereby buying us more time until the branches start interfering with each other. This is something I’d like to understand better.”

### Is the size of the quantum phase space increasing?

[^1]: Humiliation or not, I want to give a shoutout to my friends for being willing to go into deep discussions about this in the first place.

[^2]: This is not to be confused with the particle horizon, which defines the observable universe. The cosmic event horizon doesn't define the observable universe, but rather the boundary beyond which events will never be observable to us in the future due to cosmic expansion