# Introduction to Cryptography
_main focus_: Modern cryptography
_modern_: from art to science
_today_: security on digital app
_Science_: precise definitions of security and proofs of security.
_Best thing_: Prove cryptosystem $X$ and proofs of security.
_Next Best things_: As above but modern some assumptions.
_Assumption_: Hardness of some well studied computational task.

Attacker is efficient $\to$ there are hard problems: $P \not = NP$ 
Think of some problem that we don't know how to solve efficiently: $n = p \cdot q$ with $p,q$ primes

_Factoring_: Given $n$, find $q$ and $p$ ; $\lambda = 2048$ (each prime has this weight)
_goal_: Prove $X$ (encryption) as secure if problem $y$ is hard. If exists efficient $A$ breaking $X$, then exist efficient $M$ breacking $y$.

_What X_? Secure communication!

![[diagramma1 (1).png]]
We will study this two case.

```ad-info
Bob does not always represent a person, he can be for example a server.
Alice = client
Bob = server
```


# Encryption 
The typical setting for the problem of secret communication is depicted in figure below. The parties Alice and Bob want to share data in a private fashion, thus preventing a third party Eve from eavesdropping. The objects of interest here are: 
- The ==data to be shared==, or message $m$; 
- Some ==secret information,== shared between and known only to Alice and Bob, that is used to encrypt the message: the encryption key or just key $k$; 
- The result of encrypting a message m using the key k: the ==ciphertext== $c$.

![[16cry.png]]

To complete the picture, the two parties Alice and Bob employ a cryptographic secrecy scheme, or encryption scheme to convert the message in an encrypted form, and vice versa. It has the form $\pi = (ENC, DEC)$, where:

- $Enc ∈ K \times M \to C$ is a machine that, given a message $m$ in $M$ and a key $k$ in $K$, returns a ciphertext $c$ in $C$, which is an _encrypted_ form of the message; 
- $Dec ∈ K \times C \to M$ is a machine that restores the message $m$ encrypted in the given ciphertext $c$ by using the key $k$, effectively decrypting the message.

For the time being, assume that both _Enc_ and _Dec_ work as normal functions. A fundamental requirement of encryption schemes is that they always completely preserve the message after a whole round of encryption and decryption:
$$\forall m \in M, \forall k \in K \Rightarrow Dec(k, Enc(k,m)) = m$$

>This is Kerchaff Principle!

```ad-important
Key must be random and secret.
```
```ad-attention
title: Problem
Key must be secret and shared.

```

## Encryption 2
![[diagramma3.png]]
Alice, by using bob's public key, can generate the ciphertext.
The public key is an information published on web, every user can find and use it.
public key encryption (PKE) $\to \lambda = (K gen, Enc, Dec)$

```ad-attention
title: Problem
Public keys must be authentic. We cannot check if this key is correct!

```

## Authentication

![[Diagramma4.png]]
Tag: $K \times M \to T$ 
Verify: message $\to$ Tag with key $\to$ $\tau'$ = $\tau$ ?  


## Message Authentication Code (MAC)

![[diagramma5.png]]

Signature: $SK \times M \to φ$ 
Verify: $PK \times M \times φ \to \{0,1\}$ ($0 =$ reject, $1 =$ Accept)
$\pi = (Kgen, Sign, Verify)$ Digital Signature

> In this case we have double completion.

# Perfect Secretly
Information-theoretic treatment of SKE (Unconditional security)

```ad-abstract
title: Definition Shannon 1949
Let $M$ be a distribution over $M$ and $K$ be uniform over $K$ (then $C=ENC(K,M)$ is also a distribution). We say $\pi = (ENC, DEC)$ as perfectly secret: 
$$\forall M, \forall m \in M, \forall \tau \in T: Pr[M = m] = Pr[M=m | T = \tau]$$

```

>$Pr$ is the probability.

>This definition can be rephrased in different ways, bringing more details to light:

![[Diagramma6.png]]

_Information_
- A priority problem that $M = m$ as same as a posterior prob. 
- That $M = m$ given that $C = ENC(K, M = m) = T$

# Recap of Shannon theorem

```ad-question
title: Segretezza Perfetta
Un sistema di crittografia ha **segretezza perfetta** se, conoscendo il testo cifrato, un intercettatore non può ottenere **nessuna informazione** utile sul messaggio in chiaro, indipendentemente dalla potenza computazionale dell'intercettatore o dalle tecniche usate per decifrare.

```

```ad-question
title: The Role of the key $K$
La chiave segreta $K$ è fondamentale per garantire la segretezza perfetta:

- **La chiave deve essere casuale** e scelta in modo uniforme.
- **La chiave deve essere lunga quanto il messaggio**.
- **La chiave deve essere usata una sola volta** per quel messaggio (come avviene in un sistema chiamato **one-time pad**).

Con queste condizioni, un sistema di crittografia come il **one-time pad** garantisce la segretezza perfetta, perché il testo cifrato prodotto potrebbe corrispondere a qualsiasi possibile messaggio. Senza conoscere la chiave, l'intercettatore non può fare nessuna inferenza su quale sia il messaggio originale.

```

```ad-question
title: Matematicamente: Shannon Definition of perfect secrecy
Matematicamente:

Il sistema crittografico $π=(ENC,DEC)$ (dove ENC è la funzione di crittografia e DEC quella di decrittografia) è **perfettamente segreto** se per ogni messaggio $M$ e per ogni possibile valore del testo cifrato $C$, vale la seguente proprietà:

$$Pr⁡[M=m]=Pr⁡[M=m∣C=c]$$

Questo significa che, anche dopo aver osservato il testo cifrato $C$, la probabilità che il messaggio originale sia $m$ è esattamente la stessa di prima di vedere il testo cifrato. In altre parole, **vedere il testo cifrato non fornisce alcuna informazione utile** all'intercettatore per ridurre l'incertezza sul messaggio.


```

```ad-example
title: Example to understand better this concept
Immagina che tu voglia inviare un messaggio che può essere "sì" o "no". Se un intercettatore osserva solo il testo cifrato, ma il sistema di crittografia ha segretezza perfetta, anche dopo aver visto il testo cifrato, l'intercettatore non potrà capire se il messaggio originale era "sì" o "no". Entrambe le possibilità avranno ancora una probabilità uguale (es. 50% ciascuna), proprio come prima di vedere il testo cifrato.

```
