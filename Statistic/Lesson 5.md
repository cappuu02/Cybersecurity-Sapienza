In statistics exists different types of variables:
- **Quantitative Variables**: These are numerical variables that represent measurable quantities.
	- **Continuous Variables**: These can take any value within a given range and can be measured to any degree of precision.
	- **Discrete Variables**: These can only take specific values, typically whole numbers (e.g., the number of students in a class).
- **Qualitative Variables**: Also known as categorical variables, these represent categories or groups rather than numerical values.
	- **Nominal Variables**: These represent categories without any intrinsic ordering (e.g., gender, colors, types of fruit).
	- **Ordinal Variables**: These represent categories with a meaningful order or ranking, but the intervals between categories are not necessarily uniform (e.g., satisfaction ratings, education levels).

Remember, from the last lecture about independence, this:
![[st 3.png|500]]
The marginal is:
$$\frac{n_{i,j}}{n_{.,j}} = \frac{n_{i,.}}{n}$$
If we invert the graph we get the same thing, in fact, for the same bivariate distribution this is true:
$$f_{ij} = f_i \cdot f_j$$
Because if X is independent of Y then vice versa is also true.

## Symmetric Concept in statistics

```ad-abstract
title: Definition
The shape must be symmetric to guarantee the independence.

```

==Condition of independence==: $$f_{X \mid Y = y_j} = f_{X = x_i}$$
>This means that the conditional distribution of $X$ given $Y$ (for a specific value $y_j$) is equal to the marginal distribution of $X$.

Another way to express this condition is to use the joint and marginal distributions:
$$f_{X \mid Y = y_j} = \frac{f_{X=x_i}\hspace{0.2cm} \wedge \hspace{0.2cm} Y = y_j}{f_{Y = y_j}} \Rightarrow f_{XY} = f_X \cdot f_Y$$
Questo afferma che la distribuzione di probabilità congiunta $f_{XY}$​ di $X$ e $Y$ è uguale al prodotto delle loro distribuzioni individuali (marginali), $f_X$ e $f_Y$​.

==Indipendenza tra variabili Casuali==

$x = x_i | x$
$y = y_j | y$
$\Rightarrow f_{X \mid Y} = f_X \hspace{0.2cm} \text{or} \hspace{0.2cm} f_{Y \mid X} = f_Y \hspace{0.9cm} \text{Definition of Indipendence}$

>La distribuzione condizionale di $X$ dato $Y$ è uguale alla distribuzione marginale di $X$.

This states that the joint probability distribution $f_{XY}$ of $X$ and $Y$ is equal to the product of their individual (marginal) distributions, $f_X$ and $f_Y$.  
This implies that knowing the value of Y does not provide useful information about the value of X and vice versa. This is the concept of **independence** between two random variables.

==Frequenza Condizionale==

$f_{X \mid Y} \equiv \frac{f_{X \wedge Y}}{f_Y} \hspace{0.9cm} \text{Definition of Conditional Frequency}$

$f_{X \mid Y}$ represents the probability of $X$ given $Y$ and is calculated as the joint probability divided by the probability of $Y$.

==Relazione tra Indipendenza e Frequenze Congiunte==

$\frac{f_{X \wedge Y}}{f_Y} \equiv f_{X \mid Y} \Rightarrow f_{x \wedge y} = f_x \cdot f_y \hspace{0.9cm} \text{Definition of ...}$

Summarizes the relationship between conditional frequencies and independence. If two variables $X$ and $Y$ are independent, we can express their joint distribution $f_{x \wedge y}$ as the product of their marginal distributions: $f_{x \wedge y} = f_x \cdot f_y$ 
This means that the value of one variable does not affect the other, so the joint probability is simply the product of the probabilities of each variable.

```ad-example
Remember, black eyes and tall peoples or tall peoples with black eyes are the same peoples $\Rightarrow$ same frequency.

$$f_{x \mid y} f_y = f_{y \mid x} f_x$$

```

**Bayes Theorem**
$$f_{x \mid y} = \frac{f_{y \mid x} f_x}{f_y} \hspace{0.9cm} f_{y \mid x} = \frac{f_{x \mid y} f_y}{f_x}$$
$$P(X \mid Evidence) = \frac{P(X) \cdot P(EVIDENCE \mid X)}{P(EVIDENCE)}$$
where:
- $P(X \mid Evidence)$ is called posterior
- $P(X)$ is called prior
- $P(EVIDENCE \mid X)$ is likehood of $X$

## Incorrelation and difference between independence

**Variance**: is the measure of dispersion
$$\sigma^2 = \frac{\sum (x_i - \bar x)^2}{n}$$
**Deviance**: The numerator of variance is called "deviance" (remember wellford). It measure how far are the observation respect to the medium value.

But, when we talk about Bivariate distribution, we obtain this:
$$\sum_{i,j} (x_i - \bar x) \cdot (y_j - \bar y) \hspace{0.9cm} \text{Co-Deviance}$$
We call like this because, now, we have two variables that can be positive or negative. Exist a linear relationship between two variables (positive or negative).

```ad-important
- Univariate Deviance / Variance Dispersion
- Bivariate Codeviance / Correlation

```

$$\text{Co-Deviance} = r \wedge \frac{\text{Co-dev}}{\text{Max}} = \{-1, 1\}$$
$$\text{Max} = \sum_j a^2_j \sum_j b_j^2$$
remember that:
$$a_i(x_i - \bar x) \wedge b_i(y_i - \bar y) = \sum_{ij} a_i b_j$$
$$\sum_{ij} a_i b_j \le \sum_j a^2_j \sum_j b_j^2$$
To find value of $r$:
$$r = \frac{\sum_{i,j}(x_i - \bar x)(y_j - \bar y)}{\text{Max}} = \frac{\sigma_{x,y}}{\sigma_x \sigma_y} = r$$
![[st 4.png]]
Another interpretation of $r$ is by the regression technique.
![[st 5.png]]



