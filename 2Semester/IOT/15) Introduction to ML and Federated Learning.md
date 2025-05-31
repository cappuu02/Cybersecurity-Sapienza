
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
• **Each data point is a house** (ossernavzione del dataset, ogni record e dunque coppia dimensione e costo indica un data point che rappresenterebbe in questo esempio una casa)

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

>Where is the number of data points

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

Notice that, in the scenario that we are considering now, the dependent variable only depends on one independent variable, but it depends also on its powers.

If we want to find the polynomial that minimises the Mean Square Error, can we still use the normal equation? Yes! Given $n$ data points $(x_i, y_i)$, we define:

![[106K.png]]

What if the polynomial behaviour occurs over multiple variables? We can still use normal equations. Given data points $n$, we define $(x_{1,i}, \cdots, x_{d,i}, y_i)$, we define:

![[107K.png]]

```ad-example
![[Pasted image 20250528153259.png]]

```

The problem with this approach are:
- Computing the (pseudo) inverse of $X^T_+ \cdot X_+$ is computationally expensive if the matrix is big
- Works only for MSE, and not for other loss functions as Mean Absolute Error (MAE) $= \frac{1}{n} \Sigma_{i=1}^n \mid \hat y_i - y_i \mid$
- Alternative: use a numerical apporach
- Recall the chain rule for derivates of composition of function $\frac{d[f(g(x))]}{dx} = g'(x) \cdot f'(g(x))$

### Chain Rule
```ad-example
title:  Example 1
![[Pasted image 20250528153315.png]]

```

```ad-example
title:  Example 2
![[Pasted image 20250528153324.png]]

```

# Gradient Descent

## Gradient

```ad-abstract
title: Definizione di gradiente
Il ==gradiente di una funzione== è il vettore delle sue derivate parziali:
$$\bigtriangledown f(x_1, \cdots, x_n) = [\frac{\partial f}{\partial x_1}, \cdots, \frac{\partial f}{\partial x_n}]$$

Se $n=1$ il gradiente è semplicemente la derivata di $f$
```

>Il gradiente generalizza il concetto di derivata in uno spazio multidimensionale.

In ogni punto del dominio $(x_1, \cdots, x_n)$, rappresenta la pendenza della superficie $f(x_1, \cdots, x_n)$ nella direzione della massima pendenza.

## Gradient Descent
```ad-abstract
title: Definition
La ==discesa del gradiente== è un **algoritmo iterativo** che serve a trovare il minimo di una funzione, cioè il punto in cui la funzione assume il valore più basso possibile.

```

Può essere applicato se:
- $f$ è differenziabile 
- se $f: D \subseteq R → R$ allora è differenziabile (se la sua derivata è definita in ogni punto di $D$ ovvero Dominio)

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
Calcla il radiente della funzione in quel punto
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

|Iterazione|xx|yy|f(x,y)=x2+y2f(x,y) = x^2 + y^2|
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

Gli ==iperparametri== sono **scelte progettuali** che fai **prima ndell'addestramento**.

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

### high level idea
- **Initialisation**: I **pesi (weights)** e i **bias** della rete vengono inizializzati **a caso**.
- **Forward step**: Prendi un esempio di addestramento:   $(x_1, \cdots, x_d, y)$vdove $x_i$​ sono gli input e $y$ è il risultato corretto (etichetta).
	- Passi gli input **strato per strato** attraverso la rete:
    - Ogni neurone calcola:  
        $z = w \cdot x + b$
        e poi applica una **funzione di attivazione**.
	- Alla fine, ottieni l'**output della rete**.
- **Backward step**: La rete ha prodotto un output. Questo sarà lontano dal vero valore di $y$. Poi calcoli **quanto ogni peso e bias ha contribuito all’errore**, usando:  La regola della catena. Questo è chiamato **backpropagation**.
	- Una volta ottenuto tutti i gradienti, aggiorni i pesi ed i bias nella direzione che riduce l'errore.
	- Update the parameters with the gradient descent step: 
		![[124K.png]]
	- Ripeti tutto questo ciclo **per ogni esempio e per più epoche** (giri sull’intero dataset) finché:
		- L’errore scende abbastanza
		- Oppure raggiungi un numero massimo di iterazioni


> Si sottrae una piccola parte ($η$) del gradiente ($∂$) della funzione di errore rispetto a $w$ o $b$.




Possiamo allenare la rete neurale su un dataset di $N$ campioni $(x_{i,1}, \ldots, x_{i,d}, y_i)$.
Il processo funziona come segue:
  - Inizializzare pesi e bias in modo casuale.
  - Per ogni batch di $n$ elementi:
    - Fornire alla rete ogni campione (dato), ottenere la predizione $\hat{y}_i$ e calcolare i corrispondenti valori della funzione di loss:$$
      \mathcal{L}(x_{i,1}, \ldots, x_{i,d}, y_i) = \mathcal{L}_i = \frac{1}{2} (\hat{y}_i - y_i)^2
      $$
    - Considerare la media dei valori delle funzioni di loss:
      $$
      \mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} \mathcal{L}_i
      $$
    - Calcolare i gradienti di $\mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} \mathcal{L}_i$ rispetto a ciascun parametro e proseguire fino allo stop.

> 💡 Questo è **un'epoca (epoch)**. (dal per ogni fino alla fine)


Durante **l'addestramento di una rete neurale**, l'intero ==dataset viene suddiviso in tre parti==: 
- **insieme di addestramento** (training set), 
- **insieme di validazione** (validation set) 
- **insieme di test** (test set). 
L'addestramento della rete viene eseguito in più ==epoche== (epochs), dove **un'epoca corrisponde all'elaborazione completa di tutti i dati di addestramento, divisi in sottoinsiemi chiamati batch.**

 3. Inizio dell’addestramento
- All’inizio della prima epoca, i pesi e i bias della rete sono inizializzati **casualmente**.
- La rete viene allenata **batch dopo batch**:
    - Per ogni batch, si fa un **forward pass** (propagazione in avanti) 
    - Si calcola la **loss function** (funzione di perdita), che misura quanto le predizioni si discostano dal risultato vero.
    - Si fa il **backward pass** (retropropagazione) per calcolare i gradienti della loss rispetto ai pesi.
    - Si aggiornano i pesi e bias usando questi gradienti (ad esempio con gradient descent).


3. Addestramento nelle epoche successive
- A partire dalla seconda epoca, il processo continua usando i pesi aggiornati dell’epoca precedente.
- Questo ciclo si ripete finché non si raggiunge un numero massimo di epoche prestabilito o finché la rete non migliora più.


 3. Stochastic Gradient Descent (SGD)
- Quando l’aggiornamento dei parametri non si fa sull’intero dataset contemporaneamente, ma su **piccoli batch o singoli esempi**, parliamo di **SGD**.
- I batch vengono spesso scelti in modo casuale da tutto il training set, per evitare di far imparare alla rete un ordine fisso dei dati.


3. Valutazione su validation set
- Alla fine di ogni epoca, la rete viene valutata sul **validation set**.
- Serve per monitorare se la rete sta imparando bene o se sta iniziando a **overfittare** (cioè imparare troppo bene i dati di training senza generalizzare).
- I parametri migliori vengono scelti in base alle prestazioni sul validation set.



3. Valutazione finale su test set
- Quando l’addestramento è completato, la rete viene testata sull’insieme di test.
- Questo serve per misurare la **capacità di generalizzazione** della rete su dati completamente nuovi.
- Le metriche usate dipendono dal problema:
    - **Regressione:** MAE (errore assoluto medio), MSE (errore quadratico medio).
    - **Classificazione:** accuratezza, precisione, recall, F1-score.


## NN for Binary classification
==Neural network for binary classification==, where the samples belong to one of two possible classes (e.g., spam detection, disease detection).

- One output node with sigmoid activation function (trasforma il riultato in un numero tra $0$ ed $1$.

![[125K.png]]

Quando ci sono più di due classi, La rete ha **tanti nodi di output quanti sono le classi** (ad esempio 3 nodi se ci sono 3 classi). Per attivazione si usa la **softmax**, che trasforma gli output in probabilità (tutti tra 0 e 1, sommate a 1).

![[126K.png]]

Le classi spesso non sono numeri, Per lavorare con la rete, si assegna a ogni classe un numero intero. QUesto procedimento è chiamato ==label Econding==.

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
![[Pasted image 20250529110748.png]]
![[Pasted image 20250529110759.png]]


```

```ad-example
![[Pasted image 20250529110809.png]]
![[Pasted image 20250529110819.png]]

Possible metric for unbalanced datasets:
- Balanced accuracy

$$\frac{1}{2}(\frac{TP}{TP+FN} + \frac{TN}{TN+FP})=0.5$$

Balanced accuracy equal to 0.5 means either that the model is just guessing, or that it can predict well just one class.

```

Multi-class classification, three classes, $C_1$, $C_2$ and $C_3$ 
![[2Semester/IOT/Image IOT2ESONERO/134.png]]

```ad-example

![[Pasted image 20250529110903.png]]
![[Pasted image 20250529110913.png]]
![[Pasted image 20250529110921.png]]
![[Pasted image 20250529110932.png]]
![[Pasted image 20250529110943.png]]

```

## Bias (dataset)
Nei modelli di Machine Learning, il bias non è solo un “errore” casuale, ma un tipo di **distorsione sistematica** nei dati o nel modo in cui i dati vengono raccolti o usati. Questo può portare il modello a fare previsioni sbagliate o ingiuste.

- Il ==bias di selezione== si verifica quando la selezione del campione del training set non riflette accuratamente la popolazione target.
- Il ==bias storico== si verifica quando la distribuzione dei dati cambia nel tempo e il modello non viene adattato per gestire la nuova distribuzione.

```ad-example

Esempio: un sensore IoT per la qualità dell'aria viene installato all'esterno e addestra un modello locale per prevedere i picchi di inquinamento. Il modello viene addestrato in estate, quando la maggior parte delle attività cittadine sono chiuse. Quando in inverno le attività riaprono, la qualità dell'aria ha una distribuzione diversa, ma il modello non riesce a gestirla.
```


### Bias-Variance Tradeoff
The bias–variance tradeoff describes the relationship between a model's complexity , the accuracy of its predictions, and how well it can make predictions on previously unseen data.

![[140K.png]]

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
Inviare dati al cloud è spesso inefficiente per applicazioni IoT critiche (es. veicoli autonomi) a causa di latenza, consumo di banda e rischi di privacy. I dati sensibili (es. sanitari) possono essere intercettati, e l’elevato volume di informazioni può sovraccaricare i server.  
Una soluzione è usare modelli **locali**, addestrati direttamente sui dispositivi. Tuttavia, se i dati locali sono limitati o poco rappresentativi, il modello può risultare **poco accurato**.  

```ad-example

In agricoltura, un modello locale potrebbe non riconoscere malattie mai viste nel proprio campo.
```

## Federated Learning
Il **Federated Learning** è un approccio che combina i vantaggi dell’**addestramento locale** (privacy, bassa latenza) con quelli dell’**addestramento centralizzato** (modelli più accurati grazie a più dati).
- Più dispositivi (es. smartphone, sensori IoT) usano **la stessa rete neurale**.
- Ogni dispositivo **addestra localmente** il modello sui propri dati.
- Poi **condivide solo i parametri del modello** (pesi, bias, gradienti) e **non i dati grezzi**.
- I dispositivi si **scambiano e aggregano** i parametri ricevuti dagli altri, migliorando il proprio modello sfruttando l’esperienza altrui.

> I dispositivi formano una **“federazione”**: collaborano senza mai centralizzare i dati.

====Scenario ideale==: il modello di ciascun dispositivo offre prestazioni pari a quelle di un modello centralizzato addestrato sull'intera unione di ciascun dataset locale.

==Obiettivo realistico==: il modello di ML su ciascun dispositivo della federazione offre prestazioni migliori rispetto a quelle che otterrebbe se addestrato solo sui dati locali.

## Federated Learning vs Distributed Learning
In distributed learning, data is usually centrally stored.
- Multiple devices (usually powerful servers) train the model in parallel.
- Different kinds of parallelism can be implemented.

![[143K.png]]

In ==federated learning==, data is stored on each device (usually non powerful end nodes).
Devices train the model in parallel, each on its own chunk of data.

**Objective**: train a more accurate and generalised model than each device would on its own data while keeping data privacy, preserving computing resources.

**Challenges**:
I dati locali sui dispositivi **non sono distribuiti in modo uniforme** (non IID), cioè ogni dispositivo può avere dati con caratteristiche molto diverse.Inoltre, alcuni dispositivi hanno molti dati, altri pochissimi (**dataset sbilanciati**).  Serve un'**aggregazione intelligente** dei modelli per ottenere un buon modello globale.

**Vulnerable to attacks**: Attori malevoli possono partecipare alla federazione e **inviare parametri falsi**, compromettendo l'addestramento degli altri.

**Node availability**: I dispositivi (come smartphone o sensori) **non sono sempre attivi**: possono essere spenti, offline o a corto di batteria.

## FL applications in IoT
FL finds many applications in IoT, for example:
- Smart Robotics
- Smart Object Detection
- Smart homes
- Smart Cities
- Healthcare
- And many others

### Challenges
Nei sistemi IoT, il federated learning è complicato da risorse limitate, nodi poco affidabili e eterogenei, dati non uniformi (non IID), reti a bassa banda e disparità nella partecipazione, che favorisce i dispositivi più potenti a scapito di quelli più deboli.
## Taxonomy
![[144K.png]]

## Centralised FL
A ==central server== orchestrates the training process. 
Participants train local models on their data.
Participants’ send the updated model parameters to the central server.
The server aggregates these parameters to update the global model, which is then distributed back to the clients.
The central server coordinates the training, aggregation, and distribution processes.
Model updates are aggregated at a single point, simplifying the update process.

![[145K.png]]


## Decentralised FL
In ==decentralized Federated Learning== participants communicate directly with each other to share and aggregate model updates (peer-to-peer).

Each party keeps a mixing matrix, that weighs the contribution of each other party of the aggregation. Can have 0 entries, can vary over time.

This peer-to-peer communication ensures that There is no single point of failure and enhances privacy by distributing the aggregation process.

![[146K.png]]

## FedAvg

>Centralised FL, first to share model's parameters, weighted average aggregation.

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
