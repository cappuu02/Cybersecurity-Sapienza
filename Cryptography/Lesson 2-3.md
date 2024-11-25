```ad-summary
title: Thm Equivalent notion of perfect secrecy
i) The above definition (Shannon)
ii) $M$ and $C$ are indipendent 
iii) $\forall m, m' \in M, \forall \tau \in T \to Pr[ENC(k,m) = c] = Pr[ENC(k,m') = c]$

```

> $i$, $ii$, $iii$ are Equivalent Notions of Perfect Secrecy.
> $iii)$ Over the choose of the key, the probability is the same.



```ad-question
title:  Spiegazione $ii$
- Senza conoscere la chiave $K$, ogni possibile testo cifrato $C$ può essere stato prodotto da **qualsiasi messaggio $M$** con una probabilità uguale.
- Perciò, dal punto di vista di un intercettatore che non ha accesso alla chiave $K$, $C$ è distribuito in modo da non fornire alcuna indicazione su $M$. **È questo che rende $M$ e $C$ indipendenti**.

L'indipendenza si basa dunque sul fatto che la chiave segreta $K$ è:
- Random
- Segreta
- Lunga quanto il messaggio $m$
```

```ad-question
title: Spiegazione $iii$
Dato un sistema crittografico, il risultato della funzione di crittografia $ENC$ deve produrre un testo cifrato $C$ con la stessa probabilità, indipendentemente dal messaggio in chiaro $M$ che stai crittografando. Il testo cifrato non dovrebbe rivelare informazioni sul messaggio originale.

```
## Chain demonstration
The proof is structured as a cyclic implication between the three pro- posed definitions
### $i \to ii$

![[4.jpeg]]
>This proves that M and Enc(K, M ) are indeed independent random variables (variabili casuali indipendenti.)
### $ii \to iii$

![[Cryptography/images/1.png]]
### $iii \to i$
![[Cryptography/images/2.png]]

### Apply Bayes (Reverse demonstration)
By applying Bayes’ theorem, the above result can be turned into the first definition of perfect secrecy:

![[Cryptography/images/3.png]]

# Application: One-time as perfectly secure

- $M = K = T = \{0,1\}^n$
	- message and the key are sequence of bits of length $n$.
- $ENC(k,n) = \varphi = k \oplus m$ 
	- Exclusive or.
	- (L'operazione XOR restituisce un bit 1 se i bit in input sono diversi, altrimenti restituisce 0. Questa funzione genera un testo cifrato φ combinando il messaggio con la chiave.)
- $DEC(k, c) = c \oplus k = k \oplus m \oplus k = m$
	- remember that $k \oplus k = 0$ 
	- apply another time the secret key into the cipertext we can obtain the original message.

>The OTP is perfectly secret!

```ad-abstract
title: Corollary
$\Pi = (ENC, DEC)$ bove as perfectly secret for the reason explained before:
- random key as long as the message.
- independence between message and ciphertext.
- Uniform distribution of the cipertext $(iii)$.

```
## Proof (demonstration)
Fix any $m \in M, \varphi \in \varphi:$
$$Pr[ENC(K,m) = \varphi]$$
$$= Pr[k \oplus m = \varphi]$$
$$= Pr[k = \varphi \oplus m] = 2^{-n} \hspace{0.8cm} \text{Formal definition}$$

>We have $2^{n}$ possible key, and each key is equally likely.

>Remember that $K$ is a set of binary keys of length $n$

We can express this probability in terms of another message $m':$
$$= Pr[k = \varphi \oplus m']$$
$$= Pr[ENC(k,m') = \varphi]$$
Drawback's: One time notion (only one $\varphi$)
$$|K| = |M|$$

```ad-note
title: To clarify
To ensure a secure system, The length of message $M$ must be the same as the key $K$. This uguagliance tells us that every message must be associate to one unique key, this key must be not repeat for another message. This means that there must be enough keys to ensure that every message can be encrypted with a unique key.

```

Two-time:
$$c_1 = k \oplus m_1$$
$$c_2 = k \oplus m_2$$
$$c_1 \oplus c_2 = m_1 \oplus m_2$$
>I use two times the same key to create two ciphertext from different messages.

```ad-note
title: Avoid this problem
If the key is used more than one to cifrate a message, a third person can find a relationship between the two messages $m_1$ and $m_2$. If the third person has the information about one of the two messages, can use this relationship to deduce information about the other message.

```

```ad-summary
title: Theorem
In any perfectly Secret SKE $\Pi = (ENC, DEC)$ we have $|K| \ge |M|$ 

```

>The number of the keys must be more than the number of messages. If the keys are less than the number of messages, can exist the risk that some messages cannot be unique into the cryptographic system.

**Proof (demonstration)**:
Take $M$ to be uniform over $M$.
Take any cipertext $\varphi \in \varphi$ s.t. $Pr[\varphi = \varphi] > 0$. (è possibile ottenere il testo cifrato φ da uno dei messaggi attraverso una chiave.)

**Consider**:
$$M' = \{DEC(k, \varphi) : k \in K\}$$
**Assume**:
$|K| < |M|$ we will show perfect secrecy does not hold.

**Observe**:
$$|M'| \le |K| < |M| \hspace{0.5cm} \text{there exists} \hspace{0.5cm} m \in M \not \in M'$$

>Exists a message $m \in M$ that is present into M  but not  into $M'$
>Since m is not into $M'$, we have:
$$Pr[M = m | \varphi = \varphi] = 0 \hspace{0.5cm} \text{$m$ is in $M$ but not in $M'$}$$

>given the ciphertext, the probability to obtain $m$ as original message is equal to zero.


**In a perfectly secret encryption system, the probability of each message must be uniform**:
$$Pr[M = m] = \frac{1}{|M|} \hspace{0.4cm} \text{This is Good!}$$
## Authentic communication

The most common scenario exposing the problem of authentication is depicted in figure 2.2. This time, the parties Alice and Bob want to ensure that they are effectively communicating to each other; in other words, nobody else is impersonating either party. The objects used here are: 
- The data to be shared, or message $m$; 
- Some additional secret information, shared by the two parties, that is used to sign the message: the authentication key or just key $k$; 
- The result of signing a message m using the key $k$: the signature or tag $t$.

![[Cryptography/images/62.png]]
The mechanism employed by both parties to enforce authentication is called a ==cryptographic authentication scheme==, typically taking the form $\Phi = (Tag, Ver)$, where:

- $Tag ∈ K × M → T$ is the machine that, given a message $m$ in $M$ and a key $k$ in $K$ generates the signature $t$ 
- $Ver ∈ K × M × T → 2$ is the machine that decides whether t is the correct signature for the message $m$ using the key $k$


Uno schema di autenticazione è corretto se, per ogni messaggio $m \in M$ e per ogni chiave$k \in K$:
$$\text{Ver}(k, m, \text{Tag}(k, m)) = 1$$

Thus, a security problem arises when someone, having a signed message $(m1, t1)$ whose k-key used for labeling is unknown, is able to efficiently sign a different message $(m2, t2)$ so that verification with the same key yields a positive result. This meaning is called forgery; and looking at the original setting in the figure above, if Eve is indeed able to forge authentic signatures, she can effectively impersonate Alice or Bob at will. The desired property of an authentication scheme then becomes that of being resistant, if not immune, to such attacks; in a word, the scheme is imperfect.

A rigorous definition of uncountability is the ==$ε$-statistical one-time unforgeability==.


```ad-abstract
title: $\epsilon$-statistical one-time unforgeability
let $\Phi$ be an authentication scheme, and let $m_1$ and $m_2$ be two distinct messages, and $t_1 = Tag(K, m1_)$ be the signature of $m_1$ under $\Phi$, with the key $K$ picked uniformly at random. $\Phi$ is deemed $\epsilon$-statistical one-time unforgeability iff knowing $m_1$ and $t_1$ does not give any advantage in finding a signature $t_2$ that is actually the signature of $m_2$ under the same scheme and the same key of $m_1$, without knowing such key:

$$\forall m_1 = m_2 \in M, \forall t_1, t_2 \in T Pr[Tag(K, m_2) = t_2 \mid Tag(K, m_1) = t_1] \le \epsilon$$

```

>Is impossible to get $\epsilon = 0$

- ==$\epsilon$ quantifies the level of security==:
	- A lower $\epsilon$ indicates a higher level of security because define a lower probability to breach or corrupt an authentication tag.


### Introduction to Hashing
A great deal of authentication has been, and is still done by means of hashing, which consists of feeding the message to a special machine that produces a scrambled, unique signature for it; such machines are then known as ==hash functions==. For starters recall that, given a set $A \to B$ that collects all possible functions from $A$ to $B$, a function family is a subset of such class that share some specific properties. Having said that:

```ad-abstract
title: Definition
 family of hash functions $H$ is defined as a function family that is mapped $1$-to-$1$ by an indexing set $S$, where the indices are called seeds:
 $$H \in S \to (M \to T ) : s \to h_s \hspace{0.9cm} \text{where $s$ is public and know}$$

```

The seed $S$ is crucial to ensure that the hash functions chosen by $H$ are uniformly distributed and respect the pairwise independence property.
Furthermore, given a uniformly random seed $S$, the family as a whole distributes the tags uniformly: (tag for one single message $m_1$)
$$\forall m \in M,  \forall t ∈ T, Pr[h_S (m) = t] = \frac{1}{T}$$

Having formalized what a hash function family is, the notion of unforgeability can be modeled by the property of pairwise-independency:

```ad-abstract
title: Definition of pairwise Indipendent
Let $H$ be a family of hash functions, and $S$ be a uniformly random seed; the hash functions are deemed pairwise-independent iff, for any two distinct messages $m_1$ and $m_2$, the pair $(h_S (m_1), h_S (m_2))$ distributes uniformly in $\tau^2$:

$$\forall m_1 \not = m_2 \in M. \forall t_1, t_2 \in T \Rightarrow Pr[h_s(m_1) = t_1 \wedge h_s(m_2)=t_2]=\frac{1}{|\mathcal{T}|^2}$$
```

- $H$ set of hash function.
- $h_k$ single hash function.

>A hash function $h_k$​ is said to be **pairwise independent** if for any two distinct messages $m$ and $m′$ in $M$, the outputs of the hash function are statistically independent.

```ad-abstract
title: Theorem
Let $H$ be pairwise indipendent, then $Tag(k,m) = h_k(m)$ is $\epsilon-Statistical$ secure for $\epsilon = \frac{1}{|t|}$

```

- $Tag(k,m)$ =  authentication value for a $m$ message using a $k$ key
- $\epsilon = \frac{1}{|\tau|}$ This implies that an attacker's probability of correctly guessing a tag is inversely proportional to the number of possible tags, meaning that the larger the set of tags, the more difficult it is for the attacker to guess. This value $(\frac{1}{|\tau|})$ indicates the maximum probability with which an attacker can counterfeit a tag.


```ad-success
title: Approfondimenti
- Per un singolo messaggio $m$: $\Pr[\text{Tag}(k, m) = t] = \frac{1}{|t|}$
- Per due messaggi distinti $m_1, m_2$: $\Pr[\text{Tag}(k, m_1) = t_1 \land \text{Tag}(k, m_2) = t_2] = \frac{1}{|\mathcal{T}|^2}$. 

Questo riflette il fatto che la sicurezza aumenta con la grandezza dello spazio $\mathcal{T}$.

```


**Proof**:
Proof on the one hand (one single message): 
$$\forall m, \forall \tau \to Pr[Tag(k,m) = \tau] = Pr[h(k,m) = \tau] = \frac{1}{|\tau|}$$
>The probability to obtain a specific $\tau$ tag for a message $m$ is $\frac{1}{|\tau|}$, thanks to the pairwise independent property of hash function that ensure: "all messages has equal probability to being mapped with each cyphertext"

On the other hand (with two messages):
$$\forall m, m', \forall \tau, \tau', m \not = m' \to Pr[Tag(k,m) = \tau \wedge Tag(k, m') = \tau'] = \frac{1}{|\tau|^2}$$
>Rightly increases the size of the set of ciphertexts from which to guess

$$\Rightarrow Pr[h(k,m') = \tau' | h(k,m) = \tau] = \frac{\frac{1}{|\tau|^2}}{\frac{1}{|\tau|}} = \frac{1}{|\tau|}$$

>The end of the proof, each pair of messages $(m_1 , m_2)$ yields statistically independent results, satisfying the definition of pairwise independence.

**An example**: Let $p$ be prime. Define:
$$h_{c,b}(x) = ax + b \hspace{0.2cm} \text{mod} \hspace{0.2cm} p = t$$
- $a, b$ are Random parameters chosen in the set of integers from $[0, p-1]$ with $p$ a prime number.
$$(a,b) \in Z_p \times Z_p \hspace{0.2cm} \text{with} \hspace{0.2cm} x, \tau \in Z_p \hspace{0.2cm} \text{and} \hspace{0.2cm} (a,b) \in Z_p \times Z_p$$

```ad-abstract
title: Lemma
The above $H$ is pairwise indipendend. So we get $\epsilon = \frac{1}{p}-statistical$ secure MAC. $p$ is the prime number used in the module of hash function.

```

**_Proof_**: Fix $m, m' \in Z_p$ and $\tau, \tau' \in Z_p, m \not = m'$

$$Pr_{a,b}[h_{a,b}(m) = \tau \wedge h_{a,b}(m') = \tau']$$
$$= Pr_{a,b}[\begin{pmatrix}  m & 1 \\ m' & 1 \\  \end{pmatrix} \cdot \begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} \tau \\ \tau' \end{pmatrix} \hspace{0.2cm} \text{mod} \hspace{0.2cm} p]$$
$$= Pr_{a,b}[\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix}  m & 1 \\ m' & 1 \\  \end{pmatrix}^{-1} \cdot \begin{pmatrix} \tau \\ \tau' \end{pmatrix} \hspace{0.2cm} \text{mod} \hspace{0.2cm} p]$$
$$= Pr_{a,b} [\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} c \\ d \end{pmatrix}] = \frac{1}{p^2}$$
>$c$ and $d$ are fixed.
>Function of $m, m', \tau, \tau'$

We have a $2^{- \lambda}$ - statistical secure MAC by choosing any $\lambda-$but prime $p$

>The lemma confirm that using hash function we can reach an high and strong level of statistical security for MAC (**Message Authentication Code**)

```ad-done
title: Conclusioni
Da questo calcolo, possiamo concludere che la probabilità che un attaccante riesca a indovinare il **MAC** (cioè, a forzare la generazione di un tag valido per un messaggio $m$) è $\frac{1}{p}$​. Questo implica che la **sicurezza statistica** del **MAC** è $\epsilon = \frac{1}{p}$​, che è considerata una sicurezza molto alta quando $p$ è un numero primo grande.

```


# Randomness Extraction
In cryptography, **randomness** means generating numbers that cannot be predicted. This randomness is necessary to generate secret keys (key = bit sequences that must be random and unpredictable) and random numbers for algorithms.
In an ideal context, the sequence of bits we use in cryptography must satisfy two main characteristics:
- **Uniformity**: Each value (bit) has the same probability of being chosen.
- **Impredictability**: Another key feature of randomness is that successive values must not be predictable (otherwise I compromise security).
Natural sources of randomness are physical phenomena that generate random data However, these natural sources are not perfect. The randomness we get from these phenomena is imperfect since there may be correlations in the data that are generated or the numbers may be unbalanced, i.e., they may not have a uniform distribution. **Randomness Extraction** is used to “purify” the non-perfect sources of randomness, which could come from physical devices or other natural sources, and ensure that the final random numbers possess the properties necessary to be used in cryptography. 
## Randomness extraction
How to extract uniform randomness as imperfect random source.  The goal is to design some function "**EXT**" (Extraction) that tells some $x$ (not uniform) and outputs something **uniform**. Suppose you have a **biased coin** (_moneta con due facce_):
$$Pr[B = 0] = p \le \frac{1}{2}$$
How to craft a fair coin out of it? $\to$ How to extract uniform randomness?
In his time, _Von Neumann_ devised a simple algorithm, which is now known as the **Von Neumann extractor**.

![[Cryptography/images/63.png|600]]
>This algoritmi guarantee that zero and one has the same probability to be extracted

So: $$Pr[\text{Ext outputs} \hspace{0.2cm}  0] = Pr[\text{Ext outputs} \hspace{0.2cm}  1] = P(1-p)$$$$Pr[\text{No output after k trials}] \hspace{0.5cm} \text{trial is small} \hspace{0.5cm} $$

> The probability of getting no output after 𝑘 trials is low when 𝑘 is sufficiently large, ensuring that randomness extraction continues until an output is obtained.


```ad-question
In general can we design a "good" EXT for any $x$? No, because: 
- EXT is deterministic: Function in which, given an input, the output is always the same. There is no uncertainty or variability in the output.
- $X$ could be completely predictable: $\to$ $x$ needs to be unpredictable.

```

```ad-abstract
title: Def. Min-Entropy
The ==Min-Entropy== represent tha **max probability to predict an $x$ value by an attacker**. The higher the Min-Entropy, the more difficult it is for the attacker to correctly predict the value.

The Min-Entropy of $x$ is: $$H_{\infty}(x) = - \log_x \text{max} \hspace{0.1cm} Pr[X = x]$$

- $\text{max} \hspace{0.1cm} Pr[X = x] \Rightarrow$ highest probability with which an attacker could correctly guess the value of  𝑋
- $\log_2 x \Rightarrow$ the use of the logarithm allows the Min-Entropy to be expressed in terms of bits.
- Since the maximum probability is always between 0 and 1, the logarithm of a fractional number (0 < x < 1) is negative, so the negative sign makes the result positive.

```

_Intuition_: The best probability to predict $x$ by unbounded adv.

```ad-example
**Example 1:**  
If $X$ is uniformly distributed over $\{0, 1\}^n$ (a string of length $n$ with random values between $0$ and $1$), the Min-Entropy is $n$, because each bit of $X$ is completely random.
$$H_{\infty}(\cup_n) = n$$

**Example 2:**  
If $X$ is always equal to $0^n$ (a string consisting only of zeros), the Min-Entropy is $0$, because $X$ is completely predictable.
$$H_{\infty}(X) = 0$$
The maximum probability of guessing $X$ is 1, so the Min-Entropy is 0.

```

Per le sorgenti di casualità nel mondo reale, la Min-Entropia non sarà mai inferiore a un certo valore $K$, ovvero, c'è sempre un certo grado di incertezza minimo che possiamo aspettarci da qualsiasi sorgente di casualità reale. We can get lower bound
$$H_\infty \ge K \hspace{0.3cm} (k < x)$$
- $K$ is the lower bound. The uncertainty associated with $X$ will never fall below a certain threshold.

>represents the minimum amount of uncertainty we can get from a source $X$. No matter how imperfect or predictable a source is, the amount of uncertainty can never be less than $K$.

**THE NEW GOAL** 
The new objective is to design an **EXT extraction function** that extracts ==uniform randomness from a source $X$ ==such that the Min-Entropy of $X$ is greater than or equal to $k$.
$$\text{Design EXT that extracts from any x such that} \hspace{0.9cm} H_\infty(X) \ge k$$

```ad-abstract
title: Theorem
This is impossible even if $x = n-1$ and $EXT: \{0,1\}^n \to \{0,1\}$

If $x$ has a minimum entropy equal to $n-1$ EXT fails. This is because there will always be a part of x that is too predictable to produce a complete random output.


```

**Proof Introduction** 
For every $EXT: \{0,1\}^n \to \{0,1\}$ there exists some $x$ such that $H_\infty(X) = n-1$ but EXT fails as such $X$.

Let $b \in \{0,1\}$ be the value that maximizes $|EXT^{-1}(b)|$ 

![[Cryptography/images/6.png]]

>se osserviamo quanti valori  $x$ corrispondono ad un'uscita $b$, scopriremo che in certi casi esistono molti valori di $x$ che si comportano "in modo simile", riducendo la casualità. Questo significa che non possiamo estrarre casualità uniforme da tutti i possibili $x$.

Since EXT fails when the entropy of $x$ is too low, we need to change the model.
## Seed Extractor
Seed Extractor is an advanced randomness extraction model.
1) Assume Independent $x_1, x_2$ s.t. $H_\infty(x_1), H_\infty(x_2) \ge k$ (more randomness between the inputs)
2) Assume the EXT is seeded (extractor take two input):
	$EXT(S,X)$
	$S \in \{0,1\}^d$ (seed, is public and random, with length of $d$ bit)
	$X \in \{0,1\}^n$ (imperfect source $X$ where extract the probability with min-entropy $\ge k$)
	This seed is uniform, but public.

>The ==Seed Extractor== is **more powerful** because it combines multiple sources of randomness (e.g, X S) to extract a truly random and uniform bit sequence.

```ad-abstract
title: Definition
$EXT: \{0,1\}^d \times EXT\{0,1\}^n \to \{0,1\}^l$
- public and random seed $S \in \{0,1\}^d$ (length = d bits)
- $X \in \{0,1\}^n$ the value from which we want to extract randomness

Is a $(K,E)$-seeded extractor if $\forall x \in \{0,1\}^n$ s.t. $H_\infty(X) \ge k.$ That is, if he succeeds in extracting uniform randomness.

```

```ad-important
The seed does not have to be secret. Even if an opponent knows the seed, he should not be able to predict the output of EXT.

```

$$EXT(S,X) \equiv_{\epsilon} U_l \hspace{0.5cm} \text{Where $U_l$ is uniform; $S \equiv U_d$} \hspace{0.3cm} \text{is uniform}$$
```ad-note
title: Spiegazione
- Questo significa che l'estrattore $EXT(S,X)$, quando applicato su un valore $X$ e un seme $S$, genera un output che è "quasi indistinguibile" (entro una tolleranza $\epsilon$) da una distribuzione uniforme $U_l$​, che è una distribuzione uniforme su $l$ bit. In altre parole, l'output $EXT(S,X)$ sembra casuale (uniforme) anche se $X$ non è perfettamente casuale.
- $S \equiv U_d$ indica che il seme $S$ è estratto da una distribuzione uniforme su $d$ bit.

```

The statistical distance between two distributions $X$ and $Y$ measures how “different” or distinguishable these two distributions are.

$$SD(X;Y) = \frac{1}{2} \sum_z | Pr[X=z] - Pr[y=z] \hspace{0.5cm} \text{SD = Statistical Distance}$$
_Equivalent:_ An unbound ADV can-t distinguish a sample $z \leftarrow x$ from $z \leftarrow y$ with $f$ better than  $\epsilon$

```ad-success
title: Spiegazione ITA
La formula della distanza statistica si calcola sommando la differenza assoluta tra le probabilità che $X$ e $Y$ assumano lo stesso valore $z$, su tutti i possibili valori $z$, e poi dividendo per $2$. La distanza statistica è un modo di quantificare quanto è difficile per un attaccante distinguere i valori provenienti dalle due distribuzioni.

```

## Hash functions has extractors
Se abbiamo una famiglia di funzioni hash **pairwise indipendenti**, possiamo usarle come estrattori di casualità in combinazione con un seme pubblico. La condizione per il successo dell'estrazione è legata alla **Min-Entropia** della sorgente $x$ (quanto è imprevedibile).
- $H_{\infty}(x)$ è la Min-Entropia di $x$, che misura quanto è imprevedibile la sorgente.
- $k$ è la Min-Entropia minima richiesta per garantire che l'estrattore produca una buona casualità.
- $\epsilon$ è la probabilità di errore (cioè la probabilità che l'output dell'estrattore non sia veramente uniforme).

```ad-abstract
title: Theorem
Let $H = \{h_{\epsilon}: \{0,1\}^k \to \{0,1\}^l\}$ where $s \in \{0,1\}^d$ be a formaly of pairwise indipendend hash functions. Then, $EXT(s,x) = h_s(x) = h(s,x)$ is a $(k, \epsilon)$-extractor for $k \ge l + 2 \log(\frac{1}{\epsilon}) - 2$
```

Il teorema dice che per avere un buon estrattore, la Min-Entropia $(k)$ della sorgente $x$ deve essere **sufficientemente alta** rispetto alla lunghezza dell'output dell'estrattore $(l)$ e alla probabilità di errore $\epsilon$. La formula data è:

Dove:

- $k$ è la Min-Entropia della sorgente $x$.
- $l$ è la lunghezza dell'output desiderato.
- $\epsilon$ è la probabilità che l'output dell'estrattore non sembri casuale.

>Per garantire che l'estrattore funzioni correttamente, $k$ deve essere abbastanza grande rispetto a $l$ e $\epsilon$.

==**Collision**== refers to the probability that **two values generated by a hash function (or randomness source) are equal**, that is, that two distinct inputs produce the same output. The collision probability is a measure of **how similar** the outputs of two operations are, and it can affect the uniformity of the output, which should be as random as possible. If the collision probability is high, the generated output will be non-uniform and therefore non-random.

```ad-summary
title: Lemma
Let $y$ be a random variable over $Y$ such that $$COL(y) = Pr[y = y'] = \sum_{y \in Y} Pr[y = Y]^2 = \frac{1}{|y|} \cdot (1+4\epsilon^2)$$ then: $$SD(Y;U) \le \epsilon$$

```

Il lemma dimostra che, data una **probabilità di collisione** tra i vari valori prodotti dall'estrattore e una **distanza statistica** tra l'output dell'estrattore e una distribuzione uniforme, possiamo garantire che l'output sia quasi casuale (uniformemente distribuito) se la probabilità di errore $\epsilon$ è piccola.

La formula finale $SD(Y; U) \leq \epsilon$ indica che la **distanza statistica** tra l'output dell'estrattore e una distribuzione uniforme è controllata dalla probabilità di errore $\epsilon$. 
- Se la probabilità di errore $\epsilon$ è **piccola**, l'output dell'estrattore è molto **simile** a una distribuzione uniforme (cioè molto simile a una sequenza di bit completamente casuali).
- Se $\epsilon$ è grande, l'output dell'estrattore sarà meno simile a una distribuzione uniforme, e quindi meno casuale.

In pratica, questo significa che **la qualità dell'estrazione della casualità** dipende da quanto **piccola** è la probabilità di errore $\epsilon$. Se $\epsilon$ è molto piccolo, possiamo essere sicuri che l'output dell'estrattore sarà **praticamente casuale** e non distinguibile da una sequenza di bit estratti da una vera distribuzione uniforme.


Example: 
$$Col(U_n) = \sum_{u \in |0,1|^n} Pr[U_n = n]^2 = 2^n - 2^{-2n} = 2^{-n}$$

First: we use the lemma to prove the theorem
Proof (of theorem): set $y = (S,h(S,X))$
$$U \equiv U_{d+l} \equiv (S,U_l), y = \{0,1\}^{d+l}$$
$$COL(y) = Pr[y = y'] = Pr[S=S' \wedge h(S,X) = h(S', X')]$$
$$= Pr[S = S' \wedge h(S,X) = H(S,X')]$$
$$Pr[S=S'] \cdot Pr[h(S,X) = h(S, X')]$$
$$= 2^{-D} \cdot Pr[h(S,X) = h(S,X')]$$
$$= 2^{-d} \cdot (Pr[X = X'] \cdot Pr[h(S,X) = h(S,X') | X=X']) + Pr[X \not = X'] \cdot Pr[h(S,X) = h(S,X') | X \not = X'])$$

This because: 
$$Pr[A] = Pr[A \wedge B] + Pr[A \wedge B]$$
$$= Pr[B] \cdot Pr[A|B] + Pr[\overline B] \cdot Pr[A|\overline B]$$

$$= 2^{-d} (COL(x) + Pr[h(S,X) = h(S,X') \wedge X =X'])$$
$$= 2^{-d}(2^{-k} + 2^{-l})$$
$$= \frac{1}{2^{d+l}} \cdot (2^{l-k} + 1) = \frac{1}{|y|} \cdot (2^{2-2 \log(\frac{1}{\epsilon})} + 1)$$
$$= \frac{1}{|y|} \cdot (1 + 4 \epsilon^{2}) \hspace{0.3cm} \text{Fine dimostrazione}$$
$$IF \hspace{0.3cm} H_{\infty} (X) \ge K; COL(X) \le 2^{-k}$$

## Proof of the Lemma
By definition
$$SD(Y, U) = \frac{1}{2} \sum_{y \in Y} | PR[Y=y] - \frac{1}{|y|}| = \frac{1}{2} \sum_{y \in Y} q_y \cdot S_y$$
$$q_y = (Pr[Y = y] - \frac{1}{|y|})$$
$$s_y = \left\{\begin{align} 1 \hspace{0.2cm} \text{If} \hspace{0.2cm} q_y > 0\\ 0 \hspace{0.2cm} \text{Otws} \end{align}\right. \hspace{0.3cm} = \frac{1}{2} < \vec q, \vec s >$$
$$\le \frac{1}{2} \sqrt < \vec q, \vec q > \cdot < \vec s, \vec s >$$
$$= \frac{1}{2} \sqrt \sum_{y \in Y} q^2_y \cdot |y|$$
$$\vec s = (s_y), y \in Y$$
$$< \vec s, \vec s > = \sum_y s^2_y = |y|$$
Now let's expanded this:$$\sum_{y \in Y} q_y^2$$
$$\sum_{y \in Y} q_y^2 = \sum_{y \in Y} (Pr[Y = y] - \frac{1}{|y|})^2$$
$$\sum_{y \in Y} (Pr[Y=y] + \frac{1}{|y|^2} - 2 \cdot \frac{Pr[Y = y]}{|y|})$$
$$= COL(y) + \sum_y  \frac{1}{|y|^2} + \sum_y -2 \cdot \frac{Pr[Y = y]}{|y|}$$
$$= COL(Y) + \frac{1}{|y|} - \frac{2}{|y|}$$
$$\le \frac{1}{|y|} (1+4 \epsilon^2) - \frac{1}{|y|}$$
$$= \frac{4 \epsilon^2}{|y|}$$

$$SD(Y; U) \le \frac{1}{2} \sqrt \frac{e \epsilon^2}{|y|} \cdot |y| = \epsilon \hspace{0.8cm} \text{Fine dimostrazione}$$
