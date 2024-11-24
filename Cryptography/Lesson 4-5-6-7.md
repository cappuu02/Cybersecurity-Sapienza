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
$$ P(\lambda) = O(\lambda^2) \hspace{0.9cm} \text{Upper bound}$$
means that the probabilistic Turing machine takes at most (al massimo) quadratic time with respect to the length of the random tape.

## Negligible function (4.1)
When we talk about security in cryptography, **we want the attacker to have an extremely low probability of breaking the system**. This probability is expressed as a **function** of the key length $\lambda$, which measures the **system's security**.

The probability that an attacker cannot compromise the system (i.e., the system is secure) must be a probability that decreases very quickly as $\lambda$ increases. In cryptography, we say that a probability $\epsilon(\lambda)$ is ==negligible== **if it decreases faster than any polynomial function of $\lambda$**.

The negligible probability is formally defined as:
$$ \epsilon(\lambda) = O\left(\frac{1}{P(\lambda)}\right) $$

where $P(\lambda)$ is a polynomial function. This means that for any polynomial $P(\lambda)$, the probability of insecurity becomes so small that it is practically insignificant. (diventa insignificante dato che è l'inverso)

>La probabilità che un avversario rompa un sistema deve essere una funzione trascurabile in relazione alla lunghezza della chiave $\lambda$.

Examples of polynomial function: $2^{- \lambda}, 2^{- \lambda(\log \lambda)}$

>Introduce computationally hard problems and prove security is equivalent to breaking these problems.
# One-Way Functions (OWF 4.2) 
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
La probabilità che $A$ riesca ad invertire $f$ è $\le$ $\epsilon(\lambda)$, una funzione neglibile. Questo significa che ==anche il miglior attaccante PPT ha una probabilità praticamente nulla di successo==.

Una funzione $f$ è **one-way** se:
1. È computabile in tempo polinomiale.
2. Anche per il miglior algoritmo PPT, la probabilità di trovare l'input originale $x$ conoscendo solo l'output $y = f(x)$ è **neglibile**.

```ad-tip
title: To clarify
Quando diciamo che la probabilità di successo di un attacco (o di un algoritmo che cerca di invertire una funzione) è **neglibile**, intendiamo che questa probabilità diventa così piccola al crescere di un parametro $\lambda$ (di solito rappresentante la "dimensione" del problema, ad esempio la lunghezza della chiave) da essere considerata praticamente **irrilevante**. icordare la formula ovvero $\frac{1}{P(\lambda)}$

```
## Definition (context of cryptographic games)
Una funzione viene considerata sicura se un attaccante (rappresentato dall'algoritmo PPT A) non riesce a vincere un ==gioco di sicurezza associato a quella funzione==, ovvero non riesce a indovinare correttamente qualcosa che dovrebbe essere difficile. In questo caso, il gioco è definito come $Game^{owf}_f(\lambda)$, ed è un gioco in cui l'attaccante tenta di invertire la funzione $f$, cioè cercare di trovare l'input $x$ dato l'output $y = f(x)$. **La sicurezza della funzione è espressa dalla probabilità che l'attaccante riesca a fare questo**.

$f$ is a **OWF** iff: $$\forall \hspace{0.3cm} \text{ppt(A)} \hspace{0.3cm} A: Pr[Game^{owf}_f (\lambda) = 1] \le Negl(\lambda)$$
Significa che per ogni algoritmo PPT $A$, la probabilità che $A$ vinca il gioco di sicurezza (cioè indovini correttamente l'input $x$ dato l'output $y = f(x)$) è **neglibile** al crescere della dimensione del problema $\lambda$. 

The structure of the “game” appearing in the definition is depicted in figure below. Do note that the game does not check for $x = x′$, but rather for $f (x) = f (x′)$; in a sense, the adversary is not trying to guess what the original $x$ was: its goal is to find any value such that its image is y according to $f$, and such value may very well not be unique.

![[Pasted image 20241121102449.png]]

```ad-question
Is the existance of OWF's the same as $P \not = NP$? We don't know $OWF \to (P \not = NP)$ But we don't know $(P \not = NP) \to OWF$

```

**Impagliazzo’s Worlds** 
Suppose to have Gauss, a genius child, and his professor. The professor gives to Gauss some mathematical problems, and Gauss wants to solve them all. Imagine now that, if using one-way functions, the problem is f (x), and its solution is x. According to Impagliazzo, we live in one of these possible worlds: 
- **Algorithmica**: P = NP, meaning all efficiently verifiable problems are also efficiently solvable. The professor can try as hard as possible to create a hard scheme, but he won’t succeed because Gauss will always be able to efficiently break it using the verification procedure to compute the solution 
- **Heuristica**: NP problems are hard to solve in the worst case but easy on average. The professor, with some effort, can create a game difficult enough, but Gauss will solve it anyway; here there are some problems that the professor cannot find a solution to 
- **Pessiland** : NP problems are hard on average but no one-way functions exist 
- **Minicrypt**: One-way functions exist but public-key cryptography is im- practical 
- **Cryptomania**: Public-key cryptography is possible: two parties can ex- change secret messages over open channels

```ad-missing
Qua ho skippato il capitolo 4.3!!!

```

# Pseudo-random generators (PRG) (4.4)
In the information-theoretic setting we can't do better than extracting $\approx k$ random bits from a source $x$ with min-entropy $\ge k$.

**Pseudorandomness**: Weather security in order to produce unlimited randomness.

- $G$ takes as input $\lambda$ random bits and generates $\lambda + l(\lambda)$ bits.
- $l(\lambda)$ is a stretch (additional bits generated over the initial length $\lambda$)

> Un ADV non è in grado di distinguere tra un output $G(U_{\lambda})$ ,dove $U_{\lambda}$ è un input casuale di $\lambda$ bits, ed una stringa casuale uniforme di $\lambda + l(\lambda)$ bits

```ad-abstract
title: Definition of PRG
A deterministic function $G: \{0,1\}^{\lambda} \to \{0,1\}^{\lambda + l(\lambda)}$ is called PRG with stretch $l(\lambda)$ iff $\forall PPT A:$
$$Pr[Game_{G,A}^{prg}, (\lambda) = 1] \le \frac{1}{2} + negl(\lambda)$$

```

- Output is 1 if ADV guess correctly if the string is generated by $G(U_{\lambda})$ or is completely random.
- $G$: is deterministic; efficiently computable 
- $l(\lambda) > 0$

```ad-done
title: To clarify
Un **Pseudo-Random Generator (PRG)** è una funzione deterministica che prende in input una stringa casuale corta $(\lambda$ bit) e produce una stringa più lunga $(\lambda + l(\lambda)$ bit) che "sembra" casuale a ogni avversario che può essere efficiente in tempo polinomiale probabilistico (PPT). Una sequenza è pseudocasuale se appare casuale, ma è in realtà generata da un algoritmo deterministico, partendo da un valore iniziale chiamato **seed**

```

**Verifica della sicurezza di un generatore pseudocasuale PRG**.
Il gioco è un metodo per determinare se un avversario $\mathcal{A}$ può distinguere l'output di $G$ da una stringa casuale.

![[Pasted image 20241121104208.png]]
> b is a bit that decides whether the output $z$ will be produced by the PRG or will be completely random. If $G$ is a valid PRG than every ADV have at maximum a probability of $\frac{1}{2}+ \text{negl}(\lambda)$

![[13.png]]
![[14.png]]


```ad-abstract
title: Def (PRG)
A deterministic function $G: \{0,1\}^\lambda \to \{0,1\}^{l+\lambda}$ is a PRG iff: $$GAME_{G,A}^{Prg}(\lambda, 0) \approx_\tau Game_{F,A}^{prg}(\lambda, 1)$$

```

- $GAME_{G,A}^{Prg}(\lambda, 0)$ : rappresenta un **gioco** tra un challenger e un avversario $A$, dove il challenger genera una stringa tramite il PRG $G$. Il parametro b = 0 indica che la stringa fornita dall'avversario è pseudocasuale cioè generata da $G(U_{\lambda})$.
- $Game_{F,A}^{prg}(\lambda, 1)$ : rappresenta lo stesso gioco, ma con la differenza che la stringa fornita all'avversario $A$ è **veramente casuale**, cioè estratta da una distribuzione uniforme di $\lambda + l(\lambda)$ bit $\Rightarrow$ $U_{\lambda + l(\lambda)}$
- $\approx_{\tau}$ : le due distribuzioni degli output $G(U_{\lambda})$ e $U_{\lambda + l(\lambda)}$ sono indistinguibili per l'avversario A tranne che per una probabilità trascurabile $\tau$ ($\tau$ dipende da $\lambda$)

>Un avversario non sà con certezza se la stringa ricevuta è stata generata da $G$ oppure è completamente casuale.333333333

It means:
$$\forall \hspace{0.3cm} \text{PPT} \hspace{0.3cm} A (Pr[Game_{G,A}^{prg}(\lambda, 0) = 1] - Pr[Game_{G,A}^{prg}(\lambda, 1)=1]) \le negl(\lambda)$$
where the game output is $b' \in \{0,1\}$.

```ad-bug
**Intuitively**: If $A(z)$ can predict $s$ there is no security. Because $A$ can check if $z= G(s)$ and if so output $b' = 1$. Otherwise $b'=0$.

```

```ad-info
title: Riassumendo
L'obiettivo dell'avversario $A$ è distinguere se la stringa $z$ ricevuta proviene da un'uscita pseudocasuale oppure da una stringa casuale generata uniformemente.
Se l'avversario A è in grado di predire il seme $s$ a partire da $z$ allora il PRG non è sicuro. Questo accade perchè A potrebbe semplicemente controllare se $z=G(s)$. Un PRG è sicuro solo se $A$ non può distinguere $z$ da una stringa casuale, anche dopo aver analizzato tutte le informazioni possibili.

```


----
----
---- 


We want to show:
1) OWF $\Rightarrow$ PRG
2) PRG $\Rightarrow$ SKE (Beating Shannon)

2) PRG $\Rightarrow$ SKE (SKE = Utilizzo della stessa chiave)
Assuming $G: \{0,1\}^\lambda \to \{0,1\}^{\lambda+l}$
Simple $\pi = (ENC, DEC)$ for $K = \{0,1\}^\lambda$, $M = \{0,1\}^{\lambda+l}$
$$ENC(k,m) = G(k) \oplus m$$
> Thanks to the XOR operation, each bit of the message $m$ is mapped by the corresponding bit of $G(k)$ where $G(k)$ is the output of PRG.

$$DEC(k,c) = c \oplus G(k) = (G(k) \oplus m) \oplus G(k) = m$$
>Thanks to the XOR property, $G(k) \oplus G(k) = 0 \Rightarrow$ we can recover the original message $m$. 


```ad-check
title: To clarify
Questo schema di cifratura sfrutta la pseudo-casualità di $G(k)$ per "mascherare" il messaggio $m$. La stringa $G(k)$ sembra casuale (perché è generata da un PRG), quindi, quando utilizzo XOR con il messaggio $m$, produce un testo cifrato che non fornisce alcuna informazione utile sul messaggio senza la chiave $k$. Quando il destinatario riceve il testo cifrato $c$, può decifrarlo con la stessa chiave $k$ usando $G(k)$ per ripristinare il messaggio originale $m$.

```


Secure SKE against PPT A?
We can see a game to evaluate the security of SKE. The game is played between two parties, an Adversary and a Challenger.
![[17.png]]
1. The Challenger initializes the game by choosing a random key _k_ and initializing the scheme SKE
2. The Adversary selects two messages, _m<sub>0</sub>_ and _m<sub>1</sub>_.
3. The Challenger randomly chooses a bit _b_ (either 0 or 1) and encrypts the corresponding message (_m<sub>b</sub>_) using the SKE scheme (_C = Enc(k, m<sub>b</sub>)_). The Challenger then sends the encrypted message _C_ to the Adversary.
4. The Adversary observes _C_ and tries to guess the value of _b_.

>**The Goal of Secure SKE:** A secure SKE scheme should make it difficult for any PPT Adversary to guess the value of _b_ with a probability significantly greater than 1/2. This means that the encrypted message _C_ should appear indistinguishable from random noise, even to a powerful Adversary.

```ad-abstract
title: Def
$\pi$ is one time secure if:
$$Game^{\text{SKE}}_{\pi, a}(\lambda, 0) \equiv_{\epsilon} Game^{\text{SKE}}_{\pi, a}(\lambda, 1)$$

```

**What is good**?  For secure SKE it should be hard to:
- get the key from $c$ but ENC(K,m) = m, satisfies this!
- get $m$ from $c$
- get first bit of $m$ from $c \to$  Adversary choose the message
- get _ANY_ info of $m$

```ad-abstract
title: Theorem
If $G$ is a PRG $\Rightarrow$ above $\pi$ is ONE TIME SECURE.
**One time secure** = Si riferisce, in questo caso, allo schema di cifratura SKE (simmetric key encryption) e afferma che tale sistema di cifratura è sicuro solo quando una chiave viene usata per cifrare un messaggio. Per ogni messaggio deve esserci una chiave! Se utilizzo la stessa chiave $k$ per due messaggi $m_1$ ed $m_2$, con l'operazione di XOR l'attaccante potrebbe riuscire a dedurre informazioni sui messaggi.

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

----
----
----

## Constructing PRGs (5.0)
This chapter/lesson is devoted in constructing PRGs. We **begin by assuming to have already a PRG** ==$G \in 2^{\lambda} \to 2^{\lambda+1}$==, that extends the string length by one bit, and prove that it is possible to extend such string by an indefinite amount while preserving pseudo-randomness

### Stretching a PRG
Consider this algorithm that uses $G$ to construct $G^l$, as depicted in figure below:
1. Let  $s_0 \leftarrow \{0,1\}^{\lambda}$ take an initial seed with length equal to $\lambda$
2. $\forall i \in [l(\lambda)]$ $\hspace{0.9cm}$ ($i \to 1, \cdots, n$) where $l(\lambda)$ is the quantity of bits that we want to add
	1. let $G(s_{i-1}) = (s_i, b_i)$, 
		1. where $s_i$ is the current seed
		2. where $b_i$ is the extra bit generated by a single use of $G$.
3. Compose $(b_1, b_2, \cdots, b_l(\lambda), s_{l(\lambda)})$. This will be returned string, which is $\lambda + l(\lambda)$ bits long.

![[Pasted image 20241121182330.png]]

```C
Execution:
i = 1 -> G(s0) = (s1, b1)
i = 2 -> G(s1) = (s2, b2)
i = k -> G(sk) = (sk+1, bk+1)
```

>Remember that: $l(\lambda)$ is a polynomial function of $\lambda$ such as $\lambda^2$ or $10 \lambda$.

```ad-abstract
title: Theorem
The above $G^l$ is a PRG for every $l(\lambda) = Poly(\lambda)$ ensuring if is a PRG.

```

```ad-done
title: Domande e Chiarimenti
- Come viene mantenuta la pseudocasualità mano a mano che itero G?
	- La pseudo-casualità viene mantenuta grazie a una proprietà fondamentale dei PRG: **se l'output del PRG iniziale $G$ è indistinguibile da un output casuale, allora anche l'output iterato rimane indistinguibile da un output casuale**.

- Il processo avviene in tempo polinomiale?
	- Sì, il tutto avviene in **tempo polinomiale**. Per un PRG sicuro, $G$ deve essere calcolabile in tempo polinomiale rispetto alla lunghezza del seed, $\lambda$. Quindi, una singola chiamata a $G$ richiede tempo polinomiale. L'algoritmo richiede $l(\lambda)$ iterazioni, dove $l(\lambda)$ è una funzione polinomiale di $\lambda$



```

**Proof**
To prove that this construct is a valid PRG, we will make use of a known technique for proving many other results, which relies heavily on reductions like the one employed back in the OWF topic, and is commonly called the “**hybrid argument**”.  We need  to show $G^l(U_\lambda) \equiv U_{l + \lambda}$. We can do this by defining hybrid distributions like $H_0(\lambda), H_1(\lambda), \cdots, H_l(\lambda)$ such that:
- $H_0(\lambda) \equiv G^l(U_{\lambda}); H_l(\lambda) \equiv U_{\lambda + l}$
- $H_0(\lambda) \equiv H_1(\lambda) \equiv H_2(\lambda), \cdots, H_l(\lambda)$

>Remark: property two implies that $H_0(\lambda) \equiv H_l(\lambda)$ as long as $l(\lambda) = Poly(\lambda)$ (Follows by the triangle inequality)


$H_0(\lambda) \equiv G^l(\lambda) = (b_1, \cdots, b_l, s_l)$ 
$b_1, \cdots, b_i \leftarrow \{0,1\} \hspace{0.9cm}$ 
----
$H_i(\lambda) \equiv s_i \leftarrow U_{\lambda}$
$(b_{i+1, \cdots, b_l, s_l}) = G^{l-i}(s_i)$
----
$H_l(\lambda) \equiv (b_1, \cdots, b_l, s_l) \leftarrow U_{\lambda + l}$ 


Il cuore della dimostrazione sta nel dimostrare che ogni coppia di distribuzioni consecutive $H_i$ e $H_{i+1}$ sono indistinguibili:

- La differenza tra $H_i$ e $H_{i+1}$​ è minima: sostituiamo solo un bit $b_{i+1}$​ pseudo-casuale con un bit casuale.
- Poiché $G$ è un generatore pseudo-casuale sicuro, un avversario non può distinguere tra un bit generato da $G$ e un bit completamente casuale.

```ad-abstract
title: Lemma
$$\forall i \in [0, l-1] : H_{i+1}(\lambda) \approx H_i[\lambda]$$

```


**Perché vale l'indistinguibilità tra $H_i$ e $H_{i+1}$​?**
La sicurezza deriva dal fatto che:

- **Il PRG di base $G$ è sicuro:** Ciò implica che un singolo bit $b_i$​ generato da $G$ è indistinguibile da un bit casuale.
- **Solo un bit cambia:** La differenza tra $H_i$​ e $H_{i+1}$ riguarda solo il bit $b_{i+1}$​. Tutti gli altri bit e il seed restante $s_i$​ rimangono inalterati. Questo garantisce che la variazione tra i due ibridi sia minima.


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


Let $X, Y$ and $Z$ be three any distribution ensembles of the same length. the following is true:
$$X \equiv_c Y \wedge Y \equiv_c Z \Rightarrow X \equiv_c Z$$
**Proof**:
$\forall A \in PTT$ by using the triangle inequality: 
$$|Pr[A(u) =1 : u \leftarrow X] - Pr[A(u) =1 : u \leftarrow Z]|$$
$$= |Pr[A(u) =1 : u \leftarrow X] - Pr[A(u) =1 : u \leftarrow Y] + Pr[A(u) =1 : u \leftarrow Y] - Pr[A(u) =1 : u \leftarrow Z]|$$
$$\le |Pr[A(u) =1 : u \leftarrow X] - Pr[A(u) =1 : u \leftarrow Y] + Pr[A(u) =1 : u \leftarrow Y] - Pr[A(u) =1 : u \leftarrow Z]|$$
$$\le \epsilon_{1}(\lambda) + \epsilon_{2}(\lambda) \le negl(\lambda) \hspace{0.8cm} \text{By the sum of negligible funxtions the result is still negligible, proving lemma}$$

>In essence, the hybrid argument proves that computational indistinguishability is a transitive relationship, which enables us to design “hybrid” games in order to bridge differences two arbitrary ones

----
-----
-----



![[Cryptography/images/26.png]]

More in details:
- How to generate so? Randomness extractors. 
- Theory: leftover hash lemma.
- Practice: AES (Advanced Encryption Standard) used as PRG
- Which $G$? 
	- Theory: we can get one from any OWF $f$ or assuming hardness of:
		- Factoring (RSA)
		- discrete log (Diffie hellman)
		- LWE
	- Practice: AES
- If the initial seed $s_i$ (the natural state) is compromised, an attacker could predict all future outputs. Continuously update the internal state with new random data using an extractor $\text{EXT}(x)$

```c
if state is s_i, 
	EXT(x) //genera un valore casuale da una sorgente x
	s_i = s_i + EXT(x) //combina lo stato attuale con il nuovo valore casuale
```

How to **construct $G$ as a theory**:
```ad-summary
title: Theorem
If $OWF_s$ exists $\Rightarrow$ is possible to construct PRGs with $l(\lambda)=1$.


```

The proof has to do with the following question. What info about $x$ is hidden given $f(x)$.
![[Cryptography/images/27.png]]

**Non-trivial**: 
If $f$ is OWF then so is $f'(x)=0 \mid \mid f(x)$
- $f'(x$) is not a PRG!
- Concatenare un "0" con $f(x)$ non è un PRG, perchè non espande la casualità e non produce output indistinguibili da una distribuzione casuale uniforme.

Also: If $f$ is OWF, then so is $f'(x) = x[1] \mid \mid f(x), x[1] = 1st$ but of $x$.
Concatenare il primo bit di $x$ ($x[1]$) con $f(x)$ preserva la difficoltà di inversione, ma non è un PRG per la stessa ragione di sopra.

>Adding predictable or structured information (such as "0" or the first bit of xx) does not turn an OWF into a PRG, because it does not introduce randomness or unpredictable expansion.

## Hardcore predicates
Now that we’ve seen how to reuse a one-bit stretch PRG in order to obtain an arbitrary length of pseudorandom bits, we turn to the problem of constructing a 1-bit stretch PRG itself by starting from OWF. Let $f$ be a OWF, and consider the following questions: 
- Given an image $f(x)$, which bits of the input $x$ are hard to extract? 
- Is it always true that, given $f$, the first bit of $f(x)$ is hard to compute for any choice of $x$?

```ad-abstract
title: Definition
**hard-core bit** is a predicate $h(x)$ such that given $f(x)$ it is hard to compute $h(x)$.

- $h(x)$ è una funzione che restituisce un singolo bit $\hspace{0.8cm} h:x\to \{0,1\}$
- $h(x)$ è computazionalemnte difficile da calcolare dato solo $f(x)$.

**Formally**: an ADV taht know $f(x)$ cannot distinguish the bit $h(x)$ from a random one $U_1$.

```

> very OWF $f(x)$ has at least one hard-core bit $h(x)$

### PRG creation from OWF
A PRG can be constructed from a One-Way Permutation (OWP, an invertible OWF). The idea is to concatenate the result of the OWP with a hard-core bit derived from the input:
$$G(s) \equiv f(s) \mid \mid f(s)$$
- $f(s)$: Output della OWP.
- $h(s)$: Hard-core bit derivato da sss.


```ad-attention
title: Security
Se $f(s)$ è una $OWP$ e $h(s)$ è un hard-core bit, allora $G(s)$ è un $PRG$ sicuro:

- Gli output di $G(s)$ sono indistinguibili da una sequenza casuale uniforme.
- Possiamo usare $G(s)$ per generare bit pseudocasuali a partire da una sorgente sicura $s$.

```


>Questo è importante perché garantisce che possiamo sempre derivare un bit "casuale" da una OWF.


```ad-missing

finisce qui a pagina 35
```
