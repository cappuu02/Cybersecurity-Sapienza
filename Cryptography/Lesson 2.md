```ad-summary
title: Thm Equivalent notion of perfect secrecy
i) The above definitions
ii) $M$ and $C$ are indipendent
iii) $\forall m, m' \in M, \forall \tau \in T \to Pr[ENC(k,n) = c] = Pr[ENC(k,m') = c]$

```

>iii) Over the choose of the key, the probability is the same.

## Chain demonstration

### $i \to ii$

![[4.jpeg]]
### $ii \to iii$

![[Cryptography/images/1.png]]
### $iii \to i$
![[Cryptography/images/2.png]]

### Apply Bayes (Reverse demonstration)

![[Cryptography/images/3.png]]

## Application: One-time as perfectly secure

$M = K = \varphi = \{0,1\}^n$
$ENC(k,n) = \varphi = k \oplus m$ 
$DEC(k, \varphi) = \varphi \oplus k = k \oplus m \oplus k = m$

```ad-abstract
title: Corollary
$\Pi = (ENC, DEC)$ bove as perfectly secret.

```

### Proof (demonstration)

Fix any $m \in M, \varphi \in \varphi:$
$$Pr[ENC(K,m) = \varphi]$$
$$= Pr[k \oplus m = \varphi]$$
$$= Pr[k = \varphi \oplus m] = 2^{-n} \hspace{0.8cm} \text{Formal definition}$$
And:
$$= Pr[k = \varphi \oplus m']$$
$$= Pr[ENC(k,m') = \varphi]$$
Drawback's: One time notion (only one $\varphi$)
$$-|K| = |M|$$
Two-time:
$$c_1 = k \oplus m_1$$
$$c_2 = k \oplus m_2$$
$$c_1 \oplus c_2 = m_1 \oplus m_2$$

```ad-summary
title: Theorem
In any perfectly Secret SKE $\Pi = (ENC, DEC)$ we have $|K| \ge |M|$ 

```

**Proof (demonstration)**:
Take $M$ to be uniform over $M$.
Take any cipertext $\varphi \in \varphi$ s.t. $Pr[\varphi = \varphi] > 0$.

**Consider**:
$$M' = \{DEC(k, \varphi) : k \in K\}$$
**Assume**:
$|K| < |M|$ we will show perfect secrecy does not hold.

**Observe**:
$$|M'| \le |K| < |M| \hspace{0.5cm} \text{there exists} \hspace{0.5cm} m \in M \not \in M'$$
>Exists in $M$ but not in $M'$

$$Pr[M = m | \varphi = \varphi] = 0 \hspace{0.5cm} \text{$m$ is in $M$ but not in $M'$}$$
$$Pr[M = m] = \frac{1}{|M|}$$
>Too different!

## Perfect Authentication

```ad-abstract
title: Definition
We say tag has $\epsilon$-statistical securicy if $\forall m, m' \in M, \forall \varphi, \varphi' \in \varphi \to Pr[Tag(k, m') = \varphi' | TAG(k, m) = \varphi] \le \epsilon$

```

>Is impossible to get $\epsilon = 0$

Construction based on any pairwise indipendent hash function.

```ad-abstract
title: Definition
$$H = \{ h_k : M \to \varphi\}$$
Is pairwise indipendent if $\forall m, m' \in M$ then $(h_k(M), h_k(m'))$

```
