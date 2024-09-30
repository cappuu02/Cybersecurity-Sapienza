```ad-summary
title: Thm Equivalent notion of perfect secrecy
i) The above definition (Shannon)
ii) $M$ and $C$ are indipendent 
iii) $\forall m, m' \in M, \forall \tau \in T \to Pr[ENC(k,m) = c] = Pr[ENC(k,m') = c]$

```

>$i$, $ii$, $iii$ are Equivalent Notions of Perfect Secrecy.
>$iii)$ Over the choose of the key, the probability is the same.

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

### $i \to ii$

![[4.jpeg]]
### $ii \to iii$

![[Cryptography/images/1.png]]
### $iii \to i$
![[Cryptography/images/2.png]]

### Apply Bayes (Reverse demonstration)

![[Cryptography/images/3.png]]

## Application: One-time as perfectly secure

- $M = K = \varphi = \{0,1\}^n$
	- message and the key are sequence of bits of length $n$.
- $ENC(k,n) = \varphi = k \oplus m$ 
	- Exclusive or.
- $DEC(k, \varphi) = \varphi \oplus k = k \oplus m \oplus k = m$
	- apply another time the secret key into the cipertext we can obtain the original message.

```ad-abstract
title: Corollary
$\Pi = (ENC, DEC)$ bove as perfectly secret for the reason explained before:
- random key as long as the message.
- independence between message and ciphertext.
- Uniform distribution of the cipertext $(iii)$.

```

### Proof (demonstration)
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

```ad-note
title: Avoid this problem
If the key is used more than one to cifrate a message, a third person can find a relationship between the two messages $m_1$ and $m_2$. If the third person has the information about one of the two messages, can use this relationship to deduce information about the other message.

```

```ad-summary
title: Theorem
In any perfectly Secret SKE $\Pi = (ENC, DEC)$ we have $|K| \ge |M|$ 

```

**Proof (demonstration)**:
Take $M$ to be uniform over $M$.
Take any cipertext $\varphi \in \varphi$ s.t. $Pr[\varphi = \varphi] > 0$.

**Consider**:
$$M' = \{DEC(k, \varphi) : k \in K\}$$
**Assume**:
$|K| < |M|$ we will show perfect secrecy does not hold.

**Observe**:
$$|M'| \le |K| < |M| \hspace{0.5cm} \text{there exists} \hspace{0.5cm} m \in M \not \in M'$$
>Exists in $M$ but not in $M'$

$$Pr[M = m | \varphi = \varphi] = 0 \hspace{0.5cm} \text{$m$ is in $M$ but not in $M'$}$$
$$Pr[M = m] = \frac{1}{|M|}$$
>Too different!

## Perfect Authentication

```ad-abstract
title: Definition
We say tag has $\epsilon$-statistical securicy if $\forall m, m' \in M, \forall \varphi, \varphi' \in \varphi \to Pr[Tag(k, m') = \varphi' | TAG(k, m) = \varphi] \le \epsilon$

```

>Is impossible to get $\epsilon = 0$

- $\epsilon$ quantifies the level of security:
	- A lower $\epsilon$ indicates a higher level of security

Construction based on any pairwise indipendent hash function.

```ad-abstract
title: Definition
$$H = \{ h_k : M \to \varphi\}$$
Is pairwise indipendent if $$\forall m, m' \in M \hspace{0.3cm} \text{then} \hspace{0.3cm} (h_k(M), h_k(m'))$$

```

>A hash function $h_k$​ is said to be **pairwise independent** if for any two distinct messages $m$ and $m′$ in $M$, the outputs of the hash function are statistically independent.