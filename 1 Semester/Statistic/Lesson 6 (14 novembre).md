**Probability** depends on the concept

Immagina di avere un dado a sei facce. La probabilità che esca una determinata faccia del dado risulta essere $P(X=x) = \frac{1}{6}$, ovvero ci sono sei casi equamente probabili. Questo è un caso di probabilità classica in cui tutti gli eventi hanno la stessa probabilità. 
$$\frac{n_i}{n} = P_i$$

```ad-abstract
title: Probability
Probability is a branch of mathematics and is based on some fundamental properties:
```


Assiomi della probabilità (secondo Kolmogorov)
1. **Assioma di certezza**: $P(\Omega) = 1$
2. **Additività**: Se due eventi $A$ e $B$ sono disgiunti $A \cap B = 0$ la probabilità della loro unione è la somma delle probabilità individuali: $P(A \cup B) = P(A) + P(B) \Leftarrow A \cap B = 0$

Probability is formally defined on a framework that includes:
$(\Omega, F, P)$ where:
- $\Omega$ space of outcomes (tutti i possibili risultati di un esperimento)
- $F$ space of events define as Sigma-Algebra (un insieme di sottoinsiemi di $\Omega$ che soddisfa alcune proprietà)
- $P$ Probability measure (valore che assegna tra 0 ed 1 ad ogni evento in $F$)

```ad-abstract
title: Sigma-Algebra $\Omega$
Una **sigma-algebra** è una collezione di sottoinsiemi di $\Omega$ che soddisfa tre proprietà fondamentali:

1. **Chiusura per unione:** Se $A_1, A_2, \dots \in \mathcal{F}$, allora anche l'unione $\bigcup_{i} A_i \in \mathcal{F}$.
2. **Chiusura per intersezione:** Se $A, B \in \mathcal{F}$, allora $A \cap B \in \mathcal{F}$.
3. **Chiusura per complementazione:** Se $A \in \mathcal{F}$, allora anche il suo complemento $A^c = \Omega \setminus A \in \mathcal{F}$.

```

Inoltre:
- Lo spazio $\Omega$ deve sempre appartenere alla sigma-algebra ($\Omega \in \mathcal{F}$).
- L'insieme vuoto ($\emptyset$) deve essere presente in $\mathcal{F}$.

Questi requisiti assicurano che le operazioni sugli eventi siano ben definite e che il calcolo della probabilità sia consistente.

```ad-missing
La lezione di Teoria del 21/11/2024 non è stata fatta in quanto il professore ha preferito spiegare un esercizio di crittografia (RSA).

```
