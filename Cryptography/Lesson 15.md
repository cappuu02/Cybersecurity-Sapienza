We will cover the  construction used in practice: RSA, signatures, .....
Hardness:
- Number theory (Factoring, discrete log, elliptic curves, ...)
- Lottixes (LWE, SIS)

Modular Arithmetic over $Z_n = \{0,1, \cdots, n-1\}$
Look: $(Z_n, +)$ is a group. Importantly, $\exists$ an inverse:
$$\forall a \in Z_n, \exists b \in Z_n \hspace{0.3cm} \text{such that} \hspace{0.3cm} a+b = 0 \mod n$$
Look at "." instead $\mod n$.

```ad-abstract
title: Lemma
If $gcd(a,n)>1$, then $a$ is not invertible $\mod n$
```

>Se il massimo comune divisore tra $a$ e $n$ è maggiore di $1$ allora $a$ non è invertibile $\mod n$

**Proof**: Assume not: a is invertible, so $\exists b \in Z_n$ such that:
$$a \cdot b \equiv \mod n \hspace{0.3cm} \text{but then:}$$
$$a \cdot b = 1 + qn \hspace{0.3cm} \text{for} \hspace{0.3cm} q > 0$$
Then $gcd(a,n)$ divides $ab-qn$ and this divides $1$, so $gcd(a,b) = 1$. (==end of the proof==)


**Insieme dei valori invertibili modulo $n$**
$$Z_n^* = \{a \in Z_n : \text{a invertible $\mod n$}\} \hspace{0.9cm} gcd(a,n)=1$$
$$\#Z_n^* = \rho(n) \hspace{0.4cm} \text{Funzione di Eulero}; \hspace{0.3cm} e \cdot f \cdot n = p \cdot q \hspace{0.9cm} \rho(n)=(p-1)(q-1)$$
$$Z_p^* = Z_p - \{0\} = \{1, \cdots, p-1\} \hspace{0.5cm} (Z_p^*, \cdot) \hspace{0.5cm} \text{is a group}$$


L'obiettivo è trovare **algoritmi efficienti** per calcolare operazioni in $(Z_n^*, + , \cdot)$, come l'inversione e l'esponenziazione, quando $n$ è grande (ad esempio, $n$ con $2018$ bit). Le operazioni di somma e moltiplicazione sono **triviali** in quanto si basano su operazioni di base sui numeri, ma calcolare l'inverso o l'esponenziazione modulo $n$ richiede algoritmi più avanzati.

Per calcolare l'inverso di un numero $a \mod n$, possiamo utilizzare l'**algoritmo esteso di Euclide**.
```ad-abstract
title: Lemma di Euclide Esteso
Let $a,b$ such that $a \ge b > 0$. Then $gcd(a,b) = gcd(b, a \mod b)$

```

**Proof**:
Because the common divisors between $(a,b)$ are the same as $(b, a \mod b)$, since $a = qb + a \mod b, \hspace{0.4cm} q = \frac{a}{b}$ 

```ad-abstract
title: Theorem
Given $a \ge b > 0$, we can compute $gcd(a,b)$ in poly-time. Also, we can find integers $u,v$ such that $au+bv = gcd(a,b)$

```

```ad-abstract
title: Corollario (deriva dal teorema di euclide)
We can compute the inverse: If $gcd(a,b)=1$:
$\Rightarrow au + bv = 1$
$\Rightarrow au \equiv 1 \mod b$ ($u$ è l'inverso di $a \mod n$ ovvero $a \cdot u \equiv 1 \mod n$) 

```

Proof:
Use the lemma recursively:
$$a = bq_1 + r_1 \hspace{0.5cm} a \le r_1 < b$$
By the lemma: $gcd(a,b) = gcd(b, r_1)$
Keep going: $b = r_1q_2 + r_2 \hspace{0.5cm} 0 \le r_2 < r_1$
$gcd(b, r_1) = gcd(r_1, r_2)$
$\cdots, r++1 = 0 \Rightarrow gcd(a,b) = r_t$

It's polynomial time because $r_{i+2} \le \frac{r_i}{2} \forall i = 0, 1, \cdots, t-2$
Clearly, $r_{i+1} < r_i$. If $r_{i+1} \le \frac{r_1}{2}$ we are done. So assume $r_i > r_{i+1} > \frac{r_1}{2}$
But then:
$$r_{i+2} = r_i \mod r_{i+1} = r_i - q_{i+2}r_{i+1}$$
$$< r_i - r_{i+1}$$
$$< r_i - \frac{r_i}{2} = \frac{r_i}{2}$$
$\#$ of steps: $\equiv 2 \cdot \lambda$ where $\lambda = \mid b \mid$ (End of the proof)

>La **dimostrazione** del calcolo del $\gcd(a, b)$ è basata sul fatto che ad ogni passo dell'algoritmo di Euclide, il resto $r_i$​ diventa sempre più piccolo, riducendo il problema a calcolare il massimo comune divisore su numeri sempre più piccoli. Ogni passo è garantito essere al massimo la metà del passo precedente, il che assicura che l'algoritmo termini in tempo polinomiale.

```ad-example
$a = 14$
$b = 10$
then:
$14 = 10 \cdot +4$ 
$10 = 2 \cdot 4 + 2 \to r_t = 2$
$4 = 2 \cdot 2 +0 \to r_{t+1}=0$
$\Rightarrow gcd(14,10)=2$

To get $u,v$:
$2 = 10 - 2 \cdot 4$
$= 10 -2 \cdot (14-10)$
$= 3 \cdot 10 + (-2) \cdot 14$
$u = -2$ 
$v = 3$

```
### Exponentiation: Square and multiply
L'algoritmo **square-and-multiply** è un metodo efficiente per calcolare l'esponenziale modulo $n$.
Let $b = (b_l, b_{l-1}, \cdots, b_0)$
$$a^b \equiv a^{\sum b_i \cdot 2^i} \mod n$$
$$\equiv \prod a^{b_i \cdot 2^i} \mod n$$
$$\prod_{I:b_i:1} a^{(2^i)} \mod n$$
$$\equiv a^{b_0} \cdot (a^2)^{b_1} \cdot (a^4)^{b_2} \cdot \cdots \cdot (a^{2^l})^{b_l}$$
>Spoiler: RSA encryption will be smith like $c \equiv m^l \mod n$

>Il vantaggio di questo metodo è che possiamo calcolare le potenze di $a$ in modo iterativo, riducendo notevolmente il numero di moltiplicazioni necessarie, specialmente quando l'esponente $b$ è grande.

### RSA and Decryption

Decryption: $c^d \mod n$
Few more things: Prime numbers. How do we generate large primes?

```ad-abstract
title: Theorem
There are infinitely many primes and:
$$\pi(x) = \# \text{primes} \le x^4 \ge \frac{x}{\epsilon \log_2 x} \approx \frac{x}{\log x}$$

```

>Quando si parla di RSA, è essenziale generare numeri primi di grandi dimensioni. Il teorema afferma che esistono infiniti numeri primi, e il numero di primi minori di un dato numero $x$ è approssimato dalla funzione $\pi(x)$, che è il numero di primi minori o uguali a $x$.


Idea: Pick a random $p$ and test if $p$ is prime.

```ad-abstract
title: Theorem
We can test if $p$ is prime in poly-time.
```

$\Rightarrow$  We can sample large primes. Sample, test and if not prime sample again!
$$Pr[x \hspace{0.3cm} \text{prime}: x \in[2^{\lambda}-1]] \ge \frac{\frac{2^{\lambda}-1}{3 \log(2^{\lambda}-1)}}{2^{\lambda}-1}  \approx \frac{1}{3 \lambda}$$
$$Pr[\text{Fail after $t$ steps}] \le (1 - \frac{1}{3 \lambda})^t \hspace{0.5cm} \text{probabilità di fallire dopo $t$ tentativi}$$
- $\lambda$ numero di bit del numero

