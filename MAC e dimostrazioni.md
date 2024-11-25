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

"**Per ogni $b$ la distribuzione di output della PRF è indistinguibile dalla distribuzione di output di una funzione casuale**"

```

Dobbiamo dimostrare che un avversario $A$ non può distinguere tra:
- $G(\lambda, b)$: utilizza la PRF $F_k$
- $H(\lambda, b)$: Utilizza una funzione casuale $R$

**Demonstration of the lemma**:
By reduction to security of PRF. Fix $b$ and assume: $\not \exists$ ppt $A$ such that $$\mid Pr[G(\lambda, b)=1] - Pr[H(\lambda, b)=1]\mid \ge \frac{1}{negl(\lambda)}$$


Build ppt $B$ against $F$:
![[Cryptography/images/76.png]]



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

![[Cryptography/images/82.png]]

$$\forall \hspace{0.1cm} PPT \hspace{0.1cm} \mid Pr[G(\lambda)=1] \le negl(\lambda)$$

Let $H(\lambda)$ be same as $G(\lambda)$ but with random table $R: \{0,1\}^n \to \{0,1\}^n$. So $r = R(n)$ and $A$ wins iff $r^* = R(m^*)$ and $m^*$ fresh.

```ad-abstract
title: Lemma
$$\forall \hspace{0.2cm} \text{PPT} \hspace{0.2cm} A: \mid Pr[G(\lambda)=1] - Pr[H(\lambda)=1]\mid \le negl(\lambda)$$

```

**Demonstration by reduction**:
![[Cryptography/images/81.png]]

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

