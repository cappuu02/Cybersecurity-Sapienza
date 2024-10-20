Last time PRG definition
![[Cryptography/images/21.png]]


We want to show:
- OWF $\Rightarrow$ PRG
- PRG $\Rightarrow$ SKE (Beating Shannon)

## 1) PRG $\Rightarrow$ SKE
Assuming $G: \{0,1\}^\lambda \to \{0,1\}^{\lambda+l}$
Simple $\pi = (ENC, DEC)$ for $K = \{0,1\}^\lambda$, $M = \{0,1\}^{\lambda+l}$
$$ENC(k,n) = G(k) \oplus m$$
$$DEC(k,c) = c \oplus G(k) \oplus m$$
Secure SKE against PPT A?
![[17.png]]

```ad-abstract
title: Def
$\pi$ is one time secure if:
$$Game^{\text{SKE}}_{\pi, a}(\lambda, 0) \equiv_{\epsilon} Game^{\text{SKE}}_{\pi, a}(\lambda, 1)$$

```

What is good? 
For secure SKE it should be hard to:
- gt the key from $c$ but ENC(K,m) = m, satifies this!
- get $m$ from $c$
- get first bit of $m$ from $c \to$  Adversary choose the message
- get _ANY_ info of $m$

```ad-abstract
title: Theorem
If $G$ is a PRG, then above $\pi$ is ONE TIME SECURE.

```

**Proof**:
![[Cryptography/images/19.png]]
Need to show: $$H(\lambda, 0) \equiv_e H(\lambda, 1)$$
```ad-abstract
title: Lemma
$$H'(\lambda, 0) = H'(\lambda, 1)$$
Follows by perfect Secrecy.

```

```ad-abstract
title: Lemma
$$\forall b \in \{0,1\}, H(\lambda, b) \equiv_e H'(\lambda, b)$$

```

**Proof by reduction**:
Fix $b=0$ and assume:
$$\not \exists PPTA / |Pr[H(\lambda, b) = 1] - Pr[H'(\lambda, b)]| \ge \frac{1}{negl(\lambda)}$$
$$\not \exists \hspace{0.3cm} B \hspace{0.3cm} \text{"Breaking"} \hspace{0.3cm} G$$
![[Cryptography/images/20.png]]

$$Pr[B \hspace{0.1cm} \text{output } \hspace{0.1cm} b' =1 : z = G(s); s \leftarrow U_{\lambda}]$$
$$ = Pr[Game^{PRG}(\lambda, 0) = 1]$$
$$= Pr[A \hspace{0.1cm} output \hspace{0.1cm} b' = 1 : c = G(s) \oplus m_0]$$
$$Pr[H(\lambda, 0) = 1]$$
$$Pr[H'(\lambda, 0) =1] = Pr[Game^{PRG}(\lambda, 1) = 1]$$
$$\Rightarrow Pr[Game^{PRG}_{G, B}(\lambda, 0)=1] - Pr[Game^{PRG}_{G, B}(\lambda, 1) = 1] | \ge \frac{1}{negl(\lambda)} \hspace{0.8cm} \text{So A can't exist}$$
$$H(\lambda, 0) \equiv_e H'(\lambda, 0) \equiv H'(\lambda, 1) \equiv_e H(\lambda, 1) \hspace{0.8cm} \text{(By triangle inequality)}$$


