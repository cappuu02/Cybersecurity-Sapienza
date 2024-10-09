# Examples of Hard Problems

## One-Way Functions (OWF)
- **Factoring**:  
  $( m = p \cdot q )$
  $p$ and $q$ primes random of size $\lambda$ bits
  

- **$\text{Discrete Logarithms (DL)}$
  $y = g^x \mod p$
  $p:$ $\epsilon-$but prime
  $g:$ public $\mod p$
  $x:$ $\in [0, p-1]$ Random
  
- **Post-Quantum Problems**
  LWE
  $P \not = NP$

## Definition of One-Way Function (OWF)
A deterministic function  $f: \{0,1\}^{\lambda} \Rightarrow \{0,1\}^{\lambda}$ is a one-way function if:
$$\forall \hspace{0.3cm} \text{ppt(A)} \hspace{0.3cm}, \exists \hspace{0.3cm} \text{negligent function} \hspace{0.3cm} \epsilon(\lambda) s.t.Pr[f(x') = y : x \Leftarrow \{0,1\}^\lambda; y = f(x); x' \Leftarrow A(Y)] \le \epsilon(\lambda)$$

>We also assume that $f(x)$ is polynomial time computable.

![[10.png]]




### Equivalent Def
$f$ is $\alpha$ OWF if: $$\forall \hspace{0.3cm} \text{ppt(A)} \hspace{0.3cm} A: Pr[Game^{owf}_f (\lambda) = 1] \le Negl(\lambda)$$
```ad-question
Is the existance of OWF's the same as $P \not = NP$? We don't know $OWF \to (P \not = NP)$ But we don't know $(P \not = NP) \to OWF$

```

![[11.png]]
![[12.png]]

### Pseudorandomness
In the information-theoretic setting we can't do better than extracting $\approx k$ random bits from a source $x$ with min-entropy $\ge k$.

**Pseudorandomness**: Weather security in order to produce unlimited randomness.

```ad-abstract
title: Def (PRG)
A function $G: \{0,1\}^{\lambda} \to \{0,1\}^{\lambda + l(\lambda)}$ as a PRG with stretch $l(\lambda)$ if $\forall PPT A:$
$$Pr[Game_{G,A}^{prg}, (\lambda) = 1] \le \frac{1}{2} + negl(\lambda)$$

```

- $G$: No deterministic, efficiently computable
- $l(\lambda) > 0$

![[13.png]]
![[14.png]]


```ad-abstract
title: Def (PRG)
$G: \{0,1\}^\lambda \to \{0,1\}^{l+\lambda}$ is a PRG if: $GAME_{G,A}^{Prg}(\lambda, 0) \approx_\tau Game_{F,A}^{prg}(\lambda, 1)$

```

It means:
$$\forall \hspace{0.3cm} \text{PPT} \hspace{0.3cm} A (Pr[Game_{G,A}^{prg}(\lambda, 0) = 1] - Pr[Game_{G,A}^{prg}(\lambda, 1)]) \le negl(\lambda)$$
where the game output is $b' \in \{0,1\}$.
**Intuitively**: If $A(z)$ can predict $s$ there is no security. Because $A$ can check if $z= G(s)$ and if so output $b' = 1$. Otherwise $b'=0$.


## Exercise 
Every Prg $G$ is also a OWF.
![[9.png]]