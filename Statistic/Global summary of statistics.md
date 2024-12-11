```ad-caution
_Statistics_: refers to the branch of science.

----

_Statistic_: set of function of the data. (mean, variance, mode)

```

## Basic concept of Statistics
```ad-abstract
title: Population
Is a set of statistical unit. Population does not to be something that exists but can be something that is not tangible. Population is not static, he can change during the time (is a dynamic flow) and so, it can be a stream of data.
```

**Statistical Unit**: A statistical unit is the basic observational element from which data are collected in a statistical study. $(x_1, \cdots, x_n)$. For each statistical Unit we observer the realization of these characteristics $\to (x_1^{(i)}, \cdots, x_n^{(i)})$

When i want to observer or studitng something like an activity i want to measure characters and variables:

$(x_1, \cdots, x_n)$ this are called the characters.
- ==character== is more general more astract (weight, height, age, ...)
- ==variable== =  character + set of all possible value (way that i mesure it)


```ad-info
title: To clarify
Una **caratteristica** è una proprietà o un aspetto di un'unità statistica che vogliamo osservare o misurare. È un concetto più astratto e qualitativo che descrive una determinata proprietà di un oggetto, persona o fenomeno.
Una **variabile**, è la versione operativa della caratteristica. La variabile è un insieme dei possibili valori che una caratteristica può assumere. 

```

In statistics exists different types of variables:
- **Quantitative Variables**: These are numerical variables that represent measurable quantities.
	- **Continuous Variables**: These can take any value within a given range and can be measured to any degree of precision.
	- **Discrete Variables**: These can only take specific values, typically whole numbers (e.g., the number of students in a class).
- **Qualitative Variables**: Also known as categorical variables, these represent categories or groups rather than numerical values.
	- **Nominal Variables**: These represent categories without any intrinsic ordering (e.g., gender, colors, types of fruit).
	- **Ordinal Variables**: These represent categories with a meaningful order or ranking, but the intervals between categories are not necessarily uniform (e.g., satisfaction ratings, education levels).


The analysis can be:
- **Univariate**: deals with only one variable at a time to describe and understand the characteristics of a single variable (distribution, mean, median, variance, ...)
- **Bivariate**: deals with two variables.
- $\cdots$
- **Multivariate** $(x_1, \cdots, x_n)$: deals with multiple\ variables simultaneously. In this case multiple variables interact and influence the results. 


```ad-example
Starting from a dataset (we can image this like a DB table with some columns and rows. Each rows identify a specific statistical unit) where information relating to certain statistical units is stored, we can obtain a distribution. The distribution allows us to derive the count (distribution by units) or relative frequency (frequency distribution) for each distinct variable or value.


```

## Mean and Variance

```ad-abstract
title: Meaning of Average (Arithmetically)
In statistics, the arithmetic mean (or simple average) is a central measure of trend that represents the average value of a set of data. It is calculated by summing all values and dividing by the total number of observations. The significance of the arithmetic mean is that it provides an estimate of the “typical value” or central value of the data.

```

>La media è il punto di equilibrio e dunque la media aritmetica ha la proprietà di **equilibrare i dati**, in quanto il totale delle distanze dai dati alla media sulla sinistra è lo stesso delle distanze sulla destra..

$$\text{Arithmetic Average =} \hspace{0.5cm} \frac{\sum x_i}{n}$$

If we have this:
![[data statistic.png]]
How much this mean is closed to the data? We need to integrate a measure that are called variance.

In ==Univaried Statistic== we have two fundamental concept:
- **Location**: Summary of our data (synthesis).
- **Dispersion**: Measure of the distance of the $\mu$ from the observe. (mean of distances $d(x_i, \mu)$)

$$\overline{x} = \frac{\sum x_i}{n}$$
$$\sigma^2 = \frac{\sum (x_i - \overline{x})^2}{n}$$
For statistical we can also use this: 
$$\sigma = \sqrt{\frac{\sum (x_i - \mu)^2}{n}}$$
```ad-info
To formalized the variance we use the distance.
$$\sum d(\mu, x_i) \Rightarrow (x_i - \mu)^2 \hspace{0.3cm} \text{or} \hspace{0.3cm} |x_i - \mu|$$

The second is the Euclidean distance but we don't use it because with this we cannot do anything. We use the first (mathematical convention!)


```


**Theoretical Population**
A theoretical population is something that we want to study but we can observe a little number of individual. We've a sample that we study respect to a big population.

Now, we can talk about the two main branches of statistics:

- ==Inference Statistic==: Actions to deduct something from the particular to the general. Sample and theoretical population now are the same concept. One is involved in the other.

>There is some unknown population (abstract one) and we want to describe it.

- ==Descriptive Statistic==: The population that i study. In this case there is no real difference between population and sample. If we want to consider this difference we using:
	- $\overline{x}$ for sample
	- $\mu$ for population

>Deals with population where we do calculus (mean and variance) and plot graphs.

## Bivariate Distribution and Conditional Probability

|         | Black | Brown | Blue | _total_ |
| ------- | ----- | ----- | ---- | ------- |
| Low     | 5     | 10    | 5    | 20      |
| Medium  | 15    | 10    | 5    | 30      |
| High    | 10    | 0     | 40   | 50      |
| _total_ | 30    | 20    | 50   |         |

We can define this distribution as **bivariate** because it describes the joint distribution of two categorical (or qualitative) variables:

1. **Color** (with categories: Black, Brown, Blue)
2. **Level** (with categories: Low, Medium, High)

In a bivariate distribution, we are interested in the possible combinations between two variables and their joint frequencies—how often each combination of values occurs in the data. The Bivaried distribution shows how many elements belong to each combination of **Color** and **Level**.

>A bivariate distribution can show marginal distributions (univariate distributions) for each variable.

**Marginal Distribution**: The totals in the last row and column represent marginal distributions, summarizing the counts for each variable irrespective of the other.

The conditional distribution represents how the distribution of levels changes when conditioned on the color being Black (is like a subset because it is conditioned by the eye color). When we have this type of distribution we call it such as: **Conditional Distribution**

$$H \mid yC = \text{Black} \hspace{0.6cm} \text{One variable conditioned by the value of another variables}$$

More generic:
$$X \mid Y_j = y_j \hspace{1cm} Y \mid X_j = x_j$$
- Indicates the distribution of $X$ given that $Y$ takes on a specific value $y_j$​.
- Indicates the distribution of $Y$ given that $X$ takes on a specific value $x_j$​.

```ad-example
Conditional distribution is like if we cut the population in the possible values that he can assume.

![[st 2.png|200]]

```

### Statistical Independence
In statistics, independence refers to a situation where two or more variables do not influence each other. When analyzing data, particularly in the context of hypothesis testing or regression analysis, independence implies that the variability in one variable does not provide any information about the variability in another variable.

```ad-example
For instance, if we have two variables $X$ and $Y$, they are considered statistically independent if knowing the value of $X$ does not change the distribution of $Y$. This is crucial when performing analyses that assume independence, such as linear regression or analysis of variance, as violations of this assumption can lead to incorrect conclusions.

```

>Se due variabili sono indipendenti, le loro distribuzioni non sono necessariamente le stesse, ma la distribuzione condizionale di una variabile dato l'altra è uguale alla distribuzione marginale della variabile. (giustamente, dato che l'altra variabile non la influenza in alcun modo!)

**Matematically:**
All condition distribution $(X \mid Y = y)$ are equal, in the sense of relative frequency. (histograms or shapes, same structure).

```ad-abstract
title: Definition of statistical independence
In statistic, independence refers to a situation where two or more variables influence each other $\to$ coditional distributions are equal!

```
	
![[st 3.png|500]]



**Contingency Table**
Table used to represent the joint distribution of two categorical variables, $X$ and $Y$.

| $x/y$   | $y_1$    | $y_j$    | $y_n$    | _total_  |
| ------- | -------- | -------- | -------- | -------- |
| $x_1$   | $n_{11}$ | $n_{1j}$ | $n_{1n}$ | $n_1.$   |
| $x_i$   | $n_{i1}$ | $n_{ij}$ | $n_{in}$ | $n_i.$   |
| $x_n$   | $n_{n1}$ | $n_{nj}$ | $n_{nn}$ | $n_n.$   |
| _total_ | $n_.1$   | $n_.j$   | $n_.n$   | $n_{nn}$ |
- $i$ row
- $j$ column
- $n_{ij}$ joint frequency of $X = x_i \wedge Y=y_i$
- $n_.j$ marginal frequency of $y_j$ when $Y=y_i$ (Sum of the frequency of that row $n_{.j} = \sum_i n_{i,j}$)
- $n_{i.}$ marginal frequency of $X=x_i$ (Sum of the frequency of that row $n_{i,.} = \sum_{j} n_{i,j}$) 

Conditional frequency is the probability of an event given another event, that is, the probability that $X = x_i$ given that $Y = y_j$. 
$$\text{Conditional} = [f_x \mid Y = y_j] \hspace{0.3cm} \text{is equal to} \hspace{0.3cm} [f(x=x_i)]$$
More specifically
$$\frac{n_{i,j}}{n} = \frac{n_{i,.}}{n} \cdot \frac{n_{.,j}}{m}$$
where:
- First fraction is the **relative frequency** of $x_i : f(x = x_i)$ (FREQUENZA MARGINALE DI $X=x_i$)
- Second fraction is the **relative frequency** of $y_i : f(y = y_j)$ (FREQUENZA MARGINALE DI $Y=y_i$)
$$f(x = x_i) \cdot f(y = y_j) = f(x = x_i, y = y_j)$$

We say that the relative frequency of $x_i$ and $y_j$ are equal to this $f(x = x_i, y = y_j)$. 
This relationship indicates that the likelihood of observing both $x_i$​ and $y_j$​ simultaneously can be captured through this joint **probability expression**. In the context of probability theory, this relationship can also be articulated as:
$$P(X \hspace{0.2cm} \text{and} \hspace{0.2cm} Y) = P(X) \cdot P(Y)$$$$P(X \mid Y) = P(X)$$

>La probabilità congiunta è semplicemente il prodotto delle probabilità marginali di ciascuna variabile. Se $X$ e $Y$ sono indipendenti, allora la probabilità congiunta può essere scritta come il prodotto delle probabilità marginali di $X$ e $Y$.

Remember, this:
![[st 3.png|500]]

If we invert the graph we get the same thing, in fact, for the same bivariate distribution this is true:
$$f_{ij} = f_i \cdot f_j$$
Because if $X$ is independent of Y then vice versa is also true. We can introduce the concept of Symmetric in statistics.
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

$\frac{f_{X \wedge Y}}{f_Y} \equiv f_{X \mid Y} \Rightarrow f_{x \wedge y} = f_x \cdot f_y \hspace{0.9cm} \text{Definition of Joint Probability}$

Summarizes the relationship between conditional frequencies and independence. If two variables $X$ and $Y$ are independent, we can express their joint distribution $f_{x \wedge y}$ as the product of their marginal distributions: $f_{x \wedge y} = f_x \cdot f_y$ 
This means that the value of one variable does not affect the other, so the joint probability is simply the product of the probabilities of each variable.

```ad-example
Remember, black eyes and tall peoples or tall peoples with black eyes are the same peoples $\Rightarrow$ same frequency.

$$f_{x \mid y} \cdot f_y = f_{y \mid x} \cdot f_x$$

```

**Bayes Theorem**
$$f_{x \mid y} = \frac{f_{y \mid x} f_x}{f_y} \hspace{0.9cm} f_{y \mid x} = \frac{f_{x \mid y} f_y}{f_x}$$
$$P(X \mid Evidence) = \frac{P(X) \cdot P(EVIDENCE \mid X)}{P(EVIDENCE)}$$
where:
- $P(X \mid Evidence)$ is called posterior
- $P(X)$ is called prior
- $P(EVIDENCE \mid X)$ is likehood of $X$

## In-Correlation and relation between independence
**Variance**: is the measure of dispersion
$$\sigma^2 = \frac{\sum (x_i - \bar x)^2}{n}$$
**Deviance**: The numerator of variance is called "==deviance==" (remember wellford). It measure how far are the observation respect to the mean value.

But, when we talk about Bivariate distribution, we obtain the Co-deviance:
$$\sum_{i,j} (x_i - \bar x) \cdot (y_j - \bar y) \hspace{0.9cm} \text{Co-Deviance}$$
We call like this because, now, we have two variables that can be positive or negative. Exist a linear relationship between two variables (positive or negative).

```ad-faq
title: Univariate Co-deviance vs Bivariate Co-deviance
- **Devianza univariata**: Misura la dispersione di una singola variabile rispetto alla sua media.
- **Co-devianza bivariata**: Misura come due variabili si variano insieme, ovvero come $X$ e $Y$ siano correlati tra loro.

```


```ad-important
- Univariate Deviance / Variance Dispersion
- Bivariate Codeviance / Correlation

```

```ad-abstract
title: Definition of Correlation
The **correlation** ($r$) is a measure of the strength and direction of the linear relationship between two variables. The correlation is obtained by normalizing the co-deviance to a value between -1 and 1, which indicates:

- An $r$ value near **1** indicates a strong positive correlation (the two variables increase or decrease together).
- A value of $r$ near **-1** indicates a strong negative correlation (one variable increases while the other decreases).
- A value of $r$ near **0** indicates that there is no linear correlation between the two variables.

```


```ad-attention
**Indipendenza implica incorrelazione**: Se due variabili $X$ e $Y$ sono **indipendenti**, allora sono anche **incorrelate**. Questo è vero perché l'indipendenza implica che non c'è alcuna relazione tra le variabili, quindi la loro covarianza (e la correlazione) sarà zero.

**Incorrelazione non implica indipendenza**: Se due variabili sono **incorrelate**, non significa necessariamente che siano indipendenti. Le variabili potrebbero essere incorrelate (cioè avere una covarianza nulla) ma avere una relazione non lineare.

```
$$\text{Co-Deviance} = r \wedge r = \frac{\text{Co-dev}}{\text{Max}} = \{-1, 1\}$$
Max is the sum of the squares of the standard deviations of the two variables.
$$\text{Max} = \sum_j a^2_j \sum_j b_j^2$$
remember that:
$$a_i(x_i - \bar x) \wedge b_i(y_i - \bar y) = \sum_{ij} a_i b_j$$
$$\sum_{ij} a_i b_j \le \sum_j a^2_j \sum_j b_j^2$$
To find value of $r$:
$$r = \frac{\sum_{i,j}(x_i - \bar x)(y_j - \bar y)}{\text{Max}} = \frac{\sigma_{x,y}}{\sigma_x \sigma_y} = r \hspace{0.9cm} \text{Formula Correlazione}$$
![[st 4.png]]
Another interpretation of $r$ is by the ==regression technique==.

La regressione lineare cerca di trovare la miglior retta che descrive la relazione tra $X$ e $Y$, ossia la retta che minimizza la somma dei quadrati delle differenze tra i valori osservati e i valori predetti dalla retta. Questa retta è descritta dalla formula:
$$Y = \beta_0 + \beta_1 X$$

Dove:
- $\beta_0$ è l'intercetta (cioè il valore di $Y$ quando $X = 0$).
- $\beta_1$ è la pendenza della retta, che indica quanto cambia $Y$ per ogni unità di cambiamento in $X$.

La correlazione **$r$** è legata alla pendenza della retta di regressione **$\beta_1$**.

![[Pasted image 20241211161817.png]]

## Introduction to probability in statistics

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

### Set Theory (Axioms)
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

### Lesbegue Integral for mean and variance in probability
New kind of integral used in probability and statistical inference

```ad-abstract
title: Reimann Integral
The Riemann integral is a way to define the integral of a function over an interval $[a,b]$ in terms of the sums of areas of rectangles. 

```

A Riemann sum for the function $f$ is given by:
$$S = \sum_{i=1}^n f(x^*_i)\triangle x_i$$
where:

- $[a, b]$ is divided into $n$ subintervals $[x_{i-1}, x_i]$
- $\Delta x_i = x_i - x_{i-1}$​ is the width of the iii-th subinterval,
- $x^*_i \in [x_{i-1}, x_i]$ is a sample point in the $i$-th subinterval
- $f(x^*_i)\triangle x_i$ represents the area f a rectangle with height $f(x^*_i)$ and width $\triangle x_i$

The Riemann Integral is the limit:
$$\int_a^b f(x)dx = \lim_{n \to \infty} \sum_{i=1}^n f(x^*_i)\triangle x_i$$![[Pasted image 20241207112236.png|500]]
```ad-failure
title: Problem 
The Riemann integral, while a fundamental concept in mathematical analysis, has some limitations that make it unsuitable for dealing with more general functions, especially when working with functions that are not continuous or have complex discontinuities. In fact, The Riemann integral requires functions to be continuous almost everywhere; if a function has too many discontinuities or they are complexly distributed, the itegral cannot be defined. In addition, the Riemann integral is defined for finite functions over finite intervals. This makes it unsuitable for dealing with unbounded functions or functions defined on infinite sets.

```

```ad-success
title: Solution
Per superare queste limitazioni si utilizza un approccio diverso basato sull'integrale di Lesbegue. Tale integrale è il più utilizzato in probabilità.

```

**Funzionamento**:
Invece di suddividere il dominio della funzione (come fa l'integrale di Riemann), l'integrale di Lebesgue suddivide il _codominio_ della funzione in intervalli e misura la lunghezza degli insiemi di punti corrispondenti nel dominio (ovvero somma rettangoli che stanno alla stessa altezza).

Lebesgue è definito per una classe molto più ampia di funzioni, incluse quelle discontinue su insiemi complessi, può gestire funzioni non limitate e definite su intervalli infiniti, purché la loro misura complessiva sia finita. 

Formula Uniformata:
$$\int xd \cdot F(x)$$
where:
- $d \cdot F(x)$ is the function's jump


![[Pasted image 20241207113048.png|500]]


We know two mechanism to assign probability:
- **Density of probability**: quanto è densa la probabilità di un segmento.
- **Function's jump**: Probabilità presa come salto.

Thanks to Lebesgue's integral, I no longer need the concept of density in statistics because of the unified writing of Lebesgue's integral. Thus, thanks to this new integral we can integrate where Reimann fails.

Now we have the tools to express the mean and variance in the probability theory:

**Axiom: $(\Omega, F, P) \to$** Gormogorov axiom (1933)
- $\Omega$ = Universe of possible outcomes
- $F$ Sigma algebra of events
- $P$ Probability measure

Probability is define into the sigma algebra $F$, infact the probability is a function like this:
$$P: F \to R$$
```ad-abstract
title: Random Variable (Aleatory Variable)
A random variable is a function from $\Omega$ in $R$.
$$X: \Omega \to R$$

$X$ is similar to the statistics variable
```
Prendo un outcomes e gli associo un valore, un numero.
Sto dunque creando un nuovo spazio di probabilità dove la nuova $\Omega$ sono tutte le misurazioni. Dunque si ottiene $(\Omega', F', P')$.

$X = x_1, x_2, \cdots, x_n \to$ is a set of random variable called ==Random sample==

>all the $x_i$ are independent each other (for assumption). We can said they are $i.i.d$ (identical and independent distributed \[they come from the same distribution\]).


Random Sample (set of aleatory variable)
$$(X_1, X_2, \cdots, X_n)$$
Empirical Sample (all the x_i are mesuration value)
$$x_1, x_2, \cdots, x_n$$


```ad-example

Immagina di lanciare un dado 10 volte. Ogni lancio può essere visto come una variabile aleatoria $X_i$ che rappresenta l'esito del dado. Poiché ogni lancio è indipendente e segue la stessa distribuzione (valori uniformemente distribuiti tra 1 e 6), l'insieme dei 10 lanci forma un random sample:

$$(X_1, X_2, \cdots, X_{10})$$

Se il risultato dei 10 lanci è:

$$x_1 = 3, \, x_2 = 5, \, x_3 = 2, \, \cdots, \, x_{10} = 6$$

allora $x_1, x_2, \cdots, x_{10}$ costituiscono l'empirical sample, cioè i valori concreti osservati.
```



>Mean and Variance, in probability, are aleatory variable.

$$\text{Mean} = \sum_{i=1}^n x_i \cdot P_i \hspace{0.5cm }\text{Discrete}$$
$$\text{Mean} = \int x f(x) dx \hspace{0.5cm }\text{Continue}$$
The formula of mean in probability is written in two ways, one for continues function and the other for discrete function. If we use Lebesgue we can use only one for both:
$$\text{Mean} = \int x d \cdot F(x)$$

The **variance** indicates the mean of the deviations from the mean.
$$\text{Variance in Probability} = \int (x - \mu)^2 d \cdot F(x) = \sigma^2$$

Also we can define the Expected value $E(\bar x) = \mu$
When i write: $E(x)$ i mean $E(X) = \int x d \cdot F(X)$ (Media del valore atteso)




