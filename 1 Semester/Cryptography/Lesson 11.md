We'll go with **secret-key approach** (as this is what's used in practice).

```ad-abstract
title: Definition (AU)
 A family of hash functions $H$ is deemed $\epsilon- \text{universal}$ if: $$\forall x, x' \in \{0,1\}^N \hspace{0.3cm} \text{such that} \hspace{0.3cm} x \not = x' \Rightarrow Pr[h_s(x)=h_s(x')] \le \epsilon$$

```

>**AU (Almost Universal)**: la probabilità che due messaggi distinti $x \neq x'$ producano lo stesso hash output è molto bassa.

>This is strong: It implies no $t$ can find a collision.

```ad-abstract
title: Theorem
Assuming $F = \{F_k: \{0,1\}^N \to \{0,1\}^n \}_k$ is a PRF, and $H$ is $\epsilon-$AU for $\epsilon = negl(\lambda)$, then:
$$F(H)=\{F_k(h_s(-))\} \hspace{0.9cm} \text{is a PRF Family}$$

```

>Combinare una funziona hash quasi universale con una PRF preserva le proprietà pseudocasuali, creando una nuova famiglia PRF.

```ad-tldr
title: Corollario
Every PRF is a MAC. _(Ogni PRF [funzione pseudocasuale] è anche un MAC [message autentication code])_
But in general: PRF much stronger than MAC.
$F(H)$ is also UF-CMA, MAC for FIL messages of length $N >> n$.

```

**Proof of theorem**:
We need to show that $F_k(h_s(\cdot))$ is $\approx_c$ from $R! : \{0,1\}^N \to \{0,1\}^N$ (random table)
>Bisogna provare che la funzione $F_k(h_s(\cdot))$ è computazionalmente indistinguibile da una tabella random $R$.

Ricordare:
- $R$ è una tabella casuale che mappa stringhe di lunghezza $N$ in stringhe di lunghezza $N$.
- $F_k(h_s(\cdot))$ è una funzione costruita applicando ad un hash un input e poi utilizzando $F_K$ ovvero una PRF.

![[Pasted image 20241201150949.png]]

```ad-summary
title: Lemma
$$H_0(\lambda) \approx_c H_1(\lambda)$$

```

**Proof**: Assume $\not \exists$ PPTA that can:

![[Pasted image 20241224094715.png]]

```ad-abstract
title: Lemma
$H_1(\lambda) \approx_s H_2(\lambda)$ so long as $A$ ask $q = Poly(\lambda)$ queries

```

**Proof**: Define bad event $E$.
$E$ becomes true if $\exists i,j$ such that $i \not = j \to$ $h_s(x_i) = h_s(x_j); x_1, \cdots, x_q$ are the queries.
Now, if $\bar E$ then $H_1(\lambda) \equiv H_2(\lambda)$ because $R(-)$ is computed on distinct values $y_1, y_2, y_3, \cdots, y_q$
$$\Rightarrow SD(H_1(\lambda); H_2(\lambda)) \le Pr[E]$$
We'd like to say:
$$Pr[E] = Pr_s [\exists i,j : i \not = j \hspace{0.3cm}  \text{and} \hspace{0.3cm} h_s(x_i)=h_s(x_j)]$$
$$\le \sum_{i,j} Pr[h_s(x_i)=h_s(x_i)] \le \binom{q}{2} \cdot 2 \le negl(\lambda) \hspace{0.4cm} (i \not = j)$$

**Issue**: $AU$ requires $x_i$ to be independent of $x_j$. Not clear if is for our $E$. Equivalent definition of $E$

![[Cryptography/images/49.png]]

$E'$: sample $s \leftarrow U_y$, check if $\exists i,j; i \not = j$ such that $h_s(x_i) = h_s(x_j)$

Questa dimostrazione spiega perché alcune funzioni hash definite sopra un campo finito $GF(2^n)$ sono _universali perfette_ o estremamente improbabili di generare collisioni:

**1)  Funzione hash come prodotto interno**
![[Pasted image 20241224100014.png]]

![[Pasted image 20241224100007.png]]

**2) Funzione hash basata su valutazione di polinomi**
![[Pasted image 20241224100156.png]]
**3) Efficienza Pratica**

![[Pasted image 20241224100219.png]]

Computational AU: $\forall$ PPT $A$
![[Cryptography/images/50.png|400]]

Use some other PRF invocation $F_s(\cdot)$ to construct $h_s(-)$
$$F_k(h_s(\cdot))$$
==Optimization trick==, Instead of using $k,s$ use just $k$ (or $s$) and do:
$$F_k(0 \mid \mid \cdot) \hspace{0.2cm} \text{for} \hspace{0.2cm} F_k(\cdot)$$
$$F_k(1 \mid\mid \cdot) \hspace{0.2cm} \text{for} \hspace{0.2cm} F_s(\cdot)$$

### CBC-MAC (Cipher Block Chaining MAC)
![[Cryptography/images/51.png]]
$h_s(m_1, \cdots, m_d) = F_s(m_d \oplus F_s(m_{d-1} \oplus \cdots \oplus F_s(m_2 \oplus F_s(m_1)))$

```ad-abstract
title: Theorem
"If $F$ is a Pseudorandom Function (PRF), then the function $h_s(-)$ is computationally Authenticating Unforgeable (AU) $\Rightarrow$ the 'Encrypted' CBC-MAC is given by $F_k(h_s(m))$."

```

>Il calcolo del CBC-MAC garantisce autenticità e integrità del messaggio, basandosi sulle proprietà AU della funzione $h_s(\cdot)$ costruita con $F_k(\cdot)$

```ad-abstract
title: Theorem
In fact, CBC-MAC is UFCMA also for VIL.
XOR MAC: Instead of doing $F(H)$ you do:
$$(r, F_k(r) \oplus h_s(m)) \hspace{0.8cm} \text{for random r}$$

The output generate a tag authentication for the message $m$

```

Actually this construction provides only a MAC (Message Authentication Code), not a PRF (Pseudo-Random Function). This means that it protects integrity, but does not guarantee completely indistinguishable behavior.

**Question**: What function $h$ is AXU (Almost XOR Universal)? 
Una funzione $h_s$ è detta AXU se, per ogni valore  $a \in \{0, 1\}^n$, vale

$$Pr[h_s(m) \oplus h_s(m') = a] \le E$$$$\epsilon-A  \times U$$

==Special Case==: $AU \equiv a = 0^n$ (ossia l'output dello XOR è il vettore nullo)
La probabilità che $h_s(m) = h_s(m')$ (collisione) deve essere al massimo $\epsilon - A \times U$, dove $A$ è la probabilità di attacco e $U$ è la proprietà di universalità della funzione.
  

**==Problema==:**  
Dato un messaggio $M = (r, v)$, un avversario potrebbe generare un altro messaggio $m'$, $r'$ tale che:  $$h_s(m) \oplus a = h_s(m')$$ Questo implica che $(r, v \oplus a)$ può essere un tag valido se la costruzione non è progettata correttamente.  

**==Soluzione==:**  
Definire $h_s$ in modo da essere AXU:  $$h_s(m_1, \dots, m_d) = F_s(m_1 \parallel 1) \oplus F_s(m_2 \parallel 2) \oplus \cdots \oplus F_s(m_d \parallel d)$$  Dove:  
- Ogni blocco $m_i$ è concatenato con il suo indice $(1, 2, \dots, d)$ prima di applicare $F_s$.  

```ad-abstract
title: Theorem
Assuming $F$ a PRF, the above $H$ is AXU

```

For $VIL$:
- E-CBC-MAC
- XOR MAC
