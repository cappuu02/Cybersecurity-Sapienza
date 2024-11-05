We'll go with secret-key approach (as this is what's used in practice).

```ad-abstract
title: Definition (Almost Universal)
Family $H$ is $\epsilon-Au$ if: $\forall x, x' \in \{0,1\}^N$ such that $x \not = x'$ $Pr[h_s(x)=h_s(x')] \le \epsilon$

```

>This is strong: It implies no $t$ can find a collision.

```ad-abstract
title: Theorem
Assuming $F = \{F_k: \{0,1\}^N \to \{0,1\}^n \}_k$ is a PRF, and $H$ is $\epsilon-$AU for $\epsilon = negl(\lambda)$, then:
$$F(H)=\{F_k(h_s(-))\} \hspace{0.9cm} \text{is a PRF Family}$$

```

```ad-tldr
title: Corollario
Every PRF is a MAC.
But in general: PRF musch stronger tham MAC.
$F(H)$ is also UF-CMA, MAC for FIL messages of length $N >> n$.

```

**Proof of theorem**:
We need to show that $F_k(h_s(\cdot))$ is $\approx_c$ from $R! : \{0,1\}^N \to \{0,1\}^N$ (random table)

![[Cryptography/images/47.png|500]]

```ad-summary
title: Lemma
$$H_0(\lambda) \approx_c H_1(\lambda)$$

```

**Proof**: Assume $\not \exists$ PPTA that can:

![[Cryptography/images/48.png]]

```ad-abstract
title: Lemma
$H(\lambda) \approx_s H_2(\lambda)$ so long as $A$ ask $q = Poly(\lambda)$ queries

```

**Proof**: Define bad event E.
$E$ becomes true if $\exists i,j$ such that $i \not = j \to$ $h_s(x_i) = h_s(x); x_1, \cdots, x_q$ are the queries.
Now, if $\bar E$ then $H_1(\lambda) \equiv H_2(\lambda)$ because $R(-)$ is computed on distinct values $y_1, y_2, y_3, \cdots, y_q$
$$\Rightarrow SD(H_1(\lambda); H_2(\lambda)) \le Pr[E]$$
We'd like to say:
$$Pr[E] = Pr_s [\exists i,j : i \not = j and h_s(x_i)=h_s(x_j)]$$
$$\le \sum_{i,j} Pr[h_s(x_i)=h_s(x_i)] \le \binom{q}{2} \cdot 2 \le negl(\lambda) \hspace{0.4cm} (i \not = j)$$
**Issue**: $A$ requires $x$d to be independent of $x$ not clear if is for our $E$. Equivalent definition of $E$.

![[Cryptography/images/49.png]]

$E'$: sample $s \leftarrow U_y$, check if $\exists i; i \not = i$ such that $h_s(x_i) = h_s(x_i)$

The hash function:
1) The inner product we have $N = n \cdot d$, $d$ block of length $n$ bits:
	$m = m_1, m_2, \cdots, m_d$
	$m_i \in GF(2^n)$ the galois field with $2^n$ elements: $(F, +, \cdot)$
	$S = (S_1, \cdots, S_d); s_i \in F$
	$h_s(m) = \sum_{i=1}^d s_i \cdot m_i \in F$
	Where $\sum$ and $\cdot$ are over the field $F$
	Why this works? Fix $m, m'$ such that $m \not =m'$ and $m = (m_1, \cdots, m_d); m' =(m'_1, \cdots, m'_d)$
	$h_s(m) = h_s(m') \Leftrightarrow \sum_i s_i m_i = \sum_i s_i \cdot m_i \Leftrightarrow s_1(m_1 - m'_1) = \sum_{i=2}^d s_i(m'_i - m_i)$
	$s_1 \equiv (m_1 - m'_1)^{-1} \cdot \sum_{i=2}^d s_i(m'_i-m_i) \Rightarrow Pr[hs(m) = hs(m')] \le 2^{-n}$a _Perfect Universal_
2) The above has very good $\epsilon = 2^{-n}$, but $\mid s\mid = \mid m \mid$ talk $F = GF(2^n)$
	$m = (m_1, \cdots, m_d); m_i \in F$
	$s \in F$
	Think of $m_i$ as the coefficients of some polynomial and evaluate it in $s$:
	$$h_{(s)}(m) \equiv \sum_{i=1}^d m_i \cdot s^{i-1} = q_m(s)$$
	It works too:
	$$h_s(m) = h_s(m') \Leftrightarrow q_m(s) = q_{m'}(s)$$
	$$\Leftrightarrow q_m(s) - q_{m'}(s) = 0$$
	$$\Leftrightarrow q_{m - m'}(s) = 0$$
	$$\Leftrightarrow \sum_{i=1}^d (m_i - m'_i)s^{i-1} = 0$$
	$\Rightarrow$ Collision $\Leftrightarrow$ $s$ is a root of the above polynomial with if-coefficients (The $\#$Roots is $d-1$)
	$\Rightarrow Pr[h's(m) = h_s(m')] \le \frac{d-1}{\mid F \mid} \hspace{0.9cm}$ $d$ is at most $poly(\lambda) \le Negl(\lambda)$ , $\mid F \mid = 2^n, n = Poly(\lambda)$
3)  In practice, even more efficient. But some differences: $(i)$ only computational

Computational AU: $\forall$ PPT $A$
![[Cryptography/images/50.png|400]]

Use some other PRF invocation $F_s(\cdot)$ to construct $h_s(-)$
$$F_k(h_s(\cdot))$$
==Optimization trick==
Instead of using $k,s$ use just $k$ (or $s$) and do:
$$F_k(0 \mid \mid \cdot) for F_k(\cdot)$$
$$F_k(1 \mid\mid \cdot) \hspace{0.2cm} \text{for} \hspace{0.2cm} F_s(\cdot)$$

**CBC-MAC**
![[Cryptography/images/51.png]]
$h_s(m_1, \cdots, m_d) = F_s(m_d \oplus F_s(m_{d-1} \oplus \cdots \oplus F_s(m_2 \oplus F_s(m_1)))$

```ad-abstract
title: Theorem
If $F$ a PRF then above h_s(-)$ is computational AU $\Rightarrow$ "Encrypted" CBC-MAC: $F_k(h_s(m))$

```

```ad-abstract
title: Theorem
In fact, E-CBC-MAC is UFCMA also for VIL.
XOR MAC: Instead of doing $F(H)$ yuo do:
$$(r, F_k(r) \oplus h_s(m)) \hspace{0.8cm} \text{for random r}$$

```

Actually this construction only gives a MAC and not a PRF.
Question: what $h$? $A \times U$ (Almost Xor Universal): $\forall a \in \{0,1\}^n$
$$Pr[h_s(m) \oplus h_s(m') = a] \le E$$$$\epsilon-A \times U$$
$AU \equiv a = 0^n$

Why? Because given $M, e=(r, v)$
ADV can output $m'$, $r'=(r, v \oplus a)$
If $h, (m) \oplus a = h_s(m')$ this is a valid tag!
Then, define $h_s$:
$$h_s(m_1, \cdots, m_d) \equiv F_s(m_1 \mid \mid 1) \oplus F_s(m_2 \mid \mid 2) \oplus \cdots \oplus F_s(m_d \mid \mid d)$$
```ad-abstract
title: Theorem
Assuming $F$ a PRF, the aboe $H$ is AXU

```

For $VIL$:
- E-CBC-MAC
- XOR MAC
