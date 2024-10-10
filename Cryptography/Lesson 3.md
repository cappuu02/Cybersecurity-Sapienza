**Some Exercise**
![[Cryptography/images/8.png]]

----

```ad-abstract
title: Theorem
Let $H$ be pairwise indipendent, then $Tag(k,m) = h_k(m)$ is $\epsilon-Statistical$ secure for $\epsilon = \frac{1}{|\tau|}$

```

- Tag(k,m) =  authentication value for a $m$ message using a $k$ key
- $\epsilon = \frac{1}{|\tau|}$ This implies that an attacker's probability of correctly guessing a tag is inversely proportional to the number of possible tags, meaning that the larger the set of tags, the more difficult it is for the attacker to guess.

**Proof**:
Proof on the one hand (one single message): 
$$\forall m, \forall \tau \to Pr[Tag(k,m) = \tau] = Pr[h(k,m) = \tau] = \frac{1}{|\tau|}$$
>The probability to obtain a specific $\tau$ tag for a message $m$ is $\frac{1}{|\tau|}$, thanks to the pairwise indipendent property of hash function that ensure: "all messages has equal probability to being mapped with each cipertext"

On the other hand (with two messages):
$$\forall m, m', \forall \tau, \tau', m \not = m' \to Pr[Tag(k,m) = \tau \wedge Tag(k, m') = \tau'] = \frac{1}{|\tau|^2}$$
>Rightly increases the size of the set of ciphertexts from which to guess

$$\Rightarrow Pr[h(k,m') = \tau' | h(k,m) = \tau] = \frac{\frac{1}{|\tau|^2}}{\frac{1}{|\tau|}} = \frac{1}{|\tau|}$$
Construction: Let $p$ be prime. Define:
$$\tau = h_{c,b}(x) = ax + b \hspace{0.2cm} \text{mod} \hspace{0.2cm} p$$
$$(a,b) \in Z_p \times Z_p \hspace{0.2cm} \text{with} \hspace{0.2cm} x, \tau \in Z_p \hspace{0.2cm} \text{and} \hspace{0.2cm} (a,b) \in Z_p \times Z_p$$

```ad-success
title: Sintesi ITA
Il teorema dimostra che l'uso di una funzione hash pairwise indipendente per generare tag di autenticazione offre un certo livello di sicurezza statistica. Con un valore di $\epsilon$ che diminuisce all'aumentare del numero di possibili tag, l'attaccante ha una probabilità limitata di indovinare correttamente i tag associati a messaggi distinti. Questo rende la costruzione di autenticazione più robusta contro tentativi di falsificazione.

```

```ad-abstract
title: Lemma
The above $H$ is pairwise indipendend. So we get $\epsilon = \frac{1}{p}-statistical$ secure MAC. 

```

_Proof_: Fix $m, m' \in Z_p$ and $\tau, \tau' \in Z_p, m \not = m'$

$$Pr_{a,b}[h_{a,b}(m) = \tau \wedge h_{a,b}(m') = \tau']$$
$$= Pr_{a,b}[\begin{pmatrix}  m & 1 \\ m' & 1 \\  \end{pmatrix} \cdot \begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} \tau \\ \tau' \end{pmatrix} \hspace{0.2cm} \text{mod} \hspace{0.2cm} p]$$
$$= Pr_{a,b}[\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix}  m & 1 \\ m' & 1 \\  \end{pmatrix}^{-1} \cdot \begin{pmatrix} \tau \\ \tau' \end{pmatrix} \hspace{0.2cm} \text{mod} \hspace{0.2cm} p]$$
$$= Pr_{a,b} [\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} c \\ d \end{pmatrix}] = \frac{1}{p^2}$$
>$c$ and $d$ are fixed.
>Function of $m, m', \tau, \tau'$

We have a $2^{- \lambda}$ - statistical secure MAC by choosing any $\lambda-$but prime $p$

>The lemma confirm that using hash function we can reach an high and strong level of statistical security for MAC (**Message Authentication Code**)
# Randomness Extraction
Randomness is crucial for cryptographic. For one, we need random keys but also, we'll see that even the algorithms need to be randomness. Randomness come from nature (studied by sciences). Randomness in nature is imperfect, while it can be "purified" at's very expensive. 

## Randomness extraction
How to extract uniform randomness as imperfect random source.

```ad-example
The goal is to design some function "EXT" (Extraction) that tells some $x$ (not uniform) and outputs something uniform. Suppose you have a **biased coin** (_moneta con due facce_):
$$Pr[B = 0] = p \le \frac{1}{2}$$
How to extract uniform randomness?

- Sample $b_1, b_2$

![[15.png|400]]

So: $$Pr[\text{Ext outputs} \hspace{0.2cm}  0] = Pr[\text{Ext outputs} \hspace{0.2cm}  1] = P(1-p)$$
$$Pr[\text{No output after k trials}] \hspace{0.5cm} \text{trial is small} \hspace{0.5cm} $$

> The probability of getting no output after 𝑘 trials is low when 𝑘 is sufficiently large, ensuring that randomness extraction continues until an output is obtained.


```

```ad-question
In general can we design a "good" EXT for any $x$?
No, because EXT is deterministic and $X$ could be completely predictable $\to$ $x$ needs to be unpredictable.

```

```ad-abstract
title: Def. Min-Entropy
The Min-Entropy represent tha max probability to predict an $x$ value by an attacker. The higher the Min-Entropy, the more difficult it is for the attacker to correctly predict the value.

The Min-Entropy of $x$ is: $$H_{\infty}(x) = - \log_x \text{max} \hspace{0.1cm} Pr[X = x]$$

- $\text{max} \hspace{0.1cm} Pr[X = x] \Rightarrow$ highest probability with which an attacker could correctly guess the value of  𝑋
- $\log_2 x \Rightarrow$ the use of the logarithm allows the Min-Entropy to be expressed in terms of bits.
- Since the maximum probability is always between 0 and 1, the logarithm of a fractional number (0 < x < 1) is negative, so the negative sign makes the result positive.

```

_Intuition_: The best probability to predict $x$ by unbounded adv.

```ad-example
title: Example 1
$$\text{Let} \hspace{0.3cm} X \equiv \cup_n (\text{Uniform over} \hspace{0.3cm} \{0,1\}^n) \hspace{0.5cm} H_{\infty}(\cup_n) = n$$


```

```ad-example
title: Example 2
$$Let X \equiv 0^n (\text{costant}) \hspace{0.5cm} {H_{\infty}(X)} \hspace{0.5cm} \text{because the max probability is $1$}$$

```


For real-world phenomenal, we can get lower bound $H_\infty \ge K \hspace{0.3cm} (k < x)$
- $K$ is the lower bound. The uncertainty associated with $X$ will never fall below a certain threshold.

**THE NEW GOAL** 
Design EXT that extracts from any x s.t. $H_\infty(X) \ge k$

```ad-abstract
title: Theorem
This is impossible even if $x = n-1$ and $EXT: \{0,1\}^n \to \{0,1\}$

If $x$ has a minimum entropy equal to $n-1$ EXT fails. This is because there will always be a part of x that is too predictable to produce a complete random output.


```

**Proof Introduction** 
For every $EXT: \{0,1\}^n \to \{0,1\}$ there exists some $x$ s.t. $H_\infty(X) = n-1$ but EXT fails as such $X$.

Let $b \in \{0,1\}$ be the value that maximizes $|EXT^{-1}(b)|$ 

![[Cryptography/images/6.png]]

>se osserviamo quanti valori  $x$ corrispondono ad un'uscita $b$, scopriremo che in certi casi esistono molti valori di $x$ che si comportano "in modo simile", riducendo la casualità. Questo significa che non possiamo estrarre casualità uniforme da tutti i possibili $x$.

Since EXT fails when the entropy of  x is too low, we need to change the model:
1) Assume Indipendent $x_1, x_2$ s.t. $H_\infty(x_1), H_\infty(x_2) \ge k$ (more randomness between the inputs)
2) Assume the EXT is seeded (extractor take two input):
	$EXT(S,X)$
	$S \in \{0,1\}^d$
	$X \in \{0,1\}^n$
	This seed is uniform, but public.

This model is called "==SEED EXTRACTOR=="

```ad-abstract
title: Definition
$EXT: \{0,1\}^d \times EXT\{0,1\}^n \to \{0,1\}^l$
- public and random seed $S \in \{0,1\}^d$ (length = d bits)
- $X \in \{0,1\}^n$ the value from which we want to extract randomness

Is a $(K,E)$-seeded extractir if $\forall x \in \{0,1\}^n$ s.t. $H_\infty(X) \ge k.$ That is, if he succeeds in extracting uniform randomness.

```

```ad-important
The seed does not have to be secret. Even if an opponent knows the seed, he should not be able to predict the output of EXT.

```

$$EXT(S,X) \equiv_{\epsilon} U_l \hspace{0.5cm} \text{Where $U_l$ is uniform; $S \equiv U_d$} \hspace{0.3cm} \text{is uniform}$$
```ad-note
title: Spiegazione
- Questo significa che l'estrattore $EXT(S,X)$, quando applicato su un valore $X$ e un seme $S$, genera un output che è "quasi indistinguibile" (entro una tolleranza ϵ\epsilonϵ) da una distribuzione uniforme $U_l$​, che è una distribuzione uniforme su $l$ bit. In altre parole, l'output $EXT(S,X)$ sembra casuale (uniforme) anche se $X$ non è perfettamente casuale.
- $S \equiv U_d$ indica che il seme $S$ è estratto da una distribuzione uniforme su $d$ bit.

```

The statistical distance between two distributions $X$ and $Y$ measures how “different” or distinguishable these two distributions are.

$$SD(X;Y) = \frac{1}{2} \sum_z | Pr[X=z] - Pr[y=z] \hspace{0.5cm} \text{SD = Statistical Distance}$$
_Equivalent:_ An unbound ADV can-t distinguish a sample $z \leftarrow x$ from $z \leftarrow y$ with $f$ better than  $\epsilon$

```ad-success
title: Spiegazione ITA
La formula della distanza statistica si calcola sommando la differenza assoluta tra le probabilità che $X$ e $Y$ assumano lo stesso valore $z$, su tutti i possibili valori $z$, e poi dividendo per $2$.

```



