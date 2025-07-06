---
title: "Review: Quantum Computing Since Democritus"
draft: false
date: 2025-04-11
tags:
  - review
  - essay
---

*Quantum Computing Since Democritus* is the most fun book I've read in a while. The haters will say that the book is all over the place and has no single coherent narrative, and the haters are right about that, but this doesn't make the book any less fun! Given the fact that there's no coherent narrative, and not wanting to just rewrite each chapter and spoil everything, my review will simply present my favorite question discussed in each chapter (or sometimes multiple of them). If you're interested in these sorts of questions (and don't find them trivial), you'll definitely be interested in reading the book.[^1]

### Chapter 1 — Atoms and the void

The first chapter doesn't have much technical discussion, so here's a quote instead, which nicely set the tone for the rest of the book: "I'd like to draw a more general lesson here. What's the point of talking about philosophical questions? [...] I want to suggest a more exalted role than intellectual janitor: philosophy can be a scout. It can be an explorer – mapping out intellectual terrain for science to later move in on, and build condominiums on or whatever."

### Chapter 2 — Sets

Bertrand Russell has said: "To choose one sock from each of infinitely many pairs of socks requires the Axiom of Choice, but for shoes the Axiom is not needed." What's the difference?

### Chapter 3 — Gödel, Turing, and friends

Consider the "self-hating theory" $\mathsf{PA} + \neg\mathsf{Con}(\mathsf{PA})$, i.e. Peano Arithmetic plus the assertion of its own inconsistency. We know that if $\mathsf{PA}$ is consistent, then the self-hating theory must be consistent as well – otherwise $\mathsf{PA}$ would prove its own consistency, which is forbidden by Gödel's Incompleteness Theorem. Therefore, it then follows by Gödel's Completeness Theorem that $\mathsf{PA} + \neg\mathsf{Con}(\mathsf{PA})$ must have a model. What could such a model possibly look like? What happens if, within that model, you just asked to see the proof that $\mathsf{PA}$ was inconsistent?

### Chapter 4 — Minds and machines

Is there any problem of intermediate difficulty between the computable problems and the halting problem? If so, what are those problems like?

**Bonus question:** Can we assume without loss of generality that a computer program has access to its own source code?

### Chapter 5 — Paleocomplexity

Does every problem have a fastest algorithm? Or are there problems that admit an infinite sequence of algorithms, with each one faster than the last but slower than some other algorithm?

**Bonus question:** Suppose you're given the first-order theory of the integers—that is, you have the theory of $(\mathbb{Z}, +, \times, 0, 1, <)$.[^2] By Gödel's Incompleteness, this theory is undecidable—you can use the integers to encode self-referential statements. What about the first-order theory of the reals (i.e., the theory of $(\mathbb{R}, +, \times, 0, 1, <)$), though? Is that theory also undecidable? And what if we throw in the exponential function and switch to the complex numbers, getting the theory of $(\mathbb{C}, +, \times, \exp, 0, 1, <)$?

### Chapter 6 — P, NP, and friends

Observe that you can put any NP problem instance into the form:

> Does there exist an $n$-bit string $X$ such that $A(X)=1$?

where $A$ is a function computable in polynomial time. Observe also that you can put any coNP[^3] problem instance into the form:

> Does $A(X)=1$ for every $X$?

Now, we can throw in another quantifier, like this:

> Does there exist an $X$ such that for every $Y$, $A(X,Y)=1$?
> 
> For every $X$, does there exist a $Y$ such that $A(X,Y)=1$?

This gives us two new complexity classes, called $\Sigma_2^P$ and $\Pi_2^P$ respectively. We can also throw in a third quantifier:

> Does there exist an $X$ such that for every $Y$, there exists a $Z$ such that $A(X,Y,Z)=1$?
> 
> For every $X$, does there exist a $Y$ such that for every $Z$, $A(X,Y,Z)=1$?

This yields the complexity classes $\Sigma_3^P$ and $\Pi_3^P$. We can keep going on and on and on like this.

The question is the following. If $P = NP$, then the whole polynomial hierarchy would collapse down to $P$, i.e., 

$$P = NP = coNP = \Sigma_2^P = \Pi_2^P = \Sigma_3^P = \Pi_3^P = \Sigma_4^P = \cdots$$

Why is this the case?[^4]

### Chapter 7 — Randomness

In 2002, Agrawal et al. showed that primality testing, believed to be …, is in $P$. Can every efficient randomized algorithm be derandomized like that? In other words, does $P = BPP$? If your answer is that we don't know, then which answer seems more likely to you?

### Chapter 8 — Crypto

Does the existence of pseudorandom generators (PRGs) imply the existence of one-way functions (OWFs)? What about the converse — does the existence of OWFs imply the existence of PRGs? And what's the significance of this for computer security?

### Chapter 9 — Quantum

In probability theory, the probabilities of all possible outcomes of an event must sum to 1. We can equivalently say that the $\ell_1$-norm of the vector of probabilities has to be unity. If we want to come up with a theory that's exactly like probability theory but replaces this rule by requiring that the $\ell_2$-norm of the probability vector sums to 1, we get quantum mechanics. Can we keep going like this, finding new interesting theories based on different norms? It turns out that the $\ell_1$-norm and $\ell_2$-norm are special. Consider the same rule expressed for an arbitrary $p$-norm:

$$|v_1|^p + \cdots + |v_N|^p = 1$$

We can now apply linear transformations to the vector $[v_1 \ldots v_N]$. For any $p$ we choose, there will be some trivial transformations that preserve the $p$-norm after the transformation: permuting around the elements of the vector and adding minus signs in front of them. However, it turns out that if there are any linear transformations that preserve the $p$-norm beyond these trivial ones, then either $p = 1$ or $p = 2$. Why is this the case?

**Bonus question 1:** Prove that if quantum mechanics were nonlinear, then not only could you solve NP- complete problems in polynomial time, you could also use EPR pairs to transmit information faster than the speed of light.

**Bonus question 2:** Does the No-Cloning Theorem imply Heisenberg's uncertainty principle? Does Heisenberg's uncertainty principle imply the No-Cloning Theorem?

### Chapter 10 — Quantum computing

Are there any problems for which quantum computers can give an exponential speedup over classical computers (feel free to also consider problems that require access to oracles)? If yes, does this have any implications for the ability of quantum computers to efficiently solve problems in $NP$?

### Chapter 11 — Penrose

If we posit that human brains cannot be perfectly cloned through any classical cloning processes because there's some quantum information that makes you who you are, does this imply that we have to think of the brain as a quantum computer and that it maintains entanglement across multiple neurons?

### Chapter 12 — Decoherence and hidden variables

Why, in the decoherence picture of quantum mechanics, is the statement that there's an arrow of time equivalent to the statement that the future is the direction where entropy increases and to the statement that the past is the direction we remember and the future is the direction we don't?

**Bonus question:** By the decoherence theory, the branches of the multiverse form a tree shape, branching into more and more universes that cannot interfere with each other. Is there ever going to be a time where those branches start getting closer and closer together and, eventually, interfering with each other? What does the fact that our universe is expanding imply for this multiverse tree?

**Bonus question 2:** The section on hidden variable theories introduces an interesting way in which algorithm design has been useful in exploring possible interpretations of quantum mechanics. A hidden-variable theory can be viewed as a rule for converting a unitary transformation into a classical probabilistic transformation. In other words, if

<div style="text-align: center">
<img src="/img/aaronson_1.png" alt="Stochastic matrix equation" style="width: 400px; margin: 1em 0;">
</div>

then we must have

<div style="text-align: center">
<img src="/img/aaronson_2.png" alt="Stochastic matrix equation" style="width: 400px; margin: 1em 0;">
</div>

where the matrix on the first image is a unitary matrix and the one on the second image is a stochastic matrix. We want to derive $S$ from $U$ in a natural way: if $U$ is 0 at some position $u_{ij}$, then $S$ should be 0 at $s_{ij}$, and if $U$ is changed by a small amount, then $S$ should also change only by a small amount. Does there exist a hidden variable theory that satisfies those requirements? We can reformulate the problem as the following flow graph:

<div style="text-align: center">
<img src="/img/aaronson_3.png" alt="Flow graph visualization" style="width: 500px; margin: 1em 0;">
</div>

The question is then the following: By using the Max-Flow/Min-Cut Theorem, prove that for any unitary $U$ and any state $|\psi\rangle$, there exists a way to route all the probability mass from $s$ to $t$ in the network $G(U, |\psi\rangle)$ shown on the image above. Then prove that it's possible to choose the "canonical" maximal flows in such a way that making a small change to $U$ or $|\psi\rangle$ produces only a small change in the matrix $S$ of transition probabilities. (This is one of the questions in this post that I definitely don't claim to be able to solve—I just found it interesting that network flow problems from my algorithm design class showed up in such a place!)

**Bonus question 3:** If Bohmian mechanics is true, why does this imply that our universe has to be continuous (as opposed to consisting of discrete blocks, e.g. with the size of one Planck length)?

### Chapter 13 — Proofs

What are zero-knowledge proofs? Under what computational assumption is it the case that zero-knowledge proofs exist for every NP-complete problem?

### Chapter 14 — How big are quantum states?

Suppose Alice wants to send some classical information to Bob and has access to a quantum channel. Can she use this quantum channel to her advantage to send more bits than she could send over a classical channel? Why/why not?

### Chapter 15 — Skepticism of quantum computing

The holographic bound says that the maximum number of bits that can be stored in any finite region is proportional to the region's surface area, at roughly the rate of one bit per Planck area, or $1.4 \times 10^{69}$ bits per meter squared. If you want to build a quantum computer with $1000$ qubits, the computer would contain $2^{1000}$ bits, so no matter how large your computer is, it seems as if you'd violate the holographic bound. Why is it reasonable to believe that this isn't a barrier to building $1000$ qubit quantum computers?

**Bonus question 1:** The reason we don't use analog computers is that they're unreliable—small errors get amplified exponentially and ruin the computations. Why do we expect quantum computers to be any different?

### Chapter 16 — Learning

PAC learning makes an assumption that goes against common Bayesian wisdom. What is this assumption and why is it necessary to achieve the goals of the PAC learning framework?

### Chapter 17 — Interactive proofs, circuit lower bounds, and more

A promising approach to the $P$ vs $NP$ problem is circuit lower bound proofs. Circuit lower bound proofs establish a lower bound on the size of the Boolean circuit required to solve a problem, with the size of a circuit measured in the number of logic gates it contains. We know that $P \subseteq P/poly$, which means that any problem in $P$ can be solved using a circuit with size that scales polynomially with the input. If we could prove for any $NP$-complete problem that it requires a superpolynomial-sized circuit, we'd establish that $P \neq NP$.

There are three barriers to such proofs. The first one is called the relativization barrier. A proof technique "relativizes" if it continues to work when the complexity classes being compared are given access to the same oracle. E.g., suppose you're given access to an $NP$ oracle: this means that your algorithm can call a subroutine that solves any problem in $NP$ in constant time. There's a paper by Baker, Gill and Solovay which showed that there exists an oracle $A$ such that $P^A = NP^A$ (i.e., $P = NP$ when both $P$ and $NP$ have access to oracle $A$), and an oracle $B$ such that $P^B \neq NP^B$. This means that any proof technique which relativizes cannot resolve the $P = NP$ question, since such a technique should be indifferent to the choice of the oracle.

There are two other similar barriers that complicate the process of finding a P vs NP proof: the algebrization barrier and the natural proofs barrier. These take more space to explain, but you'll get an overview of them if you read the book. A circuit lower bound proof relevant to the P vs NP question would have to evade all three of these barriers simultaneously. Do you think this is possible? What evidence do we have so far from other problems that all these bounds could be evaded?

### Chapter 18 — Fun with the Anthropic Principle

Imagine that physicists have narrowed the possibilities for a final theory of physics down to two possibilities, both equally likely a priori. The only difference between them is that Theory 1 predicts that the universe is a billion times bigger than Theory 2 does. Since both theories claim that the universe is relatively homogeneous, Theory 1 predicts that there are a billion times more sentient observers in the universe than Theory 2.

The physicists start a billion-dollar project to build a particle accelerator that can settle the matter between the two theories once and for all. Along comes the Presumptuous Philosopher and claims: "You should spare yourself the money and time. Theory 1 is a billion times more likely to be correct, since, conditioned on Theory 1 being true, we're a billion times more likely to exist in the first place." Is the philosopher correct?

If you decide to reject the philosopher's argument, there's a good chance you're also rejecting the Self-Indication Assumption. What alternatives does this force you to accept? What counterintuitive consequences do those alternatives have?

### Chapter 19 — Free will

One might argue that the concept of free will is incoherent, since either our actions are determined by something, or else they're not determined by anything, in which case they're random. In neither case can we ascribe them to "free will." What problems might there be with this argument?

**Bonus question:** You're trying to decide whether to order pizza or Chinese take-out. Your friend happens to be traveling at close to the speed of light in your rest frame and observing your decision. As you perceive yourself agonizing over the decision, your decision has already been made from your friend's perspective. Is this a valid argument against free will?

**Bonus question 2:** Suppose that there's a teleportation device which encodes the positions of all the atoms in your body as information, transmits this information to Mars as radio waves, reconstitutes you on Mars, and destroys the original. As we've seen earlier in the book, it seems unlikely that your brain is a quantum computer, so naively, the version of you on Mars should still be you. Why is the situation more complicated, even if you assume that the brain is indeed a strictly classical computer?

### Chapter 20 — Time travel

Suppose that closed timelike curves are possible. In a deterministic universe, Grandfather Paradoxes would be a knockdown argument against their existence. In quantum mechanics (or even in a universe built upon classical probability theory), however, nature offers an elegant solution to Grandfather Paradoxes. How does this solution work? (note, though, that this doesn't make it much more likely that closed timelike curves actually exist)

### Chapter 21 — Cosmology and complexity

Space looks roughly flat. There could be some curvature, but if there is, then it's pretty small. This might lead one to think that the universe must be poised on the brink of a Big Crunch: change the matter density just a tiny bit, and you could get a spherical universe that collapses or a hyperbolic one that expands forever. Why is this argument incorrect?

**Bonus question 1:** Why doesn't assuming that the universe is flat imply that it's infinite?

### Chapter 22 — Ask me anything

Gerard 't Hooft and Leonard Susskind have proposed the black hole complementarity principle as a possible solution to the black hole information paradox. The heart of the paradox is that the only information that appears to come out of black holes is Hawking radiation, which is random and thus cannot carry out the specific information that fell in, yet unitarity demands that this specific information must somehow be encoded in the radiation. The complementarity principle resolves this problem by claiming that information gets duplicated when something falls into a black hole: from the perspective of an outside observer, the information becomes encoded on the black hole's event horizon (following the holographic principle), while from the perspective of the infalling observer, the information continues to exist in the black hole's interior. It seems like this solution violates unitarity and specifically the No-Cloning Theorem, which is very fundamental to quantum mechanics. How do 't Hooft and Susskind resolve this issue?

[^1]: Note that I do not claim to be able to solve all of these questions myself, even after having read the book.

[^2]: By first-order theory, I mean here all true statements about the standard model of integers with addition, multiplication, and ordering. Note that the first-order theory of the integers is significantly more complex than Peano Arithmetic: it's about integers rather than about natural numbers, and it includes every true statement about integers, whether provable from a finite set of axioms or not.

[^3]: coNP means the complement of NP: a problem is in coNP if a "no" answer can be checked in polynomial time. For every NP-complete problem, there's a corresponding coNP-complete problem: unsatisfiability, map noncolorability, etc. We don't know whether $NP = coNP$.

[^4]: If this doesn't give you a very strong intuitive sense that $P \neq NP$, then I don't know what does.