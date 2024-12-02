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




```ad-abstract
title: Conjecture
The factoring problem is a OWF:
$$f(p,q) = p \cdot q = n \hspace{0.5cm} p,q \hspace{0.3cm} \text{primes such that } \hspace{0.3cm} p(\approx (q) \approx \lambda)$$

```

A few more facts about modular arithmetic.

```ad-abstract
title: Theorem
If $H$ is a subgroup of $G$, then $| \mid h \mid | \mid G \mid|$

![[Pasted image 20241202170207.png|300]]

```

```ad-abstract
title: Corollario
For all $a \in Z_n^*$, then:
- $a^{\varphi(n)} \equiv 1 \mod n$ (Euler's Theorem)
- $a^b \equiv a^{b \mod \varphi(n)}$
- If $n=p (prime)$, $a^{p-1} \equiv 1 \mod p$ (Fermat little theorem)
```

Order of a group: For $a \in Z_n$ the order is the minimum i such that $a^i \equiv \mod n \hspace{0.4cm}$ $(Z_n, \cdot)$

**Proof**
If $n=p$ (prime) then $\varphi(n) = p-1$
For every $b, a^b \equiv a^{q \cdot \varphi(n) + b \mod \varphi(n)} \equiv (a^{\varphi(n)})^q \cdot a^{b \mod \varphi(n)} \equiv 1$

The first thing follows by Lagrange $(Z_n^*, \cdot)$ is a group with $\varphi(n)$ elements. take the subgroup $\{a^0 \equiv 1, a, a^2, \cdots, a^{d-1}\}$ has multiplicative order $d$ such that $\varphi(n) = d \cdot k$ (==END OF PROOF==)

We will also focus on n = p (prime). Now $(Z_p^*, +, \cdot)$ is a filed. This is special as $(Z_p^*, \cdot)$ is a cyclic group:
$$\exists g \in Z_p^* \hspace{0.3cm} \text{such that} \hspace{0.3cm} Z_p^* = \{g^0, g^1, g^2, \cdots, g^{p-2}\}$$

```ad-example
$Z_p^*$, the $g=3$ is a generator
$$Z_7^* = \{3^0, 3^1, 3^2, \cdots, 3^5\}$$
But $2$ is not a generator because: $2^3 \equiv 1 \mod n$

```

Good News: We can sample random $p$ along with generator $g$ of $Z_p^*$. How? Basically we quick random $g \in Z_p^*$ and test if $g$ is a generator. What's the hard problem $in Z_p^*$? The discrete log problem: $f_g(x) = g^x \mod p$ is a OWP (conjecture)
- $f_g(x) \to y; x = \log_g y$

Back to 1976: Diffy-Helman introduced public-key crypto. 
![[WhatsApp Image 2024-12-02 at 18.09.51.jpeg]]

What is the security? If Eva can break DL then she can compute $k$!

```ad-abstract
title: Definition (CDH)
The computational DH assumption holds in $Z_p^*$ if:

![[WhatsApp Image 2024-12-02 at 18.09.59.jpeg]]

```



$CDH \Rightarrow DL$, but $DL \Rightarrow CDH$ ?
Much better security: Eva (passive) can't distinguish key from uniform.

```ad-abstract
title: Definition
The decisional DH assumption holds in $(Z_p^*, g, p-1)$ if:
$$(g^x, g^y, g^{xy})\approx_c(g^x, g^y, g^z)$$
for $x,y,z \leftarrow Z_{p-1}$.

```

==Bad news==: DDH false in $Z_p^*$
The reason are the so called quadratic residues $\mod p$:
$$Q_{R_p} = \{y: y = x^2 \mod p\} = \{y : y = g^z \hspace{0.4cm} \text{for ever} \hspace{0.4cm} z\}$$
Test: Check if $y \in Q_{R_p}$ by checking $y^{(p-1)/2} \equiv 1 \mod p$ 
Why? If $y = g^{2z'}$ Then $y^{p-1}/2 \equiv g^{z'(p-1)} \equiv 1 \mod p$
If $y = g^{2z'+1}$ then $y^{p-1}/2 \equiv g^{z'(p-1)} \cdot g^{(p-1)/2} \not = 1 \mod p$

The distinguisher: Given $(X,Y,Z)$ check if $z$ is a square and output $b'=1$ iff it is a square. Now:
- If $Z = g^z$ (Uniform), it is a square w.p. 1/2
- If $Z = g^{xy}$, then $z$ is a square if either of $g^x$ or $g^y$ is a square. So it's a square w.p. $3/4$

==Good News==:
DDH believed to hold in other groups $G$. In general, we'll write $(G, g, q) \leftarrow$ Group gen($\lambda$)
- $q$ is the order
- DDH $\Rightarrow$ CDH $\Rightarrow$ DL
- DL, CDH $\Rightarrow$ DDH???

```ad-example
- $G = Q\mid R_p$ but with $q = \frac{p-1}{2}$ a prime. It is also cyclic $c$ of order $q$.
$Q\mid R_p = \{g^0, g^1, g^2, \cdots, g^{q-1}\}$

- Elliptic curves. Basically this is some curve $y^2 = ax^3 + bx^2 + cx + d \mod p$ where $p$ a prime.

```

Discrete log: Pick random $x \in Z_q$ and output $Q = x \cdot P$. Compute $x$?
Bottom line: DH key exchange is passively secure assuming DDH is hard. What about Active security?

![[WhatsApp Image 2024-12-02 at 18.10.09.jpeg]]

How to fix it? We need authenticated channels. Alice and Bob should be able to use MACs or Digital Signatures.


Plan for next lectures: Build $PKE$ and $DS$ from factoring, DL , CDH , DDH , ...
First , note that these assumptions early imply all the crypto we dad so far.

```ad-example
PRGs from factoring: $n = p \cdot q$
$$s_{i+1} \equiv s^2_i \mod n \hspace{0.5cm} \text{start from} \hspace{0.5cm} s_0 = s$$
output LSB each time. In other words this is Hard-core bit.
```

```ad-example
PRGs from DDH. $(G, p, q)$
$G_g, q(x,y) = (g^x, g^y, g^{xy}) \approx (g^x, g^y, g^z)$
$Z_q^2 \to G^3$ it streches! 
$(Z_q \times Z_q \to G \times G \times G)$
```

I can improve the stretch:
$$G_{g,q}(x, y-1, \cdots, y_l) = (g^x, g^y_1, g^{xy_1}, g^{y_2}, g^{xy_2}, \cdots, g^{y_l}, g^{xy_l})$$
$$Z_q^{l+1} \to G^{2l+1}$$
![[Pasted image 20241202180021.png]]


$$Z_q^{l+1} \to G^{2l +1 }$$
_Exercise_: Prove this is secure from DDH.
PRFs. There is a simple construction of PRFs From DDH.

$$F_{NR} = \{f_{q, g, a^{-1}} \to : \{0,1\}^n \to G\}_{\vec a + Z_q^{n+1}}$$
$$\vec a = (a_0, a_1, \cdots, a_n)$$
$$F_{q,g,a^{-q}}(x_1, \cdots, x_n) = (g^{a_0})^{\prod_{i=1}^n a_i^{x_i}}$$

The security follows the same ideas of the proof PRGs $\Rightarrow$ PRFs (GGM).

```ad-abstract
title: Theorem
If $G$ is a PRG $\Rightarrow$ GGM gives a PRF

```

We can interpretate the NR PRF as GGM with the following PRG:
$$G_{q,g,a}(g^b) = G_0(g^b) \mid \mid G_1(g^b) = (g^b, g^{ab})$$


