## Binomial Coefficient

In general, the term $\binom{n}{k}$ is found in position $k$ in row $n$ of the triangle:

$$
\binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

## Factorial

The factorial of a number $n$ is defined as:

$$
n! = n \times (n-1) \times (n-2) \times \ldots \times 1
$$

For example, the factorial of 5 is:

$$
5! = 5 \times 4 \times 3 \times 2 \times 1 = 120
$$

## Binomial Coefficient

The binomial coefficient, denoted as $\binom{n}{k}$, represents the number of ways to choose $k$ elements from a set of $n$ elements and is calculated as:

$$
\binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

# Pascal's Triangle

**Pascal's Triangle** is a mathematical structure that organizes the binomial coefficients in triangular form. Each number in the triangle is the sum of the two numbers directly above it. It is a fundamental concept in combinatorics and has applications in algebra, probability theory, and geometry.

## Properties

1. **Binomial Coefficient**: Each number in the triangle is a binomial coefficient, represented as $\binom{n}{k}$, where $n$ is the row number and $k$ is the position of the number in the row (starting from 0). For example, the number 6 in row 4 and position 2 is $\binom{4}{2} = 6$.

2. **Sum of Rows**: The sum of the numbers in each row is equal to $2^n$, where $n$ is the row number. For example, the sum of row 3 (1 + 3 + 3 + 1) is 8, which is $2^3$.

3. **Symmetry**: The triangle is symmetric; $\binom{n}{k} = \binom{n}{n-k}$.

4. **Recurrence Relation**: Each number can be calculated using the following recurrence relation:

   $$
   \binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}
   $$

   This relation highlights that a number is the sum of the two numbers directly above it in the triangle.

## Applications

- **Combinatorics**: The triangle is used to calculate the number of possible combinations in various scenarios.
- **Binomial Expansion**: The binomial coefficients from the triangle can be used to expand expressions like $(a + b)^n$.
- **Probability Theory**: The triangle has applications in probability problems, such as calculating the probabilities of combined events.

## Example of Pascal's Triangle

The sum of the numbers in each row corresponds to $2^n$, where $n$ is the row number:

- Row 0: $1 = 2^0$
- Row 1: $1 + 1 = 2 = 2^1$
- Row 2: $1 + 2 + 1 = 4 = 2^2$
- Row 3: $1 + 3 + 3 + 1 = 8 = 2^3$
- Row 4: $1 + 4 + 6 + 4 + 1 = 16 = 2^4$
- Row 5: $1 + 5 + 10 + 10 + 5 + 1 = 32 = 2^5$

Pascal's Triangle has many applications in combinatorics, number theory, and algebra, particularly in determining binomial coefficients.

![[31.png]]


## Variation of relative frequency
$p = 0.5$
$m \to \infty$
$f_k = \binom{n}{k} \frac{1}{2^n}$
$$\binom{n}{k} p^k q^{n-k}$$

"L'effetto cumulativo dei dati fa sì che la frequenza relativa tende alla probabilità, quindi un valore vicino allo 0". Tutta la distribuzione va verso un punto, dunque a varianza diventa sempre minore.

Per la distribuizione assoluta invece è il contrario, l'effetto cumulativo dei dati fa sì che la varianza tende ad aumentare al tempo n, aumentando la larghezza della campana.

explosing variance $\sum x_i$
generative variance $\frac{\sum x_i}{n}$

==Law of large numbers== is essentially:
$$\frac{\sum x_i}{n}$$
The frequency is convergency to the probability

==Central limit Theorem (CLT)==: If we take a sum of variable and we divide for a normalized const we converge to the normal distribution..
$$\frac{\sum x_i}{\sqrt{n}} \to N(\mu, \sigma^2)$$

> sum $x_i$ = jump

>important things for probability!

==Binomial distribution==: 

































