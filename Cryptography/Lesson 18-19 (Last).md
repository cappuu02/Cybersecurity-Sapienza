# RSA
The first Public Key Encryption (PKE) scheme was introduced in 1978. It allows secure communication without prior key exchange.
$$
\begin{aligned}
&\text{Alice} \xleftarrow {\text{Public Key}} \text{Bob (SK)} \\
&\text{Alice} \xrightarrow {\text{$c$}}  \text{Bob (SK)}\\
\end{aligned}
$$
- $k \leftarrow \mathcal{U}_{\lambda} \hspace{0.8cm} \text{(Randomly generated key from uniform distribution)}$ - $c \leftarrow \text{ENC}(\text{PK}, k) \hspace{0.8cm} \text{(Ciphertext computed using encryption)}$ - $k = \text{DEC}(\text{SK}, c) \hspace{0.8cm} \text{(Recovered key using decryption)}$
## Explain RSA
The native idea is: 
Bob generate two random prime numbers sufficiently big $p$ and $q$ of $\lambda$-bits length
Let $n = p \cdot q$ where $p,q$, Then $PK = n$ and $SK = (p, q)$

ENC and DEC are based on $(Z_n^*, \cdot)$
There are two exponent:
- ENC exponent $e$
- DEC exponent $d$ ,is the inverse of $e \mod \varphi(n)$ such that: 
$$d \cdot e \equiv 1 \mod \varphi(n)$$
$$\varphi(n) = \#Z_n^* = (p-1)(q-1)$$
For all $e$ exists the inverse.
We will use this for public and secret key: 
$$PK = (n,e) \hspace{0.9cm} SK=(n,d)$$

## Security
==Observation by RSA==: we can use this **Euler theorem** to define a so called **trapdoor permutation**.

```ad-abstract
title: Eulher Theorem
Let $x$,$n$ be two coprime numbers. Then:
$$x^{\varphi(n)} \equiv_n 1$$
```

```ad-abstract
title: Definition Trapdoor Permutation
Is a deterministic function (OWP) having the following features:
- A key of pair is chosen by a generator algorithm: $GENRSA(1^{\lambda})$
- There is an efficient function $g_{sk}$ that efficiently inverts $f_{pk}$, where sk is the “trapdoor”
- No efficient adversary is able to invert $f$ without knowing secret key

```

Note that because the public key is public, an adversary can perform any polynomial number of encryptions with pk, and see the corresponding ciphertext. It entails that, if left deterministic, a TDP is not CPA-Secure because for the same input we obtain the same output (Non è resistente agli attacchi con testo in chiaro).
$$ENC(pk, m) = f_{e,n}(m) = m^e \mod n$$
$$DEC(sk, c) = c^d \mod n = f^{-1}_{d,n}(c) = (n^e)^d = n^{ed} = n^{t \cdot \varphi(n) + 1} = (n^{\varphi(n)})^t \cdot m \mod n = m \mod n$$
Also, the scheme described above is not CPA-Secure form the start: the adversary, by choosing two messages for the challenge, and receiving the ciphertext , along with the public key, has everything needed to reconstruct the encryption and check whichever message was encrypted, much like the problem of UFCMA against a deterministic MAC scheme.

L'algoritmo RSA si basa sull'idea che la crittografia e la decifratura siano inversi l'uno dell'altro. Questo si realizza grazie alle proprietà dell'esponenziazione modulare e al Teorema di Eulero

>Above is the main idea of RSA algorithm.
## Problem
```ad-warning
RSA is CPA-Secure? No, there's not randomness.
```

Nella pratica, per mitigare questa vulnerabilità, RSA viene tipicamente utilizzato con **schemi di padding** "PKCS Standards". Questi schemi di padding introducono casualità nel processo di crittografia, rendendo la crittografia **probabilistica** invece che deterministica.

$\rightarrow \text{CPA Security} \hspace{0.6cm} \#1.5$ 
$\rightarrow \text{CCA Security} \hspace{0.6cm} \#2.0$

```ad-bug
title: Bug 
no degli attacchi possibili è che un avversario possa scegliere dei messaggi e vedere i relativi ciphertext, cercando di dedurre informazioni sulla chiave segreta. Per difendersi da questo tipo di attacco, viene utilizzata una tecnica chiamata **randomizzazione** del messaggio, ovvero l'inserimento di un valore casuale $r$ nel messaggio prima di cifrarlo.

```
## CPA Security
In CPA Security we insert some randomness $r$ in the message:
$$\vec{m} = (r \mid \mid m) \hspace{0.5cm} FOR \hspace{0.5cm} r \leftarrow \{q, 1\}^{l(\lambda)} \hspace{0.4cm} \text{Inject some randomness in the message}$$
Then do the same:
$$c = (\vec m)^e \mod n$$
$$\vec m = DEC(sk, c) \hspace{0.5cm} \text{and we can recover $m$ by discarding $r$}$$
Standards used to ensure safety:
 - 1 byte fixed: i put this byte at the start
 - 1 byte to encode the node: encryption
 - the $r$ part, at least $8$ bytes ($64$ bit)
 - then $m$

We ensure CPA Security? Here is what we know:
- First, $l(\lambda)$ must be large enough: $(w(\log \lambda))$
- On other hand we can prove CPA Security for $m \in \{0,1\}$ from what assumption? Not factoring but under the so-called RSA-Assumption.
- For other ranges, we don't know

$\Rightarrow$ RSA Become deprecated in the few years

### RSA-Assumption
Of course, factoring (trovare i valori $p$ e $q$ di $n$) must be hard. Also computing $\varphi(n)$ should be hard; but this is equivalent to factoring $n$:
$$p \cdot q - (p-1)(q-1)+1 = pq -pq+p+q-1+1 = p+q \hspace{0.5cm} \text{remember}  \hspace{0.5cm} \text{p $\cdot$ q = n } \hspace{0.9cm} (p-1)(q-1)= \varphi(n)$$
Then, given $\varphi(n)$, we can compute:
$$
\begin{cases}
s = n - \varphi(n) + 1 = p +q\\
p \cdot q = n\\
\text{Can compute p,q}
\end{cases}
$$
the assumption is simply the fact that:
$$f_{n,e}(m) = m^l \mod n \hspace{0.5cm} \text{Is a OWF}$$
In fact, is not really precise because it's more than that: it's a trapdoor functions.
$$TDP: (GEN, f, f^{-1}) \hspace{0.4cm} \text{such that} \hspace{0.4cm} (PK, SK) \leftarrow GEN(1^{\lambda})$$
$$y = f_{PK}(x) \hspace{0.4cm} \text{Encryption}$$
$$x = f_{SK}(y)^{-1} \hspace{0.4cm} \text{Decription}$$
>**RSA** is a ==trapdoors permutation==, no one can ==invert it== thanks to the **Secret Key**.

```ad-info
title: recap
L'**RSA Assumption** si basa sull'idea che **fattorizzare** il modulo $n$ (cioè trovare i fattori primi $p$ e $q$) sia computazionalmente difficile. Questo è essenziale per la sicurezza di RSA, in quanto la sicurezza di RSA si basa proprio sulla difficoltà di fattorizzare $n = p \cdot q$. Inoltre, calcolare la funzione di Eulero $\varphi(n)$, che è importante per il calcolo della chiave privata, è altrettanto difficile, poiché è direttamente legato alla fattorizzazione di $n$. Se un attaccante riesce a fattorizzare $n$, può facilmente calcolare $\varphi(n)$ e, da lì, recuperare la chiave privata.

```


![[Cryptography/images/93.png]]
If RSA is hard $\Rightarrow$factoring hard
if i can factoring $\Rightarrow$ i can reverse the function $\Rightarrow$ broke RSA security
Factoring $\Rightarrow$ RSA??

**Question**: Can we do CPA PKE from factoring for long messages? As efficient as RSA?
Answer: yes, but some of these schemes is a real standard so we won't take it.
## CCA Security
In the real world, a CCA attack was carried out against PKCS H1.5 based on a 'partial decryption oracle', which provides a response indicating whether a given ciphertext $\tilde c$ is correctly padded. This is why PKCS $\#2.0$ was introduced, using a more complex padding scheme that can be proven CCA secure for $\lambda$-bit messages, but under strong assumptions (RSA).

DAEP is a cryptographic scheme that use pseudorandom functions and random oracles to improve the  encryption security:
$$m \in \{0,1\}^l \hspace{0.5cm} m' = m \mid \mid 0^{\lambda_1}$$
$$\text{For} \hspace{0.8cm} \lambda_1 = H(\lambda); \hspace{0.3cm} r \leftarrow \{0,1\}^{\lambda_0}$$
$$s = m' \oplus G(r) \in \{0,1\}^{l+\lambda_1}$$
$$t = r \oplus H(s) \in \{0,1\}^{\lambda_0}$$
$$c = (s \mid \mid t)^2 \mod n$$
>$\tilde m = s \mid \mid t \Rightarrow$ s is the pseudo casual part, t is the random one.

**In practice**: $\lambda_1, \lambda_0$ are constants and $l$ can be around $236$ bits
RSA assumptions + something about $G, H$
$G,H$ are called random oracles
- indistinguishing from random table,
- we know how to construct,
- impossible to get and guess the expected output except if I possess the $s$ seed.





In theory: TDP $\rightarrow$ PKE (at least CPA Secure)
Recall: $h$ is hardcore for $f$ if:
$$(f(x), g(x)) \stackrel{\sim}{\sim}_c (f(x),b) \hspace{0.9cm} b \leftarrow{0,1} \hspace{0.9cm} x \leftarrow \{0,1\}^n$$
$$ENC(PK, m) = (f_{PK}(r), h(r) \oplus m) \hspace{0.7cm} r \leftarrow \{0,1\}^r$$More over: 1-bit PKE $\Rightarrow$ but PKE



# Spiegazione attacco CCA (SUB-ITA)
Gli **attacchi CCA (Chosen Ciphertext Attack)** sono un tipo di attacco crittografico avanzato in cui l'attaccante ha la possibilità di manipolare e scegliere un ciphertext (cioè un testo cifrato) e, successivamente, ottenere il corrispondente messaggio in chiaro (plaintext) tramite un oracle di decrittazione. L'obiettivo principale dell'attacco CCA è riuscire a ottenere informazioni sul messaggio cifrato, sulla chiave di cifratura o anche sulla chiave privata utilizzata nel sistema crittografico.

## Cos'è un **oracle di decrittazione**?

Un **oracle di decrittazione** è un'entità che, dato un ciphertext ccc, restituisce il corrispondente messaggio in chiaro mmm tramite un processo di decrittazione. Tuttavia, l'oracle è progettato in modo tale da **non restituire mai il messaggio in chiaro** per il ciphertext che l'attaccante sta cercando di decifrare (di solito il ciphertext che l'attaccante ha cifrato). Ma può restituire il messaggio in chiaro per altri ciphertexts scelti dall'attaccante.

## Le fasi di un attacco CCA

L'attacco CCA si articola in due fasi principali: la fase di **preparazione** e la fase di **attacco vero e proprio**.

### **Fase 1: Preparazione**

1. **Cifratura del messaggio di partenza:** L'attaccante ottiene un ciphertext ccc, che è il risultato della cifratura di un messaggio mmm con una chiave pubblica (o altro meccanismo di cifratura).
    
2. **Manipolazione del ciphertext:** L'attaccante modifica il ciphertext ccc in qualche modo, creando una versione manipolata c′c'c′.
    
3. **Invio del ciphertext manipolato all'oracle:** L'attaccante invia il ciphertext manipolato c′c'c′ all'oracle di decrittazione.
    
4. **Risposta dell'oracle:** L'oracle restituisce il messaggio in chiaro corrispondente al ciphertext c′c'c′, ossia m′=Dec(c′)m' = \text{Dec}(c')m′=Dec(c′).
    
    L'attaccante non conosce mai il messaggio in chiaro relativo al ciphertext che sta cercando di decifrare, ma attraverso la manipolazione di c′c'c′ e l'osservazione della risposta dell'oracle, può raccogliere informazioni utili.
    

### **Fase 2: Attacco vero e proprio**

1. **Osservazione e deduzione:** Dopo aver ricevuto più risposte dall'oracle, l'attaccante cerca di analizzare i messaggi in chiaro ottenuti. L'attaccante può manipolare nuovamente il ciphertext in modo intelligente per raccogliere informazioni sul messaggio cifrato o sulla chiave privata.
    
2. **Attacco alla chiave privata o decrittazione del messaggio:** L'attaccante potrebbe essere in grado di inferire la chiave privata, decifrare il messaggio originale, o anche dedurre altre informazioni importanti che gli permettano di compromettere il sistema crittografico.

Nel PKCS 1.5, l'**oracle di decrittazione parziale** permette ad un attaccante di inviare un ciphertext **parzialmente decriptato** e ottenere informazioni sulla validità del padding. Nel PKCS #2.0, il padding è stato reso più complesso e sicuro, eliminando questa vulnerabilità. Inoltre, il padding del PKCS #2.0 è stato progettato in modo tale da essere **protegge contro gli attacchi CCA (Chosen Ciphertext Attack)**. In altre parole, nel PKCS #2.0, l'**oracle di decrittazione parziale** non è più presente e la sicurezza è stata migliorata per prevenire tali attacchi.

```ad-info
CPA e CCA sono due tipologie di attacchi. Quando parliamo di CPA security e CCA security intendiamo trovare un modo per proteggere questi sistemi crittografici da questi potenziali attacchi.

```


# Hash Functions (Are public, not secret)

![[Cryptography/images/94.png]]

$$H = \{H_5: \{0,1\} \to \{0,1\}^{\lambda}\}_{s \leftarrow \{0,1\}^{\lambda}} \hspace{0.8cm} \text{$H$ is a family of function}$$
## The main Security Property: Collision Resistance
![[Cryptography/images/95.png]]

>Hash functions are more strong than one-way functions.

**Question**: "Why is this a seed? Can't we have a single hash function that is collision resistance?"
If we fix hash function (only one) $\Rightarrow$ there are still collisions. We can't because once we fix $H$, there exist $x, x'$ that are a collision and the following $A_{x, x'}$ breaks collision resistance in polynomial time.
$$A_{x, x'}: \text{Output}_{x, x'}$$
### Plural paradigm for constructing hash functions
- Design comparison function say:
	$h_s : \{0,1\}^{2 \lambda} \to \{0,1\}$
	Or even $\{0,1\}^{\lambda+1} \to \{0,1\}^{\lambda}$
- Then amplify this domain $\{0,1\}$
	Real world constructions faithfully follow step 2, but heuristically implement step 1

Let's start with step 2. It comes from a result by Merkle and Dongard around 1980.

==MD==
![[Cryptography/images/97.png]]

==Merkle Tree==
![[Cryptography/images/98.png]]

```ad-abstract
title: Theorem
The MD construction givesa a CRH $H$ from $l^1(\lambda)$ into $n(\lambda)$ assuming $H'$ is a CRH from $l(\lambda)=n+1$ into $n(\lambda)$ bits.

```

**Proof**
We assume FIL $l'(\lambda)$ for now. Say $\exists$ PPT $A$' finding a collisione:
$$x = (b_1, \cdots, b_{l'}) \not = (b'_1, \cdots, b'_{l'}) = x' \hspace{0.5cm} \text{such that} \hspace{0.5cm} h'_s(x) = h'_s(x') \hspace{0.5cm} \text{where $h'_s(\cdot)$ is the MD costruction using $h_s(\cdot)$}$$

![[Cryptography/images/99.png]]

```ad-info
Abbiamo trovato una collisione tra queste due hash function. Come possiamo fare? 
Idea! Torniamo indietro e cerchiamo di vedere dove si è verificata tale collisione.

```

==Running backwords ==
Let $j$ be the largest index such that:
$$(b_j, y_{j-1})(b'_j, y'_{j-1})$$
Because this is the largest $j$, it must be the case that:
$$h_s(b_j, y_{j-1})=h_s(b'_j, y'_{j-1}) \Rightarrow b_j\mid \mid y_{j-1}, b'_j \mid \mid y'_{j-1} \hspace{0.5cm} \text{are a collision for} \hspace{0.5cm} h_s(\cdot)$$This observation immediatly implies a PPT reduction $A$ breaking $H$.

>Cause violated CRH rules.


Why FIL? Because the above construction is a actually not secure for VIL. In fact, consider $H$ with the property that $h_s(0^{n+1})=0^n$ for every $s$. For every $x = h'_s(0^n \mid \mid x) = h'_s(x)$ 

>Banale concatenazione di $0$ con $x$

![[Cryptography/images/96.png]]

The Fix: Make it happen that no "legal" input is a suffix of another "legal input".
- "Legal": Encode it like this.
- Assume for simplicity $h_s = \{0,1\}^2n \to \{0,1\}^n$
- Then if $x = (x_1, \cdots, x_{l'})$ encode $x$ to $x_1, \cdots, x_{l'}, <l'>$
	- $<l'>$ binary encoding of $l'$ using $n$ bits.

```ad-abstract
title: Theorem
The above stringthening of MD is a CRH for VIL.

```

**Proof**: Let's be $A$ ppt adversary finding a collision $x \not = x'$ such that $h'_s(x)=h'_s(x')$ consider $2$ cases:

1) $\mid x \mid = \mid x' \mid$ The proof is as before.
2) $\mid x \mid \not = \mid x' \mid$ Say $x$ is mode of $l_1$ blocks and $x'$ is mode of $l_2$ blocks.

Then $<l_1> \not = <l_2>$ and we have found a collision in $h_s(\cdot)$. (END OF THE PROOF)

It remains to instaurate $h_s(\cdot)$. Two main approaches:
1) Practice: Use AES: $H(s,x) = AES(x) \oplus x$, $2n \to n$ compression
	This can be proven secure assuming "AES" is an ideal cipher (Random permutation for every choice of the key)
2) Theory instantiate $h_s(\cdot)$ from your favorite hard problem (factoring, DL, ...). Let $(G, g, q)$ be a cycling group where DL is hard, but $q$ needs to be prime.
	Say $g_1 = g$ and $g_2=g^x$
	$h_{g_1, g_2}(x_1, x_2) = g_{1}^{x_1}, g_2^{x_2}$
	$Z_q^z \to G (\equiv \lambda$ bits of compression)

Why is this collision resistant? Assume not:
$$\exists \hspace{0.5cm} PPT A \hspace{0.3cm} \text{that output}(x_1, x_2) \hspace{0.3cm} \text{and} (x'_1, x'_2) \mid (x_1, x_2) \not = (x_1', x'_2)$$
$$g_1^{x_1}, g_2^{x_2} =  g_1^{x'_1}, g_2^{x'_2} \Rightarrow g_2^{x_2 - x_2'} = g_1^{x_1 - x_1'}$$
WLog assume $x_2 \not = x'_2$, otherwise $x_1 = x'_1$
$$\Rightarrow g_2 = g_1^{(x'_1 - x_1)(x_2-x'_2)^{-1}} \hspace{0.9cm} x_2 \not = x_2'$$
And the inverse exists as $q$ is prime!
$$\Rightarrow (x'_1 - x_1)(x_2 - x_2')^{-1} \hspace{0.4cm} \text{is the DL of $g_2$}$$
This gives a reduction to DL.