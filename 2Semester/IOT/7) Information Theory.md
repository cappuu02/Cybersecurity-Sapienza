```ad-abstract
title: Definition
Let $x,y \in \{0,1\}^n$: the hamming distance between $x$ and $y$ is:
$$d_H:\{0,1\}^n \times \{0,1\} \to \mathbb{N}$$
$$d_h(X,Y) = \sum_{i=1}^n \mid x_i - y_i \mid = \mid \{i = 1, \cdots, n : x_i \not = y_i\}\mid$$

```

Entropy is a core concept of information theory.
Consider two events:
- Tonight the moon is full
- Tonight the Halleys's comet will be visible in Rome.

The first event occurs every 28 days, whereas the second occurs every 76 years (approx.)
Which of the two events makes s more surprised? Of course the second one.
The entropy is a measure of this surprise. Similarly to the concept of entropy in Physics, it is a measure of how chaotic and unpredictable an event is.

```ad-abstract
title: Definition
Let $t \in (0,1)$. The binary entropy of $t$ is:
$$h(t) = t \cdot \ln_2(\frac{1}{t}) + (1-t) \cdot \ln_2(\frac{1}{1-t})$$

```

The graph of the binary entropy is the following:
![[1a.png]]

```ad-abstract
title: Definition
Let $X$ be a random variable (R.V.) whose values are $\chi = \{x_1, ..., x_n\}$ and $p_i = \mathbb{P}[x = X_i], \forall i = 1, ...,n : (p_1,...,p_n)$ is a probability distribution $(\sum p_i = 1, p_i \ge 0)$.
Then, the entropy of $x$ is $H(X)=-\sum_{i=1}^n p_i \ln(p_i)$


```

Notice that $$-\sum_{i=1}^n p_i \ln(p_i) = \sum_{i=1}^n p_i \ln(\frac{1}{p_i}) \hspace{0.5cm} \text{Property of Logarithms}$$

The entropy of a random variable following a probability distribution $P$ is equal to the entropy of $P$.

```ad-abstract
title: Definition
Similarly, we can define the joint entropy of two, or more, random variables $x \in \chi, y \in \Upsilon:$
$$H(x,y):= H((x^y)) = \sum_{(x,y)\in \chi \times \Upsilon} \mathbb{P}[X=x, Y=y] \cdot \lg(\frac{1}{\mathbb{P}[X=x, Y=x]})$$

```

>With the first `:=` we are saying that the entropy of $x$ and $y$ is defined as the entropy of the couple $(x,y)$

```ad-abstract
title: Definition
The infrmation Content r Surprisal of an event $E$ is a function that grows with the of the event and is defined as: 
$$I[E] = - \lg_2 \mathbb{P}[E] = \lg_2(\frac{1}{\mathbb{P}[E]})$$

```

Hence, entropy measures the expected amount of information converged by all possible events of a distributions.

```ad-example
![[1b.png]]
![[2b.png]]
![[3b.png]]
![[4b.png]]


```

# Binary Encoding
Let $\chi, \mid \chi \mid < \infty$ be an alphabet and let:
- $M = \{\text{words of a language on} \hspace{0.2cm} \chi \}$
- $M^* = \{\text{Sequence of words in M}\}$
$$\mid M \mid < \infty, \hspace{0.5cm} \mid M^* \mid \hspace{0.5cm} M^* = \bigcup_{i=1}^{\infty} M^i \hspace{0.5cm} \text{where} M^i = \{\text{sequences of i words in M}\}$$
We denote a word as $n \in M$, and a sequence of words as $n \in M^*$

```ad-abstract
title: Definition
A variable length bnary encoding is an injective function $f: M \in \{0,1\}^*$ that assigns a binary string to each word in $M$.

```

```ad-abstract
title: Definition
We can extend this definition by juxstaposing several binary encodings and define the extension by concatenation $f^*$ of the variable length binary encoding $f$ as:
$$f^*: M^* \to \{0,1\}^* \hspace{0.5cm} \text{such that} \hspace{0.5cm} f^*(m) = f(m_1), ..., f(m_m) \hspace{0.5cm} \hspace{0.5cm} \hspace{0.5cm} \text{if} \hspace{0.2cm} m=(m_1, ..., m_m)$$

```

Notice that $f^*$ can be non-injective. For example, let:
$$f(m_1)=0 \hspace{0.5cm} f(m_2)=1 \hspace{0.5cm} f(m_3)=01$$
$$\text{Then:} \hspace{0.5cm} f^*(m = (m_1, m_2)) = 01 = f^*(m=m_3)$$

```ad-abstract
title: Definition
A variable-length inary econding $f:M\to\{0,1\}^*$ is PREFIX-FREE if $\forall m,m' \in M, m\not = m'$, it holds that:
$$ f(m) \cancel{\prec} f(m') $$
where $x \cancel{\prec} y$ means "$x$ is a prefix of $y$" if:
- $x=y$
- $\exists z \in \{0,1\}^*$ such that $y=xz$
```

```ad-example
$x=00$ is a prefix f $y=0001$ $(z = 01)$ but it is not a prefix of $y=0110$

```

```ad-abstract
title: Definition
A binary encoding $f$ is uniquely decodable if its extension by concatenation $f^*$ is injective.

```

**Observation**: 
$$\text{Prefix-Free} \Rightarrow  \text{U.D easy}$$
$$M=\{m_1, m_2\}, f(m_1)=0, f(m_2)=01$$
$$f^* \hspace{0.5cm} \text{is injective, but} \hspace{0.5cm} f(m_1) \text{is a prefix of} \hspace{0.5cm} f(m_2)$$
>Being PREFIX-FREE is a stronger condition than uniquely-decodability

**Why do we like it when $f^*$ is injective?**
Let $f$ be the following encoding:
$$f(m_1)=00 \hspace{0.5cm} f(m_2)=01 \hspace{0.5cm} f(m_3)=000 \hspace{0.5cm} f(m_4) = 1$$
Notice that $f$ is non U.D., in fact, if $x=(n_1, n_2)$ and $y=(n_3, n_4)$, it holds that:
$$f^*(x)=0001 \hspace{0.5cm} f^*(y)=0001 \hspace{0.5cm}\hspace{0.5cm} \text{i.e} \hspace{0.3cm} f^* \hspace{0.3cm} \text{is not injective}$$
Suppose that a receiver receives the message "$0001$" then, it cannot possibly know whether the transmitter sent $x$ or $y$. This causes ambiguity.

In contrast, if a binary encoding is uniquely decodable we can restrict the codomain $\{0,1\}$ to just $\ln(f)$ such that $f:M \to \ln(f) \subset \{0,1\}^*$ to obtain a surjective, hence bijective function, meaning that $\forall  m \in M, \exists! b \in \ln(f)$ such that $f(m)=b$, hence avoiding ambiguity.

Why do we like it when a code is prefix-free?
In some channels, such as the telephone line, the communication begins as soon as you a valid number.
$$\text{Police Telephone NR: 113}$$
$$Your BF Telehone NR: 1131234$$
Police telephone number is a prefix of your BF telephone number. If you want to call your friend, as soon as you ?? the first $3$ digits, you're get redirected to the police.

```ad-abstract
title: Definition
Let $P$ be any probabilty distribution over $M$, and let $f: M \to \{0,1\}^*$ be a prefix-free binary encoding. 

```

The Average Length of $f$ w.r.t. P is 
$$\sum_{m\in M} P(m)\mid f(m)\mid$$
where \mid f(m) \mid is the length of the string $f(m)$
$(f(m)=t)$ if $f(m) \in \{0,1\}^t$

```ad-abstract
title: Lemma (Kraft's Inequality)
Let $f$ be a prefix-free binary encoding. Then $\sum_{m \in M} 2^{- \mid f(m) \mid} \le 1$

```

$\sum_{m \in M} 2^{- \mid f(m) \mid} \le 1 \hspace{0.8cm} \Rightarrow \hspace{0.8cm}$ What this result tells us is that for a binary encoding to be prefix-free, it must not use very short encodings because they are the prefix of many others ones.


**Proof**
![[5b.png]]
![[6b.png]]
![[7b.png]]

Why do we need this inequality? Because it allows us to prove one of the most powerful result in information theory.

> **Entropy is the limit of lossless compression**

```ad-abstract
title: Theorem
Let $f: M \to \{0,1\}$ be a binary prefix-free encoding. Let $P$ be a distribution on $M$. Then, the average length of an encoding $f$ is lower-bounded by the entropy of $P$:
$$\sum_{m \in M} P(m) \mid f(m) \mid \ge H(P)$$


```

**Proof**
![[8b.png]]
![[9b.png]]

Ok, but we asked for the encoding to be prefix-free, which is a strong assumption. What if we relax this condition and just ask for the encoding to be uniquely decodable? DO we get a better bound? The answer is NO.

```ad-important

Entropy is the minimum number of bits that we can use to transmit a message without missing the meaning of the message, without loosing some information.
```

We can compress more, but we are gonna loose information (e.g. JPEG images)

```ad-abstract
title: Corollary
Id $P \sim \frac{1}{2^{\mid f(n) \mid}}$ (uniform distribution) $\Rightarrow \sum_{m \in M} P(m) \mid f(m) \mid = H(P)$

```

```ad-example
![[1c.png]]
![[2c.png]]
![[3c.png]]
![[4c.png]]
![[5c.png]]
![[6c.png]]
![[7c.png]]
![[8c.png]]
```


----
----
----

```ad-abstract
title: Definition
Let $X, Y$ be random variable the mutual information of $x$ and $y$ is defines as: $I(X,Y)= H(Y) - H(Y \mid X)$. $H(Y \mid X)$ is the conditional entropy of $y$ given $x$:
$$H(Y \mid X) = \sum_{x \in \chi}\mathbb{P}[X=x] \cdot H(Y \mid X=x) = \sum_{x \in \chi}[\mathbb{P}[X=X]\sum_{y \in Y}\mathbb{P}[Y=y \mid X=x]lg( \frac{1}{\mathbb{P}[Y=y \mid X=x]})]$$

```

The mutual information is:
- symmetric
- A measure of correlation between $X$ and $Y$
- Always $\ge 0$

The higher the mutual information, the more $x$ and $y$ provide information about each other.
The N.I. between $X$ and $Y$ is minimal $(=0)$ when $X$ and $Y$ are independent (since $H(y \mid X) = H(Y))$

We have seen that we cannot compress messages more than their entropy. Nevertheless, in real life, we hardly reach entropy when we communicate. This happens because the communication channel is noisy, and having some redundancy guarantees more robust communication. 

On other hand, we want to transmit the least number of bits, meaning that we want to compress the information as much as possible (occupying the channel costs, faster communication). At the same time, we want the communication to be reliable, which can be achieved if we add some redundancy in the encoding.

The channel allows the communication but at the same time it introduces noise. Shannon formulated a mathematical model to decode the source of a message while limiting communication errors.

# Discrete Memoryless channels (DMC)
High level interpretation: the sender send sequence of symbols of a finite aplhabet $\chi$, $\mid \chi \mid < \infty$.
The receiver receives a sequence of symbols, possibly from a different finite alphabet $\Upsilon$, $\mid \Upsilon \mid < \infty$ 
Since the channel is noisy, some symbols can be altered and the receiver receives a different sequence.

## Model
Let $x=x_1, ..., x_n$ be the message set by the transmitter. In the channel there are $\chi$ dices, one per symbol. Each dice has $\mid \Upsilon \mid$ sides, each with different probabilities. The probabilities are:
$$W(y \mid x) = \mathbb{P}[\text{receive} \hspace{0.2cm} y \mid \text{sent} \hspace{0.2cm} x]$$
The probabilities of each symbol in $\chi$ and of each transmission are independent of one another, meaning that: 
$$W^n(y \mid x) = \prod_{i=1}^n W(y_i \mid x_i)$$
We can define a stochastic matrix $W(y \mid x$) as:
$$
W(y \mid x) = 
\begin{pmatrix} 
w(y_1 \mid x_1) & \cdots & w(y_{|\Upsilon|} \mid x_1) \\ 
\vdots & \ddots & \vdots \\ 
w(y_1 \mid x_{|\chi|}) & \cdots & w(y_{|\Upsilon|} \mid x_{|\chi|}) 
\end{pmatrix}
$$

```ad-abstract
title: Definition
A DMC is a channel compose of an input alphabet $\chi$, an output alphabet $\Upsilon$, $\mid \chi \mid, \mid \Upsilon \mid < \infty$ and a transition stochastic matrix $W(y \mid x)$ as the one in $[3]$ that satisfies $[2]$.

```

```ad-abstract
title: Definition
An Encoder $C^n \subseteq \chi^n$ is a set of distinct sequences of length $n$ that the transmitter can communicate through a channel. It maps messages to "codewords". $\mid C^n \mid = \#$ of different messages that can be transmitted through the channel.
```

```ad-abstract
title: Definition
A decoder $y_n: y^n \to C^n$ is a function that associates received messages of length $n$ to sequences of $C^n$.

```

To be good, the communication must be such that the probabilities that a received message $y$ is associated to the correct message $x$ is high. At the same time, we want to compress the information as much as possible so that we can send more information. We want to maximize
$$\sum_{y \in f_n^{-1}(x)} w^n(y \mid x) (= \text{probability of receiving the correct messages} \hspace{0.2cm} \text{and} \mid C^n \mid )$$

The problem is that these two quantities have inverse trends!
If each sent symbol carries a lot of information (expressed in bits) meaning that the information is strongly compressed, then an error occuring on the channel can cause the misunderstanding of the message.

Shannon's theorem, stated later, establishes the relationship between how much data can be sent on a MDC with am almost-zero error probability.

```ad-success
title: Goal
The goal: Maximise the speed of the transmission (i.e. the size of $C^n$ that can be transmitted in a unit of time) while keeping very low errors.

How can we do it? We cannot change $w$, that is an intrinsic characteristics of the channel. The only element that we can tune is $C^n$ through $P(x)$.


```


```ad-abstract
title: Definition
The transmission rate of an encoder $C^n$ is the numer of bits per transmission.
$$\frac{1}{n} \lg_2 \mid C^n \mid \to \text{it is the number of bits carried by a symbol}$$

AN error occurs when the transmitter sends a sequence $x$, and the receiver receives a sequence $y$ such that $\rho(y) \not = x$, or, equivalently, if $y \not = ????$

```

```ad-example
![[Pasted image 20250402170005.png]]
![[11a.png]]

```



```ad-abstract
title: Definition
The error proability for $C^n$ and $\rho^n$ is:
$$W^n(\overline{\varphi_n^{-1}}  \mid x) = 1 - w^n(\varphi_n(x) \mid x)$$

where $\overline{\varphi_n^{-1}}$ means: 
$$???$$
```

??????????


```ad-abstract
title: Definition
The masimum error probability is:
$$e_n(W^n, C^n, \varphi^n) = max_{x \in \varphi^n} W^n(\overline{\varphi^{-1}_n (x)} \mid x)$$

```

```ad-abstract
title: Definition
$R \in \mathbb{N}$ is an ==Achievable transmission rate== for the DMC $(W^n, \chi, \Upsilon)$ if $\exists$ sequence $\{C^n, \varphi^n\}_{n \in \mathbb{N}}$ such that 
$$e_n(w^n. C^n, \varphi^n) \to 0 \hspace{0.9cm} \overline{\lim_{n \to \infty}} \frac{1}{n} \lg \mid C^n \mid \ge R$$

```

An Achievable transmission rate is the number of bits that can be transmitted in a channel with an error that goes to zero.

**Observation**: All achievable rates are finite, $R < \infty$. This means that $\exists$ maximum achievable rate.

```ad-abstract
title: Definition
The capacity of a DMC $W$ is the maximum achievable rate:
$$C(W) = max_{R}\{R:R \hspace{0.3cm} \text{is an achievable rate}\}$$

```

So basically, the capacity of a channel is the maximum achievable rate (number of bits) that can be transmitted with an error probability that goes to zero. It is the maximum reliable transmission rate.

![[12a.png]]

```ad-abstract
title: Definition
The Shannon's capacity of a channel $W$ is:
$$C^*(W) = max_{(x,y) \sim W(y \mid x)} I(X, Y)$$
That is, the maximal mutual information between sent messages and received messages.

$$\text{SHANNON'S CAPACITY THEOREM:} \hspace{0.3cm} C(W) = C^*(W)$$

```

This result is very powerful. It says that the capacity of a channel depends on how much information can be transmitted reliably over a noisy channel. The model that we have seen ?? the communication process into two tasks:
- Source coding (data compression) $\to$ reduce numbers of bits to represent data
- Channel coding (error correction) $\to$ add redundancy to make transmission reliable

# Continuous channels
We've spoken about discrete channels.
In IOT, we usually deal with continuous, wireless channels  

>The Shannon Capacity Theorem has an alternative formulation in this case.  

We consider a channel with Gaussian noise and a given bandwidth $B$. The noise is independent of the signal.  

- Gaussian noise: we will see that channels are subject to additive interference (spoiler: wireless communication happens through electromagnetic waves) that result in adding noise to the signal. Such noise usually follows a Gaussian low normal distribution which has probability density function  
$$\varphi(z) = \frac{e^{-\frac{(z - \mu)^{2}}{2\sigma^{2}}}}{\sigma\sqrt{2\pi}}$$  
where $z$ is the noise value, $\mu$ is the mean and $\sigma$ is the standard deviation.  
If $x$ is the input signal and $y$ is the output signal, then we have:  
$$y = x + z, \hspace{0.9cm} z \sim N(0, \sigma)$$
We need to find:
$$C^{*}(W) = \max_{(y, x): P_{y \mid x} = W} I(x, y)$$
$$I(X, y) = H(y) - H(y|x)$$
$$H(Y|X) = H(X + Z | X) \quad \text{but since } X \perp Z, H(X + Z | X) = H(Z)$$
Hence 
$$I(X,Y) = H(Y) - H(Z)$$
What is the $P_{y \mid x}$ such that $I(X, Y)$ is maximal?



When also $X \sim N(O, \sigma_x)!$ **(Proof omitted)**

There is a Theorem in probability that says that if $X,Z$ are normally distributed R.V. and are independent, and have variance $\sigma_x^2$  and $\sigma_z^2$ respectively, then: X+Z is also normally distributed and its variance is $\sigma_{x+z}^2 = \sigma_x^2 + \sigma_z^2$

The problem is that we have always spoken about discrete random variables, and we have defined entropy for discrete probability distributions.

Good news is that we can define entropy for continuos R.V. too! $[\text{Differential Entropy]}$

Without digging into details, the entropy for a normally-distributed R.V. with variance $\sigma$ is $\frac{1}{2} \lg(2 \pi e \sigma^2)$ $[\text{eulero constant}]$

So:$$C^*(W) = \frac{1}{2} \log \left( 2\pi e \sigma_Y^2 \right) - \frac{1}{2} \log \left( 2\pi e \sigma_Z^2 \right) =
$$$$= \frac{1}{2} \log \left( \frac{2\pi e \sigma_Y^2}{2\pi e \sigma_Z^2} \right) = \frac{1}{2} \log \left( \frac{\sigma_Y^2}{\sigma_Z^2} \right) = \frac{1}{2} \log \left( \frac{\sigma_X^2 + \sigma_Z^2}{\sigma_Z^2} \right) =$$
$$= \frac{1}{2} \log \left( 1 + \frac{\sigma_X^2}{\sigma_Z^2} \right) = \begin{cases} \text{The variance of a sgnal s equal}\\
\text{to its power. The quantity} \frac{\sigma^2_x}{\sigma^2_z} \text{is} \\ \text{the signal (SNR) to noise ration} \end{cases}$$
$$= \frac{1}{2} \log \left( 1 + \text{SNR} \right)$$

So far, we have considered only the transmission of one signal $x$. But we can send a sequence of signals. How long the sequence of signals can be is determined by the bandwidth of the channel, $B$. Hence we get the:
$$\text{SHANNON-HARTLEY THEOREM} = C^*(W) = B \lg(1+SNR)$$

(Follows from the NYQUIST-SHANNON theorem. We have mentioned it in out $4^{th}$ lecture-embedded systems)


