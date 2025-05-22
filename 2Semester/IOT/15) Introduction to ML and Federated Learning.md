
# ML/AI
==Artificial Intelligence== is the field of developing computers and robots that are capable of behaving in ways that mimic human capabilities without human interference.

==Machine Learning== is a sub-field of AI that uses algorithms to automatically learn insights and recognize patterns from data.

![[96k.png]]

## Classification and regression 
In machine Learning, there are two main types of task:
- **Classification**: involves predicting a category or class label. The output is discrete, meaning the model tries to classify data into predefined labels or groups.
- **Regression**: involves predicting a (possibly continuous) value or quantity (dependent variable) on a numerical scale by observing variables (features - independent variables) that influence prediction

## Features
Data is preprocessed to identify features, i.e., characteristics of the input which help in describing it.

```ad-example
**task**: identify the fruit
**three classes**: apples, oranges, pears
**Features** = colour, peel, shape.

```

![[97k.png]]
![[98k.png]]

# Basics of Regression

## Linear Regression
Consider a dataset as a set of data point, characterised by an independent variable (feature) and a dependent variable (to predict), for instance:
• **Independent variable** = size
• **Dependent variable** = cost
• **Each data point is a house**.

By observing the distribution of the data points, we can notice a linear relationship between the two variables.

```ad-example

The cost of the house grows linearly with its size.
```

```ad-important

find the line that better “fits” the data point.
```


The line that better “fits” the data point is the line that better represents the relationship between the two variables, given a set of data points. By finding such a line, given the size of a
house, we can predict how much it costs with some confidence

![[100K.png]]

We can fit many lines, non of them is perfect, since data points are not aligned. How to we find the “best” one? And how do we decide if a line is “better” than the other?
Recall that the function of a line is:
$$\hat y = \theta_1x + \theta_0$$
where:
- $\theta_1$ is the slope (pendenza)
- $\theta_0$ is the intercept

Given the function of a line, for each point , we can compute the residual, i.e., the difference
between (real value) and (predicted value).

To define how good a line fits the data, we can define different loss functions, that are functions of the residuals of the data points in the dataset.

- L1 loss $= \Sigma_{i=1}^n \mid \hat y_i - y_i \mid$
- Mean Absolute Error(MAE) $= \frac{1}{n} \Sigma_{i=1}^n \mid \hat y_i - y_i \mid$ (When data set contains many outliers)
- $L2$ loss $= \Sigma_{i=1}^n ( \hat y_i - y_i )^2$
- Mean Square Error (MSE)  $= \frac{1}{n} \Sigma_{i=1}^n ( \hat y_i - y_i )^2$ (When data set contains many outliers)

>Where is the number of data points

![[101K.png]]

```ad-success
title: Objective
Choose one of these loss functions, and find the line that minimises it.

```

```ad-example
![[Pasted image 20250521154219.png]]
![[Pasted image 20250521154243.png]]
![[Pasted image 20250521154257.png]]

```

If the matrix is not invertible, linear regression can still be used by computing its pseudo-inverse. The geometrical approach is very powerful because it gives a closed-form
formula to perform linear regression for MSE minimisation! Very often, we do not have just one independent variable, but multiple ones. For instance, the price of a house does not only depend on its size, but also on other factors, e.g., on the proximity to the city center. Assume that also the relationship between the proximity to the city center and the price is also linear.

Each data point has $3$ coordinates, $(x,y,z)$ , that are (size, proximity, price).
We can still perform linear regression! In this case, we are searching for the plane that minimises a loss function. The equation of the plane is:
$$\hat z = \theta_2y + \theta_1x + \theta_0$$
In general, if data points have coordinates: $(x_1, \cdots, x_d, y)$, then we want to find the hyperplane, which has general equation $\hat y = \theta_0 + \theta_1x_1 + \cdots + \theta_dx_d$ that minimises a loss function

```ad-question
title: Can we still use the normal equations approach to solve this?
![[Pasted image 20250521154634.png]]
```

## Polynomial Regression
What if the data points do not exhibit a linear behaviour, but rather a polynomial
one? In this case, we can **search for the best polynomial that fits the data**!
$\hat y = \theta_0 + \theta_1x + \theta_2x^2 + \cdots + \theta_mx^m$
As before, we can do that by searching for the coefficients $(\theta_0, \theta_1, \cdots, \theta_m)$ that minimise a loss of function. Notice that, in the scenario that we are considering now, the dependent variable
only depends on one independent variable, but it depends also on its powers.

If we want to find the polynomial that minimises the Mean Square Error, can we still use the
normal equation? Yes! Given $n$ data points $(x_i, y_i)$, we define:

![[106K.png]]

What if the polynomial behaviour occurs over multiple variables? We can still use normal equations. Given data points $n$, we define $(x_{1,i}, \cdots, x_{d,i}, y_i)$, we define:

![[107K.png]]

```ad-example
![[Pasted image 20250521155104.png]]

```

The problem with this approach are:
- Computing the (pseudo) inverse of $X^T_+ \cdot X_+$ is computationally expensive if the matrix is big
- Works only for MSE, and not for other loss functions as Mean Absolute Error (MAE) $= \frac{1}{n} \Sigma_{i=1}^n \mid \hat y_i - y_i \mid$
- Alternative: use a numerical apporach
- Recall the chain rule for derivates of composition of function $\frac{d[f(g(x))]}{dx} = g'(x) \cdot f'(g(x))$

### Chain Rule
```ad-example
title:  Example 1
![[Pasted image 20250521155506.png]]

```

```ad-example
title:  Example 2
![[Pasted image 20250521155516.png]]

```

# Gradient Descent

## Gradient

```ad-abstract
title: Gradient Definition
The gradient of a function is the vector of its partial derivates:
$$\bigtriangledown f(x_1, \cdots, x_n) = [\frac{\partial f}{\partial x_1}, \cdots, \frac{\partial f}{\partial x_n}]$$

If $n=1$ the gradient is simply the derivate of $f$
```

>The gradient generalises the concept of derivative in a multi-dimensional space.

In each point of the domain $(x_1, \cdots, x_n)$, it represent the slope of the surface $f(x_1, \cdots, x_n)$ in the direction of the steepest ascent.

## Gradient Descent
The gradient descent is an iterative algorithm to find the minimum of a function .
It can be applied to if:
- $f$ is differentiable
- if $f: D \subseteq R \to R$ then it is differentiable if its derivative is defined in each point of $D$.

![[111K.png]]

- if $f: D \subseteq R^n \to R$, saying whether it is differentiable or not is more complicated.

Sufficient condition: if for each point $a \in D$, all partial derivatives exist and are continuous in a neighbourhood of $a$, then the function is differentiable.

![[112K.png]]

The gradient descent is an iterative algorithm to find the minimum of a function . It always finds the point of minimum if:
- $f$ is convex.

![[113K.png]]

==Idea==: given a function, choose an initial point.
Compute the gradient of the function, and see what is its value at the initial point.
Move of one step towards the opposite direction. You will land in another point.
Repeat for a maximum number iterations, or until the improvement is smaller than the tolerance.

![[115K.png]]

The step is known as “==learning rate==”
**Large learning rate**: move fast towards the opposite direction of the gradient
**Small learning rate**: move slowly towards the opposite direction of the gradient

![[116K.png]]

```ad-example
![[Pasted image 20250521161340.png]]

```


# Introduction to Neural Networks (MLP and back propagation)

```ad-abstract
title: Introduzione

Molto spesso, i dati sono rappresentati con numerose caratteristiche e presentano complessi pattern non lineari difficili da individuare con la regressione.
Le reti neurali sono una famiglia di architetture di modelli progettate per individuare pattern non lineari nei dati.
La loro struttura e i loro componenti si ispirano alla struttura biologica dei neuroni umani.
```

## Perceptron
he perception is the building block of a neural network. The number of input nodes is given by the number of features of the data points.

![[118K.png]]

> If the activation function is the identity function, this is a simple linear regression model, where is the intercept.

Given an input data point with $d$ features $x_1, \cdots, x_d$, the neuron:
Computes a linear combination of the input and the synapses weights, possibly adding the bias: 
$$b + \sum_{i=1}^d w_i x_i$$ or in a matrix form: $b+ w^T \cdot x$ where $w = [w_1, \cdots, w_d]^T$ and $x = [x_1, cdots, x_d]^T$
Applies the activation function to the combination

## Activation functions
Activation functions enables a perceptron to learn non-linear and complex relationships between features and label.

![[119K.png]]

## Single layer Perceptron
Neurons and Synopsis are organised in layers: the input layer, one or more
hidden layers, and the output layer.

![[120K.png]]

## Multi Layer Perceptron (MPL)
Neurons and Synopsis are organised in layers: the input layer, one or more hidden layers, and the output layer.

![[121K.png]]

**Deep learning**: È un sottocampo dell'apprendimento automatico basato su reti neurali multistrato (almeno un livello nascosto) per eseguire regressione e classificazione. Il percettrone multistrato è un esempio di rete neurale feed-forward, ovvero i collegamenti diretti nella rete non formano cicli. Questo è in contrasto con le reti neurali ricorrenti, in cui l'output di un nodo nel livello nascosto j può essere inviato a un nodo in un livello nascosto $< j$.

Weights and biases are the model parameters, and learnt during the training process.
The structure of the neural network, the number of layers, the activation functions, the number of nodes per hidden layers, are hyperparameters, which are defined before training and influence the performance of a neural network. They are not learnt during the training process.

```ad-missing
Aggiungere Esempi

```


## Backpropagation
```ad-abstract
title: Definition

Backpropagation is an algorithm to train feedforward neural networks. Training a neural network means to find the optimal parameters (weights and bias) that model the behaviour of a phenomenon (e.g., how the dosage of a drug influence its efficacy).
```


The phenomenon is not described by a mathematical model (e.g., differential equations modelling the body’s response to the chemicals in the drug), but only by observed data (data points, e.g., couples (dosage, efficacy)).

Hence, to find the optimal parameters means to find the parameters that minimise the error with respect to the input data. To train a neural network, we need to feed it with many data points or samples, that are the training set- supervised learning.

![[122K.png]]

### high level idea
- **Initialisation**: initialise weights and biases at random.
- **Forward step**: feed the network with a data point $(x_1, \cdots, x_d, y)$ and get the expressions of the parameters layer by layer, by writing each parameter as a function of the parameters in the previous layers.

- **Backward step**: Compute the gradients of a loss function with respect to each parameter, using the chain rule from the rightmost layer.
	- Update the parameters with the gradient descent step: 
		![[124K.png]]
	- Repeat the updates as in the gradient descent until stopping criteria.

```ad-missing
Aggiungere Esempi

```


Possiamo allenare la rete neurale su un dataset di $N$ campioni $(x_{i,1}, \ldots, x_{i,d}, y_i)$.
Il processo funziona come segue:
  - Inizializzare pesi e bias in modo casuale.
  - Per ogni batch di $n$ elementi:
    - Fornire alla rete ogni campione (dato), ottenere la predizione $\hat{y}_i$ e calcolare i corrispondenti valori della funzione di loss:
      $$
      \mathcal{L}(x_{i,1}, \ldots, x_{i,d}, y_i) = \mathcal{L}_i = \frac{1}{2} (\hat{y}_i - y_i)^2
      $$
    - Considerare la media dei valori delle funzioni di loss:
      $$
      \mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} \mathcal{L}_i
      $$
    - Calcolare i gradienti di $\mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} \mathcal{L}_i$ rispetto a ciascun parametro e proseguire fino allo stop.

> 💡 Questo è **un'epoca (epoch)**. (dal per ogni fino alla fine)


Durante l'addestramento di una rete neurale, l'intero dataset viene suddiviso in tre parti: un insieme di addestramento (training set), un insieme di validazione (validation set) e un insieme di test (test set). L'addestramento della rete viene eseguito in più epoche (epochs), dove un'epoca corrisponde all'elaborazione completa di tutti i dati di addestramento, divisi in sottoinsiemi chiamati batch.

All'inizio della prima epoca, i pesi e i bias della rete neurale vengono inizializzati in modo casuale. Successivamente, la rete viene addestrata su ciascun batch uno alla volta. Per ogni batch, si effettua una propagazione in avanti (forward pass) per ottenere le predizioni, si calcola la funzione di perdita (loss function), e si esegue una retropropagazione (backward pass) per aggiornare i parametri tramite il calcolo dei gradienti.

A partire dalla seconda epoca (e per tutte le epoche successive), l’addestramento riprende utilizzando i parametri aggiornati nell’epoca precedente. Questo processo continua fino al raggiungimento di un numero massimo di epoche definito in anticipo.

Quando l'aggiornamento dei parametri non avviene sull'intero dataset, ma su singoli campioni o piccoli gruppi (batch), parliamo di **stochastic gradient descent (SGD)**. In questo caso, i batch vengono solitamente selezionati in modo casuale e uniforme dal dataset di addestramento.

Al termine di ogni epoca, viene valutata la performance della rete neurale su un insieme di validazione indipendente. Una volta completate tutte le epoche, si selezionano i parametri che hanno fornito le migliori prestazioni su questo validation set.

Infine, per verificare la capacità della rete neurale di generalizzare, si effettua una valutazione sull'insieme di test, che non è mai stato usato durante l’addestramento né nella validazione. La modalità di valutazione dipende dal tipo di problema affrontato. Se il compito è di **regressione**, si utilizzano metriche come l’errore assoluto medio (MAE) o l’errore quadratico medio (MSE). Se invece si tratta di un problema di **classificazione**, si usano metriche come accuratezza, precisione, richiamo (recall) e F1-score.

Parametri come il tasso di apprendimento (learning rate), la dimensione dei batch (batch size) e il numero di epoche (epochs) non vengono appresi dalla rete, ma devono essere impostati manualmente prima dell’inizio dell’addestramento. Questi vengono chiamati **iperparametri** e hanno un'influenza significativa sull'efficacia dell’addestramento.


## NN for classification
Neural network for binary classification, where the samples belong to one of two possible classes (e.g., spam detection, disease detection).

- One output node with sigmoid activation function.

![[125K.png]]

Neural network for classification, where the samples belong to one of K >2 possible classes (e.g., image classification, sentiment analysis, etc). Number of output nodes = number of classes, each with softmax activation function.

![[126K.png]]

Se le classi non sono numeriche (ad esempio, riconoscimento di animali, presenza o assenza di una malattia), si utilizza il **label encoding**, ovvero si assegna un valore numerico a ciascuna classe (ad esempio: gatti = 0, cani = 1, topi = 2, ecc.).

Tecniche simili vengono utilizzate anche per rappresentare caratteristiche non numeriche.
Quale funzione di perdita (loss function) usare per i compiti di classificazione?

**Per la classificazione binaria:**  
**Binary Cross Entropy**

  Per un singolo campione:
$$-y \log_2(p) - (1 - y) \log(1 - p) $$
  Per $n$ campioni: 
  $$ -\frac{1}{n} \sum_{i=1}^{n} \left[y_i \log_2(p_i) + (1 - y_i) \log(1 - p_i)\right] $$

  **Per la classificazione multi-classe:**  
  **Categorical Cross-Entropy**
  Per un singolo campione:
  $$-\sum_{k=1}^{K} y_k \log_2(p_k) $$
  Per $n$ campioni:
$$-\frac{1}{n} \sum_{i=1}^{n} \sum_{k=1}^{K} y_{i,k} \log_2(p_{i,k})$$
- $p$ è la probabilità stimata e corrisponde a $\hat{y}$.

### Metrics for classification
Binary classification, two classes, $C1$ and $C2$.

![[127K.png]]
![[128K.png]]
![[129K.png]]

```ad-example
![[Pasted image 20250521171015.png]]
![[Pasted image 20250521171119.png]]


```

```ad-example
![[Pasted image 20250521171046.png]]
![[Pasted image 20250521171145.png]]

Possible metric for unbalanced datasets:
- Balanced accuracy

$$\frac{1}{2}(\frac{TP}{TP+FN} + \frac{TN}{TN+FP})=0.5$$

Balanced accuracy equal to 0.5 means either that the model is just guessing, or that it can predict well just one class.

```

Multi-class classification, three classes, $C_1$, $C_2$ and $C_3$ 
![[2Semester/IOT/Image IOT2ESONERO/134.png]]

```ad-example

![[Pasted image 20250521171419.png]]
![[Pasted image 20250521171429.png]]
![[Pasted image 20250521171437.png]]
![[Pasted image 20250521171447.png]]
![[Pasted image 20250521171511.png]]


```

## Bias (dataset)
I Machine Learning Model (ML) non sono intrinsecamente oggettivi.
- Il bias di selezione si verifica quando la selezione del campione del training set non riflette accuratamente la popolazione target.
- Il bias storico si verifica quando la distribuzione dei dati cambia nel tempo e il modello non viene adattato per gestire la nuova distribuzione.

```ad-example

Esempio: un sensore IoT per la qualità dell'aria viene installato all'esterno e addestra un modello locale per prevedere i picchi di inquinamento. Il modello viene addestrato in estate, quando la maggior parte delle attività cittadine sono chiuse. Quando in inverno le attività riaprono, la qualità dell'aria ha una distribuzione diversa, ma il modello non riesce a gestirla.
```


### Bias-Variance Tradeoff
The bias–variance tradeoff describes the relationship between a model's complexity (i.e., number of hidden layers, number of nodes), the accuracy of its predictions, and how well it can make predictions on previously unseen data.

![[140K.png]]

The bias–variance tradeoff describes the relationship between a model's complexity (i.e., number of hidden layers, number of nodes), the accuracy of its predictions, and how well it can make predictions on previously unseen data.

![[141K.png]]


# Federated Learning

## Can data live at the edge?
Billions of phones and IoT devices constantly generate data. Data processing is moving on the device:
- Improved latency
-  Work offline
- Privacy advantages

```ad-example
On-device inference for next word/emoji prediction in mobile phones.

```

## Non local/Local Learning

![[142K.png]]

In **non-local learning**, end points send data to a central server/multiple central servers that train a NN on the data collected by the end points. Users can access the model to query inference tasks (MLaaS).

In **local learning**, each device stores, trains and maintains its own ML model and trains it on its local data.

## Problems with non local Learning in IoT
Inviare dati al cloud può essere troppo costoso, soprattutto in applicazioni come i veicoli autonomi, dove decisioni critiche (velocità, frenata, sterzata, ecc.) devono essere prese in tempo reale. Se la rete neurale risiede nel cloud, la risposta può essere troppo lenta o del tutto assente in mancanza di connessione. Inoltre, i dati da elaborare possono essere flussi video, che richiedono molta banda.

Un altro problema riguarda la privacy: dispositivi sanitari, ad esempio, raccolgono dati sensibili come pressione, battito cardiaco o assunzione di farmaci. Inviando questi dati a un server cloud, c'è il rischio che vengano intercettati, con gravi conseguenze come furto di identità o discriminazioni assicurative.

Anche la quantità di dati può essere problematica: i dispositivi IoT generano grandi volumi di informazioni che possono sovraccaricare i server. Inoltre, molti di questi dispositivi hanno risorse limitate (energia, connettività) e non possono trasmettere tutto.

Per ovviare a questi problemi, i dispositivi IoT o i coordinatori locali possono eseguire modelli di machine learning direttamente in loco, addestrandoli sui propri dati e usandoli per prendere decisioni. Tuttavia, se i dati locali sono scarsi o poco vari, i modelli risultano deboli o distorti.

Un esempio è l'agricoltura: sensori in una fattoria possono raccogliere dati e addestrare un modello locale per decidere quando irrigare o segnalare malattie. Ma se il campo non ha mai avuto un certo fungo o infestante, il modello locale non lo riconoscerà e prenderà decisioni sbagliate.


## Federated Learning
Federated Learning (FL) represents a valuable alternative to combine the advantages of non-local training (i.e., more data storage availability, less computation at the edge, more accurate NN) and local training (data privacy, low latency inference).
For these reasons, FL is widely used for IoT applications. Main idea:
- Several devices share the same NN architecture.
- Each device trains the NN on its own data.
- Devices share some parameters of the NN (e.g., weights and biases, or gradients)
- Each device aggregates the parameters of the other devices, advantaging from the training and the data of other devices, but without its local data ever being shared.

>Devices form a “federation” and collaborate while keeping data decentralised

==Ideal scenario==: the model of each device performs as good as a centralised model trained on the entire union of each local dataset would.

==Realistic objective==: the ML model on each device in the federation performs better than it would if trained only on the local data.

## Federated Learning vs Distributed Learning
In distributed learning, data is usually centrally stored.
- Multiple devices (usually powerful servers) train the model in parallel.
- Different kinds of parallelism can be implemented.

![[143K.png]]

In ==federated learning==, data is stored on each device (usually non powerful end nodes).
Devices train the model in parallel, each on its own chunk of data.

**Objective**: train a more accurate and generalised model than each device would on its
own data while keeping data privacy, preserving computing resources.

**Challenges**:
local datasets are not iid (Independent and identically distributed - different datasets exhibit different probability distributions), and may be imbalanced. -> need for intelligent model aggregation solution.

**Vulnerable to attacks**: some attacks show that the original raw data can be retrieved
by observing the model’s parameters exchanged between parties. Some attackers
can participate in the federation and share wrong parameters, preventing the other
parties’ models to converge.

**Node availability**: some nodes are not always available for training, since they might
be power-constrained.

## FL applications in IoT
FL finds many applications in IoT, for example:
- Smart Robotics
- Smart Object Detection
- Smart homes
- Smart Cities
- Healthcare
- And many others

### Challenges
IoT systems are characterised by low power, low computational capabilities of possibly hundreds of nodes. It is hard to train complex models on them, and communication must be optimised.

Nodes are not reliable, they want to be in idle mode as much as possible. 

Nodes are heterogeneous in hardware, geographically distributed. They do not share a common standard to represent processed data. The data they collect is not iid (independent and identically distributed).

Nodes live in low bandwidth networks.
Nodes want to participate in the federation, and client selection can favour more powerful nodes, leaving the less powerful ones in starvation.

## Taxonomy
![[144K.png]]

## Centralised FL
A central server orchestrates the training process. Participants train local models on their data.
Participants’ send the updated model parameters to the central server.
The server aggregates these parameters to update the global model, which is then distributed back to the clients.
The central server coordinates the training, aggregation, and distribution processes.
Model updates are aggregated at a single point, simplifying the update process.

![[145K.png]]


## Decentralised FL
In decentralized Federated Learning participants communicate directly with each other to share and aggregate model updates (peer-to-peer).

Each party keeps a mixing matrix, that weighs the contribution of each other party of the aggregation. Can have 0 entries, can vary over time.

This peer-to-peer communication ensures that There is no single point of failure and enhances privacy by distributing the aggregation process.

![[146K.png]]

## FedAvg
- **Fundamental algorithm for centralised FL [McMahan 2017].**
- Consider a set of $K$ parties (devices).
- Each party $k$ stores a local dataset $D_k$ of $n_k$ points, on which it trains a neural network.
- Let $D = D_1 \cup \ldots \cup D_K$ be the joint dataset and $n = \sum_k n_k$ the total number of points.
- **Goal**: minimising the average loss function $\mathcal{L}(\theta, D)$, i.e., solve the problem:
$$\min_{\theta \in \mathbb{R}^p} \mathcal{L}(\theta, D)$$
where
  - $\theta = (\theta_1, \ldots, \theta_p)$ is the set of parameters of the neural network,
  - $\mathcal{L}(\theta, D) = \sum_{k=1}^{K} \frac{n_k}{n} \mathcal{L}_k(\theta_k, D_k)$ is the average of the loss function of the parties, weighted by their training set sizes,
  - $\mathcal{L}_k(\theta_k, D_k) = \sum_{d \in D_k} \mathcal{L}(\theta, d)$ is the average loss function achieved by party $k$ on all points of its training set.

![[147K.png]]
![[148K.png]]

## Decentralised FedAvg

* We can derive an algorithm based on FedAvg but for fully decentralised settings, where parties act as peers and do not interact with a central server for aggregation.

* Let $G=(V=\{1,\ldots,K\},E)$ be an undirected graph where nodes are parties and an edge $(k,l)$ exists if $k$ and $l$ can exchange messages.

* Let $W\in[0,1]^{K\times K}$ be a symmetric, bistochastic matrix such that if $\exists l(k,l)$ then $W_{k,l}=W_{l,k}=0$ (mixing matrix).

* Given parties' parameters $\Theta=[\theta_{1},\ldots,\theta_{K}]$, $W\Theta$ is a weighted aggregation between neighbouring nodes in $G$:
  $[W\Theta]_{k}=\sum_{l\in\mathcal{N}_{k}}W_{k,l}\theta_{l}$
  
  Each party $k$ only cares about the $k$-th row of the matrix, which says how much weight it must give to the parameters of each of its neighbours in $l\in\mathcal{N}_{k}$. Each $\theta_{k}$ is the vector of the parameters of party $k$.
![[150K.png]]

### Resource optimisation in decentralised FedAvg
* $\tau$: numero di aggiornamenti locali per ogni round
* $I'$: numero totale di aggiornamenti locali eseguiti da ogni parte, $I' = \tau \cdot I_{max}$, dove $I_{max}$ è il numero massimo di round
* Ogni parte ha $M$ diversi tipi di risorse (tempo, energia, banda, ecc.)

Consumo di Risorse:
* Per ogni parte e ogni risorsa $m \in M$:
  - Un aggiornamento locale consuma $c_{m}$ risorse
  - Un aggiornamento globale (aggregazione) consuma $b_{m}$ risorse
  - Budget massimo di risorse per ogni $m$ è $K_{m}$

 Problema di Ottimizzazione:
**Obiettivo**: Determinare $\tau$ e $I_{max}$ per:
1. Minimizzare la funzione di perdita media $F(\mathbf{w}^{t})$
2. Rispettare i vincoli di budget delle risorse

$\min_{\tau,K\in\{1,2,3,...\}} F(\mathbf{w}^{t})$

**Vincoli**:
$(T+1)c_{m} + (K+1)b_{m} \leq R_{m}, \forall m\in\{1,...,M\}$
$T = K\tau$

## Non i.i.d. data
One of the greatest challenges in FL comes from the fact that the local datasets of the parties might follow very different probability distributions, causing client drifts. Local model updates toward local optimal solutions, resulting in performance degradation of the global model. Averaging the parameters in these cases does not guarantee the convergence to the optimal model. More sophisticated ways to aggregate models are needed.

## FedZero (riprendere da 124 compresa)



## ProxyFL
