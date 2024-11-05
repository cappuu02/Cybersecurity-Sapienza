We will see PRFs are enough for doing CPA-Secure SKE, but also MACs.
How to build a PRF:
- Theory: OWFs or concrete assumptions (Factoring, DL, $\cdots$)
- Practice: AES
What is a PRF? It's a Keged function 
$$F_k : \{0,1\}^n \to \{0,1\}^n$$
$$k \in \{0,1\}, n=256,512,\cdots$$
Security? Basically the output of the function should be  . From the output of Truly Random Truth Table.
![[Cryptography/images/30.png]]

For random choice of $k \in \{0,1\}$, then $F_k(\cdot)$ is completely independent from random table.

```ad-abstract
title: Definition of PRF
We say that $F: \{0,1\}^{\lambda} \times \{0,1\}^n \to \{0,1\}^n$ is a PRF if:
![[Cryptography/images/31.png]]

```

Equivalent: $\forall$  ppt $A$ 
$$\mid Pr[Real_{A,F}(\lambda)=1] - Pr[RAND_{A,R} (\lambda)=1] \le negl(\lambda) \mid$$
The challenger is unbounded in rand. This is simpler think of, but no needed as we can do lazy sampling:
- Upon $x \in \{0,1\}$, output $y \leftarrow \{0,1\}^n$ as long as $x$ not asked before (in which case, output previous $y$)

How to construct PRFs.
- In practice: AES (intuition and experience). Designed in early 2000, still unbroken. No provable security, back then.
- In theory: OWF $\to$ PRF. Alternatively, you can use factoring, or DL, LWE.

Application1: PRF $\Rightarrow$ CPA SKE for fixed input length (FIL)
Here it is: $\pi=(ENC, DEC)$
$$ENC(k,m): r \leftarrow \{0,1\}^n \hspace{0.8cm} c=(c_1, c_2) = (r, F_k(r) \oplus m)$$
$$DEC(k, (c_1, c_2)): F_k(c_1) \oplus c_2 = F_k(r) \oplus F_k(r) \oplus m = m$$
**Theorem 1**
Assuming $F$ is a PRF, the above is CPA-Secure $SKE$ for $FIL$.
Application $2$: $PRF \Rightarrow MAC$

![[Cryptography/images/32.png]]

Let $f$ be a $PRF$, then $Tag(k,m)=F_k(m)$
Security? $UFCMA$ (Universal Unforgeability against chosen-message attacks).

![[Cryptography/images/33.png]]