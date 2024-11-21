# Probability Security
Move away from information theory.
**Goal**: Overcome all the limitations we have encountered.
**Trade-Off**: weater security.
- **ADV** is resource-bounded

## Probabilistic polynomial-time (turing machine)
A ==Probabilistic Polynomial-Time Turing Machine (PPT)== is a Turing machine that can use randomness, i.e., it can "flip coins" to make decisions during its computation. In other words, its transitions are not solely determined by the current state and the symbol read but also by a random tape (randomness), which is a sequence of randomly generated numbers. The probabilistic Turing machine is a computational model that reflects the concept of probability in computation.

For every input $x$, and every random tape $r$, the probabilistic Turing machine terminates in a **polynomial number of steps**, both with respect to the length of the input $|x|$ and the length of the random tape $|r|$, denoted as $\lambda$. In other words, the machine does not take exponential time unless necessary, and its running time grows polynomially with the length of the input and the random tape.$$ P(\lambda) = \text{Poly}(\lambda) $$ means that the computation time grows at most as a polynomial with respect to the length of the random tape $\lambda$. The notation:
$$ P(\lambda) = O(\lambda^\tau) $$
indicates that the function $P(\lambda)$ is bounded above by a polynomial of degree $\tau$, where $\tau$ is a parameter that depends on the type of computation. For example, 
$$ P(\lambda) = O(\lambda^2) $$
means that the probabilistic Turing machine takes at most quadratic time with respect to the length of the random tape.

When we talk about security in cryptography, **we want the attacker to have an extremely low probability of breaking the system**. This probability is expressed as a function of the key length $\lambda$, which measures the system's security.

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

- $x \Leftarrow {0,1}^\lambda$: L'input $x$ è scelto in modo **casuale** da tutte le stringhe binarie di lunghezza $\lambda$.
- $y = f(x)$: Calcoliamo l'output $y$ applicando la funzione $f$ a $x$.
- $x' \Leftarrow A(y)$: L'algoritmo PPT $A$ cerca di calcolare un $x'$ (una possibile preimmagine di $y$).

La probabilità $Pr[f(x') = y]$ rappresenta la probabilità che l'algoritmo $A$ riesca a trovare un $x'$ che soddisfa $f(x') = y$, ossia inverta con successo $f$. (Questo ovviamente NON deve succedere altrimenti l'attaccante avrebbe compromesso il sistema di sicurezza, tutto dipende dalla difficoltà di invertire $f$).

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
Una funzione viene considerata sicura se un attaccante (rappresentato dall'algoritmo PPT A) non riesce a vincere un gioco di sicurezza associato a quella funzione, ovvero non riesce a indovinare correttamente qualcosa che dovrebbe essere difficile. In questo caso, il gioco è definito come $Game^{owf}_f(\lambda)$, ed è un gioco in cui l'attaccante tenta di invertire la funzione $f$, cioè cercare di trovare l'input $x$ dato l'output $y = f(x)$. La sicurezza della funzione è espressa dalla probabilità che l'attaccante riesca a fare questo.

$f$ is a **OWF** iff: $$\forall \hspace{0.3cm} \text{ppt(A)} \hspace{0.3cm} A: Pr[Game^{owf}_f (\lambda) = 1] \le Negl(\lambda)$$
Significa che per ogni algoritmo PPT $A$, la probabilità che $A$ vinca il gioco di sicurezza (cioè indovini correttamente l'input $x$ dato l'output $y = f(x)$) è **neglibile** al crescere della dimensione del problema $\lambda$. 

The structure of the “game” appearing in the definition is depicted in figure below. Do note that the game does not check for $x = x′$, but rather for $f (x) = f (x′)$; in a sense, the adversary is not trying to guess what the original $x$ was: its goal is to find any value such that its image is y according to $f$, and such value may very well not be unique.

![[Pasted image 20241121102449.png]]

```ad-question
Is the existance of OWF's the same as $P \not = NP$? We don't know $OWF \to (P \not = NP)$ But we don't know $(P \not = NP) \to OWF$

```

![[11.png]]
![[12.png]]

### Pseudo-random generators (PRG)
In the information-theoretic setting we can't do better than extracting $\approx k$ random bits from a source $x$ with min-entropy $\ge k$.

**Pseudorandomness**: Weather security in order to produce unlimited randomness.

- $G$ prende in input $\lambda$ bit casuali e genera $\lambda + l(\lambda)$ bit.
- $l(\lambda)$ è uno stretch (bit aggiuntivi generati rispetto alla lunghezza iniziale $\lambda$)

> Un ADV non è in grado di distinguere tra un output $G(U_{\lambda})$ ,dove $U_{\lambda}$ è un input casuale di $\lambda$ bits, ed una stringa casuale uniforme di $\lambda + l(\lambda)$ bits

```ad-abstract
title: Def (PRG)
A deterministic function $G: \{0,1\}^{\lambda} \to \{0,1\}^{\lambda + l(\lambda)}$ is called PRG with stretch $l(\lambda)$ iff $\forall PPT A:$
$$Pr[Game_{G,A}^{prg}, (\lambda) = 1] \le \frac{1}{2} + negl(\lambda)$$

```

- output 1 if ADV guess correctly if the string is generated by $G(U_{\lambda})$ or is completely random.
- $G$: is deterministic; efficiently computable 
- $l(\lambda) > 0$


```ad-done
title: To clarify
Un **Pseudo-Random Generator (PRG)** è una funzione deterministica che prende in input una stringa casuale corta $(\lambda$ bit) e produce una stringa più lunga $(\lambda + l(\lambda)$ bit) che "sembra" casuale a ogni avversario che può essere efficiente in tempo polinomiale probabilistico (PPT).

```



Verifica della sicurezza di un generatore pseudocasuale PRG. Il gioco è un metodo per determinare se un avversario $\mathcal{A}$ può distinguere l'output di $G$ da una stringa casuale.

![[Pasted image 20241121104208.png]]
> b is a bit that decides whether the output $z$ will be produced by the PRG or will be completely random. If $G$ is a valid PRG than every ADV have at maximum a probability of $\frac{1}{2}+ \text{negl}(\lambda)$

![[13.png]]
![[14.png]]


```ad-abstract
title: Def (PRG)
$G: \{0,1\}^\lambda \to \{0,1\}^{l+\lambda}$ is a PRG if: $GAME_{G,A}^{Prg}(\lambda, 0) \approx_\tau Game_{F,A}^{prg}(\lambda, 1)$

```

- $GAME_{G,A}^{Prg}(\lambda, 0)$ : rappresenta un **gioco** tra un challenger e un avversario $A$, dove il challenger genera una stringa tramite il PRG $G$. Il parametro b = 0 indica che la stringa fornita dall'avversario è pseudocasuale cioè generata da $G(U_{\lambda})$.
- $Game_{F,A}^{prg}(\lambda, 1)$ : rappresenta lo stesso gioco, ma con la differenza che la stringa fornita all'avversario $A$ è **veramente casuale**, cioè estratta da una distribuzione uniforme di $\lambda + l(\lambda)$ bit $\Rightarrow$ $U_{\lambda + l(\lambda)}$
- $\approx_{\tau}$ : le due distribuzioni degli output $G(U_{\lambda})$ e $U_{\lambda + l(\lambda)}$ sono indistinguibili per l'avversario A tranne che per una probabilità trascurabile $\tau$ ($\tau$ dipende da $\lambda$)

>Un avversario non sà con certezza se la stringa ricevuta è stata generata da $G$ oppure è completamente casuale.

It means:
$$\forall \hspace{0.3cm} \text{PPT} \hspace{0.3cm} A (Pr[Game_{G,A}^{prg}(\lambda, 0) = 1] - Pr[Game_{G,A}^{prg}(\lambda, 1)=1]) \le negl(\lambda)$$
where the game output is $b' \in \{0,1\}$.
**Intuitively**: If $A(z)$ can predict $s$ there is no security. Because $A$ can check if $z= G(s)$ and if so output $b' = 1$. Otherwise $b'=0$.

```ad-success
title: To clarify
'obiettivo dell'avversario $A$ è distinguere se la stringa $z$ ricevuta proviene da un'uscita pseudo-casuale oppure da una stringa casuale generata uniformemente.
Se l'avversario A è in grado di predire il seme $s$ a partire da $z$ allora il PRG non è sicuro. Questo accade perchè A potrebbe semplicemente controllare se $z=G(s)$. Un PRG è sicuro solo se $A$ non può distinguere $z$ da una stringa casuale, anche dopo aver analizzato tutte le informazioni possibili.

```

We want to show:
1) OWF $\Rightarrow$ PRG
2) PRG $\Rightarrow$ SKE (Beating Shannon)

## 2) PRG $\Rightarrow$ SKE
Assuming $G: \{0,1\}^\lambda \to \{0,1\}^{\lambda+l}$
Simple $\pi = (ENC, DEC)$ for $K = \{0,1\}^\lambda$, $M = \{0,1\}^{\lambda+l}$
$$ENC(k,m) = G(k) \oplus m$$
> Thanks to the XOR operation, each bit of the message $m$ is mapped by the corresponding bit of $G(k)$ where $G(k)$ is the output of PRG.

$$DEC(k,c) = c \oplus G(k) = (G(k) \oplus m) \oplus G(k) = m$$
>Thanks to the XOR property, $G(k) \oplus G(k) = 0 \Rightarrow$ we can recover the original message $m$. 


```ad-check
title: To clarify
Questo schema di cifratura sfrutta la pseudo-casualità di G(k)G(k)G(k) per "mascherare" il messaggio $m$. La stringa $G(k)$ sembra casuale (perché è generata da un PRG), quindi, quando utilizzo XOR con il messaggio $m$, produce un testo cifrato che non fornisce alcuna informazione utile sul messaggio senza la chiave $k$. Quando il destinatario riceve il testo cifrato ccc, può decifrarlo con la stessa chiave $k$ usando $G(k)$ per ripristinare il messaggio originale $m$.

```


Secure SKE against PPT A?
![[17.png]]

```ad-abstract
title: Def
$\pi$ is one time secure if:
$$Game^{\text{SKE}}_{\pi, a}(\lambda, 0) \equiv_{\epsilon} Game^{\text{SKE}}_{\pi, a}(\lambda, 1)$$

```

What is good? 
For secure SKE it should be hard to:
- get the key from $c$ but ENC(K,m) = m, satifies this!
- get $m$ from $c$
- get first bit of $m$ from $c \to$  Adversary choose the message
- get _ANY_ info of $m$

```ad-abstract
title: Theorem
If $G$ is a PRG, then above $\pi$ is ONE TIME SECURE.

```

**Proof**:
![[Cryptography/images/19.png]]
Need to show: $$H(\lambda, 0) \equiv_e H(\lambda, 1)$$
```ad-abstract
title: Lemma
$$H'(\lambda, 0) = H'(\lambda, 1)$$
Follows by perfect Secrecy.

```

```ad-abstract
title: Lemma
$$\forall b \in \{0,1\}, H(\lambda, b) \equiv_e H'(\lambda, b)$$

```

**Proof by reduction**:
Fix $b=0$ and assume:
$$\not \exists PPTA / |Pr[H(\lambda, b) = 1] - Pr[H'(\lambda, b)]| \ge \frac{1}{negl(\lambda)}$$
$$\not \exists \hspace{0.3cm} B \hspace{0.3cm} \text{"Breaking"} \hspace{0.3cm} G$$
![[Cryptography/images/20.png]]

$$Pr[B \hspace{0.1cm} \text{output } \hspace{0.1cm} b' =1 : z = G(s); s \leftarrow U_{\lambda}]$$
$$ = Pr[Game^{PRG}(\lambda, 0) = 1]$$
$$= Pr[A \hspace{0.1cm} output \hspace{0.1cm} b' = 1 : c = G(s) \oplus m_0]$$
$$Pr[H(\lambda, 0) = 1]$$
$$Pr[H'(\lambda, 0) =1] = Pr[Game^{PRG}(\lambda, 1) = 1]$$
$$\Rightarrow Pr[Game^{PRG}_{G, B}(\lambda, 0)=1] - Pr[Game^{PRG}_{G, B}(\lambda, 1) = 1] | \ge \frac{1}{negl(\lambda)} \hspace{0.8cm} \text{So A can't exist}$$
$$H(\lambda, 0) \equiv_e H'(\lambda, 0) \equiv H'(\lambda, 1) \equiv_e H(\lambda, 1) \hspace{0.8cm} \text{(By triangle inequality)}$$








