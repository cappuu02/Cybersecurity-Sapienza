Let $Tag_1, Tag_2$ be MACs. We know that at last one of them is UF-CMA, but not which one.
Show how to construct Tag that is UF-CMA using both $Tag_1, Tag_2$.
Suggestion: $Tag(k,m) = Tag_1(k_1, m) \mid \mid Tag_2(k_2, m)$


## CCA Security (cont'd)
For the proof of approach 3), we need a lemma:
```ad-abstract
title: Lemma
Assuming $\pi=(ENC, DEC)$ satisfies both CPA and AUTH, then $\pi$ is CCA-Secure

```

Proof of this lemma:
Sketch of proof. Main idea: Make a reduction from CPA to CCA.

Intuition: A CPA needs to answer decryption queries explaining truth property.
Auth means no $A$ can make valid $\tilde c$ so just answer Dec query with ?????
Upon decryption query $c'$:
- If $c' \in \{c\}$ returned in a previous encryption query $m$, return $m$.
- Else, answer ?????

Bad Event: $A_{cca}$ makes $\tilde c$ dec query such that $\tilde c \not \in \{c\}$ and $Dec(k, \tilde c) \not = ????$
By AUTH: $Pr[BAD] \le negl(\epsilon)$

```ad-abstract
title: Lemma
Approeac 3) satisfies both CPA and Auth

```

**Proof of this lemma**
Approach 3):
$$c' = Enc((k_1, k_2), m) = (c,r)$$
$$c \Leftarrow Enc(k_1, m); \hspace{0.8cm} r = Tag(k_2, c)$$
Let's start with CPA. By reduction to CPA ???? of $(ENC, DEC) = \pi_1$ 





It remains to show AUTH. Reduction to? UF-MA of Tag.


When does $A_{\text{auth}}$ win? If:
1) $Tag(k_2, c^{*}) = r^*$
2) $(c^*, r^*)$ fresh: $\not = \{(c,r)\}$

When does $A_2$ win? If:
1) Tag(k_2, c^*) = r^*
2) $c^*$ fresh: $\not = \{c\}$

What is one bad scheme:
$\tilde{\text{Tag}}(k,n) = 0 \mid \mid Tag(k,m)$
Bob: Discard first bit and check $r$

Still UF-CMA, because you can forge tag only in messages for which you already queried the callenger.

Away out: Assume each message has a unique tag alternatively, do not assume that but assume that they?? satisfies: STRONG UF-CMA.


## Blockciphers
In practice: AES, DES, 3DES
In theory: Pseudorandom permutation (PRP)

PRP are efficiently invertible: 
$$\exists \hspace{0,1cm} PPT F^{-1} \hspace{0,3cm} \text{such that} \hspace{0,3cm} F^{-1}_k(F_k(x)) = x \hspace{0.5cm} \forall x$$
e.g. - some modes of equation require this. How to build a PRP? Two approaches:
- Proverbially secure ??: Assume hardness of number theoretic problems (Factoring, discrete log, $\cdots$) or in fact any OWF.
	$$OWF \Rightarrow PRG \Rightarrow PRF \Rightarrow PRP$$
- Heuristic. Heuristically build a PRF and then make it a PRP (e.g. DES) as the theoretical would do (almost).
	The so-called Feistel Network.
	LET $F: \{0,1\}^n \Rightarrow \{0,1\}^n$ be a function (maybe a PRF). How to make it invertible?

	$$\xi_f(X,Y) = (Y, X \oplus F(y)) = (x', y')$$
	Not a PRP! $\exists$ PPT A that breaks it w.p. $1-2^{-n}$. But we can stack it.

	Still invertible! But not a PRP!
	Note: $\xi_{F, F'}(x,y) \oplus \xi_{F, F'}(x', y) = (x \oplus x', .....)$ 
	Okay, do it another ti

```ad-abstract
title: Theorem
$\xi_{F, F', F''}$ IS A prp assuming $F, F', F''$ are PRFs.
$$F=\{F_k : \{0,1\}^n \to \{0,1\}^n\}$$
$$F \equiv F_{k_1} ; F' \equiv F_{k_2}; F'' \equiv F_{k_3}$$
$$k_1, k_2, k_3 \leftarrow U_{\lambda}$$

```

DES: $r=18$ rounds! $F$ is heuristic (confusion + diffusion); $k_1, k_@, k_3, \cdots, k_18$
Derived from some $K$ (using heuristic PRG)
Intuition for The proof:

```ad-missing
Fare i quattro disegni mancanti

```
