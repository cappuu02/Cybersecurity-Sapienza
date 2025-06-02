Statistics can be:
- **Descriptive**: Deals with population where we do calculus (mean and variance) and plot graphs.
- **Inferential**: There is some unknown population (abstract one) and we want to describe it.

Remember also that:
- Statistics: we indicate the branch of science.
- Statistic: Indicate any functions of data (of the distribution) 
	- mean, variance, mode, $\cdots$

## Inferential Statistics 
In this kind of statistics we have a theoretical distribution represented by unknown population. We only have a sample that is a part of the unknown population.

In a sample, so for theoretical distribution, we don't have the frequency but we use the concept of probability. **Probability is an abstract measure that is used in inferential statistics to describe uncertain events**

>Probability is the abstraction concept of the probability. 
>Probability $\to$ Inferential statistics

Probability is a measure, a set-function.
We need to introduce: 
$$\frac{\text{Measurable space}}{\text{Probability Space}}$$

>To formalize the probability, we need to introduce the concept of probability space.

**Probability Space** = $(\Omega, F, P)$ where:
- $\Omega$ is the space of outcomes
- $F$ is the probability of a given event happening (subset of outcomes and i assign a certain probability). This is called **Sigma Algebra**.
- $P$ is a set function number associated with each event. (P is a function of any set in R, $P: F \to R$)

**Sigma Algebra** (close respect to union, intersection, complement)
Is a subset of outcomes such that: 
- $\Omega$ is in that algebra
- Empty space is in that algebra
- Union of int of complement of this set stay in this algebra

>What could be a minimal subset of outcomes? The Empty set

We can also analyze the phrase: "Sigma Algebra"
- **Algebra**: Set that is closed respect union, intersect and complement
- **Sigma**: I want to include my property also in $\infty$

## Set Theory (Axioms)
Function $\Rightarrow$ Measure Theory (Probabilistic Theory)
$(\Omega, F, P)$
1. Non negatività (Nessun evento può avere una probabilità negativa). Se l'evento è impossibile la sua probabilità è pari a $0$.
$$P(\sigma) \hspace{0,3cm} P \ge 0$$
2. Additività Finitaria: Se due eventi non si sovrappongono (disgiunti), allora la probabilità che si verifichi uno o l'altro è la somma delle loro probabilità individuali.
$$P(A_1 \cup A_2) = P() + P()$$
3. Subadditività: Anche se gli eventi si sovrappongono, la probabilità totale della loro unione non può eccedere la somma delle probabilità dei singoli eventi.
$$\Leftarrow A_1 \cap A_2 = 0$$

If we consider an arbitrary union, if we sum $P$ of more events:
$$P(\cup A) \le \sum P(\cup A) \hspace{0.5cm} \text{Union bound subadditivity}$$

![[st6.jpeg|600]]
![[st7.jpeg|600]]
![[st8.jpeg|600]]
