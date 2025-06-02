
# ML/AI
==Artificial Intelligence== è il campo che si occupa dello sviluppo di computer e robot capaci di comportarsi in modi che imitano le capacità umane, senza interferenza umana.

==Machine Learning== is a sub-field of AI that uses algorithms to automatically learn insights and recognize patterns from data.

![[96k.png]]

## Classification and regression 
In machine Learning, there are ==two main types of task==:
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
Consider a ==dataset==, characterised by an independent variable (features) and a dependent variable (to predict), for instance:
• **Independent variable** = size
• **Dependent variable** = cost
• **Each data point is a house** (osservazione del dataset, ogni record e dunque coppia dimensione e costo indica un data point che rappresenterebbe in questo esempio una casa)

By observing the distribution of the data points, we can notice a linear relationship between the two variables.

>La regressione lineare serve a prevedere il valore della variabile dipendente, dati i valori di quella indipendente

```ad-example

The cost of the house grows linearly with its size.
```

```ad-important

find the line that better “fits” the data point.
```


The line that better “fits” the data point is the line that better represents the relationship between the two variables, given a set of data points. By finding such a line, given the size of a
house, we can predict how much it costs with some confidence

```ad-example

![[100K.png]]


- L'**asse X** è la **variabile indipendente** (es. dimensione della casa).
- L'**asse Y** è la **variabile dipendente** (es. costo della casa).
- Ogni **punto blu** è un **punto dati**, cioè una casa, con una certa dimensione e un certo costo.


**Secondo Grafico**
- La **retta viola** è la **retta di regressione**, ovvero il modello che stima il prezzo di una casa in base alla sua dimensione.
-data la dimensione di una casa (asse X), la retta prevede il suo prezzo (asse Y).
- La **freccia verticale rossa** mostra la **differenza tra il prezzo reale e quello stimato** → questo è **l’errore (residuo)**.

**Terzo Grafico**
- La retta è descritta con l’equazione:
    
  $$\hat{y} = \theta_1 x + \theta_0$$
    
    Dove:
    
    - $\theta_1$​ è il coefficiente angolare (quanto cresce il prezzo al crescere della dimensione),
        
    - $\theta_0$​ è l'intercetta (valore iniziale, cioè il costo base).
        
- Il punto $(x_i, y_i)$ è un punto reale del dataset.
    
- Il punto $(x_i, \hat{y}_i)$ è il valore **predetto** dal modello per quella stessa dimensione.
    
- La differenza verticale tra $y_i$​ e $\hat{y}_i$​ è il **residuo**, ovvero l'**errore** del modello su quel punto.

```


We can fit many lines, non of them is perfect, since data points are not aligned. How to we find the “best” one? And how do we decide if a line is “better” than the other?
Recall that the function of a line is:
$$\hat y = \theta_1x + \theta_0$$
where:
- $\theta_1$ is the slope (pendenza)
- $\theta_0$ is the intercept

Given the function of a line, for each point , we can compute the residual, i.e., the difference between (real value) and (predicted value).

To define how good a line fits the data, we can define different loss functions, that are functions of the residuals of the data points in the dataset.

- $L1$ loss $= \Sigma_{i=1}^n \mid \hat y_i - y_i \mid$
- Mean Absolute Error(MAE) $= \frac{1}{n} \Sigma_{i=1}^n \mid \hat y_i - y_i \mid$ (When data set contains many outliers)
- $L2$ loss $= \Sigma_{i=1}^n ( \hat y_i - y_i )^2$
- Mean Square Error (MSE)  $= \frac{1}{n} \Sigma_{i=1}^n ( \hat y_i - y_i )^2$ (When data set contains many outliers)


![[101K.png]]

```ad-success
title: Objective
Choose one of these loss functions, and find the line that minimises it.

```

```ad-important
> Anche quando abbiamo **più di una variabile indipendente** (cioè più fattori che influenzano il risultato), possiamo comunque usare la **regressione lineare**.

In particolare:

- Non cerchiamo più una **retta** che si adatti ai dati, ma un **piano** (o un **iperpiano**, se le variabili sono molte).
    
- L'obiettivo è sempre lo stesso: **trovare i coefficienti** (θ₀, θ₁, θ₂, ...) che **minimizzano una funzione di perdita** (come l’MSE).
    
- Anche se la matrice non è invertibile (un problema matematico), possiamo comunque risolvere il sistema usando il **pseudoinverso**.
    

👉 In sintesi: la regressione lineare si può estendere facilmente anche a più variabili, e l’approccio geometrico (retta → piano → iperpiano) resta valido per trovare la miglior soluzione.

```


## Polynomial Regression
What if the data points do not exhibit a linear behaviour, but rather a polynomial one? In this case, we can **search for the best polynomial that fits the data**!
$\hat y = \theta_0 + \theta_1x + \theta_2x^2 + \cdots + \theta_mx^m$

>As before, we can do that by searching for the coefficients $(\theta_0, \theta_1, \cdots, \theta_m)$ that minimise a loss of function. 

Nota che, nello scenario che stiamo considerando adesso, la variabile dipendente dipende da una sola variabile indipendente, ma dipende anche dalle sue potenze

If we want to find the polynomial that minimises the Mean Square Error, can we still use the normal equation? Yes! Given $n$ data points $(x_i, y_i)$, we define:

![[106K.png]]

What if the polynomial behaviour occurs over multiple variables? We can still use normal equations. Given data points $n$, we define $(x_{1,i}, \cdots, x_{d,i}, y_i)$, we define:

![[107K.png]]

```ad-example
![[example.png]]

```

The problem with this approach are:
- Computing the (pseudo) inverse of $X^T_+ \cdot X_+$ is computationally expensive if the matrix is big
- Works only for MSE, and not for other loss functions as Mean Absolute Error (MAE) $= \frac{1}{n} \Sigma_{i=1}^n \mid \hat y_i - y_i \mid$
- Alternative: use a numerical apporach
- Recall the chain rule for derivates of composition of function $\frac{d[f(g(x))]}{dx} = g'(x) \cdot f'(g(x))$

### Chain Rule
```ad-example
title:  Example 1
![[Example2.png]]

```

```ad-example
title:  Example 2
![[Example3.png]]

```

# Gradient Descent

## Gradient

```ad-abstract
title: Definizione di gradiente
Il ==gradiente di una funzione== è il vettore delle sue derivate parziali:
$$\bigtriangledown f(x_1, \cdots, x_n) = [\frac{\partial f}{\partial x_1}, \cdots, \frac{\partial f}{\partial x_n}]$$

Se $n=1$ il gradiente è semplicemente la derivata di $f$
```

In più dimensioni, **la derivata non è più solo un numero**, ma un vettore che indica:
- **La direzione** in cui la funzione cresce più rapidamente
- **La velocità di crescita** nella direzione della massima salita

>se sei su una "superficie" definita da $f(x_1, \cdots, x_n)$, il gradiente ti dice **in che direzione salire per aumentare più velocemente**.

## Gradient Descent
```ad-abstract
title: Definition
La ==discesa del gradiente== è un **algoritmo iterativo** che serve a trovare il minimo di una funzione, cioè il punto in cui la funzione assume il valore più basso possibile.

```

Può essere applicato se:
- $f$ è differenziabile 
- se $f: D \subseteq R → R$ allora è differenziabile (se la sua derivata, per ogni variabile, è definita in ogni punto di $D$ ovvero Dominio)

![[111K.png]]

- se $f: D \subseteq R^n \to R$, dire se è differenziabile o meno, è più complicato.

==Condizione sufficiente==: se per ogni punto $a \in D$, tutte le derivate parziali esistono e sono continue in un intorno di $a$, allora la funzione è differenziabile.

![[112K.png]]


La discesa del gradiente è un algoritmo **iterativo**. Partendo da un punto iniziale $x_0$​, si calcola il gradiente della funzione $\nabla f(x_0)$, che è un vettore che indica la direzione di massima crescita della funzione.

Per trovare il minimo, si procede spostandosi in direzione opposta al gradiente, cioè verso la direzione di massima discesa.

>Se la funzione $f$ è **convessa**, allora la discesa del gradiente **converge sempre al minimo globale**.

![[113K.png]]

```ad-info
title: Procedimento
Scegli un punto iniziale da cui partire
Calcola il gradiente della funzione in quel punto
Osserva il valore del gradiente nel punto iniziale
Sposta il punto di un passo nella direzione opposta al gradiente
Ora mi trovo in un nuovo punto.
**Ripeti** questi passi per un certo numero massimo di iterazioni, oppure fino a quando il miglioramento diventa più piccolo di una certa **tolleranza**

```

![[115K.png]]

Lo step è definito “==learning rate==”
**Velocità di apprendimento elevata**: muoversi rapidamente nella direzione opposta al gradiente
**Velocità di apprendimento ridotta**: muoversi lentamente nella direzione opposta al gradiente

![[116K.png]]

```ad-example
title: Example 
Funzione:
$$
f(x, y) = x^2 + y^2
$$

Gradiente:
$$
\nabla f(x,y) = (2x, 2y)
$$

Punto iniziale:
$$
(x_0, y_0) = (2, 3)
$$

Learning rate:
$$
\alpha = 0.1
$$

|Iterazione|$x$|$y$|$f(x,y) = x^2 + y^2$|
|---|---|---|---|
|0|2.00|3.00|4+9=134 + 9 = 13|
|1|1.60|2.40|2.56+5.76=8.322.56 + 5.76 = 8.32|
|2|1.28|1.92|1.64+3.69=5.331.64 + 3.69 = 5.33|

Si avvicina sempre di più al punto $(0,0)$!
```


# Introduction to Neural Networks (MLP and back propagation)

```ad-abstract
title: Introduzione

Molto spesso, i dati sono rappresentati con numerose caratteristiche (features) e presentano complessi pattern non lineari difficili da individuare con la regressione.
Le **reti neurali** sono una famiglia di architetture di modelli progettate per individuare pattern non lineari nei dati.
La loro struttura e i loro componenti si ispirano alla struttura biologica dei neuroni umani.
```

## Perceptron
The perception is the building block of a neural network. The number of input nodes is given by the number of features of the data points.

![[118K.png]]

> If the activation function is the identity function, this is a simple linear regression model, where is the intercept.

Given an input data point with $d$ features $x_1, \cdots, x_d$, the neuron:
Computes a linear combination of the input and the synapses weights, possibly adding the bias: 
$$b + \sum_{i=1}^d w_i x_i$$

>Il **bias** permette al modello di **spostare** la funzione di attivazione **verso l’alto o verso il basso**, rendendola più flessibile.

or in a matrix form: $b+ w^T \cdot x$ where $w = [w_1, \cdots, w_d]^T$ and $x = [x_1, \cdots, x_d]^T$
Applies the activation function to the combination

## Activation functions
==Activation functions== enables a perceptron to learn non-linear and complex relationships between features and label.

![[119K.png]]
## Single layer Perceptron
Neurons and Synopsis are organised in layers: the input layer, one or more hidden layers, and the output layer.

![[120K.png]]

## Multi Layer Perceptron (MPL)
Neurons and Synopsis are organised in layers: the input layer, one or more hidden layers, and the output layer.

![[121K.png]]

```ad-abstract
title: Deep Learning 
Il **deep learning** è un ramo del **machine learning** che utilizza **reti neurali con più strati** (reti profonde) per apprendere automaticamente **rappresentazioni complesse dai dati**.  
È particolarmente efficace in compiti come **classificazione, regressione, visione artificiale, elaborazione del linguaggio naturale** e riconoscimento vocale.  
Le reti vengono **allenate** attraverso algoritmi come **backpropagation** e **gradient descent**, modificando i **pesi e i bias** per minimizzare l'errore.

```

>**impara automaticamente** a trasformare i **dati grezzi** (come pixel, parole o numeri) in **informazioni utili** per svolgere un compito



Un ==MLP (Multi Layer Perceptron)== è un esempio di rete neurale **feed-forward**, cioè:
- I **dati corrono in avanti**: dagli input → ai layer nascosti → all’output.
- **Non ci sono cicli** o feedback (nessuna informazione torna indietro nel tempo o ai layer precedenti).

Contrasto con le ==reti neurali ricorrenti==:
- In una **RNN**, l'output di un nodo può andare **indietro** a un nodo in un layer precedente o allo stesso nodo in un momento successivo.
- Sono usate per dati **sequenziali** (come testi, audio, serie temporali).

==Weight e bias==  Sono i **parametri del modello**, cioè i numeri che determinano come ogni neurone combina i suoi input. Vengono aggiornati automaticamente durante il processo di **training** usando algoritmi come **backpropagation + gradient descent**.

Gli ==iperparametri== sono **scelte progettuali** che fai **prima dell'addestramento**.

Esempi:
- Quanti **layer nascosti** usare
- Quanti **neuroni per layer**
- Quale **funzione di attivazione** usare (ReLU, sigmoid, ecc.)
- Quale **learning rate** usare
- Quanti **epoch** (giri di addestramento)

Gli iperparametri
- **Non si aggiornano automaticamente**
- Vanno scelti **a mano** o usando tecniche come **grid search** o **random search**

## Backpropagation
```ad-abstract
title: Definition

==Backpropagation== is an algorithm to train feedforward neural networks. Training a neural network means to find the optimal parameters (weights and bias) that model the behaviour of a phenomenon (e.g., how the dosage of a drug influence its efficacy).
```


The phenomenon is not described by a mathematical model  but only by observed data.

Quindi, trovare i parametri ottimali significa trovare i parametri che minimizzano l'errore rispetto ai dati di input. Per addestrare una rete neurale, è necessario alimentarla con molti punti dati o campioni, che costituiscono il training set - apprendimento supervisionato.

![[122K.png]]


```ad-note
title: Procedimento ==concettuale==

### 🔹 1. Inizializzazione
I **pesi** (`weights`) e i **bias** della rete neurale vengono inizializzati **a caso**.

- Ogni collegamento tra neuroni ha un **peso** \( w \)
- Ogni neurone ha un **bias** \( b \)
- I valori iniziali sono di solito **piccoli e casuali**


### 🔹 2. Forward Step (Passaggio in avanti)

Si prende un esempio dal dataset di addestramento:

$$
(x_1, \cdots, x_d, y)
$$

- Dove \( $x_1, ..., x_d$ \) sono gli **input**
- \($y$ \) è l’**output corretto** (etichetta)

#### Passaggi:
- Gli input vengono **passati strato per strato** attraverso la rete
- Ogni **neurone** calcola:

$$
z = w \cdot x + b
$$

e applica una **funzione di attivazione** (es. ReLU, Sigmoid)

- Alla fine otteniamo l'**output della rete** \( $\hat{y}$ \)

---

### 🔹 3. Backward Step (Passaggio all’indietro)

L’output della rete è diverso dal valore atteso \( $y$ \).  
Ora calcoliamo **quanto ogni peso e bias ha contribuito all’errore**.

#### Tecnica usata:
- Si utilizza la **regola della catena** per derivare l’errore
- Questo processo si chiama **backpropagation**
- Si calcola il **gradiente** dell’errore rispetto a ciascun peso e bias

### 🔧 Aggiornamento dei parametri (Gradient Descent)
Dopo aver calcolato i gradienti, si aggiornano i pesi e i bias:

$$
w_{i,j}^{(l)} \leftarrow w_{i,j}^{(l)} - \eta \frac{\partial \mathcal{L}}{\partial w_{i,j}^{(l)}}
$$

$$
b_{j}^{(l)} \leftarrow b_{j}^{(l)} - \eta \frac{\partial \mathcal{L}}{\partial b_{j}^{(l)}}
$$

- \( $\mathcal{L}$ \) è la **funzione di perdita** (loss)
- \( $\eta$ \) è il **learning rate**
- Si **sottrae una parte del gradiente**: così ci si muove nella direzione in cui l’errore diminuisce


### 🔁 Ripetizione del ciclo

Il processo (forward → backward → aggiornamento) si ripete:
- Per **ogni esempio** del dataset
- Per **più epoche** (più giri sull’intero dataset)

Fino a quando:
- L’**errore è sufficientemente basso**
- Oppure si raggiunge il **numero massimo di iterazioni**
```

> Si sottrae una piccola parte ($η$) del gradiente ($∂$) della funzione di errore rispetto a $w$ o $b$.

```ad-seealso
title: Procedimento ==Matematico== e ==Dettagliato==

Possiamo allenare la rete neurale su un dataset di $N$ campioni $(x_{i,1}, \ldots, x_{i,d}, y_i)$.
Il processo funziona come segue:
  - dataset di $N$ esempi
  - Inizializzare pesi e bias in modo casuale.
  - Per ogni batch di $n$ elementi:
    - Fornire alla rete ogni campione (dato), ottenere la predizione $\hat{y}_i$ e calcolare i corrispondenti valori della funzione di loss:$$
      \mathcal{L}(x_{i,1}, \ldots, x_{i,d}, y_i) = \mathcal{L}_i = \frac{1}{2} (\hat{y}_i - y_i)^2
      $$
    - Considerare la media dei valori delle funzioni di loss:
      $$
      \mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} \mathcal{L}_i
      $$
    - Calcolare i gradienti di $\mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} \mathcal{L}_i$ rispetto a ciascun parametro e proseguire fino allo stop (backpropagation).

Con i gradienti calcolati, si aggiornano i parametri del modello nella direzione opposta al gradiente (da cui il termine "discesa del gradiente") per minimizzare la perdita.

> 💡 Questo è **un'epoca (epoch)**. (dal per ogni fino alla fine)
```



```ad-todo
title: Per ricordare
Arrivo all'output, calcolo la funzione di attivazione ed ottengo un output. con questo output calcolo la funzione di perdita per fare backpropagation.

```



Durante **l'addestramento di una rete neurale**, l'intero ==dataset viene suddiviso in tre parti==: 
- **insieme di addestramento** (training set), 
- **insieme di validazione** (validation set) 
- **insieme di test** (test set). 
L'addestramento della rete viene eseguito in più ==epoche== (epochs), dove **un'epoca corrisponde all'elaborazione completa di tutti i dati di addestramento, divisi in sottoinsiemi chiamati batch.**

**Inizio dell’addestramento**
- All’inizio della prima epoca, i pesi e i bias della rete sono inizializzati **casualmente**.
- La rete viene allenata **batch dopo batch**:
    - Per ogni batch, si fa un **forward pass** (propagazione in avanti) 
    - Si calcola la **loss function** (funzione di perdita), che misura quanto le predizioni si discostano dal risultato vero.
    - Si fa il **backward pass** (retropropagazione) per calcolare i gradienti della loss rispetto ai pesi.
    - Si aggiornano i pesi e bias usando questi gradienti (ad esempio con gradient descent).


**Addestramento nelle epoche successive**
- A partire dalla seconda epoca, il processo continua usando i pesi aggiornati dell’epoca precedente.
- Questo ciclo si ripete finché non si raggiunge un numero massimo di epoche prestabilito o finché la rete non migliora più.


**Stochastic Gradient Descent (SGD)**
- Quando l’aggiornamento dei parametri non si fa sull’intero dataset contemporaneamente, ma su **piccoli batch o singoli esempi**, parliamo di **SGD**.
- I batch vengono spesso scelti in modo casuale da tutto il training set, per evitare di far imparare alla rete un ordine fisso dei dati.


**Valutazione su validation set**
- Alla fine di ogni epoca, la rete viene valutata sul **validation set**.
- Serve per monitorare se la rete sta imparando bene o se sta iniziando a **overfittare** (cioè imparare troppo bene i dati di training senza generalizzare).
- I parametri migliori vengono scelti in base alle prestazioni sul validation set.



**Valutazione finale su test set**
- Quando l’addestramento è completato, la rete viene testata sull’insieme di test.
- Questo serve per misurare la **capacità di generalizzazione** della rete su dati completamente nuovi.
- Le metriche usate dipendono dal problema:
    - **Regressione:** MAE (errore assoluto medio), MSE (errore quadratico medio).
    - **Classificazione:** accuratezza, precisione, recall, F1-score.


## NN for Binary classification
==Neural network for binary classification==, where the samples belong to one of two possible classes (e.g., spam detection, disease detection).

- One output node with sigmoid activation function (trasforma il riultato in un numero tra $0$ ed $1$.)

![[125K.png]]

Quando ci sono più di due classi, La rete ha **tanti nodi di output quanti sono le classi** (ad esempio 3 nodi se ci sono 3 classi). Per attivazione si usa la **softmax**, che trasforma gli output in probabilità (tutti tra 0 e 1, sommate a 1).

![[126K.png]]

Le classi spesso non sono numeri, Per lavorare con la rete, si assegna a ogni classe un numero intero.  Questo procedimento è chiamato ==label Enconding==.

### Loss function for classification
```ad-question
Quale funzione di perdita (loss function) usare per i compiti di classificazione?

```

==Binary Cross Entropy==
Si usa quando ci sono **due classi**. - La rete dà in output una probabilità $p$ che il campione appartenga alla classe positiva. Il valore vero $y$ è $0$ o $1$.
$$-y \log_2(p) - (1 - y) \log(1 - p) $$
  Per $n$ campioni: $$ -\frac{1}{n} \sum_{i=1}^{n} \left[y_i \log_2(p_i) + (1 - y_i) \log(1 - p_i)\right] $$

  
 ==Categorical Cross-Entropy==
- Si usa quando ci sono **più di due classi** (esempio: riconoscere tra gatto, cane, topo).
- La rete dà in output un vettore di probabilità $\mathbf{p} = [p_1, p_2, \dots, p_K]$, dove $K$ è il numero di classi.
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
![[Pasted image 20250601122746.png]]
![[Pasted image 20250601122751.png]]


```

```ad-example
![[Pasted image 20250601122807.png]]
![[Pasted image 20250601122812.png]]

Possible metric for unbalanced datasets:
- Balanced accuracy

$$\frac{1}{2}(\frac{TP}{TP+FN} + \frac{TN}{TN+FP})=0.5$$

Balanced accuracy equal to 0.5 means either that the model is just guessing, or that it can predict well just one class.

```

Multi-class classification, three classes, $C_1$, $C_2$ and $C_3$ 
![[2Semester/IOT/Image IOT2ESONERO/134.png]]

## Bias (dataset)
Nei modelli di Machine Learning, il bias non è solo un “errore” casuale, ma un tipo di **distorsione sistematica** nei dati o nel modo in cui i dati vengono raccolti o usati. Questo può portare il modello a fare previsioni sbagliate o ingiuste.

- Il ==bias di selezione== si verifica quando la selezione del campione del training set non riflette accuratamente la popolazione target (esempio aereo militare (il mio dataset sono solo quelli tornati)).
- Il ==bias storico== si verifica quando la distribuzione dei dati cambia nel tempo e il modello non viene adattato per gestire la nuova distribuzione.

(esempio aereo è un bias di selezione)
![[Pasted image 20250601225824.png|300]]


```ad-example

Esempio: un sensore IoT per la qualità dell'aria viene installato all'esterno e addestra un modello locale per prevedere i picchi di inquinamento. Il modello viene addestrato in estate, quando la maggior parte delle attività cittadine sono chiuse. Quando in inverno le attività riaprono, la qualità dell'aria ha una distribuzione diversa, ma il modello non riesce a gestirla. (bias storico)
```

### Bias-Variance Tradeoff
The bias–variance tradeoff describes the relationship between a model's complexity , the accuracy of its predictions, and how well it can make predictions on previously unseen data.

![[140K.png]]

![[141K.png]]


# Federated Learning

## Can data live at the edge?
Miliardi di telefoni e dispositivi IoT generano costantemente dati. L'elaborazione dei dati avviene sul dispositivo:
- Latenza migliorata
- Lavora offline
- Vantaggi per la privacy

## Non local/Local Learning
![[142K.png]]

In ==non-local learning==, end points send data to a central server/multiple central servers that train a NN on the data collected by the end points. Users can access the model to query inference tasks (MLaaS).

In ==local learning==, each device stores, trains and maintains its own ML model and trains it on its local data.

### Problems with non local Learning in IoT
```ad-failure
title: Problem

Inviare dati al cloud è spesso inefficiente e costoso per applicazioni IoT critiche (es. veicoli autonomi) a causa di latenza, consumo di banda e rischi di privacy. I dati sensibili (es. sanitari) possono essere intercettati, e l’elevato volume di informazioni può sovraccaricare i server.  

```

```ad-success
title: Solution
Una soluzione è usare modelli **locali**, addestrati direttamente sui dispositivi. 
```

>Tuttavia, se i dati locali sono limitati o poco rappresentativi, il modello può risultare **poco accurato**.  

```ad-example

In agricoltura, un modello locale potrebbe non riconoscere malattie mai viste nel proprio campo.
```

## Federated Learning
Il ==Federated Learning== è un approccio che combina i vantaggi dell’**addestramento locale** (privacy, bassa latenza) con quelli dell’**addestramento centralizzato** (modelli più accurati grazie a più dati).
- Più dispositivi (es. smartphone, sensori IoT) usano **la stessa rete neurale**.
- Ogni dispositivo **addestra localmente** il modello sui propri dati.
- Poi **condivide solo i parametri del modello** (pesi, bias, gradienti) e **non i dati grezzi**.
- I dispositivi si **scambiano e aggregano** i parametri ricevuti dagli altri, migliorando il proprio modello sfruttando l’esperienza altrui.

> I dispositivi formano una **“federazione”**: collaborano senza mai centralizzare i dati.

**Scenario ideale**: il modello di ciascun dispositivo offre prestazioni pari a quelle di un modello centralizzato addestrato sull'intera unione di ciascun dataset locale.

**Obiettivo realistico**: il modello di ML su ciascun dispositivo della federazione offre prestazioni migliori rispetto a quelle che otterrebbe se addestrato solo sui dati locali.

### Federated Learning vs Distributed Learning
In distributed learning, data is usually centrally stored.
- Multiple devices (usually powerful servers) train the model in parallel.
- Different kinds of parallelism can be implemented.

![[143K.png]]

In ==federated learning==, data is stored on each device (usually non powerful end nodes).
Devices train the model in parallel, each on its own chunk of data.

```ad-success
title: Obiettivo

Addestrare un modello più accurato e generalizzato rispetto a quello che ogni dispositivo utilizzerebbe sui propri dati, mantenendo al contempo la riservatezza dei dati e preservando le risorse di elaborazione.
```


**Challenges**:
I dati locali sui dispositivi **non sono distribuiti in modo uniforme** (non IID), cioè ogni dispositivo può avere dati con caratteristiche molto diverse. Inoltre, alcuni dispositivi hanno molti dati, altri pochissimi (**dataset sbilanciati**).  Serve un'**aggregazione intelligente** dei modelli per ottenere un buon modello globale.

**Vulnerable to attacks**: Attori malevoli possono partecipare alla federazione e **inviare parametri falsi**, compromettendo l'addestramento degli altri.

**Node availability**: I dispositivi (come smartphone o sensori) **non sono sempre attivi**: possono essere spenti, offline o a corto di batteria.

### FL applications in IoT
FL finds many applications in IoT, for example:
- Smart Robotics
- Smart Object Detection
- Smart homes
- Smart Cities
- Healthcare
- And many others

### Challenges
Nei sistemi IoT, il federated learning è complicato da **risorse limitate**, **nodi poco affidabili** e eterogenei, **dati non uniformi** (non IID), **reti a bassa banda** e disparità nella partecipazione, che favorisce i dispositivi più potenti a scapito di quelli più deboli.
## Taxonomy
==Tassonomia (classificazione)== del **Federated Learning (FL)**, suddividendo i vari tipi di scenari in cui può essere applicato.

- **Horizontal FL**: stessi tipi di dati (feature), ma utenti diversi (sample diversi).  
    _Esempio: due ospedali con le stesse analisi mediche ma su pazienti diversi._
- **Vertical FL**: stessi utenti, ma dati diversi (feature diverse).  
    _Esempio: una banca e un ospedale che hanno info diverse sugli stessi clienti._
- **Cross-device FL**: molti dispositivi (es. smartphone, IoT) poco affidabili, con potenza e connessione variabile.  
    _Esempio: app mobile che impara dal comportamento degli utenti._
- **Cross-silo FL**: pochi partecipanti (es. aziende, istituzioni) affidabili con buone risorse e rete stabile.  
    _Esempio: collaborazione tra aziende per addestrare un modello condiviso._
- **Centralised vs Decentralised FL**: si riferisce all'architettura usata per coordinare il processo.
    - _Centralised_: c’è un server centrale.
    - _Decentralised_: i partecipanti collaborano tra loro senza un server centrale.

### Centralised FL
A ==central server== orchestrates the training process. 
Participants train local models on their data.
Participants’ send the updated model parameters to the central server.
The server aggregates these parameters to update the global model, which is then distributed back to the clients.

The central server coordinates the training, aggregation, and distribution processes.
Model updates are aggregated at a single point, simplifying the update process.

![[145K.png]]


### Decentralised FL
In ==decentralized Federated Learning== participants communicate directly with each other to share and aggregate model updates (peer-to-peer).

Ogni nodo decide **con chi collaborare** e **quanto fidarsi** degli altri tramite la mixing matrix, rendendo il sistema più **flessibile**, **resiliente** e **privacy-friendly**.

![[146K.png]]

## FedAvg
FedAvg è un **algoritmo fondamentale per il Federated Learning (FL) centralizzato**.

Consideriamo un insieme di $K$ dispositivi (chiamati *parti* o *client*).  
Ogni dispositivo $k$ possiede un **dataset locale** $D_k$ composto da $n_k$ punti, su cui allena una rete neurale.

Definiamo:
- Il dataset globale come $D = D_1 \cup \ldots \cup D_K$  
- Il numero totale di dati come $n = \sum_k n_k$

```ad-success
title: Solution
Minimizzare la **funzione di perdita media** globale $\mathcal{L}(\theta, D)$, cioè risolvere il seguente problema di ottimizzazione:
$$\min_{\theta \in \mathbb{R}^p} \mathcal{L}(\theta, D)$$

```
dove:
- $\theta = (\theta_1, \ldots, \theta_p)$ è il vettore dei parametri del modello neurale (i "pesi" da apprendere),
- $\mathcal{L}(\theta, D) = \sum_{k=1}^{K} \frac{n_k}{n} \mathcal{L}_k(\theta_k, D_k)$ è la **perdita media pesata** dei partecipanti, dove il peso di ciascun partecipante è proporzionale alla dimensione del suo dataset,
- $\mathcal{L}_k(\theta_k, D_k) = \sum_{d \in D_k} \mathcal{L}(\theta, d)$ è la **perdita media locale** calcolata dal partecipante $k$ sul proprio dataset $D_k$.

🔁 In pratica, ogni dispositivo allena localmente un modello sui suoi dati, poi il server centrale raccoglie i parametri del modello allenato localmente e ne calcola una **media pesata**, tenendo conto della quantità di dati usata da ciascun dispositivo. Poi il server invia il nuovo modello globale a tutti i dispositivi. Il processo si ripete.



![[147K.png]]
![[148K.png]]

## Decentralised FedAvg
Possiamo derivare un algoritmo basato su FedAvg ma per impostazioni completamente decentralizzate, in cui le parti agiscono come pari e non interagiscono con un server centrale per l'aggregazione.

Let $G=(V=\{1,\ldots,K\},E)$ be an ==undirected graph== where **nodes are parties** and an **edge** $(k,l)$ exists if $k$ and $l$ can exchange messages.


Sia   $W \in [0,1]^{K \times K}$  una ==matrice quadrata== che ha alcune proprietà importanti:
 
- **È simmetrica:** il peso che il nodo \(k\) assegna al nodo \(l\) è uguale al peso che \(l\) assegna a \(k\), cioè  $W_{k,l} = W_{l,k}.$
- **È bistocastica:** ogni riga e ogni colonna sommano a 1. Questo significa che i pesi sono distribuiti in modo equilibrato tra i vicini.
- Se due nodi non sono collegati nella rete (cioè non possono comunicare direttamente), allora i pesi corrispondenti devono essere zero:  $W_{k,l} = W_{l,k} = 0.$

Questa matrice si chiama ==matrice di mescolamento (mixing matrix)==, perché serve a combinare le informazioni tra nodi vicini.


Hai un insieme di nodi (computer o dispositivi) in una rete, ciascuno con il proprio modello locale, che chiamiamo $\theta_k$ per il nodo $k$. Dato un insieme di modelli locali dei partecipanti, indicati con  
$$\Theta = [\theta_1, \dots, \theta_K]$$
Ora, vuoi che ogni nodo migliori il suo modello locale _scambiando informazioni_ con i nodi vicini a lui nella rete. La matrice $W$ ti dice **quanto un nodo si "fida"** o quanto pesa il modello di ogni altro nodo nel processo di aggiornamento.
- La riga $k$ di $W$ contiene i pesi che il nodo $k$ dà a tutti gli altri nodi (compresi eventualmente sé stesso).
- Se un nodo $l$ non è vicino a $k$, il peso $W_{k,l}$​ sarà zero (cioè non si considera il modello di $l$ nel calcolo di $k$).

L’aggregazione avviene così:  
$$
[W\Theta]_k = \sum_{l \in N_k} W_{k,l} \cdot \theta_l
$$
Questo significa che il nodo ($k$) aggiorna il proprio modello facendo una media pesata dei modelli dei suoi vicini, e i pesi sono presi dalla riga ($k$) della matrice ($W$).

```ad-info
Immagina che ogni nodo abbia un modello diverso. Per migliorare il proprio modello, ciascun nodo guarda i modelli dei suoi vicini e li combina, ma non tutti allo stesso modo: quelli di cui si fida di più pesano di più.

Così si diffondono informazioni e modelli migliori tra i nodi, senza che ci sia un "centro" che fa tutto da solo.

```

processo ==aggiornamento== avviene alternando:
- Aggiornamenti locali
- Aggiornamenti aggregazione
La ==matrice di mescolamento== $W^{(t)}$) può cambiare nel tempo (cioè ad ogni step $t$):
La ==velocità di convergenza== dipende dalla topologia: più connessioni significano una convergenza più rapida, ma anche un maggiore utilizzo di risorse.
Si può scegliere di aggiornare i modelli scambiando informazioni tra nodi **solo ogni $\tau$ aggiornamenti locali**.

```ad-question
How do we set $\tau$

```
### Resource optimisation in decentralised FedAvg
* $\tau$: numero di aggiornamenti locali eseguiti da ogni nodo prima di un’aggregazione
- $I_{max}$​: numero massimo di round (cioè di aggregazioni)
- $I' = \tau \cdot I_{max}$​: numero totale di aggiornamenti locali fatti da ogni nodo
* Ogni nodo ha $M$ diversi tipi di risorse (tempo, energia, banda, ecc.)

**Consumo di Risorse**:
* Per ogni parte e ogni risorsa $m \in M$:
  - Un aggiornamento locale consuma $c_{m}$ risorse
  - Un aggiornamento globale (aggregazione) consuma $b_{m}$ risorse
  - Budget massimo di risorse per ogni $m$ è $K_{m}$

**Problema di Ottimizzazione**:
Determinare $\tau$ e $I_{max}$ per:
1. Minimizzare la funzione di perdita media $F(\mathbf{w}^{t})$
2. Rispettare i vincoli di budget delle risorse

Formalmente:
$$\min_{\tau, K \in \{1,2,3,\dots\}} F(\mathbf{w}^t)$$

soggetto a
$$(T+1)c_m + (K+1)b_m \leq R_m, \quad \forall m \in \{1, \dots, M\}$$

dove
$$T = K \tau$$
### Non i.i.d. data
Uno dei maggiori problemi nel Federated Learning (FL) è che i dati locali di ciascun partecipante possono essere molto diversi tra loro, cioè seguire distribuzioni diverse. Questo provoca il fenomeno chiamato **client drift**, dove ogni nodo aggiorna il proprio modello puntando a trovare la soluzione migliore solo per i suoi dati locali.
Di conseguenza, quando si combinano (in media) tutti questi modelli locali, il modello globale risultante può peggiorare perché la media semplice non riesce a trovare un buon compromesso tra modelli così diversi.
## FedZero

```ad-abstract
title: Definizione

==FedZero== è un **framework centralizzato di Federated Learning (FL)** progettato per ottimizzare l’addestramento dei modelli in maniera **carbon neutral**, assicurando al contempo **equità nell’uso delle risorse** computazionali ed energetiche.
```

Ogni **client** che partecipa al sistema FedZero fornisce:
- Capacità computazionale massima $mc$ (espressa in batch per unità di tempo).
- Efficienza energetica $\delta_c$ (energia richiesta per batch).
- Dominio energetico di appartenenza (power domain), che identifica l'accesso a una fonte rinnovabile condivisa.

Alcuni **power domain** possono avere energia rinnovabile in eccesso. Per sfruttare al meglio queste risorse, si utilizzano:
- Previsioni di energia in eccesso nel dominio $p$ al tempo $t$:  $r_{p,t}$
- Previsioni della capacità computazionale residua del client $c$ al tempo $t$:   $m^{\text{spare}}_{c,t}$

La selezione dei client per ogni round tiene conto di questi due fattori per **evitare di coinvolgere client con risorse insufficienti**.


### Utilità statistica dei Client
FedZero assegna a ogni client una **utilità statistica $\sigma_c$** che rappresenta la sua rilevanza nell’addestramento:

Un client ha **alta rilevanza statistica** se:
- Ha **una grande quantità di dati** ($|B_c|$).
- Ha **una loss elevata** sui suoi dati.

### Equità e Blacklist
Per evitare che gli stessi client vengano selezionati troppe volte (specializzando il modello globale sui loro dati), FedZero implementa:

1. **Blacklist**: dopo ogni round, i client selezionati vengono messi in blacklist.
2. **Rilascio dalla blacklist** con una certa probabilità, in funzione della loro partecipazione storica $p(c)$ rispetto alla media $\omega$.

La probabilità di rilascio dalla blacklist è:
![[Pasted image 20250602122705.png]]
Dove:
- $p(c)$ = numero di round in cui il client $c$ ha partecipato.
- $\omega$ = media dei $p(c)$ di tutti i client:  
    $\omega \leftarrow \text{mean}{p(c), \forall c \in C}$
- $\alpha$ = parametro di controllo (più alto = blacklist più lunga).

```ad-success
title: Obiettivi
1. **Minimizzare l’errore del modello**.
2. **Garantire zero emissioni di carbonio** (utilizzando solo energia rinnovabile disponibile).
3. **Assicurare equità** tra i client in termini di partecipazione e specializzazione del modello.

```

## ProxyFL
Nella Federated Learning (FL), è stato dimostrato che **parametri e gradienti condivisi** durante l’addestramento possono potenzialmente rivelare **dati originali degli utenti**.

### ✅ Soluzione: ProxyFL
==ProxyFL== è un **framework decentralizzato** che **preserva la privacy** grazie all'uso di **due modelli per ogni client**:

- **Modello Privato** $f_{\phi_k}$
    - Architettura libera
    - **Non condiviso**
    - Usato per l'inferenza
    - I suoi parametri $\phi_k$ vengono aggiornati localmente
- **Modello Proxy** $h_{\theta_k}$
    - Architettura comune a tutti
    - **Condiviso con gli altri peer**
    - Parametri $\theta_k$ soggetti a **Differential Privacy**


### Funzionamento Algoritmo
Ogni round segue questi passi:
1. **Ogni client allena localmente** i suoi due modelli:
    - $f_{\phi_k}$ (privato)
    - $h_{\theta_k}$ (proxy, con training **differentially private**)
2. I client **scambiano i modelli proxy** con i peer definiti da un **grafo di comunicazione** (mixing matrix).
3. Ogni client **aggrega** i proxy ricevuti dai vicini per aggiornare il proprio:
    ![[Pasted image 20250602122957.png]]
    Dove $w_{k,j}$ sono i pesi della media (es. pesi della mixing matrix) e $\mathcal{N}(k)$ è il set dei vicini del nodo $k$.
4. Il **modello privato $f_{\phi_k}$** viene poi aggiornato anche usando informazioni dal proxy aggiornato.


```ad-todo
title: Differencial privacy
**Differential privacy** è una tecnica che serve a **proteggere la privacy dei dati individuali**, anche quando i risultati di un’analisi (o l'addestramento di un modello) vengono condivisi o pubblicati.

> L’idea chiave è: **un singolo dato nel tuo dataset non deve influenzare troppo il risultato finale**.  
> In altre parole, **non si deve capire se un certo individuo è presente o no nei dati.**

```

Ogni round (cioè un ciclo di addestramento e comunicazione) segue questa sequenza:

1. Ogni **client** (cioè un dispositivo o partecipante alla rete) allena **due modelli**: Privato e pubblico
2. Tutti i client devono **usare la stessa struttura** (architettura) per il modello **proxy**, così i parametri possono essere combinati tra di loro. Invece, **ognuno è libero** di scegliere l’architettura del proprio **modello privato**.
3. Ogni client:
	- **Invia i parametri del suo proxy** ai suoi "out-neighbours" (vicini a cui è connesso in uscita).
	- **Riceve i proxy** da altri vicini ("in-neighbours") secondo un **grafo di comunicazione** (noto come **mixing matrix**).
4. Aggregazione dei modelli proxy ricevuti. Una volta ricevuti i proxy dai vicini, ogni client:
	- Li **combina** (ad esempio facendo una **media pesata**).
	- **Sostituisce** il proprio modello proxy con l’aggregato.

## Communication Protocol
In ogni round, **ogni client comunica con altri client a distanze esponenziali**, cioè con quelli a distanza $2^0$, $2^1$, $2^2$, ecc.

🔁 Questo significa che:
- Nel **round 1** parla con il vicino diretto.
- Nel **round 2** con quello a 2 passi di distanza.
- Nel **round 3** con quello a 4 passi, e così via.

✅ In pochi round, le informazioni si **diffondono velocemente** tra tutti i client, senza bisogno che ciascuno parli con tutti ogni volta.
## KL Divergenza
La **KL Divergence** è una misura statistica che quantifica quanto due distribuzioni di probabilità, PP e QQ, siano diverse tra loro.

- Valore **0** = distribuzioni identiche.
- Valore **alto** = differenze marcate.

Nel machine learning, aiuta a ottimizzare i modelli confrontando la distribuzione stimata con quella reale.