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


his is true, because nothing prevents the adversary from asking the challenger to encrypt either $m_0$ or $m_1$, or even both, before starting the actual challenge. The solution for obtaining a CPA-secure encryption scheme consists of returning different ciphertexts for the same message, even better if they look random. This can be achieved by using PRFs.

![[Pasted image 20241122181505.png]]

We want to build a secure key encryption like $SKE(ENC, DEC)$ such that:
- $\mid k \mid << \mid n \mid$
	- The key size $(k)$ is much smaller than the message size $(n)$.
- Can encrypt more than $1$ message without compromised the efficient.

We have that formula of the encryption:
$$ENC(k, m)=G(k) \oplus m$$

- $G(k)$ è l'output di un generatore pseudocasuale (PRG) applicato alla chiave $k$
- $\oplus$ è l'operazione di XOR, soddisfa il requisito di avere $\mid k \mid << \mid m \mid$

**The problem**
Recall: $ENC(k, m)=G(k) \oplus m$ this achieves $\mid k \mid << \mid m \mid$

The problem emerges when encrypting multiple messages with the same key.
Considers two messages $m_1$ and $m_2$ encrypted as:
$$c_1 = G(k) \oplus m_1$$
$$c_2 = G(k) \oplus m_2$$
if the adversary observe both the ciphertexts, he can calculate:
$$c_1​ \oplus c_2​ = (G(k) \oplus m_1​) \oplus (G(k) \oplus m_2​)$$
thanks to the xor property, we obtain:
$$c_1 \oplus c_2 = m_1 + m_2$$

The adversary now owns $m_1 \oplus m_2$ that is a directly combination to the original messages. If the adversary know one of the two messages or he can deduct partial info about they, he can immediatly derive the other message.
This means: **Encrypting multiple messages with the same key exposes future plaintexts**.

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
What is a PRF? It's a deterministic function_ 
$$F_k : \{0,1\}^n \to \{0,1\}^n$$
$$k \in \{0,1\}, n=256,512,\cdots$$

```ad-todo
title: Recap

A PRF is a deterministic function that takes an input (typically a secret key and a message) and produces an output that appears random. The special feature of a PRF is that there is no efficient way (by an attacker) to distinguish its output from an output of a truly random function. (PRF function that generates a pseudo-random string).
```


Security? Basically the output of the function should be  ??? . From the output of Truly Random Truth Table.

![[Pasted image 20241123122142.png]]

For random choice of $k \in \{0,1\}$, then $F_k(\cdot)$ is completely independent from random table.

```ad-abstract
title: Definition of PRF
We say that $F: \{0,1\}^{\lambda} \times \{0,1\}^n \to \{0,1\}^n$ is a PRF if:
$$\text{REAL}_{A,F}(\lambda) / \text{RAND}_{A, R}(\lambda)$$
```

![[Pasted image 20241123122604.png]]

Equivalent: $\forall$  ppt $A$ 
$$\mid Pr[Real_{A,F}(\lambda)=1] - Pr[RAND_{A,R} (\lambda)=1] \le negl(\lambda) \mid$$
The challenger is unbounded in rand. This is simpler think of, but no needed as we can do lazy sampling:
- Upon $x \in \{0,1\}$, output $y \leftarrow \{0,1\}^n$ as long as $x$ not asked before (in which case, output previous $y$)


### Construct a PRFs
- In practice: AES (intuition and experience). Designed in early 2000, still unbroken. No provable security, back then.
- In theory: OWF $\to$ PRF. Alternatively, you can use factoring, or DL, LWE.

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
Recall that a mac scheme is a couple (Tag, Verify), with the purpose of authenticating the message’s source.  The desirable property that a mac scheme should hold is to prevent any attacker from generating a valid couple $(m^∗, r^∗)$, even after querying a tagging oracle polynomially many times. The act of generating a valid couple from scratch is called forging. In formal terms:

![[Pasted image 20241123121758.png]]

Let $f$ be a $PRF$, then $Tag(k,m)=F_k(m)$
Security? $UFCMA$ (Universal Unforgeability against chosen-message attacks).

>When we talk about UFCMA (Universal Forgery Chosen Message Attack), we are referring to the security of a Message Authentication Code (MAC).

Il gioco UFCMA è un esperimento che serve a verificare la sicurezza di un **Message Authentication Code (MAC)**. Un MAC è un algoritmo che permette di calcolare un **"tag"** (come una sorta di firma) per un messaggio $m$, usando una chiave segreta $k$. Lo scopo del gioco UFCMA è dimostrare che un avversario **non può falsificare un tag valido** per un messaggio che non ha mai richiesto.
![[Pasted image 20241123121141.png]]
- È **computazionalmente difficile** per un avversario creare un tag $r^*$ valido per un nuovo messaggio $m^*$, anche se ha avuto accesso a un oracolo che calcola i tag per altri messaggi.
- In altre parole, un MAC sicuro deve resistere a tentativi di falsificazione.

Se l'avversario riesce a vincere con probabilità maggiore di $\text{negl}$ (dove $\text{negl}$ è una funzione trascurabile), allora il MAC **non è sicuro**.

```ad-abstract
title: Definition (UFCMA)
Tag is UFCMA if $\forall$ ptt $A$: 
$$\forall r [Game_{A, Tag}(\lambda \mid = 1)] \le negl(\lambda)$$

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
By reduction to security of PRF. Fix $b$ and assume: $\not \exists$ ppt $A$ such that $$\mid Pr[G(\lambda, b)=1] - Pr[H(\lambda, b)=1]\mid \ge \frac{1}{negl(\lambda)}$$
Build ppt $B$ against $F$:
![[Pasted image 20241123154209.png]]

**Analysis**: By inspection $B$ a perfect simulation of $A$'s view.
$$Pr[G(\lambda, b)=1] = Pr[Real(\lambda)=1]$$
$$Pr[H(\lambda,b)] = Pr[Rand(\lambda)=1]$$

Let $H'(\lambda,b)$ be such that we answer all queries with uniform $(c_1, c_2)$ and also $(c_1^*, c_2*)$ is uniform. Clearly:
$$H(\lambda, 0) = H(\lambda, 1)$$
```ad-abstract
title: Lemma
$$H(\lambda, b) \approx_s H'(\lambda, b), \forall b \in \{0,1\}$$

```

**Proof of lemma**:
Standard Technique: say that $A$ and $B$ are identical unless some bad event $E$ happens. Then:
$$SD(A;B) \le Pr[E]$$

The bad event: we want that all the $r's$ are distinct; if they are distinct, then $(c_1, c_2)$ in $H(\lambda, b)$ is uniform and also $(c_1^*, c_2^*)$. $E$ is the even that they collide:
$$Pr[\exists i, j / r_i = r_j; r_i, r_j \in \{0,1\}^n]$$
$$\le \sum_{i,j}Pr[r_i = r_j] \hspace{0.5cm} \text{union bound}$$
$$Col(U_n)=r^{-n}$$
$$= \binom{q}{2} \cdot 2^{-n} \le q^r \cdot r^{-h} = negl(\lambda)$$
where $q$ is the $A$ of CTXS. ($q = poly(\lambda)$)
$$\Rightarrow G(\lambda, 0) \approx_c H(\lambda, 0) \approx_s H'(\lambda, 0) \equiv H'(\lambda, 1) \approx_s H(\lambda, 1) \approx_s G(\lambda, 1)$$

**Proof (Theorem 2)**:
We need to assume that $n = n(\lambda) = w(\log \lambda) \hspace{0.9cm} \text{Super-Logarithmic in} \hspace{0.2cm} \lambda$

![[Pasted image 20241123163137.png]]

$$\forall \hspace{0.1cm} PPT \hspace{0.1cm} \mid Pr[G(\lambda)=1] \le negl(\lambda)$$

Let $H(\lambda)$ be same as $G(\lambda)$ but with random table $R: \{0,1\}^n \to \{0,1\}^n$. So $r = R(n)$ and $A$ wins iff $r^* = R(m^*)$ and $m^*$ fresh.

```ad-abstract
title: Lemma
$$\forall \hspace{0.2cm} \text{PPT} \hspace{0.2cm} A: \mid Pr[G(\lambda)=1] - Pr[H(\lambda)=1]\mid \le negl(\lambda)$$

```

**Demonstration by reduction**:
![[Pasted image 20241123163119.png]]

By inspection:
- $Pr[Real(\lambda)=1] = Pr[G(\lambda)=1]$
- $Pr[Rand(\lambda)=1] = Pr[H(\lambda)=1]$

```ad-abstract
title: Lemma
$Pr[H(\lambda)=1] \le negl(\lambda)$, $\forall$ unbounded $A$ (As long as $n=w(\log \lambda)$

```

**Proof**
Only way to forge in $H(\lambda)$ is to guess the output of $R(m^*)$ on a fresh input $m^*$. Since this is uniform:
$$Pr[H(\lambda) = 1] \le 2^{-n} = negl(\lambda)$$
$$\text{because} \hspace{0.6cm} n = w(\log \lambda)$$
Next step: 
1) How to go from $FIL$ to $VIL$
2) How to combine encryption and authentication?

Let's start with the first for SKE. These are the so-called "**Modes of operation**".



## CFB (Cypher Feedback mode)
Let $m = m_1 \mid \mid m_2 \mid \mid m_3 \cdots$ with $m_i \in \{0,1\}^n$
![[Pasted image 20241123162920.png]]

## OFB (Output Feedback)
![[Pasted image 20241123162948.png]]

## CBC (Cypher Black Chaining) (8.1.2)
![[Pasted image 20241123163017.png]]

>PRP: We'll discuss it later. In practice AES is a PRF. In theory: OWF $\Rightarrow$ PRGs $\Rightarrow$ PRFs $\Rightarrow$ PRTs

## CTR (Counter Mode)(8.1.3)
![[Pasted image 20241123163038.png]]`

$r$ is an integer$\mod 2^n$ and addition is also$\mod 2^n$.

```ad-abstract
title: Theorem
If $F$ a PRF then CTR mode is CPA secure for VIL

```

----

**Proof**:We start with original CPA game.

![[Cryptography/images/42.png]]

$H_1(\lambda, b):$ The same as $H_0(\lambda, b)$ but use $R$ instead of $F_k$.
$H_2(\lambda, b):$ The same as $H_1(\lambda, b)$ but $c^*$ is uniform.

```ad-abstract
title: Lemma
$\forall b,H_0(\lambda,b) \approx_c H_1(\lambda, b)$

```

**Proof**: reduction to PRF security.
![[Cryptography/images/44.png]]

```ad-abstract
title: Lemma
$\forall b, H_1(\lambda, b) \approx_s H_2(\lambda,b)$ as long as $A$ makes $q(\lambda) = poly(\lambda)$ encryption queries.

```

**Proof**:
Find Event $E$ such that when $E$ does not happened $H_1(\lambda, b) \equiv H_2(\lambda,b)$. The challenge CTX $c^*$ is computed using the sequence:
$$R(r^*), R(r^* + 1), \cdots, R(r^* + t^* - 1)$$
On the other hand, the other CTRs are computed missing the sequence:
$$R(r), R(r+1), \cdots, R(r+t-1) \hspace{0.7cm} \text{different r,t for each query}$$
The event $E$ is the event that the first sequence overlaps with the second sequence ($\forall$ queries).
$$E: \exists j,j' \ge 0 \wedge i \ge 1$$
$$r_i +1 = r^* + j'$$
$$r* = r; r=4; j'=2; j=0$$
_Observe_: Conditioning on $\bar E$, the $c^*$ will be uniform and $H_1(\lambda,b) \equiv H_2(\lambda,b)$
We only need to bound $Pr[E]$.
Simplify: Let $q(\lambda)$ be also the max length of any entry query. Of course $q(\lambda) = poly$
$\Rightarrow t_i, t^* = q(\lambda) = \#queries$

Consider event $E_i$, $r_i, \cdots, r_{i+q-1}$ overlaps with $r^*, \cdots, r^* + q-1$
$$Pr[E] \le \sum_{i=1}q Pr[E_i] \le q(\lambda) \cdot negl(\lambda) = negl(\lambda)$$
$$r^*, r^*+1, \cdots, r^* + q -1$$
$$r_i, r_i +1, \cdots, r_i + q -1$$
$$r^* - q + 1 \le r_i \le r* + q -1$$
$$\Rightarrow Pr[E_i] \le \frac{(r^* + q-1)-(r^* - q + 1)+1}{2^n} = \frac{2q-1}{n} = \text{negl}(\lambda)$$

```ad-abstract
title: Lemma
$H_2(\lambda, 0) \equiv H_2(\lambda, 1)$ because $c^*$ indipendent of $b$ in $H_2$

```

$$\Rightarrow H_0(\lambda,0) \approx_c H_1(\lambda,0) \approx_s H_2(\lambda, 0)$$
$$\equiv H_2(\lambda, 1) \approx_s H_1(\lambda, 1) \approx_c H_0(\lambda, 1)$$
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







