How to construct PRGs?
We'll do it in two steps:
1. Assume we have secure $G : \{0,1\}^{\lambda} \to \{0,1\}^{\lambda + 1}$ (i.e l(\lambda) = 10 but ). Then amplify the stretch to $l(\lambda) = Poly(\lambda)$
2. Construct G with $l(\lambda) = 1$ or SO

Start with 1)
![[Cryptography/images/22.png]]
Formally:
- $s_0 \leftarrow U_{\lambda}$
- $\forall i \in [l], \hspace{0.2cm} \text{let} \hspace{0.2cm} (s_i, b_i) = G(l_{i-1}) \hspace{0.2cm} \text{st} \hspace{0.2cm} s_i \in \{0,1\}^l \hspace{0.2cm} \text{and} \hspace{0.2cm} b_i \in \{0,1\}$

```ad-abstract
title: Theorem
The above $G^l$ is a PRG for every $l(\lambda) = Poly(\lambda)$ ensuring if is a prg.

```

**Proof**
We use a technique called the hybrid argument. We need to show $G^l(U_\lambda) \equiv U_{l + \lambda}$. We can do this by defining hybrid distributions like $H_0(\lambda), H_1(\lambda), \cdots, H_l(\lambda)$ such that:
- $H_0(\lambda) \equiv G^l(U_{\lambda}); H_l(\lambda) \equiv U_{\lambda + l}$
- $H_0(\lambda) \equiv H_1(\lambda) \equiv H_2(\lambda), \cdots, H_l(\lambda)$

>Remark: property two implies that $H_0(\lambda) \equiv H_l(\lambda)$ as long as $l(\lambda) = Poly(\lambda)$ (Follows by the triangle inequality)

![[Cryptography/images/23.png]]

```ad-abstract
title: Lemma
$$\forall i \in [0, l-1] : H_{i+1}(\lambda) \approx H_i[\lambda]$$

```

**Proof**: Fix $i$, Assume $\not \exists$ ppt $A$ such that $\mid Pr[H_{i+1}(\lambda)] - Pr[H_i(\lambda) = 1] \mid \ge \frac{1}{Poly(\lambda)}$
We construct PPT $B$ attaching $G$:

![[Cryptography/images/24.png]]
I claim that the distribution of $z$ is such that:
- If $z^* \equiv G(U_{\lambda})$, $z \leftarrow H_i(\lambda)$ 
- If $z^* \equiv U_{l+1}$, $z \leftarrow H_{i+1}(\lambda)$ 

Now:
$$Pr[B(z^*) = 1 / z^* \leftarrow G(U_{\lambda})] =$$
$$= Pr[t(z) = 1 / z \leftarrow H_i(\lambda)] $$
$$ =Pr[B(z^*) = 1 / z^* \leftarrow U_{\lambda + 1}]$$
$$= Pr[t(z) = 1 / z \leftarrow H_{i+1}(\lambda)]$$
$$\Rightarrow \mid Pr[B(z^*)=1/z^* \leftarrow G(U_\lambda)] - Pr[B(z^*)=1/z^* \leftarrow U_{\lambda+1}]| \ge \frac{1}{Poly(\lambda)}$$
## Exercise
![[Cryptography/images/25.png]]
![[Cryptography/images/26.png]]

More in details:
- How to generate so? Randomness extractors. 
- Theory: leftover hash lemma.
- Practice: AES
- Which $G$? 
	- Theory: we can get one from any OWF f or assuming hardness of Factoring, discrete log, LWE, $\cdots$.
	- Practice: AES
- Note get the final design. Because if the natural state is compromised all the future outputs are predictable. The real world  construction keep refresh the state:

```c
if state is s_i, 
	EXT(x)
	s_i = s_i + EXT(x)
```

How to construct $G$ as a theory:
```ad-summary
title: Theorem
If $OWF_s$ exists, then so do PRGs with $l(\lambda)=1$.


```

The proof has to do with the following question. What info about $x$ is hidden given $f(x)$.
![[Cryptography/images/27.png]]

**Non-trivial**: 
If $f$ is OWF then so is $f'(x)=0 \mid \mid f(x)$
- $f'(x$) is not a PRG!

**Prove it**
Also: If $f$ is OWF, then so is $f'(x) = x[1] \mid \mid f(x), x[1] = 1st$ but of $x$.

**Prove it**
Hard-core bit: Is a predicate $h: x \to \{0,1\}$ such that given $f(x)$ it is hard to compute $h(x)$ (i.e. $f(x), f(x)$)  $\approx (U_l, f(x))$

**Fact**
Every $f$ admits an $h$
$$G(s) \equiv f(s) \mid \mid f(s)$$
PRG assuming $f$ is one-way permutation.


## CPA-Security
Want: Build SKE(ENC, DEC) such that:
- $\mid k \mid << \mid n \mid$
- Can encrypt more then $1$ message

Recall: $ENC(k, m)=G(k) \oplus m$ this achieves $\mid k \mid << \mid m \mid$
However, if we measure the way:
$c_1 = G(k) \oplus m_1$
$c_2 = G(k) \oplus m_2$
$c_1 \oplus c_2 = m_1 + m_2$

If $A$ ... a simple pair $(m_1, c_1)$ future plaintexts are exposed forever.

```ad-abstract
title: CPA Security Definition
We say that (Enc, Dec) = \pi is CPA secure if:
$$$$
```

![[Cryptography/images/29.png]]

>The above is impossible if ENC is deterministic.


