**Some Exercise**
![[Cryptography/images/8.png]]

----

```ad-abstract
title: Theorem
Let $H$ be pairwise indipendent, then $Tag(k,m) = hk(m)$ is $\epsilon-Statistical$ secure for $\epsilon = \frac{1}{|\tau|}$

```

Proof on the one hand: 
$$\forall m, \forall \tau \to Pr[Tag(k,m) = \tau] = Pr[h(k,m) = \tau] = \frac{1}{|\tau|}$$
On the other hand:
$$\forall m, m', \forall \tau, \tau', m \not = m' \to Pr[Tag(k,m) = \tau \wedge Tag(k, m') = \tau'] = \frac{1}{|\tau|^2}$$
$$\Rightarrow Pr[h(k,m') = \tau' | h(k,m) = \tau] = \frac{\frac{1}{|\tau|^2}}{\frac{1}{|\tau|}} = \frac{1}{|\tau|}$$
Construction: Let $p$ be prime. Define:
$$\tau = h_{c,b}(x) = ax + b \hspace{0.2cm} \text{mod} \hspace{0.2cm} p$$
$$(a,b) \in Z_p \times Z_p \hspace{0.2cm} \text{with} \hspace{0.2cm} x, \tau \in Z_p \hspace{0.2cm} \text{and} \hspace{0.2cm} (a,b) \in Z_p \times Z_p$$

```ad-abstract
title: Lemma
The above $H$ is pairwise indipendend. So we get $\epsilon = \frac{1}{p}-statistical$ secure MAC. 

```

_Proof_: Fix $m, m' \in Z_p$ and $\tau, \tau' \in Z_p, m \not = m'$

$$Pr_{a,b}[h_{a,b}(m) = \tau \wedge h_{a,b}(m') = \tau']$$
$$= Pr_{a,b}[\begin{pmatrix}  m & 1 \\ m' & 1 \\  \end{pmatrix} \cdot \begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} \tau \\ \tau' \end{pmatrix} \hspace{0.2cm} \text{mod} \hspace{0.2cm} p]$$
$$= Pr_{a,b}[\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix}  m & 1 \\ m' & 1 \\  \end{pmatrix}^{-1} \cdot \begin{pmatrix} \tau \\ \tau' \end{pmatrix} \hspace{0.2cm} \text{mod} \hspace{0.2cm} p]$$
$$= Pr_{a,b} [\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} c \\ d \end{pmatrix}] = \frac{1}{p^2}$$
>$c$ and $d$ are fixed.
>Function of $m, m', \tau, \tau'$

We have a $2^{- \lambda}$ - statistical secure MAC by choosing any $\lambda-$but prime $p$
# Randomness Extraction
Randomness is crucial for cryptographic. For one, we need random keys but also, we'll see that even the algorithms need to be randomness. Randomness come from nature (studied by sciences). Randomness in nature is imperfect, while it can be "purified" at's very expensive. 

## Randomness extraction
How to extract uniform randomness as imperfect random source.

```ad-example
The goal is to desgin some function "EXT" (Extraction) that tells some $x$ (not uniform) and outputs some random rhings. Suppose you have a biased coin:
$$Pr[B = 0] = p \le \frac{1}{2}$$
How to extract uniform randomness?

- Sample $b_1, b_2$

![[Pasted image 20241002175532.png|350]]

So: $$Pr[\text{Ext outputs} \hspace{0.2cm}  0] = Pr[\text{Ext outputs} \hspace{0.2cm}  1] = P(1-p)$$
$$Pr[\text{No output after k trials}] \hspace{0.5cm} \text{trial is small} \hspace{0.5cm} $$

```

In general we can we design a "good" EXT for any $x$?
No, because EXT is deterministic and $X$ could be completely predictable $\to$ $x$ needs to be unpredictable.

```ad-abstract
title: Def. Min-Entropy
The Min-Entropy of $x$ is: $$H_{\infty}(x) = - \log_x \text{max} Pr[X = x]$$

```

_Intuition_: The best probability to predict $x$ by unbounded adv.

```ad-example
$$\text{Let} \hspace{0.3cm} X \equiv \cup_n (\text{Uniform over} \hspace{0.3cm} \{0,1\}^n) \hspace{0.5cm} H_{\infty}(\cup_n) = n$$
$$Let X \equiv 0^n (\text{costant}) \hspace{0.5cm} {H_{\infty}(X)} \hspace{0.5cm} \text{because the max probability is $1$}$$

```


For real-world phenomenal, we can get lower bound $H_\infty \ge K \hspace{0.3cm} (k < x)$
The new goal: Design EXT that extracts from any x s.t. $H_\infty(X) \ge k$

```ad-abstract
title: Theorem
This is impossible even if $x = n-1$ and $EXT: \{0,1\}^n \to \{0,1\}$

```

Proof Introduction: For every $EXT: \{0,1\}^n \to \{0,1\}$ there exists some $x$ s.t. $H_\infty(X) = n-1$ but EXT fails as such $X$.

Let $b \in \{0,1\}$ be the value that maximizes $|EXT^{-1}(b)|$ 

![[Cryptography/images/6.png]]

We need to change the model:
1) Assume Indipendent $x_1, x_2$ s.t. $H_\infty(x_1), H_\infty(x_2) \ge k$
2) Assume the EXT is seeded (extractor take two input):
	$EXT(S,X)$
	$S \in \{0,1\}^d$
	$X \in \{0,1\}^n$
	This seed is uniform, but public.

```ad-abstract
title: Definition
$EXT: \{0,1\}^d \times EXT\{0,1\}^n \to \{0,1\}^l$
Is a $(K,E)$-seeded extractir if $\forall x \in \{0,1\}^n$ s.t. $H_\infty(X) \ge k.$

```

$$EXT(S,X) \equiv_{\epsilon} U_l \hspace{0.5cm} \text{Where $U_l$ is uniform, $S \equiv U_d$} \hspace{0.3cm} \text{is uniform}$$
$$SD(X;Y) = \frac{1}{2} \sum_z | Pr[X=z] - Pr[y=z] \hspace{0.5cm} \text{SD = Statistical Distance}$$
_Equivalent:_ An unbound ADV can-t distinguish a sample $z \leftarrow x$ from $z \leftarrow y$ with $f$ better than  $\epsilon$

