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
