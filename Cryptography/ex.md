### ID Schemes
```ad-abstract
title: Definition
An ID scheme it's a protocol between a prover and identifier (pk is authentic).

```

![[Immagine WhatsApp 2024-12-26 ore 22.12.44_4e2b97d8.jpg]]


We want to study this primitive. The properties as always will be correctness an security.

==Correctness==: $\forall \lambda \in N, \forall (pk,sk) \in Gen(1^{\lambda}) \Rightarrow Pr[out(P(sk, pk)\leftrightarrow V(pk))=1]=1$ 
Where "out" is the output of $V$ after the interaction.

>La proprietà di correttezza ha come obbiettivo di far si che $V$ accetti sempre con probabilità $1$

==Security==: There are many possibilities but for us we just need weak security, so called: "passive security". (una persona che monitora le interazioni tra $P$ e $Q$ non dovrebbe essere in grado di impersonificare $P$)

>Nel caso di sicurezza passiva (weak security), un avversario che osserva solo le interazioni tra $P$ e $V$ non dovrebbe riuscire a impersonare $P$.


![[Immagine WhatsApp 2024-12-26 ore 22.12.59_70032155.jpg]]

```ad-abstract
title: Definition
$\pi = (GEN, P, V)$ is passively secure if $\forall$ PPT $A$:
$$Pr[Game^{ID}_{\pi, A}(\sigma)=1] \le \text{Negl}(\lambda)$$

```

In other case, we will only consider special ID schemes: 3 round and public coin.
![[Immagine WhatsApp 2024-12-26 ore 22.13.29_9724a31c.jpg]]

In such a case note that the security game looks like this: 
![[Immagine WhatsApp 2024-12-26 ore 22.14.02_c2837046.jpg]]

>A wins iff $(\alpha^*, \beta^*, \gamma^*)$ is accepting

Looking ahead, let's consider a running example. The Schnorr protocol:
![[Immagine WhatsApp 2024-12-26 ore 22.14.37_252662cf.jpg]]

>$(\alpha, \beta, \gamma)$ is accepting $(b_y, V)$ iff: $\gamma \cdot y^{- \beta} = g^{\gamma}$

Correctness: 
$$g^{\gamma} = g^{\beta_x + a } $$
$$= g^a \cdot g^{\beta_x}$$
$$=\gamma \cdot (g^x)^{\beta}$$
$$= \gamma \cdot y^{\beta}$$
An important property is that: the first message should be non degenerate (have high min entropy):
$$V \bar \alpha \in \{0,1\}^* \Rightarrow Pr[\alpha = \bar \alpha] = negl(\alpha) \hspace{0.8cm} \text{$\alpha$ is $P(PK, SK)$ first message}$$

Here is the plan:
1) Construct passively secure ID schemes.
2) Show that 1 $\Rightarrow$ UF-CMA signatures in the ROM.

Let's do 1) first. In fact, we will prove a general result that passive security follows by two properties:
- Honest-verifier zero knowledge
- special soundness


First: Honest-Verifier
What does a protocol execution reveal about SK?
When the $V$ is honest it reveals nothing!

```ad-abstract
title: Definition
$\pi = (GEN, P, V)$ is HVZK if:
$$\exists \hspace{0.4cm} \text{PPT Simulator} \hspace{0.4cm} S : \{ (pk,sk,\uptau):(pk,sk) \leftarrow Gen(1^{\lambda}); \uptau \leftarrow (P(sk,pk) \leftrightarrow) V(pk) \} \approx_c \{(pk,sk,\uptau): (pk,sk) \leftarrow Gen(1^{\lambda}); \uptau \leftarrow S(pk)\}$$

```

Intuition: all that honest $V$ learns about SK when running $\pi$, he can compute also withouth running $\pi$ (just running $S(pk)$)

Sanity Check: Let's prove it for Schnorr. Here is the simulator: 
$S(pk) = S(y)$
Pick $r, p \leftarrow Z_q$
Let $\alpha = g^{\gamma} \cdot y^{-p}$

Fix any $pk = y$, $sk=x$ and $p \in Z_q$
In a real $(\gamma, \beta, \gamma)$ the distribution of $\gamma$ is uniform regardless of $B$.

Moreover $\gamma = g^{\gamma} \cdot y^{-\beta}$ is the only value that makes verifier accept. The simulated $(\alpha, \beta, \gamma)$ has the same distribution. This is Schnorr satisfies perfect HVZK.