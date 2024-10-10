Population: set of statistical units
Statistical unit: set of observation
$x_1, \cdots, x_n$
$\forall$ statistical unit we observe the realization of these characteristic $\to (x_1^{(i)}, \cdots, x_n^{(i)})$
It's very important to understand the difference between these concept:
- Character/Attribute: characteristic such as weight, age (more qualitative and abstract then variable)
- Variable: it's the operational version of the characters, a set of possible value that characters can take (range of variable). To clarity, a variable is: the concept + scale of measurement.

Starting from a dataset (we can image this like a DB table with some columns and rows. Each rows identify a specific statistical unit) where information relating to certain statistical units is stored, we can obtain a distribution. The distribution allows us to derive the count (distribution by units) or relative frequency (frequency distribution) for each distinct variable or value.

Also Remember:
- $x_1 \to \text{UNIVARIATE} \hspace{1cm} \text{when we have only one, we can't use the index}$ 
- $x_1, x_2 \to \text{BIVARIATE} \hspace{1cm} \text{when we have double, we can use x and y}$
- $x_1, \cdots, x_n \to \text{MULTIVARIATE}$

```ad-caution
_Statistics_: refers to the science.

----

_Statistic_: set of function of the data.

```

**Arithmetic Average**
Value that alone would represent a set of values.
$$\text{Arithmetic Average =} \hspace{0.5cm} \frac{\sum x_i}{n}$$
If we have this:
![[data statistic.png]]
How much this mean is closed to the data? We need to integrate a measure that are called variance.

In Univaried Statistic we have two fundamental concept:
- Location: Summary of our data (synthesis).
- Dispersion: Measure of the distance of the $\mu$ from the observe. (mean of distances $d(x_i, \mu)$)

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


```ad-missing
Image Theoretical population with sample.
```

Now, we can talk about the two main branches of statistics:

- ==Inference Statistic==: Actions to deduct something from the particular to the general. Sample and theoretical population now are the same concept. One is involved in the other.

- ==Descriptive Statistic==: The population that i study. In this case there is no real difference between population and sample. If we want to consider this difference we using:
	- $\overline{x}$ for sample
	- $\mu$ for population