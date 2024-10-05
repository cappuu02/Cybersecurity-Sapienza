```ad-abstract
title: Theorem
Let $H = \{h_{\epsilon}: \{0,1\}^k \to \{0,1\}^l\}$ where $s \in \{0,1\}^d$ be a formaly of pairwise indipendend hash functions. Then, $EXT(s,x) = h_s(x) = h(s,x)$ is a $(k, \epsilon)$-extractor for $k \ge l + 2 \log(\frac{1}{\epsilon}) - 2$
```

```ad-summary
title: Lemma
Let $y$ be a RV over $y$ s.t. $COL(y) = Pr[y = y'] = \sum_{y \in Y} Pr[y = Y]^2 = \frac{1}{|y|} \cdot (1+4\epsilon^2)$ then, $SD(Y;U) \le \epsilon$

```

Example: 
$$Col(U_n) = \sum_{u \in |0,1|^n} Pr[U_n = n]^2 = 2^n - 2^{-2n} = 2^{-n}$$

First: we use the lemma to prove the theorem
Proof (of theorem): set $y = (S,h(S,X))$
$$U \equiv U_{d+l} \equiv (S,U_l), y = \{0,1\}^{d+l}$$
$$COL(y) = Pr[y = y'] = Pr[S=S' \wedge h(S,X) = h(S', X')]$$
$$= Pr[S = S' \wedge h(S,X) = H(S,X')]$$
$$Pr[S=S'] \cdot Pr[h(S,X) = h(S, X')]$$
$$= 2^{-D} \cdot Pr[h(S,X) = h(S,X')]$$
$$= 2^{-d} \cdot (Pr[X = X'] \cdot Pr[h(S,X) = h(S,X') | X=X']) + Pr[X \not = X'] \cdot Pr[h(S,X) = h(S,X') | X \not = X'])$$

This because: 
$$Pr[A] = Pr[A \wedge B] + Pr[A \wedge B]$$
$$= Pr[B] \cdot Pr[A|B] + Pr[\overline B] \cdot Pr[A|\overline B]$$

$$= 2^{-d} (COL(x) + Pr[h(S,X) = h(S,X') \wedge X =X'])$$
$$= 2^{-d}(2^{-k} + 2^{-l})$$
$$= \frac{1}{2^{d+l}} \cdot (2^{l-k} + 1) = \frac{1}{|y|} \cdot (2^{2-2 \log(\frac{1}{\epsilon})} + 1)$$
$$= \frac{1}{|y|} \cdot (1 + 4 \epsilon^{2}) \hspace{0.3cm} \text{Fine dimostrazione}$$
$$IF \hspace{0.3cm} H_{\infty} (X) \ge K; COL(X) \le 2^{-k}$$

## Proof of the Lemma
By definition
$$SD(Y, U) = \frac{1}{2} \sum_{y \in Y} | PR[Y=y] - \frac{1}{|y|}| = \frac{1}{2} \sum_{y \in Y} q_y \cdot S_y$$
$$q_y = (Pr[Y = y] - \frac{1}{|y|})$$
$$s_y = \left\{\begin{align} 1 \hspace{0.2cm} \text{If} \hspace{0.2cm} q_y > 0\\ 0 \hspace{0.2cm} \text{Otws} \end{align}\right. \hspace{0.3cm} = \frac{1}{2} < \vec q, \vec s >$$
$$\le \frac{1}{2} \sqrt < \vec q, \vec q > \cdot < \vec s, \vec s >$$
$$= \frac{1}{2} \sqrt \sum_{y \in Y} q^2_y \cdot |y|$$
$$\vec s = (s_y), y \in Y$$
$$< \vec s, \vec s > = \sum_y s^2_y = |y|$$
Now let's expanded this:$$\sum_{y \in Y} q_y^2$$
$$\sum_{y \in Y} q_y^2 = \sum_{y \in Y} (Pr[Y = y] - \frac{1}{|y|})^2$$
$$\sum_{y \in Y} (Pr[Y=y] + \frac{1}{|y|^2} - 2 \cdot \frac{Pr[Y = y]}{|y|})$$
$$= COL(y) + \sum_y  \frac{1}{|y|^2} + \sum_y -2 \cdot \frac{Pr[Y = y]}{|y|}$$
$$= COL(Y) + \frac{1}{|y|} - \frac{2}{|y|}$$
$$\le \frac{1}{|y|} (1+4 \epsilon^2) - \frac{1}{|y|}$$
$$= \frac{4 \epsilon^2}{|y|}$$

$$SD(Y; U) \le \frac{1}{2} \sqrt \frac{e \epsilon^2}{|y|} \cdot |y| = \epsilon \hspace{0.8cm} \text{Fine dimostrazione}$$

>SD means "Statistical DIstance"

# Probability Security
Move away from information theory.
Goal: Overcome all the limitations we have encountered.
Trade-Off: weater security.
- ADV is resource-bounded

## Probabilistic polynomial-time (turing machine)
It can use coins (randomness).
Intuitivity: for every input $x$. every random tape $r$, $t(x;r)$ terminates in some polynomial number of steps in $|x|, |r| = \lambda$ 
Polynomial: 
$$P(\lambda) = Poly(\lambda)$$
$$P(\lambda) = 0(\lambda^\tau) \hspace{0.6cm} \text{for some} \hspace{0.6cm} c \in N$$
Small probability of not being secure (small as a function of sec. per. $\lambda$)
For us negligible: $\epsilon(\lambda) = 0(\frac{1}{P(\lambda)})$
For every polynomial $P(\lambda)$ 

Examples: $2^{- \lambda}, 2^{- \lambda(\log \lambda)}$
Exercise: If $\epsilon, \epsilon' = NEGL(\lambda)$ then so is:
- $\epsilon(\lambda) + \epsilon' (\lambda)$
- $P(\lambda) \cdot \epsilon(\lambda)$ for every $p dy(\lambda) = p(\lambda)$

>Introduce computationally hard problems and prove security is equivalent to breaking these problems.
