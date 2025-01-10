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
$$k \in \{0,1\}^{\lambda}, n=256,512,\cdots$$

A **PRF** is a deterministic function that takes an input (typically a secret key and a message) and produces an output that appears random. The special feature of a PRF is that there is no efficient way (by an attacker) to distinguish its output from an output of a truly random function. (PRF function that generates a pseudo-random string).

```


Security? Basically the output of the function should be undistinguishable from the output of Truly Random Truth Table.

![[Cryptography/images/73.png]]

For random choice of $k \in \{0,1\}^{\lambda}$, then $F_k(\cdot)$ is completely independent from random table.

```ad-abstract
title: Definition of PRF
We say that $F: \{0,1\}^{\lambda} \times \{0,1\}^n \to \{0,1\}^n$ is a PRF if:
$$\text{REAL}_{A,F}(\lambda) \approx_c \text{RAND}_{A, R}(\lambda)$$
```

![[Cryptography/images/74.png]]

Equivalent: $\forall$  ppt $A$ 
$$\mid Pr[Real_{A,F}(\lambda)=1] - Pr[RAND_{A,R} (\lambda)=1] \mid \le negl(\lambda) $$
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

By reduction to security of PRF. Fix $b$ and assume not: $\exists$ ppt $A$ such that $$\mid Pr[G(\lambda, b)=1] - Pr[H(\lambda, b)=1]\mid \ge \frac{1}{negl(\lambda)}$$

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
Finora, la crittografia è stata trattata con messaggi di dimensioni fisse attorno a una funzione polinomiale di $\lambda$. Come gestire messaggi di dimensioni arbitrarie? Fissare un limite massimo alla lunghezza dei messaggi sembra poco pratico, sia per motivi di spreco quando i messaggi sono troppo corti, sia per motivi di praticità quando i messaggi diventano troppo lunghi. La soluzione consiste in un “cifratore a blocchi”, in cui un messaggio di una determinata dimensione viene suddiviso in blocchi di uguale dimensione e quindi cifrato utilizzando uno schema di cifratura a dimensione fissa. Sono state ideate diverse istanze di questa tecnica, chiamate modalità.
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
Assume $f_k$ is a PRF, then the counter-mode block cipher is CPA-secure for variable input length (VIL).

```

**Proof of the Theorem**
We start with original CPA game:
![[Immagine WhatsApp 2025-01-04 ore 19.53.34_2e627e40.jpg]]

```ad-abstract
title: Lemma
$$\forall b, H_0(\lambda, b) \approx_c H_1(\lambda, b)$$

```

**Proof by Reduction to PRF security**
![[Immagine WhatsApp 2025-01-04 ore 20.06.58_284236ce.jpg]]

```ad-abstract
title: Lemma
$$\forall b, H_1(\lambda, b) \approx_c H_2(\lambda, b) \hspace{0.7cm} \text{As long as $A$ makes $q(\lambda) = poly(\lambda)$ encryption queries.}$$

```
Trova l'evento $E$ tale che, quando $E$ non si verifica, si ha $H_1(\lambda, b) \equiv H_2(\lambda, b)$.
Il ciphertext della sfida $c^*$ viene calcolato utilizzando la sequenza:  
$$R(r^*), R(r^*+1), \cdots, R(r^* + t^* -1)$$

D'altra parte, gli altri ciphertexts (CTXs) vengono calcolati utilizzando la sequenza:  
$$R(r_i), R(r_i +1), \cdots, R(r_i + t_i -1)$$
L'evento $E$ è l'evento in cui la prima sequenza si sovrappone alla seconda sequenza (per tutte le richieste di crittografia):  
$$E: \exists j, j' \ge 0; i \ge 1$$
$$r_{i+1} = r^* + j'$$
$$r^* = r; r = 4; j' = 2; j = 0$$

Osservazione: condizionando su $\bar E$, $c^*$ sarà uniforme e $H_1(\lambda, b) \equiv H_2(\lambda, b)$. È necessario solo calcolare un limite superiore per $Pr[E]$.

Semplificando: sia $q(\lambda)$ anche la lunghezza massima di qualsiasi richiesta di crittografia. Ovviamente, se $q(\lambda) = poly$, allora $t_i, t^* = q(\lambda)$ (numero di richieste). Consideriamo l'evento $E_i$:  
$$r_i, \cdots, r_{i+q-1}$$ 
si sovrappone a  
$$r^*, \cdots, r^* + q - 1$$

Si ha:  
$$Pr[E] \le \sum_{i=1}^q Pr[E_i] \le q(\lambda) \cdot \text{negl}(\lambda) = \text{negl}(\lambda)$$

Per calcolare $Pr[E_i]$, consideriamo:  
$$r^*, r^* + 1, \cdots, r^* + q - 1$$  
$$r^*, r^* + 1, \cdots, r_i + q - 1$$  
$$r^* - q + 1 \le r_i \le r^* + q - 1$$

Pertanto:  
$$Pr[E_i] \le \frac{(r^* + q - 1) - (r^* - q + 1)}{2^n} = \frac{2q - 1}{2^n} = \text{negl}(\lambda)$$

```ad-abstract
title: Lemma
$$H_2(\lambda, 0) \equiv H_2(\lambda, 1)$$
Because $c^*$ independent of $b$ in $H_2$

```

So,
$$H_0(\lambda, 0) \approx_c H_1(\lambda, 0) \approx_s H_2{\lambda, 0}\equiv H_2(\lambda, 1) \approx_s H_1(\lambda, 1) \approx_c H_0(\lambda, 1)$$




## Domain Extension 
Un MAC è una funzione crittografica che produce un tag per un messaggio, che può essere utilizzato per verificarne l'autenticità e l'integrità. Tuttavia, molti schemi MAC (ad esempio, basati su funzioni hash o cifrari a blocchi) sono progettati per funzionare su messaggi di dimensioni fisse (spesso un singolo blocco di una certa lunghezza, come 128 bit o 256 bit). Negli scenari reali, tuttavia, è necessario autenticare messaggi di lunghezza arbitraria. 

```ad-abstract
title: Domain Extension

Le **tecniche di estensione del dominio** ci permettono di estendere lo schema MAC per gestire in modo sicuro messaggi di lunghezza variabile, senza compromettere le proprietà di sicurezza del MAC. Questo processo è essenziale per le implementazioni pratiche del MAC in applicazioni in cui le dimensioni dei messaggi variano in modo significativo.
```

Recall: PRF $\Rightarrow$ FIL; UFCMA; MAC.
$Tag(k,m) = F_k(m)$

### Some ideas that don't work
1. Concatenazione dei Tag
	$e=Tagk​(m1​)⊕Tagk​(m2​)⊕…$

2. Combinazione lineare dei blocchi
	$r = F_k(m_1 \oplus m_2)$
	Un avversario potrebbe manipolare i blocchi $m_1$​ e $m_2$​ per ottenere un nuovo messaggio $m^*$ che produca lo stesso tag $r$.

Un’**idea migliore** è aggiungere un identificatore di blocco (indice $i$) e concatenarlo con il contenuto del blocco $m_i$ ​:   $r_i = Tag_k(i \mid\mid m_i)$
Questa tecnica garantisce che il MAC dipenda non solo dai dati ma anche dalla loro posizione, prevenendo attacchi di permutazione.

### Universal hash functions for MACs schemes (Pag. 55)
Le **Universal hash Function** sono utilizzate per creare schemi di hashing efficienti e sicuri per messaggi di lunghezza variabile, in particolare per la creazione di codici di autenticazione dei messaggi (MAC). Metodo di restringimento. 

```ad-tip

Quando si crea un MAC per messaggi di lunghezza variabile, si utilizzano funzioni hash universali per mappare un messaggio lungo in un output di dimensioni fisse prima di applicare una funzione pseudorandom (PRF). Questo processo riduce le dimensioni del messaggio a una lunghezza fissa che la PRF può utilizzare per generare un tag sicuro.
```


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



>La relazione tra **Domain Extension** e **Universal Hash per schemi MAC** è profonda, poiché entrambe le tecniche affrontano il problema di autenticare messaggi di lunghezza arbitraria, garantendo sicurezza ed efficienza.