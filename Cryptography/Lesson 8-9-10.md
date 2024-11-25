# Symmetric schemes

## CPA-Security (7.1)

### Introduction
Now it’s time to define a stronger notion of security, which is widely used in cryptology for first assessments of cryptographic strength. Let $\pi := (Enc, Dec)$ be a ske scheme, and consider the game depicted in figure below. Observe that this time, the adversary can “query” the challenger for the ciphertexts of any messages of his choice, with the only reasonable restriction that the query amount must be polynomially bound by $\lambda$. This kind of game/attack is called the ==Chosen Plaintext Attack==, because of the adversary’s capability of obtaining ciphertexts from messages. The usual victory conditions found in n-time security games, which are based on ciphertext distinguishability, apply.

```ad-abstract
title: Definition
A scheme is CPA-Secure iff:
$$Game_{\pi, A}^{CPA}(\lambda, 0) \equiv_c Game_{\pi, A}^{CPA}(\lambda, 1)$$

```

```ad-abstract
title: Definition
No deterministic scheme can achieve CPA-security. 

```

This is true, because nothing prevents the adversary from asking the challenger to encrypt either $m_0$ or $m_1$, or even both, before starting the actual challenge. The solution for obtaining a CPA-secure encryption scheme consists of returning different ciphertexts for the same message, even better if they look random. This can be achieved by using PRFs.

![[Cryptography/images/69.png]]

We want to build a secure key encryption like $SKE(ENC, DEC)$ such that:
- $\mid k \mid << \mid n \mid$
	- The key size $(k)$ is much smaller than the message size $(n)$.
- Can encrypt more than $1$ message without compromised the efficient.

We have that formula of the encryption:
$$ENC(k, m)=G(k) \oplus m$$

- $G(k)$ è ==l'output di un generatore pseudocasuale (PRG)== applicato alla chiave $k$
- $\oplus$ è l'operazione di XOR, soddisfa il requisito di avere $\mid k \mid << \mid m \mid$

**The problem**
The problem emerges when **encrypting multiple messages with the same key**.
Considers two messages $m_1$ and $m_2$ encrypted as:
$$c_1 = G(k) \oplus m_1$$
$$c_2 = G(k) \oplus m_2$$
if the adversary observe both the ciphertexts, he can calculate:
$$c_1​ \oplus c_2​ = (G(k) \oplus m_1​) \oplus (G(k) \oplus m_2​)$$
thanks to the xor property, we obtain:
$$c_1 \oplus c_2 = m_1 \oplus m_2$$

The adversary now owns $m_1 \oplus m_2$ that is a directly combination to the original messages. If the adversary know one of the two messages or he can deduct partial info about they, he can immediately derive the other message.

```ad-attention
**Encrypting multiple messages with the same key exposes future plaintexts**.

```

>A deterministic scheme don't solve this type of problem because it will produce for the same input the same output. **The above is impossible if ENC is deterministic**.

```ad-abstract
title: Theorem
If $f$ is a PRF then $\pi_f$ is CPA-Secure.

```

da  51  ^^^^^ non trovo nulla in poi
### PRFs for CPA-Secure
We will see PRFs are enough for doing ==CPA-Secure== SKE, but also ==MACs==.
How to build a PRF:
- Theory: OWFs or concrete assumptions (Factoring, DL, $\cdots$)
- Practice: AES
What is a PRF?

```ad-abstract
title: PRF Definition
A **PRF** it's a deterministic function: 
$$F_k : \{0,1\}^n \to \{0,1\}^n$$
$$k \in \{0,1\}, n=256,512,\cdots$$

A **PRF** is a deterministic function that takes an input (typically a secret key and a message) and produces an output that appears random. The special feature of a PRF is that there is no efficient way (by an attacker) to distinguish its output from an output of a truly random function. (PRF function that generates a pseudo-random string).

```


Security? Basically the output of the function should be  ??? . From the output of Truly Random Truth Table.

![[Cryptography/images/73.png]]

For random choice of $k \in \{0,1\}$, then $F_k(\cdot)$ is completely independent from random table.

```ad-abstract
title: Definition of PRF
We say that $F: \{0,1\}^{\lambda} \times \{0,1\}^n \to \{0,1\}^n$ is a PRF if:
$$\text{REAL}_{A,F}(\lambda) / \text{RAND}_{A, R}(\lambda)$$
```

![[Cryptography/images/74.png]]

Equivalent: $\forall$  ppt $A$ 
$$\mid Pr[Real_{A,F}(\lambda)=1] - Pr[RAND_{A,R} (\lambda)=1] \le negl(\lambda) \mid$$
The challenger is unbounded in rand. This is simpler think of, but no needed as we can do lazy sampling:
- Upon $x \in \{0,1\}$, output $y \leftarrow \{0,1\}^n$ as long as $x$ not asked before (in which case, output previous $y$)
### Construct a PRFs
- **In practice**: ==AES== (intuition and experience). Designed in early 2000, still unbroken. No provable security, back then.
- **In theory**: ==OWF $\to$ PRF==. Alternatively, you can use factoring, or DL, LWE.

#### Application 1: $PRF \Rightarrow CPA$ SKE for fixed input length (FIL)
Here it is: $\pi=(ENC, DEC)$
$$ENC(k,m): r \leftarrow \{0,1\}^n \hspace{0.8cm} c=(c_1, c_2) = (r, F_k(r) \oplus m)$$
$$DEC(k, (c_1, c_2)): F_k(c_1) \oplus c_2 = F_k(r) \oplus F_k(r) \oplus m = m$$

```ad-abstract
title: Theorem 1
Assuming $F$ is a PRF, the above is CPA-Secure $SKE$ for $FIL$.

```


#### Application 2: $PRF \Rightarrow MAC$

## Message Authentication Codes and Unforgeability
Recall that a ==MAC== scheme is a couple **(Tag, Verify)**, with the purpose of authenticating the message’s source.  The desirable property that a MAC scheme should hold is to **prevent any attacker from generating a valid couple $(m^∗, r^∗)$, even after querying a tagging oracle polynomially many times**. The act of generating a valid couple from scratch is called ==forging==. In formal terms:

![[Cryptography/images/72.png]]

Let $f$ be a $PRF$, then $Tag(k,m)=F_k(m)$
Security? $UFCMA$ (Universal Unforgeability against chosen-message attacks).

>When we talk about UFCMA (Universal Forgery Chosen Message Attack), we are referring to the security of a Message Authentication Code (MAC).

Il gioco UFCMA è un esperimento che serve a verificare la sicurezza di un **Message Authentication Code (MAC)**. Un MAC è un algoritmo che permette di calcolare un **"tag"** (come una sorta di firma) per un messaggio $m$, usando una chiave segreta $k$. Lo scopo del gioco UFCMA è dimostrare che un avversario **non può falsificare un tag valido** per un messaggio che non ha mai richiesto.
![[Cryptography/images/71.png]]
- È **computazionalmente difficile** per un avversario creare un tag $r^*$ valido per un nuovo messaggio $m^*$, anche se ha avuto accesso a un oracolo che calcola i tag per altri messaggi.
- In altre parole, un MAC sicuro deve resistere a tentativi di falsificazione.

Se l'avversario riesce a vincere con probabilità maggiore di $\text{negl}$ (dove $\text{negl}$ è una funzione trascurabile), allora il MAC **non è sicuro**.

```ad-abstract
title: Definition (UFCMA)
Tag is UFCMA if $\forall$ ptt $A$: 
$$\forall \hspace{0.2cm} r \hspace{0.2cm} Pr[Game_{A, Tag}(\lambda \mid = 1)] \le negl(\lambda)$$

```

```ad-abstract
title: Theorem 2
Assuming $F$ a PRF, $Tag(k,m)=F(k,m)$ is UFCMA for FIL

```



**Proof THM1 Application 1**
![[41.jpeg]]

We need to show that:
$$\forall PPT \hspace{0.1cm} A \mid Pr[G(\lambda, 0)=1] - Pr[G(\lambda, 1)=1] \le negl(\epsilon)$$
move to mental experiment $H(\lambda, b)$, where we replace $F_k(\cdot)$ with function $R: \mid q_1 \mid^n \to \{0,1\}^n$ chosen randomly away all possible functions.

```ad-abstract
title: Lemma
For every $b\in \{0,1\}, H(\lambda, b) \approx_c G(\lambda, b)$

```

Dobbiamo dimostrare che un avversario $A$ non può distinguere tra:
- $G(\lambda, b)$: utilizza la PRF $F_k$
- H(\lambda, b): Utilizza una funzione casuale $R$

**Demonstration of the lemma**:
```ad-info
title: Cuore della dimostrazione

In questa dimostrazione per assurdo, si assume che $A$ sia capace di distinguere i due mondi ($G(\lambda, b)$ e $H(\lambda, b)$) con una probabilità non trascurabile ovvero maggiore di $\frac{1}{negl(\lambda)}$. (cioè $A$ ha successo). Usando questa ipotesi, si costruisce $B$ come un algoritmo che sfrutta le capacità di $A$ per distinguere tra una PRF e una funzione casuale, rompendo dunque la sicurezza della PRF $F_k$. $B$ interagisce con un oracolo che implementa una funzione, la quale può essere una $F_k$​ oppure una funzione casuale $R$ causale.  

In questo caso, $B$ **non cerca di rendere i mondi indistinguibili per $A$**, ma invece **usa $A$ per dimostrare che, se $A$ riesce a distinguere, allora si rompe la sicurezza della PRF**.
```

By reduction to security of PRF. Fix $b$ and assume: $\not \exists$ ppt $A$ such that $$\mid Pr[G(\lambda, b)=1] - Pr[H(\lambda, b)=1]\mid \ge \frac{1}{negl(\lambda)}$$

Build ppt $B$ against $F$:
![[Cryptography/images/76.png]]

**Analysis**: By inspection $B$ a perfect simulation of $A$'s view.
$$Pr[G(\lambda, b)=1] = Pr[Real(\lambda)=1]$$
$$Pr[H(\lambda,b)=1] = Pr[Rand(\lambda)=1]$$

 ```ad-info
title: Per conludere questa dimostrazione...
Il simulatore $B$ ha il compito di creare un ambiente che **replichi perfettamente** ciò che $A$ si aspetterebbe nel mondo reale. L'obiettivo principale è che $A$ non sia in grado di distinguere tra il comportamento del simulatore $B$ e quello del mondo reale. Questo si basa su due concetti fondamentali:

1. **Indistinguibilità**: $A$ non deve poter capire se sta interagendo con il mondo reale $\text{Real}(\lambda)$ o con il simulatore $\text{Rand}(\lambda)$.
2. **Simulazione perfetta**: $B$ deve essere capace di produrre una vista per $A$ che è **statisticamente o computazionalmente indistinguibile** dalla vista che $A$ avrebbe avuto nel mondo reale.

Se $B$ "facesse capire" ad $A$ quale comportamento viene usato, allora $A$ potrebbe distinguere tra il mondo reale e il simulatore, il che invaliderebbe l'intera prova di sicurezza. Se $B$ fosse trasparente con $A$, il sistema fallirebbe, perché $A$ saprebbe che sta interagendo con una simulazione.

```

Let $H'(\lambda, b)$ be a function such that, in response to all queries, it generates pairs $(c_1, c_2)$ uniformly at random, and similarly generates pairs $(c_1^*, c_2^*)$ uniformly for the second function.
- $(c_1, c_2)$ output generati dalla funzione hash $H(\lambda, b)$
- $(c_1^∗​,c_2^∗​)$output generati dalla funzione hash $H'(\lambda, b)$

Clearly, $H(\lambda, 0) = H(\lambda, 1)$ are indistinguishable, meaning that the function $H(\lambda, b)$ does not depend on the value of $b$. (==Demonstration end==)


```ad-abstract
title: Lemma
$$H(\lambda, b) \approx_s H'(\lambda, b), \forall b \in \{0,1\}$$

```

>Il lemma esprime il fatto che, se i valori casuali non collidono, le distribuzioni di $(c_1, c_2)$ e $(c_1^*, c_2^*)$ sono identiche, il che implica che ==le due funzioni hash sono statisticamente indistinguibili==, e quindi non possono essere differenziate da un attaccante.

**Proof of lemma**:
Standard Technique: say that $A$ and $B$ are identical unless some bad event $E$ happens. Then:
$$SD(A;B) \le Pr[E]$$

> If the probability of the bad event $E$ is very small, the statistical distance will also be small, which means that the distributions $A$ and $B$ are ==indistinguishable==.

**The bad event (collision of the values $r_i$)**:  We want that all the $r's$ are distinct; if they are distinct, then $(c_1, c_2)$ in $H(\lambda, b)$ is uniform and also $(c_1^*, c_2^*)$ in $H'(\lambda, b)$ is uniform as well. $E$ is the even that they collide:
$$Pr[ \hspace{0.2cm} \exists \hspace{0.2cm} i, j / r_i = r_j; r_i, r_j \in \{0,1\}^n] \le \sum_{i,j}Pr[r_i = r_j] \hspace{0.5cm} \text{union bound}$$
$$Col(U_n)=r^{-n} \hspace{0.9cm} \text{probability of collision for a uniform distribution}$$
$$= \binom{q}{2} \cdot 2^{-n} \le q^r \cdot r^{-h} = negl(\lambda)$$
where $q$ is the $A$ of CTXS. ($q = poly(\lambda)$)
$$\Rightarrow G(\lambda, 0) \approx_c H(\lambda, 0) \approx_s H'(\lambda, 0) \equiv H'(\lambda, 1) \approx_s H(\lambda, 1) \approx_s G(\lambda, 1)$$


```ad-abstract
title: Spiegazione
**Union Bound**:  tecnica che dice che la probabilità dell'unione di più eventi è al massimo la somma delle probabilità dei singoli eventi. In questo caso, vogliamo calcolare la probabilità che **esista almeno una collisione** tra tutte le possibili coppie di $r_i$​ e $r_j$, quindi sommiamo le probabilità di collisione per ogni coppia possibile.
Il numero di coppie possibili è dato dal numero di modi in cui possiamo scegliere due indici distinti $i$ e $j$ tra le $q$ query fatte dall'avversario. Questo numero è $\binom{q}{2}$, cioè il numero di coppie possibili tra $q$ elementi. Poiché ogni coppia ha probabilità $2^{-n}$ di collidere, la probabilità totale di collisione è la somma delle probabilità di collisione per tutte le possibili coppie: $\binom{q}{2} \cdot 2^{-n}$
La probabilità di collisione è quindi:
$$\binom{q}{2} \cdot 2^{-n} \le q^r \cdot r^{-h}$$

Dove:
- $q$ è il numero di query fatte dall'avversario, ed è un polinomio in $\lambda$, quindi $q = \text{poly}(\lambda)$.
- $n$ è la lunghezza dei valori casuali $r_i$​, quindi la probabilità di collisione decresce esponenzialmente con $n$.

Questa probabilità è chiamata **trascurabile** in $\lambda$ $\text{negl}(\lambda)$ perché, man mano che $n$ cresce, la probabilità diventa piccolissima.

```



```ad-abstract
title: Theorem 2 (ripetuto per avere una visione migliore)
Assuming $F$ a PRF, $Tag(k,m)=F(k,m)$ is UFCMA for FIL

```

**Proof (Theorem 2)**:
We need to assume that $n = n(\lambda) = w(\log \lambda) \hspace{0.9cm} \text{Super-Logarithmic in} \hspace{0.2cm} \lambda$

>$n$ aumenta mano a mano che aumenta il livello di sicurezza.

![[Cryptography/images/82.png]]

$$\forall \hspace{0.1cm} PPT \hspace{0.1cm} : Pr[G(\lambda)=1] \le negl(\lambda)$$

Let $H(\lambda)$ be same as $G(\lambda)$ but with random table $R: \{0,1\}^n \to \{0,1\}^n$. So $r = R(n)$ and $A$ wins iff $r^* = R(m^*)$ and $m^*$ fresh.

```ad-abstract
title: Lemma
$$\forall \hspace{0.2cm} \text{PPT} \hspace{0.2cm} A: \mid Pr[G(\lambda)=1] - Pr[H(\lambda)=1]\mid \le negl(\lambda)$$

```

**Demonstration by reduction**:
![[Pasted image 20241125163255.png]]

By inspection:
- $Pr[Real(\lambda)=1] = Pr[G(\lambda)=1]$
- $Pr[Rand(\lambda)=1] = Pr[H(\lambda)=1]$

==(Demonstration end)==


```ad-abstract
title: Lemma
$Pr[H(\lambda)=1] \le negl(\lambda)$, $\forall$ unbounded $A$ (As long as $n=w(\log \lambda)$

```

>Questo significa che la probabilità che un avversario riesca a "forzare" un tag valido nel gioco $H(\lambda)$ è **molto piccola** (trascurabile) quando la lunghezza dell'input $n$ è una funzione super-logaritmica in $\lambda$, ossia $n = w(\log \lambda)$.


**Proof**
Only way to forge in $H(\lambda)$ is to guess the output of $R(m^*)$ on a fresh input $m^*$. Since this is uniform:
$$Pr[H(\lambda) = 1] \le 2^{-n} = negl(\lambda)$$
$$\text{because} \hspace{0.6cm} n = w(\log \lambda)$$
Next step: 
1) How to go from $FIL$ (fixed input length) to $VIL$ (variable input length)
2) How to combine both encryption and authentication?

Let's start with the first for SKE. These are the so-called "**Modes of operation**".


## Modes of Operation
Up until now, encryption has been dealt with messages of fixed size around a polynomial function to $\lambda$. How to deal with messages with arbitrary size? Setting a maximum bound to message length seems impractical, both for waste reasons when messages are too short, and for practicality when messages eventually get too long. The solution takes the form of a “block-cipher”, where a message of a given size is split into equally-sized blocks, and then encrypted using a fixed-size encryption scheme. Various instances of this technique, called modes, have been devised.

### CBC (Cypher Black Chaining) 
#### Description
The diagram illustrates the Cipher Block Chaining (CBC) mode of encryption, which is commonly used in block ciphers to securely encrypt messages of arbitrary length. In CBC mode, each block of plaintext mi is encrypted in a way that depends on the encryption of the previous block. This chaining process ensures that identical plaintext blocks produce different ciphertext blocks, provided the previous ciphertext differs (due to either different messages or an initial random value).
![[Pasted image 20241125173439.png]]

#### Initial Block and Random Initialization Vector
- The process starts with a random value r, also known as the initialization vector (IV). This IV is crucial for security because it ensures that even if the same message is encrypted multiple times, it will produce different ciphertexts each time. 
- The first ciphertext block c0 is computed by combining (via XOR) the IV r with the first plaintext block m1.

#### Encrypting Each Block
For each block $m_i$ (where $i=1,2,\cdots,t$): 
- **Step 1**: XOR the plaintext block mi with the previous ciphertext block ci−1. 
- **Step 2**: Pass the result through function Pk, which is parameterized by a key k. This function produces the ciphertext block ci. 
	Mathematically, this is represented as: $c_i=P_k(c(i−1) \oplus  mi)$ where:
	- $c_{i−1}$ is the previous ciphertext block. 
	- $m_i$ is the current plaintext block. 
	- $\oplus$ denotes the XOR operation. 
	- $P_k$ is the encryption function with key $k$.

This chaining process is repeated for each block, so each ciphertext block ci depends on the encryption of the previous block, making it unique even if identical plaintext blocks appear in different parts of the message.

#### Decryption in CBC Mode
The decryption process is essentially the reverse of encryption
For each ciphertext block ci, the decryption function $P_k^{-1}$ is applied to remove the encryption, yielding the XOR ed result of the current plaintext block and the previous ciphertext block. Mathematically: 
$$P_k^{-1} \cdot c_i \oplus c_{i-1}$$
where: 
- $P_{k−1}$ is the decryption function for the block cipher. 
- $c_{i−1}$ is the previous ciphertext block.

This allows the original plaintext blocks to be reconstructed one by one.


### CTR (Counter Mode)(8.1.3)

#### Description
CTR mode (short for Counter mode) is a method for encrypting messages where each block of plaintext is combined with a unique, sequential counter value rather than using a traditional chaining structure.
![[Pasted image 20241125174645.png]]

#### How CTR Mode Works
1. A starting value $r$ is chosen for the encryption. This nonce is unique for each message but can be reused across different blocks of the same message. 
2. For each block of plaintext $m_i$, a counter value is generated. This counter starts at r for the first block and increments by 1 for each subsequent block. 
3. Each r is then encrypted with the function $f_k$ (a pseudorandom function or PRF), using the secret key $k$. 
4. The output of $f_k$ for each counter value is then XORed with the plaintext block $m_i$ to produce the ciphertext block $c_i$.

Mathematically: 
$$c_i = f_k(r+i) \oplus m_i$$
Where:
- $f_k$ is the encryption function with key k, 
- $r+i$ represents the counter value for each block, starting from r and incrementing by 1 for each block,
- $m_i$ is the plaintext block, 
- $\oplus$ is the XOR operation.

**CPA Security**: Counter mode achieves Chosen Plaintext Attack (CPA) security, which means that it can withstand attacks where an attacker chooses plaintext messages to be encrypted and tries to learn information about the key or other plaintexts. This is achieved by using a unique counter value for each block, ensuring that even identical plaintext blocks result in different ciphertexts if the nonce or counter is different.

#### Decryption in CTR Mode
- The receiver generates the same sequence of counter values as the sender, starting with the same nonce $r$.
- For each ciphertext block ci, the receiver computes: $m_i=f_k(r+i) \oplus c_i$ . Here, $f_k(r+i)$ is again XORed with $c_i$ to retrieve $m_i$, the original plaintext block.

Since CTR mode only requires generating the same sequence of counter values and XORing with ciphertext blocks, it’s simple and efficient


$r$ is an integer$\mod 2^n$ and addition is also$\mod 2^n$.

```ad-abstract
title: Theorem
If $F$ a PRF then CTR mode is CPA secure for VIL

```

### OFB (Output feedback)
![[Pasted image 20241125175958.png]]
How it works: 
- The initialization vector (IV) is encrypted using the block cipher with the secret key, producing the first "feedback" block. 
- This feedback block is then XORed with the plaintext (or the subsequent plaintext block) to produce the ciphertext. 
- After the first encryption, the feedback block is updated by taking the previous output and encrypting it again. This process is repeated for each block of data. 
- The keystream is independent of the plaintext or ciphertext, and only the IV matters initially.

### CFB (Cypher Feedback mode)
Let $m = m_1 \mid \mid m_2 \mid \mid m_3 \cdots$ with $m_i \in \{0,1\}^n$
![[Cryptography/images/77.png]]

How it works: 
- In the basic CFB mode, the first block of the ciphertext is created by XORing the IV with the first plaintext block. 
- The resulting ciphertext is then fed back into the block cipher (along with the secret key) to create the next "feedback" block.
- The feedback block is then XORed with the next plaintext block to produce the next ciphertext block. 
- Unlike OFB, the feedback block in CFB is derived from the previous ciphertext, not the output of the encryption itself.





```ad-abstract
title: Theorem
Assume $f_k$ is a PRF, then the counter-mode block cipher is CPA-secure for variable input length (VIL.

```

**Proof of the Theorem**

![[Pasted image 20241125180757.png]]



















--- 
---- 
---- 
---- 


## Domain Extension for MACs
Recall: PRF $\Rightarrow$ FIL; UFCMA; MAC.
$Tag(k,m) = F_k(m)$

Some ideas that do not work:
$e = Tag_k (\oplus_i, m_i)$ 
$m = (m_1, m_2, \cdots)$
UFCMA(i.e. AESk($\cdot$))

$(m_1, m_2) = m \Rightarrow e$
$(m^* = m_1 \oplus m_2, r) \hspace{0.8cm} r=F_k(m_1 \oplus m_2)$
$m = (m_1, m_2)$, let $r = F_k(m_1 \oplus m_2) \hspace{0.4cm} m_1 \not = m_2$
$m^* = (m_2, m_2); r^* = r$

![[Cryptography/images/45.png|400]]

- $r_i = TAG_k(m_i)$
	- $r = (r_1, \cdots, r_d)$
	- $m = (m_1, \cdots, m_d)$

Permute again

- $r_i = TAG_k(i \mid \mid m_i)$
	- $r = (r_1, \cdots, r_d)$
	- $m = (m_1, \cdots, m_d)$

Idea: Design input-shinking function $h: \{0,1\}^N \to \{0,1\}^n$
$N = n \cdot d$ ($d$ block of length $n$)
Then, output $e = F_k(h(m))$
The question: What security from $h$?

![[Cryptography/images/46.png|400]]

**Problem**:
If we can find Collisions, $h(m) = h(m')$ but $m \not = m'$ we can forge $(m', r)$ given $(m,r)$
Two approaches:
- Let $h$ be _Secret_
- Let $h$ be _Public_ (Collision-res, HASH, SHA)

What does it mean?
$$H = \{h_s : \{0,1\}^N \to \{0,1\}^n\}_{s \in \{0,1\}^{\lambda}}$$
and $s$ is either secret or public.