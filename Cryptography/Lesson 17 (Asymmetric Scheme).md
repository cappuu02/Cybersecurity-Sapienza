# Public Encryption Key Schemes

![[WhatsApp Image 2024-12-02 at 19.27.31.jpeg]]

```ad-abstract
title: Definition (CPA-Security)
$\pi=(k-Gen, ENC, DEC)$ is CPA-Secure PKE if:
$$Game^{cpa}_{\pi, A}(\lambda, 0) \approx_c Game^{cpa}_{\pi, A}(\lambda, 1)$$

```

![[WhatsApp Image 2024-12-02 at 19.27.49.jpeg]]

The simplest PKE: ElGamal (1985) $\to$ Public key cryptographic scheme, is based on DDH
$(G,g,q) \leftarrow$ Group Gen$(1^{\lambda}) \hspace{0.4cm}$ where: 
- $G =$ group, 
- $g=$ generator, 
- $q=$ ordine primo.

1. K-Gen$(1^{k})$: 
	1. $x \leftarrow Z_q \hspace{0.4cm}$ $\text{Secret key} =x$
	2. $h = g^x \hspace{0.5cm} \text{Public-key} = h$
2. $Enc(PK, m \in G)$: 
	1. $c=(c_1, c_2) = (g^r, h^r \cdot m)$
	2. $r \leftarrow Z_q$
3. $Dec(Sk(c_1, c_2))$: 
	1. Output $c_2 / c_1^x$

Why doesn't work:
$$c_2 / c_1^x = \frac{h^r \cdot m}{(g^r)^x} = \frac{h^r \cdot m}{(g^x)^r} = m$$
```ad-abstract
title: Theorem
ElGamal PKE is CPA Secure under the DDH Assumption in $F$.

```

**Proof**:
The idea is simple. By the DDH assumption $(g^x, g^r, g^{xr}) \approx_c (g^x, g^r, g^z)$ 
$z, r, x \leftarrow Z_q$

![[WhatsApp Image 2024-12-02 at 19.28.43 1.jpeg]]

Need to show: $G(\lambda, 0) \approx_c G(\lambda, 1)$
1) $H(\lambda, 0) \equiv H(\lambda, 1)$ because $c_2$ is uniform over $G$ and this is independent of $b$.
2) $H(\lambda, b) \approx_c G(\lambda, b) \hspace{0.5cm} \forall b \in \{0,1\}$
So, 1) + 2) $\Rightarrow$ Theorem

2) Reduction to DDH

![[WhatsApp Image 2024-12-02 at 19.29.21.jpeg]]
Perfect simulation:
$$c_2 = Z \cdot m_b \begin{cases} g^{xy} \cdot m_b = (pk)^y  \cdot m_b \\ g^z \cdot m_b \hspace{0.3cm} \text{as in} \hspace{0.3cm} H(\lambda, b)\end{cases}$$
$$Pr[B \hspace{0.2cm} \text{outputs} b' = 1] = Pr[A \hspace{0.2cm} \text{outputs} b' = 1] = Pr[G(\lambda, b)=1]$$
This happen when $X, Y, Z$ is a DDH Tuple (==END OF PROOF==)