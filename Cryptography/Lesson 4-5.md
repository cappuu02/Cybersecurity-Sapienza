# Probability Security
Move away from information theory.
Goal: Overcome all the limitations we have encountered.
Trade-Off: weater security.
- ADV is resource-bounded

## Probabilistic polynomial-time (turing machine)
A ==Probabilistic Polynomial-Time Turing Machine (PPT)== is a Turing machine that can use randomness, i.e., it can "flip coins" to make decisions during its computation. In other words, its transitions are not solely determined by the current state and the symbol read but also by a random tape (randomness), which is a sequence of randomly generated numbers. The probabilistic Turing machine is a computational model that reflects the concept of probability in computation.

For every input $x$, and every random tape $r$, the probabilistic Turing machine terminates in a **polynomial number of steps**, both with respect to the length of the input $|x|$ and the length of the random tape $|r|$, denoted as $\lambda$. In other words, the machine does not take exponential time unless necessary, and its running time grows polynomially with the length of the input and the random tape.$$ P(\lambda) = \text{Poly}(\lambda) $$ means that the computation time grows at most as a polynomial with respect to the length of the random tape $\lambda$. The notation:
$$ P(\lambda) = O(\lambda^\tau) $$
indicates that the function $P(\lambda)$ is bounded above by a polynomial of degree $\tau$, where $\tau$ is a parameter that depends on the type of computation. For example, 
$$ P(\lambda) = O(\lambda^2) $$
means that the probabilistic Turing machine takes at most quadratic time with respect to the length of the random tape.

When we talk about security in cryptography, we want the attacker to have an extremely low probability of breaking the system. This probability is expressed as a function of the key length $\lambda$, which measures the system's security.

The probability that an attacker cannot compromise the system (i.e., the system is secure) must be a probability that decreases very quickly as $\lambda$ increases. In cryptography, we say that a probability $\epsilon(\lambda)$ is ==negligible== if it decreases faster than any polynomial function of $\lambda$.

The negligible probability is formally defined as:

$$ \epsilon(\lambda) = O\left(\frac{1}{P(\lambda)}\right) $$

where $P(\lambda)$ is a polynomial function. This means that for any polynomial $P(\lambda)$, the probability of insecurity becomes so small that it is practically insignificant.





Examples: $2^{- \lambda}, 2^{- \lambda(\log \lambda)}$



>Introduce computationally hard problems and prove security is equivalent to breaking these problems.


# One-Way Functions (OWF)
From here, we start defining an object that is fundamental to everyday cryptography: the one-way function, or **owf** in short. Colloquially, a one-way function is a function that is “==easy to compute==”, while being “==hard to invert==” at the same time, the concept of hardness being borrowed by complexity theory.

```ad-example
Dato un numero intero $m$, fattorizzarlo nei suoi due fattori primi $p$ e $q$ è considerato un problema difficile. Infatti:
- È facile calcolare $m$ moltiplicando $p$ e $q$.
- Ma trovare $p$ e $q$ conoscendo solo $m$ è computazionalmente impegnativo per numeri molto grandi.

```
## Definition of One-Way Function (OWF)
A deterministic function  $f: \{0,1\}^{\lambda} \Rightarrow \{0,1\}^{\lambda}$ is a one-way function if:
$$\forall \text{ppt(A)} \hspace{0.1cm}, \exists \hspace{0.3cm} \text{negligent function} \hspace{0.3cm} \epsilon(\lambda) \mid Pr[f(x') = y : x \Leftarrow \{0,1\}^\lambda; y = f(x); x' \Leftarrow A(Y)] \le \epsilon(\lambda)$$

- $x \Leftarrow {0,1}^\lambda$: L'input $x$ è scelto in modo casuale da tutte le stringhe binarie di lunghezza $\lambda$.
- $y = f(x)$: Calcoliamo l'output $y$ applicando la funzione $f$ a $x$.
- $x' \Leftarrow A(y)$: L'algoritmo PPT $A$ cerca di calcolare un $x'$ (una possibile preimmagine di $y$).

La probabilità $Pr[f(x') = y]$ rappresenta la probabilità che l'algoritmo $A$ riesca a trovare un $x'$ che soddisfa $f(x') = y$, ossia inverta con successo $f$. (Questo ovviamente NON deve succedere altrimenti l'attaccante avrebbe compromesso il sistema di sicurezza, tutto dipende dalla difficolta di invertire $f$).

$Pr[f(x′)=y] \le \epsilon(λ)$
La probabilità che $A$ riesca ad invertire $f$ è $\le$ $\epsilon(\lambda)$, una funzione neglibile. Questo significa che anche il miglior attaccante PPT ha una probabilità praticamente nulla di successo.

Una funzione $f$ è **one-way** se:
1. È computabile in tempo polinomiale.
2. Anche per il miglior algoritmo PPT, la probabilità di trovare l'input originale $x$ conoscendo solo l'output $y = f(x)$ è **neglibile**.

```ad-tip
title: To clarify
Quando diciamo che la probabilità di successo di un attacco (o di un algoritmo che cerca di invertire una funzione) è **neglibile**, intendiamo che questa probabilità diventa così piccola al crescere di un parametro $\lambda$ (di solito rappresentante la "dimensione" del problema, ad esempio la lunghezza della chiave) da essere considerata praticamente **irrilevante**.

```


![[10.png]]
## Definition (context of cryptographic games)
Una funzione viene considerata sicura se un attaccante (rappresentato dall'algoritmo PPT $A$) non riesce a vincere un gioco di sicurezza associato a quella funzione, ovvero non riesce a indovinare correttamente qualcosa che dovrebbe essere difficile. In questo caso, il gioco è definito come $Game^{owf}_f(\lambda)$, ed è un gioco in cui l'attaccante tenta di invertire la funzione $f$, cioè cercare di trovare l'input $x$ dato l'output $y = f(x)$. La sicurezza della funzione è espressa dalla probabilità che l'attaccante riesca a fare questo.

$f$ is a **OWF** if: $$\forall \hspace{0.3cm} \text{ppt(A)} \hspace{0.3cm} A: Pr[Game^{owf}_f (\lambda) = 1] \le Negl(\lambda)$$
Significa che per ogni algoritmo PPT $A$, la probabilità che $A$ vinca il gioco di sicurezza (cioè indovini correttamente l'input $x$ dato l'output $y = f(x)$) è **neglibile** al crescere della dimensione del problema $\lambda$. 

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



