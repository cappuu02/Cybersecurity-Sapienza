
In depth analysis, Energy harvesting - Markov decision process.
A Learning Theoretic Approach to Energy Harvesting Communication System Optimization.
# System Model (PDF5)
l trasmettitore raccoglie energia dall'ambiente e la immagazzina in una **batteria ricaricabile** di capacità limitata ($B_{max}$​). L'energia raccolta può essere utilizzata per trasmettere dati nel **Time Slot successivo**. **Se la batteria è piena, l’energia in eccesso viene persa** (non può essere accumulata ulteriormente).

**Il sistema opera in fasi discrete**: ogni TS ha una durata fissa (per tutti uguale), durante la quale:
- Arrivano pacchetti di **dati** e **energia** in ogni TS.
- Lo stato del canale può cambiare da un TS ad un altro.
**Vincolo energetico**: il trasmettitore non può consumare più energia di quella disponibile nel TS attuale.


L'intero sistema (la grandezza dei dati e l'energia che arrivano su ogni TS) è modellato come un processo di Markov, in cui gli stati cambiano con una certa probabilità di transizione.

- $D_n \in D = \{d_1, ..., d_{N_D}\}$ is the ==size of the data packet arriving at time slot $n$==
- $p_D(d_j, d_k)$ transition probability, i.e., ==probability that the next data packet has size $d_k$ given that the current packet has size $d_j$==. (La grandezza dei pacchetti di dati varia nel tempo in modo **stocastico** (random ma con una logica predittiva basata su una catena di Markov).)
- $p_e(e_j, e_k)$ ==probabilità che l'energia raccolta nel time slot attuale sia $e_j$​ e che nel prossimo TS sia $e_k$==​.
- $E^H_n$ ==energy stored in the battery that can be used for data transmission from TS $n+1$==
- The battery is limited and has size of $B_{max}$ energy units. The amount of energy stored in the battery in TS $n$ is $B_n$ $0 \le B_n \le B_{max}$
- $H_n \in H = \{h_1, ..., h_{N_H}\}$ is the ==state of the channel during TS $n$== (lo stato del canale wireless che può essere buono, medio, pessimo)
- ==The channel state follows a Markov model==, $p_h (h_j, h_k)$ is the channel state transition probability. (probabilità che, se il canale è nello stato $h_j$ oggi, passo allo stato $h_k$ domani)

**La qualità della comunicazione cambia dinamicamente e segue un processo di Markov**.
Uno stato del canale $H_n$ più scarso richiede più energia per trasmettere lo stesso pacchetto di dati. Per ogni combinazione di stato del canale $H_n$ e pacchetto $D_n$, il trasmettitore conosce l'energia minima necessaria per trasmettere:
$$E_n^T = f_e(D_n, H_N)$$

>Se il canale è buono si può trasmettere con meno energia. Se è cattivo, servirà più energia.


```ad-success
title: Obiettivo Finale
Il trasmettitore deve **decidere se trasmettere o aspettare**, basandosi sull'energia disponibile, sulla qualità del canale e sulla dimensione del pacchetto, massimizzando il throughput con un **uso ottimale della batteria**. Il trasmettitore, inoltre, garantisce che l'energia spesa nel time slot $n$ non è maggiore dell'energia disponibile nella batteria $B_n$.
La trasmissione può fallire con una certa probabilità pari a $\rho$

```

![[20a.png|500]]

## Expected total transmitted data maximization problem (ETD-problem)

Il trasmettitore mira a **massimizzare il numero totale di dati trasmessi** nel lungo termine.
Variabile decisionale (ci permette di decidere se trasmettere o meno):
$$X_n \in \{0,1\}, X_n = \begin{cases} 1 \hspace{0.5cm} \text{Incoming packet is trasmitted} \\ 0 \hspace{0.5cm} \text{Otherwise} \end{cases}$$

>La variabile $X$ è una scelta binaria che decide se trasmettere o meno un pacchetto dati al tempo $n$. Se trasmetto ($X=1$) consumo energia `Eₙᴴ` ma guadagno dati utili $D_n$. Se non trasmetto risparmio energia per il futuro.

$$
\text{Max}_{\{X_i\}^{\infty}_{i=0}}\lim_{N \to \infty} \mathbb{E} \left[ \sum_{n=0}^N \gamma^n X_n D_n \right]
$$
dove:
- $\sum \to$ Calcola il totale dei dati trasmessi in tutti gli istanti.
- $\gamma \to$ Dà meno peso ai dati futuri.
- $\mathbb{E} \to$ Considera situazioni stocastiche.
- $\lim \to$  Ottimizza su un orizzonte temporale infinito.

>Il trasmettitore vuole **massimizzare la somma scontata di tutti i dati che invierà in tutta la sua vita operativa**, tenendo conto che: **Trasmettere oggi** (Xₙ=1) dà un beneficio immediato (**Dₙ**), ma consuma energia (**Eₙᵀ**). **Non trasmettere oggi** (Xₙ=0) conserva energia per trasmettere **più dati domani** (se γ è alto).

$$
X_n E_n^T \leq B_n \hspace{0.5cm} \text{Non trasmetto se l'energia richiesta supera quella disponibile}
$$
$$
B_{n+1} = \min\{B_n - X_n E_n^T + E_n^H, B_{\text{max}}\}
$$
La batteria si scarica trasmettendo e si ricarica raccogliendo energia (`Eₙᴴ`), senza superare la capacità massima
$$
0 \leq 1 - \gamma \leq 1 \hspace{0.5cm} \text{Pr. that the transmission terminates its operations in each TS}
$$

## MDP for ETD (Expected Total Transmitted Data)

==**Stato al tempo n**==
$$S_n = (E_n^H, D_n, H_n, B_n)$$
- **$E_n^H$**: Energia raccolta (es. solare)
- **$D_n$**: Dimensione pacchetto disponibile
- **$H_n$**: Qualità canale
- **$B_n$**: Livello batteria
- $\mathcal{S} = \{s_1, \dots, s_{N_s}\}$ spazio degli stati

**==Azioni Possibili==**
$$\mathcal{A} = \{0, 1\}$$
- **0**: Droppa il pacchetto
- **1**: Trasmetti il pacchetto

==**Probabilità di transizione**==
$$P_{X_n}(s_j, s_k) = \mathbb{P}[S_{n+1} = s_k \mid S_n = s_j, A_n = X_n]$$

==**Ricompensa immediata**==
$$R_{X_n}(S_n, S_{n+1}) = X_n D_n$$
- Se $X_n=1$: ricompensa $= D_n$
- Se $X_n=0$: ricompensa $= 0$

  
==**Obiettivo**==
Trovare la **policy ottima**:
$$\pi: \mathcal{S} \to \mathcal{A}, \quad \pi(s) = a$$
Che massimizza:
$$\max_{\{X_i\}} \lim_{N \to \infty} \mathbb{E} \left[ \sum_{n=0}^N \gamma^n X_n D_n \right]$$

## Solving ETDP
Nel paper sono stati implementati tre approcci, a seconda delle ipotesi sulla conoscenza del modello:

1. **Ottimizzazione Online** (==Solution Adopted==)
- **Ipotesi**: Il trasmettitore ha informazioni a priori sulle probabilità di transizione e sulle ricompense.
- **Soluzione**: Programmazione Dinamica (Dynamic Programming)
- **Casi d'uso**: 
  - Ambiente stabile con pattern prevedibili
  - Sistemi con buoni modelli previsionali

2. **Esplorazione & Sfruttamento**
- **Ipotesi**: Nessuna informazione a priori su probabilità di transizione e ricompense.
- **Soluzione**: Reinforcement Learning
- **Casi d'uso**:
  - Ambienti non noti o altamente variabili
  - Adattamento in tempo reale a condizioni mutevoli

3. **Ottimizzazione Offline** 
- **Ipotesi**: Tutti gli stati futuri (EH, dimensioni pacchetti, canale) sono noti su un orizzonte finito.
- **Difficoltà**: Il problema rimane NP-hard
- **Soluzione**: Algoritmo Branch-and-Bound
- **Casi d'uso**:
  - Pianificazione a breve-medio termine
  - Simulazioni e analisi what-if

### Why Dynamic Programming?
Un MDP non è un "problema" che dobbiamo "risolvere". Dato un **MDP**, l'==obiettivo== è ==trovare una politica ottimale==. Per farlo, dobbiamo trovare la ==politica che massimizza l'equazione di Bellman==:
  $$V^*(s) = \max_a \mathcal{R}_s^a + \gamma \sum_{s' \in S} P_{s,s'}^a V^*(s')$$$$Q^*(s,a) = \mathcal{R}_s^a + \gamma \sum_{s' \in S} P_{s,s'}^a \max_{a'} Q^*(s',a')$$
Queste equazioni presentano due proprietà fondamentali:
- **Sottostruttura ottima**  
	   - Una soluzione ottimale può essere costruita combinando soluzioni ottimali dei sottoproblemi
	   - *Esempio*: La decisione ottimale al tempo `n` dipende dalle decisioni ottime ai tempi `n+1`, `n+2`, etc.
- **Sottoproblemi sovrapposti**  
	   - Il problema può essere scomposto in sottoproblemi più piccoli che vengono rivisitati più volte
	   - *Esempio*: Il calcolo del valore di uno stato `S` può essere riutilizzato in più fasi del processo

>Queste proprietà rappresentano i **criteri necessari** per applicare la Programmazione Dinamica (DP).


### Value Iteration Algorithm
**Idea Fondamentale**
Calcolare iterativamente il **valore di ogni stato** (quanti dati possiamo aspettarci di trasmettere partendo da quello stato) e derivare la **policy ottimale** che massimizza questi valori.

![[33.png]]

```ad-info
title: Funzionamento Algoritmo
Trova la strategia migliore (policy) per massimizzare i dati trasmessi nel lungo periodo, considerando:

- Energia disponibile
- Qualità del canale 
- Dimensione dei pacchetti

**Come Funziona?**

1. **Inizializza** tutti gli stati a valore zero ("non so ancora quanto sono utili")

2. **Ricalcola iterativamente** il valore di ogni stato:
    - Per ogni possibile azione (trasmettere/non trasmettere)
    - Stima la "ricompensa futura totale" considerando:
        - Ricompensa immediata (dati trasmessi ora)    
        - Ricompense future (valore degli stati successivi, scontato)  
3. **Continua ad aggiornare** i valori finché non convergono (quando i miglioramenti sono minimi)
    
4. **Deriva la policy ottimale**: per ogni stato, scegli l'azione che dà il valore massimo

```

```ad-example
Pensa a un autista che deve decidere se:

- Accelerare (consuma più benzina ma arriva prima)
    
- Mantenere (equilibrio consumo/tempo)
    
- Rallentare (risparmia benzina)
    

Value Iteration è come fare ripetutamente simulazioni per trovare la strategia di guida ottimale che bilancia:  
✔ Arrivare presto (dati trasmessi)  
✔ Non finire la benzina (energia residua)

```

### Policy Iteration Algorithm
L'algoritmo **Policy Iteration** (PI) è un metodo per trovare la **policy ottimale** (strategia) in un **Markov Decision Process (MDP)**.  
È composto da due fasi principali:
1. **Policy Evaluation** (Valutazione della policy)
2. **Policy Improvement** (Miglioramento della policy)

Starts with initialization:
![[34.png]]

then divided into two phases:
- **Policy evaluation**: Calcolare quanto vale ogni stato $s_j$ seguendo la policy corrente $\pi$
	![[35.png]]
- **Policy improvement**: Migliorare la policy $\pi$ scegliendo, per ogni stato, l'azione che massimizza $V(s_j)$
	![[36.png]]

![[37.png]]

**Riepilogo dell'algoritmo**
```python
while True:
    1. Valuta la policy corrente → Calcola V^π per tutti gli stati
    2. Migliora la policy → Trova π' più performante
    if π' == π:  # Nessun miglioramento
        break   # Policy ottimale trovata!
    else:
        π = π'  # Continua ottimizzazione
```

## What are MDPs for?
They model a huge variety of problems, which can have:

**Finite state space**
In this case we have a finite horizon (final states exist)
![[38.png]]

**Continuous state space**
In this case we have an Infinite horizon (no final state)
![[39.png]]

## Q-learning
**If an agent does not know the environment, it has to explore it first**. By exploring it, it **learns the rewards and the state space**. ==Q-learning== is an **algorithm for finding the optimal policy of a MDP** (has convergence guarantees for both deterministic and non deterministic MDPs). 
**Q-learning is one of the simplest Reinforcement Learning algorithms**. 
**Reinforcement Learning algorithms are unsupervised Machine Learning algorithms**, i.e., they do not need to see labeled samples to learn tasks. They only need a feedback from the environment (state and reward).

![[40.png]]

### Q-learning - finite horizon environments (1)
Questo algoritmo è una variante del **Q-learning classico**, adattato per problemi in cui il game termina dopo un numero finito di passi (es. labirinti, giochi a turni, task con scadenza).

- **Learning rate (α)**: Quanto velocemente l’agente impara (es. `α = 0.1`).
    - Se **α = 1**, l’agente dimentica tutto il passato e impara solo dall’ultima esperienza.
    - Se **α ≈ 0**, l’apprendimento è molto lento.

- **ε (epsilon)**: Probabilità di esplorare (scegliere un’azione casuale).
	- Inizia alto (es. `ε = 0.9`) e **viene ridotto nel tempo** (per passare da esplorazione a sfruttamento)


**Inizializzazione della Q-table**
Initialize $Q(s,a)$ randomly $\forall s \in S, a \in A$. 
Set $Q(s_{\text{FINAL}}, a) = 0$ $\forall a \in S_F$ (final states)  
- For each episode (ogni episodio è una sequenza di azioni fino a raggiungere uno stato finale):  
  - Initialize initial state $s$  
  - While $s \notin S_F$  (finché non arriviamo nello stato finale)
    - Choose a possible action $a$ from $A_s$ derived from $Q$  
    - Take action $a$, observe reward $r$ and state $s'$  
    - Update:  $Q(s,a) \gets Q(s,a) + \alpha [r + \gamma \max Q(s',a) - Q(s,a)]$ (Aggiorna la Q'table)
    - $s \gets s'$  (Passa al nuovo stato)
- **Decrease** $\epsilon$  


```ad-success
- Perchè diminuiamo $\epsilon$? 
	- Per passare da esplorazione (imparare l'ambiente) a sfruttamento (usare la policy ottimale)
- Cosa succede se $\epsilon = 0$ sin dall'inizio? 
	- L'agente potrebbe bloccarsi in una policy subottimale.

```


> **For example, $\epsilon$-greedy approach:**  
> - Compute $a^* = \arg\max Q(s,a)$  
> - With probability $1-\epsilon$  
>   - $\alpha \gets a^*$  
> - With probability $\epsilon$  
>   - Choose a random $a$

#### Q-learning - parameters
**In -greedy**: 
Valori elevati ci consentono una maggiore esplorazione dell'ambiente. Man mano che scopriamo l'ambiente, la diminuzione migliora lo sfruttamento della conoscenza acquisita. $\alpha$ è il tasso di apprendimento e rappresenta quanto è grande il passo che facciamo per muoverci verso la soluzione ottimale.

![[41.png]]
- High learning rate: La soluzione oscilla selvaggiamente attorno all'ottimo.
- Low learning rate: Convergenza lenta ma stabile
- Decaying learning rate: Convergenza rapida e precisa (inizia veloce e termina lento e preciso)

### Q-learning - finite horizon environments (2)
 Parameters: learning rate $\alpha \in (0,1]$, small $\epsilon > 0$  
- Initialize $Q(s,a)$ randomly $\forall s \in S, a \in A$. 
- Set $Q(s_{final}, \cdot) = 0$ $\forall a \in S_F$ (final states)  
- For each episode:  
  - Initialize initial state $s$  
  - While $s \notin S_F$  
    - Choose a possible action $a$ from $A_s$ derived from $Q$  
    - Take action $a$, observe reward $r$ and state $s'$  
    - Update:  $Q(s,a) \gets Q(s,a) + \alpha [r + \gamma \max Q(s',a) - Q(s,a)]$
    - $s \gets s'$  
- **Decrease** $\epsilon$  and $\alpha$

### Q learning - convergence
The Q-learning algorithm finds the optimal $Q^*$, and hence the optimal policy $\pi^*$ if 
- All state-action pairs are visited infinitely often (i.e., the procedure explores the environment enough, can be achieved with -greedy). 
- The rewards are bounded, $\exists R_{\text{max}} < \infty : \mid R_s \mid \le R_{max} \forall s$ 
- The learning rate decreases, but not too slowly:
$$\sum_{t=1}^{\infty} a_t = \infty \hspace{0.5cm} \sum_{t=1}^{\infty} a^2_t < \infty \hspace{0.5cm} \text{for instance:} \hspace{0.5cm} a_t = \frac{1}{t}$$
### Q-learning - finite horizon environments
 Parameters: learning rate $\alpha \in (0,1]$, small $\epsilon > 0$  
- Initialize $Q(s,a)$ randomly $\forall s \in S, a \in A$ (no final states exist in this case)
- Initialize initial state $s$  
	- While !stopping condition
		- Choose a possible action $a$ from $A_s$ derived from $Q$ (e.g., -greedy)
		- Take action $a$, observer reward $r$ and state $s'$
		- Update: $Q(s,a) \leftarrow Q(s,a) + \alpha[r + \rho \text{max} Q(s', a) - Q(s,a)]$
		- $s \leftarrow s'$
	- Decrease $\epsilon$ and $\alpha$

