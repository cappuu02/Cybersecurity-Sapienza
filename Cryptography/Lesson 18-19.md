 # RSA
The first Public Key Encryption (PKE) scheme was introduced in 1978. It allows secure communication without prior key exchange.
$$
\begin{aligned}
&\text{Alice} \xleftarrow {\text{Public Key}} \text{Bob (SK)} \\
&\text{Alice} \xrightarrow {\text{$c$}}  \text{Bob (SK)}\\
\end{aligned}
$$
- $k \leftarrow \mathcal{U}_{\lambda} \hspace{0.8cm} \text{(Randomly generated key from uniform distribution)}$ - $c \leftarrow \text{ENC}(\text{PK}, m) \hspace{0.8cm} \text{(Ciphertext computed using encryption)}$ - $m = \text{DEC}(\text{SK}, c) \hspace{0.8cm} \text{(Recovered key using decryption)}$
## Explain RSA
The native idea is: 
Bob generate two random prime numbers sufficiently big $p$ and $q$ of $\lambda$-bits length
Let $n = p \cdot q$ where $p,q$ are two primes, Then $PK = n$ and $SK = (p, q)$

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

L'algoritmo RSA si basa sull'idea che la cifratura e la decifratura siano inversi l'uno dell'altro. Questo si realizza grazie alle proprietà dell'esponenziazione modulare e al Teorema di Eulero

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
Uno degli attacchi possibili è che un avversario possa scegliere dei messaggi e vedere i relativi ciphertext, cercando di dedurre informazioni sulla chiave segreta. Per difendersi da questo tipo di attacco, viene utilizzata una tecnica chiamata **randomizzazione** del messaggio, ovvero l'inserimento di un valore casuale $r$ nel messaggio prima di cifrarlo.

```
## CPA Security
In CPA Security we insert some randomness $r$ in the message:
$$\bar{m} = (r \mid \mid m) \hspace{0.5cm} FOR \hspace{0.5cm} r \leftarrow \{0, 1\}^{l(\lambda)} \hspace{0.4cm} \text{Inject some randomness in the message}$$
Then do the same:
$$c = (\bar m)^e \mod n$$
$$\bar m = DEC(sk, c) \hspace{0.5cm} \text{and we can recover $m$ by discarding $r$}$$
Standards used to ensure safety:
 - 1 byte fixed: i put this byte at the start
 - 1 byte to encode the node: encryption
 - the $r$ part, at least $8$ bytes ($64$ bit)
 - then $m$

We ensure CPA Security? Here is what we know:
- First, $l(\lambda)$ must be large enough: $(w(\log \lambda))$ ($\lambda$ è la lunghezza desiderata)
- On other hand we can prove CPA Security for $m \in \{0,1\}$ from what assumption? Not factoring but under the so-called RSA-Assumption.
- For other ranges, we don't know

$\Rightarrow$ RSA Become deprecated in the few years
### RSA-Assumption
Of course, factoring (trovare i valori $p$ e $q$ di $n$) must be hard. Also computing $\varphi(n)$ should be hard; but this is equivalent to factoring $n$. If we know the value of the $\varphi(n)$ we can find $p$ and $q$:
$$p \cdot q - (p-1)(q-1)+1 = pq -pq+p+q-1+1 = p+q \hspace{0.5cm} \text{remember}  \hspace{0.5cm} \text{p $\cdot$ q = n } \hspace{0.9cm} (p-1)(q-1)= \varphi(n)$$
Then, we can solve for 𝑝 and 𝑞 using a simple quadratic equation.
$$
\begin{cases}
s = n - \varphi(n) + 1 = p +q\\
p \cdot q = n\\
\text{Can compute p,q}
\end{cases}
$$

L'assunzione RSA si basa sul fatto che la funzione di cifratura RSA è una trapdoor permutation. 
$$f_{n,e}(m) = m^e \mod n \hspace{0.5cm} \text{Is a OWF}$$
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
Factoring $\Rightarrow$ RSA?? Yes!

**Question**: Can we do CPA PKE from factoring for long messages? As efficient as RSA?
Answer: yes, but some of these schemes is a real standard so we won't take it.
## CCA Security
Nel mondo reale, è stato effettuato un attacco CCA contro il PKCS H1.5 basato su un “oracolo di decrittazione parziale”, che fornisce una risposta che indica se un dato testo cifrato $\tilde c$ è correttamente imbottito. Per questo motivo è stato introdotto il PKCS #2.0, che utilizza uno schema di imbottitura più complesso che può essere dimostrato sicuro dal punto di vista CCA per i messaggi a $\lambda$ bit, ma sotto forti assunzioni (RSA).

DAEP (Deterministic Authenticated Encryption with Pseudorandom Functions) is a cryptographic scheme that use pseudorandom functions and random oracles to improve the  encryption security:
$$m \in \{0,1\}^l \hspace{0.5cm} m' = m \mid \mid 0^{\lambda_1}$$
$$\text{For} \hspace{0.8cm} \lambda_1 = H(\lambda); \hspace{0.3cm} r \leftarrow \{0,1\}^{\lambda_0}$$
$$s = m' \oplus G(r) \in \{0,1\}^{l+\lambda_1}$$
$$t = r \oplus H(s) \in \{0,1\}^{\lambda_0}$$
$$c = (s \mid \mid t)^2 \mod n$$
>$\tilde m = s \mid \mid t \Rightarrow$ s is the pseudo casual part, t is the random one.

**In practice**: $\lambda_1, \lambda_0$ are constants and $l$ can be around $236$ bits
RSA assumptions + something about $G, H$
- indistinguishing from random table,
- we know how to construct,
- impossible to get and guess the expected output except if I possess the $s$ seed.


**In theory**: TDP $\rightarrow$ PKE (at least CPA Secure)
Recall: $h$ is hardcore for $f$ if:
$$(f(x), g(x)) \stackrel{\sim}{\sim}_c (f(x),b) \hspace{0.9cm} b \leftarrow{0,1} \hspace{0.9cm} x \leftarrow \{0,1\}^n$$

La cifratura in un sistema PKE funziona come segue:
$$ENC(PK, m) = (f_{PK}(r), h(r) \oplus m) \hspace{0.7cm} r \leftarrow \{0,1\}^r$$More over: 1-bit PKE $\Rightarrow$ but PKE

```ad-info
CPA e CCA sono due tipologie di attacchi. Quando parliamo di CPA security e CCA security intendiamo trovare un modo per proteggere questi sistemi crittografici da questi potenziali attacchi.

```


# Hash Functions (Are public, not secret)

![[Cryptography/images/94.png]]

$$H = \{H_5: \{0,1\} \to \{0,1\}^{\lambda}\}_{s \leftarrow \{0,1\}^{\lambda}} \hspace{0.8cm} \text{$H$ is a family of function}$$
## The main Security Property: Collision Resistance
![[Cryptography/images/95.png]]

>Hash functions are more strong than one-way functions.

**Question**: "Why is there a seed? Can't we have a single hash function that is collision resistance?"
If we fix hash function (only one) $\Rightarrow$ there are still collisions. We can't because once we fix $H$, there exist $x, x'$ that are a collision and the following $A_{x, x'}$ breaks collision resistance in polynomial time.
$$A_{x, x'}: \text{Output}_{x, x'}$$
### Plural paradigm for constructing hash functions
- Design comparison function say:
	$h_s : \{0,1\}^{2 \lambda} \to \{0,1\}^{\lambda}$
	Or even $\{0,1\}^{\lambda+1} \to \{0,1\}^{\lambda}$
- Then amplify this domain $\{0,1\}$
	Real world constructions faithfully follow step 2, but heuristically implement step 1

Let's start with step 2. It comes from a result by Merkle and Dongard around 1980.

==MD (Merkle-Dongard)==
![[Cryptography/images/97.png]]

```ad-info
title: Funzionamento
1. Il messaggio di input viene diviso in blocchi di uguale lunghezza 
2. Ogni blocco viene processato sequenzialmente attraverso una funzione di compressione
3. il risultato di ogni passaggio $(y_1, \cdots, y_n)$ diventa l'input per il passaggio successivo

**Processo di Compressione**
1. La funzione prende due input: il blocco del messaggio corrente e il risultato del passaggio precedente
2. Il primo passaggio utilizza un valore iniziale predefinito (spesso chiamato IV o vettore di inizializzazione)
3. Ogni passaggio produce un output più corto dell'input totale, da qui il termine "compressione"

Il risultato finale è una funzione hash che comprime l'input in un output più piccolo!

```

==Merkle Tree==
![[Cryptography/images/98.png]]

```ad-info
title: Funzionamento
1. I dati di input vengono posizionati nelle foglie dell'albero (i nodi più in basso)
2. L'albero è binario, significa che ogni nodo interno ha esattamente due figli
3. La compressione avviene risalendo dai nodi foglia fino alla radice.

**Processo di Hash**
1. Partendo dalle foglie, ogni coppia di nodi viene combinata attraverso una funzione hash
2. Il risultato forma un nuovo nodo nel livello superiore
3. Questo processo continua fino a raggiungere un singolo nodo radice (indicato con y)
```

CRH = Collision Resistence

```ad-abstract
title: Theorem
The MD construction gives a CRH $H$ from $l^1(\lambda)$ into $n(\lambda)$ assuming $H'$ is a CRH from $l(\lambda)=n+1$ into $n(\lambda)$ bits.

```

>Il teorema afferma qualcosa di molto importante: se prendiamo una funzione di compressione $H$ che è resistente alle collisioni (CRH) su input di lunghezza $l(λ) = n + 1$ bit e output di $n(λ)$ bit, la costruzione MD ci permetterà di creare una funzione hash $H'$ che è resistente alle collisioni su input di lunghezza $l(λ)$ qualsiasi.

**Proof**
We assume FIL $l'(\lambda)$ for now. Say $\exists$ PPT $A$' finding a collision:
$$x = (b_1, \cdots, b_{l'}) \not = (b'_1, \cdots, b'_{l'}) = x' \hspace{0.5cm} \text{such that} \hspace{0.5cm} h'_s(x) = h'_s(x') \hspace{0.5cm} \text{where $h'_s(\cdot)$ is the MD costruction using $h_s(\cdot)$}$$

![[Cryptography/images/99.png]]
>Due sequenze di input diverse (rappresentate nelle due linee dell'illustrazione) che attraverso la costruzione MD producono lo stesso output finale y. Questo è ciò che chiamiamo una collisione.


```ad-info
Abbiamo trovato una collisione tra queste due hash function. Come possiamo fare? 
Idea! Torniamo indietro e cerchiamo di vedere dove si è verificata tale collisione.

```

==Running backwords ==
Prendiamo $j$ come l'indice più grande dove troviamo una differenza tra le due sequenze, ovvero dove abbiamo:
$$(b_j, y_{j-1})(b'_j, y'_{j-1})$$
Because this is the largest $j$, it must be the case that:
$$h_s(b_j, y_{j-1})=h_s(b'_j, y'_{j-1}) \Rightarrow b_j\mid \mid y_{j-1}, b'_j \mid \mid y'_{j-1} \hspace{0.5cm} \text{are a collision for} \hspace{0.5cm} h_s(\cdot)$$
Abbiamo trovato una collisione nella funzione di compressione $h_s()$. Questo viola direttamente l'assunzione che $H$ sia resistente alle collisioni ($CRH$).

La violazione delle regole di sicurezza delle funzioni di hash (in particolare la resistenza alle collisioni) implica che possiamo costruire un **algoritmo probabilistico in tempo polinomiale (PPT)** che possa rompere la funzione di hash $H$, cioè che possa trovare collisioni in modo efficiente. Questo significa che la funzione di hash non è sicura.

>Cause violated CRH rules.

Questa costruzione non è sicura per input di lunghezza variabile (VIL - Variable Input Length).
In fact, consider $H$ with the property that $h_s(0^{n+1})=0^n$ for every $s$. For every $x = h'_s(0^n \mid \mid x) = h'_s(x)$ 

>Banale concatenazione di $0$ con $x$

>In sostanza, la funzione di hash non è sicura quando la concatenazione di una sequenza di zeri con un messaggio produce lo stesso hash del messaggio da solo, il che è un comportamento **insicuro**.

![[Cryptography/images/96.png]]

The Fix: Make it happen that no "legal" input is a suffix of another "legal input".
	- "Legal": Encode it like this.
- Assume for simplicity $h_s = \{0,1\}^{2n} \to \{0,1\}^n$
- Then if $x = (x_1, \cdots, x_{l'})$ encode $x$ to $x_1, \cdots, x_{l'}, <l'>$
	- $<l'>$ binary encoding of $l'$ using $n$ bits.


```ad-example
Immagina due input diversi:

1. Un messaggio $x = (x_1, x_2, \dots, x_{l'})$
2. Un altro messaggio $y = (x_1, x_2, \dots, x_{l'}, x_{l'+1})$

In un sistema di hashing senza alcuna protezione, se $y$ è semplicemente una versione di $x$ con un elemento aggiuntivo, potrebbe succedere che entrambi producano lo stesso risultato, soprattutto se la funzione di hash non distingue in modo chiaro tra i messaggi di lunghezza simile.

Ad esempio, se la funzione di hash non prende in considerazione la lunghezza dell'input, $y$ potrebbe essere interpretato come una semplice estensione di $x$, e quindi il risultato dell'hash potrebbe essere lo stesso, causando una **collisione**.

==Soluzione==
![[Pasted image 20250109170616.png]]

```

```ad-abstract
title: Theorem
The above stringthening of MD is a CRH for VIL.

```

**Proof**: Let's be $A$ ppt adversary finding a collision $x \not = x'$ such that $h'_s(x)=h'_s(x')$ consider $2$ cases:

1) $\mid x \mid = \mid x' \mid$ The proof is as before.
2) $\mid x \mid \not = \mid x' \mid$ Say $x$ is mode of $l_1$ blocks and $x'$ is mode of $l_2$ blocks.

Then $<l_1> \not = <l_2>$ and we have found a collision in $h_s(\cdot)$. ==(END OF THE PROOF)==

Dopo aver mostrato che $h_s(\cdot)$ è resistente alle collisioni, vediamo come **instanziare** concretamente $h_s(\cdot)$ in due modi principali.

1) ==Practice== using AES
	Un modo semplice e pratico di realizzare una funzione di hash sicura è usare **AES** come funzione di compressione. In particolare, possiamo definire:
	$$H(s, x) = AES(x) \oplus x$$
	 In questo modo, la compressione da $2n$ bit a $n$ bit viene effettuata. Questa soluzione è sicura assumendo che **AES** sia un **cifrario ideale** (un permutazione casuale per ogni chiave scelta), che è una condizione accettata nella crittografia moderna.

2) ==Theory== instantiate $h_s(\cdot)$ from your favorite hard problem (factoring, DL, ...). Let $(G, g, q)$ be a cycling group where DL is hard, but $q$ needs to be prime.
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

```ad-info
title: Spiegazione
Se un avversario riesce a trovare una collisione nella funzione di hash $h_{g_1, g_2}$​​, allora stiamo riducendo il problema della collisione al problema del logaritmo discreto, che è considerato difficile. Quindi, se il logaritmo discreto è difficile, anche la funzione di hash è collision-resistant.

In altre parole, la sicurezza della funzione di hash è garantita dalla difficoltà di risolvere il problema del logaritmo discreto, il che implica che la funzione di hash non dovrebbe avere collisioni in un tempo polinomiale, a meno che non sia possibile risolvere il problema del logaritmo discreto in tempo polinomiale, cosa che è considerata computazionalmente difficile.

```


