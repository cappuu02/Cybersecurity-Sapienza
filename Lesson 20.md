# Digital Signature

![[WhatsApp Image 2024-12-03 at 11.47.50.jpeg]]
```ad-abstract
title: Definition
$\pi = (K-gen, Sign, Verify)$ is UF-CMA if $\forall$ PPT $A$:
$$Pr[Game_{\pi, A}^{\text{UF-CMA}} (\lambda)=1] \le negl(\epsilon)$$

```

Game:
![[Pasted image 20241203120018.png]]
```ad-success
title: Important
Bob must know the public key of Alice!

```

```ad-warning
title: Problem with public key
The problem now is that Alice has a public key, but she wants some sort of “**certificate of validity**” for it, so that Bob will be sure that whenever he receives Alice’s public key, he can be sure it’s the right one by checking such certificate. For certificates to be useful, the parties need an universally-trusted third party, called ==Certification Authority==. It will provide a special signature to Alice for proving her identity to Bob, as exemplified by the sequence in figure 18.68. Whenever Bob wants to check the validity of the Alice’s public key, he can query the authority for the certificate, and verify the public key he just received, as shown in figure 18.69 How can Bob recognize a valid certificate from an expired/invalid one? The infrastructure provides some servers which contain the lists of the currently valid certificates, such as certA, in the case of Alice

```

>Signatures are in Minicrypt

![[Pasted image 20241203120738.png]]
![[Pasted image 20241203120745.png]]


So, The solution to certify PK is the so-called Pk-infrastructures:
$$g^x, \text{Signatures}_{SK}, (\text{Cert}_{PK}, Pk)$$
>A certificate is a signature of public key

The public key $PK_{ca}$ is hard-wired in the browser. In Practice there are many Certification authorities. But this is just an optimization.

```ad-success
title: Important
from now on we assume that the public key is authentic

```

We will see two different construction of digital signatures:
1) FDH: Full Domain Hash on how to sign with any TDP(RSA)
2) Fiat-SH: Signatures $\sigma$ from different


## FDH
The basic idea is:
- K-Gen$(1^{\lambda}) \to$ (PK, SK)
	- $PK = (n,e)$
	- $SK = (n,d)$

- Signature(SK, m) = $f^{-1}_{SK}(m)$ $(\sigma = m^d \mod n) \hspace{0.9cm}$ $f^{-1}_{SK}$ : inverse of trapdoor permutation to $m$  
- Verify($PK, m, \sigma$): $f_{PK}(\sigma) \equiv m?$
	- output $1$ if yes
	- output $0$ else

```ad-missing
title: Not Secure Scheme
This scheme is not secure for long message. In fact, if Eva own the secret key, she can broke the scheme and can invert the function.
$$\Rightarrow \text{This scheme is not UF-CMA}$$
```

**Proof**: Let's take any $\sigma^*$. Then get:
$m^* = f_{PK}(\sigma^*)$
$m^* = (\sigma^*)^e$
Output$(m*, \sigma*)$

I get any $\sigma$ and after i answer "what is the corresponding message?". Everybody can verify and compute $f_{PK}^{(\sigma^*)}$.

Can you forge on chosen message $m^*$ with RSA? Just use the fact that RSA is homomorphic:
$$(m_1, \sigma_1)(m_2, \sigma_2)$$
$$\sigma_1 \cdot \sigma_2 \hspace{0.4cm} \text{is a signature on} \hspace{0.4cm} m_1 \cdot m_2$$


```ad-success
title: Hasing of $m$
To ensure a secure pattern, hasing can be used to kill the attacker. Basically, we use the hash function on the $m$ message and then apply the trapdoor function
```

$$\sigma = f^{-1}_{SK}(H(m)) \to \text{signature}$$
$$f_{PK}(\sigma) = H(m) \to \text{Verify}$$
$$\Rightarrow \text{If i do this i kill the homomorphic}$$

>It also works for VIL (Variable input length).

Can we prove it? Yes, under what assumption? Ideally: TDP+CRH. 
We don't know how to do this. 
Remark: if signature is a secure UF-CMA signature on $\{0,1\}^n$, then assuming $H$ is a CRH, then:
$$\text{Sign}_{\text{SK}}(H(m)) \hspace{0.5cm} \text{is Also UFCMA}$$

We will give the simplest proof under a strong assumption on $H$: $H$ is a random oracle. $H$ correspond to a truly random table and the only way to evaluate it on $x$ is to ask an oracle to give $H(x)$. Actually we can prove it secure in the standard model, no random oracles, using strong tools as obfuscations.

```ad-abstract
title: Theorem
FDH is UF-CMA in the random oracle model (ROM) Assuming $(f, f^{-1})$ is a TDP.

```

**Proof of this theorem:**
We assume all parties, including the ADV, can ask random oracle queries.

![[WhatsApp Image 2024-12-03 at 12.36.22.jpeg]]

Some conventions:
$t$ ask $q_s$ signature queries $m_1, \cdots, m_q$ and $q_h$ RO queries. Of course $q_s, q_h = \text{Poly}(\lambda)$.
Wlog, Assume that queries are not repeated. before asking for a signature of $m_i$ or forging on $m^*$, $A$ makes a RO query with $m_i$ or $m^*$. Adding this queries does not decrease $A'$, probability of success: Assume $\exists$ PPT $A$ as above in the UF-CMA that succeeds w.p. $z(\lambda) \ge \frac{1}{\text{Poly}(\lambda)}$. Build a PPT $B$ breaking the TDP.

![[WhatsApp Image 2024-12-03 at 12.40.53.jpeg]]

There will be a trick (only possible in ROM).
The reduction can simulate the output of RO queries.
Arbitrarily, so long as it looks like a random table $t$. In the above picture:
0) Think of $j$ as the index  corresponding to the RO query $m^*$
1) Upon RO query $m_i$
	- If $i \not = j$, pick $r_i \leftarrow \chi$ and return $y_i = f_{PK}(x_i)$
	- If $i = j$, return $y$ (challenge from TP)
2) Upon signature query $m_i$, return $\sigma_i = x_i$ to $A$ unless $m_i = m_j$ in which case abort.
3) Upon, $m^*, \sigma^*$ output $x=\sigma^*$

Analysis:
- The public key is perfectly simulated
- Simulation of RO queries is also good, because $y_i$ is random and also $y$ is random.
- Assuming $B$ never aborts, the signatures are perfectly simulated. indeed: $\text{Verify}(PK, m_i, \sigma_i): f_{PK}(\sigma_i)=f_{PK}(x_i)=y_i$ as $x_i$ is the Pre-Image of $y_i$.
- Assuming $B$ does not abort, for the same reason $x \in \sigma^*$ is the perfect pre-image of $y$. Finally:
	$$Pr[B \hspace{0.3cm} primes] \ge Pr[\text{A wins} \wedge m^* = m] \ge \frac{1}{\text{poly}} \cdot \epsilon(\lambda) = \frac{1}{\text{poly}} \cdot \frac{1}{\text{poly}} = \frac{1}{\text{poly}}$$
## Fiat