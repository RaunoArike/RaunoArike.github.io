---
title: Exploring the Lottery Ticket Hypothesis
draft: false
date: 2023-04-25
tags:
  - ai
  - essay
---

I have recently been fascinated by the breadth of important mysteries in deep learning, including [deep double descent](https://www.lesswrong.com/posts/FRv7ryoqtvSuqBxuT/understanding-deep-double-descent) and phase changes, that could be explained by a curious conjectured property of neural networks called the lottery ticket hypothesis. Despite this explanatory potential, however, I haven't seen much discussion about the evidence behind and the implications of this hypothesis in the alignment community. Being confused about these things motivated me to conduct my own survey of the phenomenon, which resulted in this post.

## The Lottery Ticket Hypothesis, explained in one minute

The **lottery ticket hypothesis** (LTH) was originally proposed in a paper by [Frankle and Carbin (2018)](https://arxiv.org/abs/1803.03635):

> A randomly-initialized, dense neural network contains a subnetwork that is initialized such that—when trained in isolation—it can match the test accuracy of the original network after training for at most the same number of iterations.

The authors call such subnetworks "**winning lottery tickets**". As the simplest example, they train a LeNet-300-100 model on the MNIST dataset and report that a network containing only 21.1% of the weights of the dense version reaches a higher test accuracy on less training iterations, while a network where only 3.6% of the weights remain performs almost identically to the dense network of the network.

The lottery ticket hypothesis extends a long line of work in neural network pruning, a technique proposed in as early as 1990 by [LeCun et al.](https://proceedings.neurips.cc/paper/1989/file/6c9882bbac1c7093bd25041881277658-Paper.pdf) Pruning simply means deleting some fraction of unimportant weights from the network after training to make inference more efficient. The vital insight of the lottery ticket hypothesis paper is that it may also be possible to prune the network before training to make both training and inference more efficient.

In practice, the method that Frankle and Carbin used for finding winning tickets didn't yet eliminate the need to train the full network, instead just suggesting the possibility. The technique they used is iterative pruning, a procedure that roughly looks as follows:
1. Train the full dense network on some classification task
2. Prune out some fraction of the weights with the smallest magnitude
3. Reinitialize the remaining weights to their original values
4. Repeat the same procedure for a number of times

This is computationally quite expensive, but as we'll see below, alternative approaches have been proposed later on.

The paper also defined a stronger version of the hypothesis that they named the **lottery ticket conjecture**:

> We extend our hypothesis into an untested conjecture that SGD seeks out and trains a subset of well-initialized weights. Dense, randomly-initialized networks are easier to train than the sparse networks that result from pruning because there are more possible subnetworks from which training might recover a winning ticket.

In the next section, I'll argue that making a distinction between the hypothesis and the conjecture appears to be quite important.

## Relevance to alignment

### Phase changes

In his post about [mechanistically interpreting grokking](https://www.lesswrong.com/posts/N6WM6hs7RQMKDhYjB/a-mechanistic-interpretability-analysis-of-grokking), Neel Nanda argues that the lottery ticket hypothesis may constitute the reason for why neural networks form sophisticated circuits.

One may naively think that neural networks are optimized in a similar way to how linear regression classifiers are optimized: each weight slowly changes in a direction that marginally improves performance, and the result of these tiny individual improvements smoothly improve the performance of the entire ensemble. In practice, though, we observe the forming of sophisticated circuits like the induction circuit, which is comprised of a previous token head and an induction head. Either of those heads improves loss only in the case the other head is also present.

Somehow, then, there must be gradients that encourage the formation of these heads despite the fact that neither of them reduces loss on its own. The lottery ticket conjecture appears to explain the existence of such gradients better than alternative explanations that Neel discusses: for example, it's easy to imagine that if something like a head that uniformly attends to prior tokens is already present in the network at the start, an induction head will be somewhat useful when composing with it and SGD will mold that into a proper induction circuit. More generally, some of the randomly initialized circuits (winning tickets) are already systematically useful for reducing loss, and SGD will reinforce such circuits.

This, in turn, can explain phase changes in neural networks: as each component of a circuit develops, each other component will become more useful, which means that all gradients will increase together in a non-linear way, producing a sudden improvement in model capabilities.

- Two additional notes: first, this explanation seems to assume that the lottery ticket conjecture holds - the hypothesis being true doesn't seem to be sufficient on its own. Second, as Neel also emphasizes himself, the lottery ticket conjecture is certainly not the only plausible explanation for the forming of sophisticated circuits and phase changes, so this explanation can't be viewed as evidence that the conjecture is true.

### Deep double descent

Evan Hubinger writes in his [post explaining deep double descent](https://www.lesswrong.com/posts/FRv7ryoqtvSuqBxuT/understanding-deep-double-descent):

> My guess as to how double descent works if the Lottery Tickets Hypothesis is true is that in the interpolation regime SGD gets to just focus on the winning tickets and ignore the others—since it doesn't have to use the full model capacity—whereas on the interpolation threshold SGD is forced to make use of the full network (to get the full model capacity), not just the winning tickets, which hurts generalization.

> Like in the case of phase changes, this is a fairly speculative description and there are certainly other possible explanations. Also similarly to phase changes, I again believe that this explanation only works if the lottery ticket conjecture is true - the fact that there exist well-performing subnetworks at initialization doesn't imply that SGD will find them or focus on them.

### The scaling hypothesis

Daniel Kokotajlo and Abram Demski have drawn parallels between lottery tickets and the scaling hypothesis. [Daniel asks](https://www.lesswrong.com/posts/wFJqi75y9eW8mf8TR/does-the-lottery-ticket-hypothesis-suggest-the-scaling) whether the lottery ticket conjecture being true would imply the scaling hypothesis. [Abram argues](https://www.lesswrong.com/posts/kFm9ZMreqeNYpg8m8/what-happens-to-variance-as-neural-network-training-is) that this depends on whether the distribution of lottery tickets is normal or long-tailed: if it's normal, the amount of lottery tickets in a network would increase rather slowly with scaling. [dsj comments](https://www.lesswrong.com/posts/kFm9ZMreqeNYpg8m8/what-happens-to-variance-as-neural-network-training-is?commentId=SzKZS2LBcZdwNZrX7) under Abram's question about the distribution of lottery tickets that the number of lottery tickets grows exponentially rather than linearly with model size, which seems to imply that even if the distribution of lottery tickets is short-tailed, larger models can be expected to contain better lottery tickets.

> I would add to this discussion that larger models are usually used for more complex tasks that usually require bigger networks to solve, so it seems important to ask how quickly the size of the smallest ticket that can solve the task at hand (the size of such model was 3.6% of the dense model size in the case of Frankle and Carbin's paper) increases as the task becomes more complex. If the size of this smallest useful ticket grows slowly, the number of lottery tickets would grow quickly even when making the task harder and the distribution of the lottery tickets would seem especially important.

---

For all of the aforementioned points of relevance to alignment, a crucial question is whether the lottery ticket *conjecture* is true. Motivated by that, I took a look at recent publications on the lottery ticket hypothesis to find out more about the amount of evidence behind different versions of the hypothesis.

## Pruning is all you need

Since the publication of Frankle and Carbin's paper, various stronger versions of the hypothesis have been proposed. An early follow-up was [Zhou et al.'s (2019)](https://arxiv.org/pdf/1905.01067.pdf) paper which argued that winning tickets achieve significantly better-than-random performance even without training. They observe that the process of finding such subnetworks is equivalent to learning a binary mask for the weights, called the **supermask**. To find the supermasks, they make two important observations about the lottery ticket hypothesis:

1. Instead of resetting the weights to their initialized values when pruning the network, one can also just reset all positive initial weights to 1 and all negative weights to -1 and still get the same performance: only the sign matters.
2. It is crucial that the pruned-out weights are set to 0 rather than some other value: they hypothesize that the weights with small magnitude were being tuned towards 0 by the training process anyways, so setting them to 0 acts as a form of training.

Based on these insights, they use the criterion that weights which have a large magnitude at the end of the training process and also maintain the same sign are retained in the network after masking. Masking out all weights that don't satisfy this criterion in the initial, randomized network, they get a pruned network that achieves test accuracy of up to 86% on MNIST and 41% on CIFAR-10 without any training! Furthermore, they propose an algorithm for training supermasks that brings the respective accuracies up to 95.3% and 65.4%.

The accuracies shown in Zhou et al.'s paper were already surprisingly good considering that they were achieved with no training at all, but still considerably worse than the accuracies of a properly trained dense network. Soon, though, [Ramanujan et al. (2019)](https://arxiv.org/abs/1911.13299) showed that by making some changes in the algorithm for finding the supermask, it's possible to find an untrained pruned network that exactly matches the performance of networks found through the usual optimization process! They propose an improved algorithm that does not sample supermasks on the forward pass, effectively providing an alternative to the usual practice of finding good networks through SGD. This leads them to propose a conjecture that can be viewed as the **strong lottery ticket hypothesis**:

> A sufficiently over-parameterized neural network with random initialization contains a subnetwork that achieves competitive accuracy (with respect to the large trained network), without any training.

Later on, different theoretical results have been proved about the strong lottery ticket hypothesis: see [Malach et al. (2020)](https://arxiv.org/abs/2002.00585), [Orseau et al. (2019)](https://arxiv.org/abs/2006.12156), and [Pensia et al. (2021)](https://arxiv.org/abs/2006.07990). The main takeaway of these papers is that as long as the original dense network is a factor of $O(\log(d \cdot l))$ wider than the target subnetwork, $d$ being the width and $l$ being the depth of the target, and twice as deep as the target subnetwork, then pruning is indeed all you need in order to get equivalent performance to the optimized full network.

Finally, [Diffenderfer and Kailkhura (2021)](https://arxiv.org/abs/2103.09377) argue that there's evidence for going even beyond the strong LTH, formulating another version of the hypothesis:

> A sufficiently over-parameterized neural network with random weights contains several subnetworks (winning tickets) that (a) have comparable accuracy to a dense target network with learned weights (prize 1), (b) do not require any further training to achieve prize 1 (prize 2), and (c) is robust to extreme forms of quantization (i.e., binary weights and/or activation) (prize 3).

They call this the **multi-prize lottery ticket hypothesis**. For a critical review of this paper, see [Mark Xu's distillation](https://www.lesswrong.com/posts/jnHxfXgyQj3ALsD5a/intermittent-distillations-3#Multi_Prize_Lottery_Ticket_Hypothesis__Finding_Accurate_Binary_Neural_Networks_by_Pruning_A_Randomly_Weighted_Network).

### Discussion

All of these results seem to solidify the case for the lottery ticket hypothesis being true, but do they provide evidence for the lottery ticket conjecture as well?

Though the existence of supermasks might be weak evidence in favor of the conjecture, it definitely doesn't prove it. As Daniel Filan notes in [this thread](https://www.lesswrong.com/posts/wFJqi75y9eW8mf8TR/does-the-lottery-ticket-hypothesis-suggest-the-scaling?commentId=9j2srj4c4tfh9SEop), training takes a long time and there are lots of neural networks that succeed at the same task. I probably agree with his take in [this comment](https://www.lesswrong.com/posts/wFJqi75y9eW8mf8TR/does-the-lottery-ticket-hypothesis-suggest-the-scaling?commentId=9j2srj4c4tfh9SEop): we don't have enough evidence for accepting the conjecture yet, but if the approach of the original LTH paper (first train the dense network, then choose the winning ticket and wind back the weights) and the approach of most later papers (use supermasks to find the winning ticket without training the original network at all) were found to produce almost identical subnetworks, then that would constitute very strong evidence for the conjecture.

## John Wentworth's update to the Lottery Ticket Hypothesis

John Wentworth finds the lottery ticket conjecture implausible, but [proposes an alternative hypothesis](https://www.lesswrong.com/posts/i9p5KWNWcthccsxqm/updating-the-lottery-ticket-hypothesis). He argues that although there may indeed exist subnetworks that can achieve close-to-perfect accuracy at classifying dogs, they are good at identifying dogs *only after all the other neurons have been pruned out*. [Pruning does a whole lot of optimization](https://www.lesswrong.com/posts/i9p5KWNWcthccsxqm/updating-the-lottery-ticket-hypothesis?commentId=8PviFouDwniKDZwe9) and changes the functional behavior of the nodes in the subnetwork, he argues, instead of just exposing the small subcircuit that has been great at classifying dogs from the start. Thus, contrary to the conjecture, [there's no good reason to assume SGD would easily find that same subnetwork](https://www.lesswrong.com/posts/i9p5KWNWcthccsxqm/updating-the-lottery-ticket-hypothesis?commentId=BC7FgHd7pNfMXGJxj):

> At initialization, the neurons in the subcircuits they're finding [in the multi-prize lottery ticket hypothesis paper] would not light up in recognition of a dog, because they're still connected to a bunch of other stuff that's not in the subcircuit - the subcircuit only detects dogs once the other stuff is disconnected. And, IIUC, SGD should not reliably "find" those tickets: because no neurons in the subcircuit are significantly correlated with dogs, SGD doesn't have any reason to upweight them for dog-recognition.

Wentworth nevertheless thinks that a version of the lottery ticket hypothesis is plausible. Since the space of subnetworks at initialization doesn't contain a dog detector, the lottery tickets must be contained in a larger space. That space, he argues, is the **parameter tangent space** of the initial network.

The parameter tangent space is defined as follows. Take $\theta$ to be some network's parameters to map $x$ to $y$. We can represent this as $y = f(x, \theta)$. If the network is initialized with $\theta_0$, SGD finds some $\Delta\theta$ such that $y = f(x, \theta_0 + \Delta\theta)$ is an accurate mapping. The linear approximation of the right-hand side is then $f(x, \theta_0) + \Delta\theta \frac{\partial f}{\partial \theta}(x, \theta_0)$. This approximation is the parameter tangent space.

One might expect $y = f(x, \theta_0 + \Delta\theta)$ to be a more expressive equation than its linear approximation, but it appears that the parameters of very large neural nets change only by a small amount during training, which means that the overall $\Delta\theta$ found during training is nearly a solution to the linearly-approximated equations.

Thus, Wentworth argues, the following constitutes a more useful mental model than the original lottery ticket hypothesis:

1. At initialization, we randomly choose $\theta_0$, which determines the parameter tangent space, i.e. the set of lottery tickets.
2. SGD throws out all lottery tickets that don't perfectly match the data.
3. Out of the multiple remaining lottery tickets that do match the data, SGD just picks one at random.

### Discussion

Of the hypotheses put forward in the original LTH paper, Wentworth's claims are compatible with the lottery ticket *hypothesis*, but not with the lottery ticket *conjecture*. His parameter tangent space version of the hypothesis is mainly based on [Mingard et al.'s (2020)](https://arxiv.org/abs/2006.15191) finding that the generalization performance of overparameterized neural nets can mostly be explained using Bayesian models that these networks approximate, rather than by any inductive biases of SGD. I'm not sufficiently familiar with this line of research to assess the strength of the evidence behind these claims, but this definitely seems like an exciting direction of further research.

## The Elastic Lottery Ticket Hypothesis

Despite various efforts to improve techniques of pruning at initialization, [Chen et al. (2021)](https://arxiv.org/abs/2103.16547) observe that the most effective method for identifying winning tickets is still the costly procedure that is iterative magnitude-based pruning (IMP), the method introduced in the original LTH paper. Motivated by the results of [Morcos et al. (2019)](https://arxiv.org/abs/1906.02773) which show that it's possible to use IMP just once to find a single dataset-independent winning ticket for each architecture and to then transfer it to various datasets and downstream tasks, they attempt to find out whether it's also possible to transfer the winning ticket found for one network to multiple network architectures (e.g., to transfer the winning ticket found for ResNet-32 to ResNet-14 and ResNet-64), thus dramatically reducing the costs of finding winning tickets.

In the limited settings tested by Chen et al., it seems that winning tickets can indeed transfer across architectures. Based on this result, they articulate the **elastic lottery ticket hypothesis**:

> By mindfully replicating (or dropping) and re-ordering layers for one network, its corresponding winning ticket could be stretched (or squeezed) into a subnetwork for another deeper (or shallower) network from the same family, whose performance is nearly the same as the latter’s winning ticket directly found by IMP. Those stretched or squeezed winning tickets largely outperform the sparse subnetworks found by pruning-at-initialization approaches, and show competitive efficiency to state-of-the-art dynamic sparse training.

The authors note that there are currently some important restrictive assumptions behind their hypothesis. First, they assume that the architectures across which a single winning ticket is transferred come from the same family, such as ResNets. Secondly, under their current approach, an elastic winning ticket can scale only along the depth dimension - width transformations appear to be more challenging. Nevertheless, training costs would significantly decrease even under these assumptions if this paper's results were shown to reliably hold for other architecture families beyond ResNets and VGGs as well.

### Discussion

This paper seems to be evidence against common knowledge about pruning, described in [Su et al. (2020)](https://arxiv.org/abs/2009.11094) as "Conventional wisdom of pruning algorithms suggests that: (1) Pruning methods exploit information from training data to find good subnetworks; (2) The architecture of the pruned network is crucial for good performance." Elastic lottery tickets can be used for many tasks, suggesting they're mostly dataset-independent, *and* used for many different architectures, suggesting that it's something about the weights rather than about the structure that makes those tickets special. Su et al. argue that other recently proposed pruning methods provide similar evidence contradicting those two claims. This raises the question of what exactly is the property that gives a winning ticket such generality, discussed at length below.

## Summary

The evidence behind the original LTH seems pretty uncontroversial at this point. Multiple stronger versions of the hypothesis such as the elastic LTH also seem likely to hold. In contrast, I think it's still unclear whether the lottery ticket conjecture is true. (Wentworth's position that pruning is just a weird way of doing optimization and changes the functional behavior of the network nodes seems pretty plausible to me, but further experimental evidence of this would make the claim stronger.) Consequently, it seems useful to distinguish between the two versions of the hypothesis when discussing its implications that don't necessarily follow from the weakest version of the LTH. Secondly, further inquiry into the various stronger versions of the hypothesis and their interplay with phenomena like grokking and double descent seems valuable. Several research ideas have been proposed for that:

- As already mentioned, Daniel Filan [has suggested](https://www.lesswrong.com/posts/wFJqi75y9eW8mf8TR/does-the-lottery-ticket-hypothesis-suggest-the-scaling?commentId=9j2srj4c4tfh9SEop) that comparing the winning tickets generated through iterative magnitude-based pruning and the tickets generated using at-initialization pruning methods might yield insights into the question of whether the lottery ticket conjecture is true.
- Vanessa Kosoy [proposes a test](https://www.lesswrong.com/posts/i9p5KWNWcthccsxqm/updating-the-lottery-ticket-hypothesis?commentId=3Z7z2C7bypfHTyEgQ) for Wentworth's version of the hypothesis: "initialize a random neural network, and then find the minimal loss point *in the tangent space*. Since the tangent space is linear, this is easy to do (i.e. doesn't require heuristic gradient descent): for square loss it's just solving a large linear system once, for many other losses it should amount to *convex* optimization for which we have provable efficient algorithms. And, I guess it's underdetermined so you add some regularization. Is the result about as good as normal gradient descent in the actual parameter space?"
- Something that popped up multiple times across the papers was the question of what it exactly is that makes lottery tickets special. As suggested by the original LTH paper and further affirmed by the elastic LTH paper, there's nothing that special about the structure of the pruned network. However, the weights of the pruned network may also not be that important - as Zhou et al. showed, the signs of the weights matter more than their specific values. The elastic LTH paper suggests that what makes the winning tickets special is something generic rather than something specific to a single architecture, task, and dataset, but the precise property that makes them special is still unknown.