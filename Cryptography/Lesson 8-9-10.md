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
- Upon $x \in \{0,1\}^n$, output $y \leftarrow \{0,1\}^n$ as long as $x$ not asked before (in which case, output previous $y$)
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
## Application 2: Message Authentication Codes and Unforgeability
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
Tag is UFCMA iff $\forall$ ptt $A$: 
$$\forall \hspace{0.2cm} r \hspace{0.2cm} Pr[Game_{A, Tag}(\lambda)]=1 \le negl(\lambda)$$

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
- $H(\lambda, b)$: Utilizza una funzione casuale $R$

**Demonstration of the lemma**:
```ad-info
title: Cuore della dimostrazione

In questa dimostrazione per assurdo, si assume che $A$ sia capace di distinguere i due mondi ($G(\lambda, b)$ e $H(\lambda, b)$) con una probabilità non trascurabile ovvero maggiore di $\frac{1}{negl(\lambda)}$. (cioè $A$ ha successo). Usando questa ipotesi, si costruisce $B$ come un algoritmo che sfrutta le capacità di $A$ per distinguere tra una PRF e una funzione casuale, rompendo dunque la sicurezza della PRF $F_k$. $B$ interagisce con un oracolo che implementa una funzione, la quale può essere una $F_k$​ oppure una funzione casuale $R$ causale.  

In questo caso, $B$ **non cerca di rendere i mondi indistinguibili per $A$**, ma invece **usa $A$ per dimostrare che, se $A$ riesce a distinguere, allora si rompe la sicurezza della PRF**.
```

By reduction to security of PRF. Fix $b$ and assume: $\exists$ ppt $A$ such that $$\mid Pr[G(\lambda, b)=1] - Pr[H(\lambda, b)=1]\mid \ge \frac{1}{negl(\lambda)}$$

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

**The bad event (collision of the values $r_i$)**:  We want that all the $r's$ are distinct; if they are distinct, then $(c_1, c_2)$ in $H(\lambda, b)$ is uniform and also $(c_1^*, c_2^*)$ in $H'(\lambda, b)$ is uniform as well. $E$ is the even that they collid:
$$Pr[ \hspace{0.2cm} \exists \hspace{0.2cm} i, j / r_i = r_j; r_i, r_j \in \{0,1\}^n] \le \sum_{i,j}Pr[r_i = r_j] \hspace{0.5cm} \text{union bound}$$
$$Col(U_n)=r^{-n} \hspace{0.9cm} \text{probability of collision for a uniform distribution}$$
$$= \binom{q}{2} \cdot 2^{-n} \le q^r \cdot r^{-h} = negl(\lambda)$$
where $q$ is the $A$ of CTXS. ($q = poly(\lambda)$)
$$\Rightarrow G(\lambda, 0) \approx_c H(\lambda, 0) \approx_s H'(\lambda, 0) \equiv H'(\lambda, 1) \approx_s H(\lambda, 1) \approx_c G(\lambda, 1)$$

>Possiamo dunque dire che: $G(\lambda, 0) \approx_c G(\lambda, 1)$

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
$$\forall \hspace{0.2cm} \text{PPT} \hspace{0.2cm} A : \mid Pr[G(\lambda)=1] - Pr[H(\lambda)=1]\mid \le negl(\lambda)$$

```

**Demonstration by reduction**:
![[Cryptography/images/83.png]]

By inspection:
- $Pr[Real(\lambda)=1] = Pr[G(\lambda)=1]$
- $Pr[Rand(\lambda)=1] = Pr[H(\lambda)=1]$

- La probabilità nel mondo reale (in cui ci sta un po di incertezza) è uguale alla probabilità della funzione PRG.
- La probabilità nel mondo random (totale  randomicità) è uguale alla probabilità della funzione random $H$.

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
Up until now, encryption has been dealt with messages of fixed size around a polynomial function to $\lambda$. How to deal with messages with arbitrary size? Setting a maximum bound to message length seems impractical, both for waste reasons when messages are too short, and for practicality when messages eventually get too long. The solution takes the form of a “block-cipher”, where a message of a given size is split into equally-sized blocks, and then encrypted using a fixed-size encryption scheme. Various instances of this technique, called modes, have been devised.

### CBC (Cypher Block Chaining) 
#### Description
The diagram illustrates the Cipher Block Chaining (CBC) mode of encryption, which is commonly used in block ciphers to securely encrypt messages of arbitrary length. In CBC mode, each block of plaintext $m_i$ is encrypted in a way that depends on the encryption of the previous block. This chaining process ensures that identical plaintext blocks produce different ciphertext blocks, provided the previous ciphertext differs (due to either different messages or an initial random value).
![[Cryptography/images/86.png]]

#### Initial Block and Random Initialization Vector
- The process starts with a random value $r$, also known as the initialization vector (IV). This IV is crucial for security because it ensures that even if the same message is encrypted multiple times, it will produce different ciphertexts each time. 
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

This chaining process is repeated for each block, so each ciphertext block $c_i$ depends on the encryption of the previous block, making it unique even if identical plaintext blocks appear in different parts of the message.

#### Decryption in CBC Mode
The decryption process is essentially the reverse of encryption
For each ciphertext block $c_i$, the decryption function $P_k^{-1}$ is applied to remove the encryption, yielding the XOR ed result of the current plaintext block and the previous ciphertext block. Mathematically: 
$$P_k^{-1} \cdot c_i \oplus c_{i-1}$$
where: 
- $P_{k−1}$ is the decryption function for the block cipher. 
- $c_{i−1}$ is the previous ciphertext block.

This allows the original plaintext blocks to be reconstructed one by one.


### CTR (Counter Mode)(8.1.3)

#### Description
CTR mode (short for Counter mode) is a method for encrypting messages where each block of plaintext is combined with a unique, sequential counter value rather than using a traditional chaining structure.
![[Cryptography/images/87.png]]

#### How CTR Mode Works
1. A starting value $r$ is chosen for the encryption. This nonce is unique for each message but can be reused across different blocks of the same message. 
2. For each block of plaintext $m_i$, a counter value is generated. This counter starts at $r$ for the first block and increments by $1$ for each subsequent block. 
3. Each $r$ is then encrypted with the function $f_k$ (a pseudorandom function or PRF), using the secret key $k$. 
4. The output of $f_k$ for each counter value is then XORed with the plaintext block $m_i$ to produce the ciphertext block $c_i$.

Mathematically: 
$$c_i = f_k(r+i) \oplus m_i$$
Where:
- $f_k$ is the encryption function with key k, 
- $r+i$ represents the counter value for each block, starting from r and incrementing by 1 for each block,
- $m_i$ is the plaintext block, 
- $\oplus$ is the XOR operation.

**CPA Security**: ==Counter mode achieves Chosen Plaintext Attack (CPA) security==, which means that it can resist attacks where an attacker chooses plaintext messages to be encrypted and tries to learn information about the key or other plaintexts. This is achieved by using a unique counter value for each block, ensuring that even identical plaintext blocks result in different ciphertexts if the nonce or counter is different.

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
![[Cryptography/images/90.png]]
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

---- 

```ad-abstract
title: Theorem
Assume $f_k$ is a PRF, then the counter-mode block cipher is CPA-secure for variable input length (VIL.

```

**Proof of the Theorem**
We start with original CPA game:

![[Cryptography/images/89.png]]


**How it works**: 
1. Adversary Chooses Messages: 
	- A starts by choosing a message m=(m1,…,mt), where each mi represents a block of plaintext. 
	- A sends these messages to CCPA to receive its corresponding ciphertexts. 
2. Encryption in CTR Mode: 
	- The encryption scheme uses a Counter (CTR) mode with a starting value r chosen at random. This r serves as the initial counter value. 
	- For each plaintext block mi, CCPA generates the ciphertext ci as follows: ci=fk(r+i−1) mi ⊕ Here: 
		- fk is a pseudorandom function (or the block cipher function) with key k. 
		- r+i−1 represents the counter value for each block i. 
		- The result of fk(r+i−1) is XORed with mi to produce ci. 
3. Challenge Phase: 
	- A then submits two messages μ0 and μ1, which are distinct messages of equal length. CCPA will challenge A with the encryption of one of these messages, chosen based on a secret bit b. 
	- CCPA chooses a random bit b {0,1}, deciding ∈ which message to encrypt. 
	- CCPA encrypts μb using the CTR mode, as described before, but this time with a new random counter ρ and produces a ciphertext γb=(γ0,γ1,…,γt) using: (γb)i=fk(ρ+i−1) (μb)i. ⊕ 
4. Adversary's Goal: 
	- A receives the ciphertext γb and tries to guess which message was encrypted by outputting a guess b′. 
	- A wins the game if b′=b, meaning it correctly identifies which message CCPA encrypted. 
5. Output: 
	- The experiment outputs 1 (indicating success) if b′=b, which means that A successfully distinguished between the two encrypted messages. 
	- If A can consistently guess correctly (better than random chance), the encryption scheme is not IND-CPA secure. A secure scheme would mean A's success probability is close to random guessing


$HYB^1_{CTR, A}(\lambda, b)$: A random function $R$ is chosen UAR from $R(n, n)$ at the beginning of the game, and is used in place of $F_k$ in all block encryptions;

$HYB^2_{CTR, A}(\lambda, b)$: The challenger will pick random values from $2^n$ as ciphered blocks, disregarding any encryption routine. This hybrid does not use any encryption function at all. Instead, each block of ciphertext is purely random, with no relation to the plaintext or any previous ciphertexts.

```ad-abstract
title: Lemma
$$GAME_{CTR,A}^{CPA}(\lambda, b) \equiv_c HYB_{CTR,A}(\lambda, b) \forall b \in 2$$

```

**Proof**
Hint: Since the original game and the first hybrid are very similar, we can use a distinguisher which plays the cpa-game; since this is a lemma, our goal in the reduction is to break the precondition contained in the theorem statement.

```ad-abstract
title: Lemma
$$HYB^1_{CTR,A}(\lambda,b) \equiv_c HYB^2_{CTR,A}(\lambda,b) \forall b \in 2$$
```

This lemma is part of a security proof for counter (CTR) mode encryption, specifically to show that CTR mode is secure under chosen-plaintext attack (CPA). The idea is to prove that an attacker cannot distinguish between two similar encryption processes (referred to as "hybrids"), which would mean that CTR mode encryption is indistinguishable from random and, therefore, secure.



**Explanation of the proof CPA for VIL**
1. Main Intuition: 
	- Since $m_i$ (the message) does not affect the distribution in Hybrid $1$ (due to the random function $R$), the output $R(r+i)$ mi $\oplus$ appears indistinguishable from $R(r+i)$ alone. This should make the two hybrids look the same to an attacker. 
	- However, if the same nonce is used for different messages, the repeated use of $R$ with the same input could make patterns in Hybrid $1$, which could allow an attacker to distinguish it from Hybrid $2$.
2. Probability of Collisions (Overlap Events):
	- The proof calculates the probability of an overlap event (collision of counter values) and shows it is negligible
	- For any message block sequence of length t (where all message lengths are assumed to be the same here), an overlap can occur in two cases:
		- The sequence $\rho,…,\rho+t−1$ (for the challenge message) partially overlaps with sequence $r_i,…,r_i+t−1$ (for an encryption query).
	- The overlap conditions are: 
		- If $ρ+t−1=r_i$, the two sequences overlap at the last element. 
		- If $r_i+t−1=\rho$, the sequences overlap at the last element in the other direction.
3. Calculation of Overlap Probability
	- The proof estimates the probability of an overlap event occurring between the challenge message and each encryption query. It shows that, given the large size of the nonce space (modulo $2^n$), the probability of these events happening is extremely low (negligible).
	- The probability of overlap for each query is shown to be $\frac{2 \cdot t^2}{2^n}$ and for all queries combined, it remains negligible as n grows.
4. Conclusion
	- Since the probability of the overlap event is negligible, it means that Hybrid $1$ and Hybrid $2$ are indistinguishable in the vast majority of cases. 
	- Therefore, the attacker cannot tell if they are dealing with Hybrid $1$ or Hybrid $2$, which implies that counter-mode encryption is CPA-secure.

Final conclusion
By proving that $Hyb1$ and $Hyb2$ are indistinguishable, the proof shows that CTR mode encryption is secure under CPA. This means that for an attacker who can choose plaintexts and see the ciphertexts, CTR mode will still look indistinguishable from random, which is the desired property for CPA security.

## Domain Extension 
A MAC is a cryptographic function that produces a tag for a message, which can be used to verify its authenticity and integrity. However, many MAC schemes (e.g., based on hash functions or block ciphers) are natively designed to work on messages of fixed size (often a single block of a certain length, such as 128 bits or 256 bits). In real-world scenarios, though, we need to authenticate messages of arbitrary lengths. Domain extension techniques allow us to extend the MAC scheme to handle variable-length messages securely, without compromising the security properties of the MAC. This process is essential for practical MAC implementations in applications where message sizes vary significantly.

Recall: PRF $\Rightarrow$ FIL; UFCMA; MAC.
$Tag(k,m) = F_k(m)$

### Some ideas that don't work
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


### Universal hash functions for MACs schemes (Pag. 55)
Universal hash functions are used to create efficient and secure hashing schemes for variable-length messages, especially when building Message Authentication Codes (MACs). Shrinking method. When creating a MAC for variable-length messages, universal hash functions are employed to map a long message to a fixed-size output before applying a pseudorandom function (PRF). This process reduces the size of the message to a fixed length that the PRF can then use to generate a secure tag.

The function family $H$ has specific properties that make it suitable for this task. The process works like this:
1. **Map the Message**: Use a function from the family $H$ to "shrink" the variable-length message m to a fixed-size output $h_s(m)$. 
2. **Generate the Tag**: Apply a PRF, $f_k$, to this fixed-size output, generating the final tag. The tag formula is:
$$Tag((k,s),m) = f_k(h_s(m))$$
Where:
- $k$ is the key for the PRF,
- $s$ is a parameter used to select a specific function in the family $H$.

For a hash function family $H$ to be secure in this context, it needs to make it difficult to produce collisions. ==A collision== occurs when two different messages, $m$ and $m′$, result in the same hash output: 
$$h_s(m)=h_s(m')$$

![[Cryptography/images/46.png|400]]

**Collisions** are undesirable because ==if an attacker can find two messages that hash to the same output==, they could potentially forge a MAC by substituting one message for the other without altering the tag, compromising the integrity of the MAC. 

**Problem with the collision**
The main challenge is that because $H$ maps ==from a larger domain (many possible inputs) to a smaller co-domain== (fewer possible outputs), ==collisions are inevitable== due to the pigeonhole principle: if there are more inputs than possible outputs, some inputs must map to the same output.

#### Solutions to avoid collisions
To secure the hash function despite inevitable collisions, we can rely on two strategies:

1. **Collision Resistance** (Supposizione):
	- This approach assumes that even though collisions might exist, they are difficult to find.
	- Even if the parameter $s$ (which selects a particular function $h_s$ from $H$) is known, finding two different messages that collide should be computationally infeasible. 
	- In this case, $H$ is designed to be collision-resistant, meaning it’s hard to find a pair $(m,m′)$ such that $h_s(m)=h_s(m′)$.
2. **Secrecy of $s$**:
	- Instead of assuming collision resistance when $s$ is known, we make $s$ a secret parameter. 
	- If $s$ is kept secret, an attacker cannot easily determine how $h_s$ works, making it much harder to find two messages that would produce the same hash. 
	- By keeping $s$ private, we add a layer of security that complicates any attempt to produce a collision, even if the hash function itself is not fully collision-resistant

We'll go with ==secret key approach== because it's the one that is used.

