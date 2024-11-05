```ad-abstract
title: Definition (UFCMA)
Tag is $UFCMA$ if $\forall$ ptt $A$: 
$$\forall r [Game_{A, Tag}(\lambda \mid = 1)] \le negl(\lambda)$$

```

```ad-abstract
title: Theorem 2
Assuming $F$ a PRF, $Tag(k,m)=F(k,m)$ is UFCMA for FIL

```

**Proof THM1**
![[41.jpeg]]

```ad-abstract
title: Lemma
For every $b\in \{0,1\}, H(\lambda, b) \approx_c G(\lambda, b)$

```

**Demonstration**:
By reductio to security of PRF. Fix $b$ and assume: $\not \exists$ ppt $A$ such that $$\mid Pr[G(\lambda, b)=1] - Pr[H(\lambda, b)=1]\mid \ge \frac{1}{negl(\lambda)}$$
Build ppt $B$ against $F$:
![[Cryptography/images/34.png]]

**Analysis**: By inspection $B$ a perfect simulation of $A$'s view.
$$Pr[G(\lambda, b)=1] = Pr[Real(\lambda)=1]$$
$$Pr[H(\lambda,b)] = Pr[Rand(\lambda)=1]$$

Let $H'(\lambda,b)$ be such that we answer all queries with uniform $(c_1, c_2)$ and also $(c_1^*, c_2*)$ is uniforma. Clearly:
$$H(\lambda, 0) = H(\lambda, 1)$$
```ad-abstract
title: Lemma
$$H(\lambda, b) \approx_s H'(\lambda, b), \forall b \in \{0,1\}$$

```

**Proof**:
Standard Technique: say that $A$ and $B$ are identical unless some bad event $E$ happens. Then:
$$SD(A;B) \le Pr[E]$$

The bad event: we want that all the $r's$ are distinct; if they are distinct, then $(c_1, c_2)$ in $H(\lambda, b)$ is uniform and also $(c_1^*, c_2^*)$. $E$ is the even that they collide:
$$Pr[\exists i, j / r_i = r_j; r_i, r_j \in \{0,1\}^n]$$
$$\le \sum_{i,j}Pr[r_i = r_j] \hspace{0.5cm} \text{union bound}$$
$$Col(U_n)=r^{-n}$$
$$= \binom{q}{2} \cdot 2^{-n} \le q^r \cdot r^{-h} = negl(\lambda)$$
where $q$ is the $A$ of CTXS. ($q = poly(\lambda)$)
$$\Rightarrow G(\lambda, 0) \approx_c H(\lambda, 0) \approx_s H'(\lambda, 0) \equiv H'(\lambda, 1) \approx_s H(\lambda, 1) \approx_s G(\lambda, 1)$$

**Proof (Theorem 2)**:
We need o assume that $n = n(\lambda) = w(\log \lambda) \hspace{0.9cm} \text{Super-Logarithmic in} \hspace{0.2cm} \lambda$

![[Cryptography/images/35.png]]


Let $H(\lambda)$ be same as $G(\lambda)$ but with random table $R: \{0,1\}^n \to \{0,1\}^n$. So $r = R(n)$ and $A$ wins iff $r^* = R(m^*)$ and $m^*$ fresh.

```ad-abstract
title: Lemma
$$\forall \hspace{0.2cm} \text{PPT} \hspace{0.2cm} A: \mid Pr[G(\lambda)=1] - Pr[H(\lambda)=1]\mid \le negl(\lambda)$$

```

**Demonstration by reduction**:
![[Cryptography/images/36.png]]

By inspection:
- $Pr[Real(\lambda)=1] = Pr[G(\lambda)=1]$
- $Pr[Rand(\lambda)=1] = Pr[H(\lambda)=1]$

```ad-abstract
title: Lemma
$Pr[H(\lambda)=1] \le negl(\lambda)$, $\forall$ unbounded $A$ (As long as $n=w(\log \lambda)$

```

**Proof**
Only way to forge in $H(\lambda)$ is to guess the output of $R(m^*)$ on a fresh input $m^*$. Since this is uniform:
$$Pr[H(\lambda) = 1] \le 2^{-n} = negl(\lambda)$$
$$\text{because} \hspace{0.6cm} n = w(\log \lambda)$$
Next step: 
1) How to go from $FIL$ to $VIL$
2) How to combine encryption and authentication?

Let's start with the first for SKE. These are the so-called "**Modes of operation**".

## CFB (Cypher Feedback mode)
Let $m = m_1 \mid \mid m_2 \mid \mid m_3 \cdots$ with $m_i \in \{0,1\}^n$
![[Cryptography/images/37.png]]

## OFB (Output Feedback)
![[Cryptography/images/38.png]]

## CBC (Cypher Black Chaining)
![[Cryptography/images/39.png]]

>PRP: We'll discuss it later. In practice AES is a PRF. In theory: OWF $\Rightarrow$ PRGs $\Rightarrow$ PRFs $\Rightarrow$ PRTs

## CTR (Counter Mode)
![[Cryptography/images/40.png]]

$r$ is an integer$\mod 2^n$ and addition is also$\mod 2^n$.

```ad-abstract
title: Theorem
If $F$ a PRF then CTR mode is CPA secure for VIL

```

----

**Proof**:We start with original CPA game.

![[Cryptography/images/42.png]]

$H_1(\lambda, b):$ The same as $H_0(\lambda, b)$ but use $R$ instead of $F_k$.
$H_2(\lambda, b):$ The same as $H_1(\lambda, b)$ but $c^*$ is uniform.

```ad-abstract
title: Lemma
$\forall b,H_0(\lambda,b) \approx_c H_1(\lambda, b)$

```

**Proof**: reduction to PRF security.
![[Cryptography/images/44.png]]

```ad-abstract
title: Lemma
$\forall b, H_1(\lambda, b) \approx_s H_2(\lambda,b)$ as long as $A$ makes $q(\lambda) = poly(\lambda)$ encryption queries.

```

**Proof**:
Find Event $E$ such that when $E$ does not happened $H_1(\lambda, b) \equiv H_2(\lambda,b)$. The challenge CTX $c^*$ is computed using the sequence:
$$R(r^*), R(r^* + 1), \cdots, R(r^* + t^* - 1)$$
On the other hand, the other CTRs are computed missing the sequence:
$$R(r), R(r+1), \cdots, R(r+t-1) \hspace{0.7cm} \text{different r,t for each query}$$
The event $E$ is the event that the first sequence overlaps with the second sequence ($\forall$ queries).
$$E: \exists j,j' \ge 0 \wedge i \ge 1$$
$$r_i +1 = r^* + j'$$
$$r* = r; r=4; j'=2; j=0$$
_Observe_: Conditioning on $\bar E$, the $c^*$ will be uniform and $H_1(\lambda,b) \equiv H_2(\lambda,b)$
We only need to bound $Pr[E]$.
Simplify: Let $q(\lambda)$ be also the max length of any entry query. Of course $q(\lambda) = poly$
$\Rightarrow t_i, t^* = q(\lambda) = \#queries$

Consider event $E_i$, $r_i, \cdots, r_{i+q-1}$ overlaps with $r^*, \cdots, r^* + q-1$
$$Pr[E] \le \sum_{i=1}q Pr[E_i] \le q(\lambda) \cdot negl(\lambda) = negl(\lambda)$$
$$r^*, r^*+1, \cdots, r^* + q -1$$
$$r_i, r_i +1, \cdots, r_i + q -1$$
$$r^* - q + 1 \le r_i \le r* + q -1$$
$$\Rightarrow Pr[E_i] \le \frac{(r^* + q-1)-(r^* - q + 1)+1}{2^n} = \frac{2q-1}{n} = \text{negl}(\lambda)$$

```ad-abstract
title: Lemma
$H_2(\lambda, 0) \equiv H_2(\lambda, 1)$ because $c^*$ indipendent of $b$ in $H_2$

```

$$\Rightarrow H_0(\lambda,0) \approx_c H_1(\lambda,0) \approx_s H_2(\lambda, 0)$$
$$\equiv H_2(\lambda, 1) \approx_s H_1(\lambda, 1) \approx_c H_0(\lambda, 1)$$
## Domain Extension for MACs
Recall: PRF $\Rightarrow$ FIL; UFCMA; MAC.
$Tag(k,m) = F_k(m)$

Some ideas that do not work:
$e = Tag_k (\oplus_i, m_i)$ 
$m = (m_1, m_2, \cdots)$
UFCMA(i.e. AESk($\cdot$))

$(m_1, m_2) = m \Rightarrow e$
$(m^* = m_1 \oplus m_2, r) \hspace{0.8cm} r=F_k(m_1 \oplus m_2)$
$m = (m_1, m_2)$, let $r = F_k(m_1 \oplus m_2) \hspace{0.4cm} m_1 \not = m_2$
$m^* = (m_2, m_2); r^* = r$

![[Cryptography/images/45.png|400]]

- $r_i = TAG_k(m_i)$
	- $r = (r_1, \cdots, r_d)$
	- $m = (m_1, \cdots, m_d)$

Permute again

- $r_i = TAG_k(i \mid \mid m_i)$
	- $r = (r_1, \cdots, r_d)$
	- $m = (m_1, \cdots, m_d)$

Idea: Design input-shinking function $h: \{0,1\}^N \to \{0,1\}^n$
$N = n \cdot d$ ($d$ block of length $n$)
Then, output $e = F_k(h(m))$
The question: What security from $h$?

![[Cryptography/images/46.png|400]]

**Problem**:
If we can find Collisions, $h(m) = h(m')$ but $m \not = m'$ we can forge $(m', r)$ given $(m,r)$
Two approaches:
- Let $h$ be _Secret_
- Let $h$ be _Public_ (Collision-res, HASH, SHA)

What does it mean?
$$H = \{h_s : \{0,1\}^N \to \{0,1\}^n\}_{s \in \{0,1\}^{\lambda}}$$
and $s$ is either secret or public.

